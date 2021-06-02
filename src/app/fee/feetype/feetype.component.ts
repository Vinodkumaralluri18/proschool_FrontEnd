import { Component, OnInit } from '@angular/core';
import { FeeService } from '../../_services/fee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { EditfeeComponent } from '../editfee/editfee.component';

@Component({
  selector: 'app-feetype',
  templateUrl: './feetype.component.html',
  styleUrls: ['./feetype.component.css']
})
export class FeetypeComponent implements OnInit {

  constructor(private service: FeeService, private fb: FormBuilder, public dialog: MatDialog) {}

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  ngOnInit() {
    this.getFeeTypes();
  }

  pageChange(x) {
    this.pageNo = x;
    this.page_start = (x - 1) * 10;
  } 

  nextPage() {
    if(this.pageNo < this.pages) {
      this.pageNo++;
      this.page_start = (this.pageNo - 1) * 10;
    } else {
      return;
    }
  } 

  previousPage() {
    if(this.pageNo > 1) {
      this.pageNo--;
      this.page_start = this.page_start - 10;
    } else {
      return;
    }
  }

  fee_types = [];
  selected_feeType;
  dialog_type: string;
  alert_message: string;

  feetypeForm: FormGroup = this.fb.group({
    fee_type: ['', Validators.required],
  });

  getFeeTypes() {
    this.service.getFeeTypes()
      .subscribe(
        res => { this.fee_types = res.fee_type, 
          this.pageNo = 1,
          this.page_start = 0,
          this.pages = Math.ceil(this.fee_types.length / 10),
          console.log(res) 
        }
      )
  }

  addFeeTypes() {
    this.service.addFeeTypes(this.feetypeForm.value)
    .subscribe(
      res => { 
        if(res == true) {
          this.alert_message = "FeeType Added Successfully";
          this.openAlert(this.alert_message, false);
          this.fee_types.push({fee_type : this.feetypeForm.value})
          this.getFeeTypes();
        } else {
          this.alert_message = "FeeType Not Added";
          this.openAlert(this.alert_message, false)
        }
      }
    ) 
  }

  addFeeType() {
    this.selected_feeType = '';
    this.openDialog(this.selected_feeType, 'add')
  }

  deleteConfirmation(fee_types_id) {
    this.selected_feeType = fee_types_id;  
    this.openAlert("Are you sure to delete the FeeType", true)
  }

  deleteFeeType() {
    this.service.deleteFeeTypes(this.selected_feeType)
      .subscribe(
        res => { 
          if(res == true) {
            this.fee_types = this.fee_types.filter(res => res.fee_types_id !== this.selected_feeType)
            this.alert_message = "FeeType Deleted Successfully";
            this.openAlert(this.alert_message, false)
          } else {
            this.alert_message = "FeeType Not Deleted";
            this.openAlert(this.alert_message, false)
          }
        }
      )
  }

  editFeeType(i) {
    this.selected_feeType = this.fee_types[i];
    this.openDialog(this.selected_feeType, 'edit')
  }

  openDialog(selected_feeType, submit_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      feeType: selected_feeType,
      dialog_type: 'feeType',
      submit_type: submit_type,
    };

    const dialogRef = this.dialog.open(EditfeeComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data),
        this.getFeeTypes();
      }
    );

  }

  openAlert(alert_message, status) {
    const alertConfig = new MatDialogConfig();

    alertConfig.autoFocus = true;
    alertConfig.width = '40%';

    alertConfig.data = {
      message: alert_message,
      confirm_status: status,
    };

    const alertRef = this.dialog.open(AlertComponent, alertConfig);

    alertRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data)
        if(data === true) {
          this.deleteFeeType();
        }
      }
    )
  }

}
