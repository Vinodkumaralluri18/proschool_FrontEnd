import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../_services/store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { EditstoreComponent } from '../editstore/editstore.component';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {

  constructor(private service: StoreService, private fb: FormBuilder, public dialog: MatDialog) {}

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  showMaterialList: boolean = false;

  ngOnInit() {
    this.getVendors();
    this.getMaterials();
  }

  pageChange(x) {
    this.pageNo = x;
    this.page_start = (x - 1) * 10;
  } 

  vendors = [];
  materials = [];
  selected_vendor;
  dialog_type: string;
  alert_message: string;
  submit_type: string;

  vendorForm: FormGroup = this.fb.group({
    vendor_name: ['', Validators.required],
    material: ['', Validators.required],
    contact_no: ['', Validators.required],
    email: ['', Validators.required],
    address: ['', Validators.required],
    location: ['', Validators.required],
  });

  getVendors() {
    this.service.getVendors()
      .subscribe(
        res => { this.vendors = res.vendor, 
          this.pages = Math.ceil(this.vendors.length / 10),
          console.log(res) 
        }
      )
  }

  getMaterials() {
    this.service.getMaterials()
      .subscribe(
        res => { this.materials = res.material, console.log(res) }
      )
  }

  addVendor(i) {
    this.selected_vendor = '';
    this.dialog_type = 'vendor';
    this.submit_type = 'add';
    this.openDialog(this.dialog_type, this.submit_type)
  }

  editVendor(i) {
    this.selected_vendor = this.vendors[i];
    this.dialog_type = 'vendor';
    this.submit_type = 'edit';
    this.openDialog(this.dialog_type, this.submit_type)
  }

  deleteConfirmation(vendor_id) {
    this.selected_vendor = vendor_id;  
    this.openAlert("Are you sure to delete the Vendor", true)
  }

  deleteVendor() {
    this.service.deleteVendor(this.selected_vendor)
      .subscribe(
        res => { 
          if(res == true) {
            this.vendors = this.vendors.filter(res => res.vendor_id !== this.selected_vendor)
            this.alert_message = "Vendor Deleted Successfully";
            this.openAlert(this.alert_message, false)
          } else {
            this.alert_message = "Vendor Not Deleted";
            this.openAlert(this.alert_message, false)
          }
        }
      )
  }

  openDialog(dialog_type, submit_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      selected_vendor: this.selected_vendor,
      dialog_type: dialog_type,
      submit_type: submit_type,
    };

    const dialogRef = this.dialog.open(EditstoreComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if(data) {
          this.getVendors();
          console.log("Dialog output:", data)
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
          this.deleteVendor();
        }
      }
    )
  }

}
