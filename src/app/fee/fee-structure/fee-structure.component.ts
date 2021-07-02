import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { FeeService } from '../../_services/fee.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { EditfeeComponent } from '../editfee/editfee.component';

@Component({
  selector: 'app-fee-structure',
  templateUrl: './fee-structure.component.html',
  styleUrls: ['./fee-structure.component.css']
})
export class FeeStructureComponent implements OnInit {

  constructor(private service: ServicesService, private feeservice: FeeService, public dialog: MatDialog) {
    dialog.afterAllClosed
    .subscribe((res) => {
      this.getFeeStructure();
    }
  );
   }

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  classes = [];
  feeTypes = [];
  fee_structure = [];
  selected_class = {class_id: '', name: ''};
  selected_feeType = {fee_types_id: '', fee_type: ''};
  installment_type = '';
  installments = ['termwise', 'monthly', 'quarterly', 'halfyearly', 'annually'];
  selected_feeStructure:any = {};
  dialog_type: string;
  alert_message: string;  

  ngOnInit() {
    this.getClasses();
    this.installment_type = this.installments[0];
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

  showClassList: boolean = false;
  showFeeTypeList: boolean = false;
  showInstallmentList: boolean = false;

  getClasses() {
    this.service.getClasses()
      .subscribe(
        res => { 
          this.classes = res.school_classes.filter(data => data.status === 1),
          this.selected_class = this.classes[0],
          this.getClassFee(),
          console.log(res) 
        }
      )
  }

  getClassFee() {
    this.feeservice.getClassFee(this.selected_class.class_id)
      .subscribe(
        res => { 
          if(res.class_fee.length === 0) {
            this.alert_message = "No ClassFees Found";
            this.openAlert(this.alert_message, false);
          } else {
            this.feeTypes = res.class_fee, 
            this.selected_feeType = res.class_fee[0],
            this.getFeeStructure();
          }
          console.log(res) 
        }
      )
  }

  getFeeStructure() {
    this.feeservice.getFeeStructure(this.installment_type, this.selected_class.class_id, this.selected_feeType.fee_types_id)
      .subscribe(
        res => { 
          if(res.feestructure.length === 0) {
            this.alert_message = 'No FeeStructue Found';
            this.openAlert(this.alert_message, false);
            this.fee_structure = [];
          } else {
            this.fee_structure = res.feestructure, 
            this.pageNo = 1,
            this.page_start = 0,
            this.pages = Math.ceil(this.fee_structure.length / 10),
            console.log(res) 
          }
        }
      )
  }

  deleteConfirmation(fee_structure_id) {
    this.selected_feeStructure = fee_structure_id;  
    this.openAlert("Are you sure to delete the Fee Structure", true)
  }

  deleteFeeStructure() {
    this.feeservice.deleteFeeStructure(this.selected_feeStructure)
      .subscribe(
        res => { 
          if(res == true) {
            this.alert_message = "FeeStructure Deleted Successfully";
            this.openAlert(this.alert_message, false);
            this.getFeeStructure();
          } else {
            this.alert_message = "FeeStructure Not Deleted";
            this.openAlert(this.alert_message, false)
          }
        }
      )
  }

  addFeeStructure() {
    this.selected_feeStructure = {class_id: this.selected_class.class_id, installment_type: this.installment_type, fee_types_id: this.selected_feeType.fee_types_id};
    this.openDialog(this.selected_feeStructure, 'add')
  }

  editFeeStructure(i) {
    this.selected_feeStructure = this.fee_structure[i];
    this.openDialog(this.selected_feeStructure, 'edit')
  }

  openDialog(selected_feeStructure, submit_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      feeStructure: this.selected_feeStructure,
      dialog_type: 'FeeStructure',
      submit_type: submit_type,
    };

    const dialogRef = this.dialog.open(EditfeeComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(
      data => {
        if(data) {
          console.log("Dialog output:", data),
          console.log(data);
          if(submit_type == 'edit') {
            var foundIndex = this.fee_structure.findIndex(x => x.id == data.feeStructureId);
            this.fee_structure[foundIndex] = data.form;
          } else if(submit_type == 'add') {
            debugger
            this.fee_structure.push(data.form)
          }
          this.getFeeStructure();
        }
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
          this.deleteFeeStructure();
        }
      }
    )
  }


}
