import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { StoreService } from '../../_services/store.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { PaymentsListComponent } from '../payments-list/payments-list.component';
import { AddpaymentsComponent } from '../addpayments/addpayments.component';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  constructor(private service: ServicesService, private storeservice: StoreService, public dialog: MatDialog) {}

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  showVendorList = false;
  showMaterialList = false;

  component;

  ngOnInit() {
    this.getVendors();
    this.getMaterials();
    this.getPayments();
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

  vendors = [];
  materials = [];
  all_payments = [];
  payments = [];
  selected_payment;

  vendor = {vendor_id: '', vendor_name: ''};
  material = {material_id: '', material: ''};

  getPayments() {
    this.service.getPayments()
      .subscribe(
        res => { this.payments = res.payments, 
          this.all_payments = res.payments, 
          this.pageNo = 1,
          this.page_start = 0,
          this.pages = Math.ceil(this.payments.length / 10),
          console.log(res.payments) 
        }
      )
  }

  getVendors() {
    this.storeservice.getVendors()
      .subscribe(
        res => { this.vendors = res.vendor, console.log(res) }
      )
  }

  getMaterials() {
    this.storeservice.getMaterials()
      .subscribe(
        res => { this.materials = res.material, console.log(res) }
      )
  }

  getVendor_Payments() {
    if(this.material.material_id === '') {
      this.payments = this.all_payments.filter(pay => pay.vendor_id === this.vendor.vendor_id);
    } else {
      this.payments = this.all_payments.filter(pay => pay.vendor_id === this.vendor.vendor_id && pay.material_id === this.material.material_id);
    }
    this.pages = Math.ceil(this.payments.length / 10);
  }

  getMaterial_payments() {
    console.log(this.material.material_id)
    console.log(this.vendor.vendor_id)
    if(this.vendor.vendor_id === '') {
      this.payments = this.all_payments.filter(pay => pay.material_id === this.material.material_id);
    } else {
      this.payments = this.all_payments.filter(pay => pay.vendor_id === this.vendor.vendor_id && pay.material_id === this.material.material_id);
    }
    this.pages = Math.ceil(this.payments.length / 10);
  }

  view_payments(payment_id) {
    this.selected_payment = this.payments.filter(pay => pay.payment_id === payment_id)
    this.component = PaymentsListComponent;
    this.openDialog(this.selected_payment, this.component)
  }

  add_payments(payment_id) {
    this.selected_payment = this.payments.filter(pay => pay.payment_id === payment_id)
    this.component = AddpaymentsComponent;
    this.openDialog(this.selected_payment, this.component)
  }

  openDialog(dialog_type, component): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      selected_payment: this.selected_payment
    };

    const dialogRef = this.dialog.open(component, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        this.material.material_id = '';
        this.vendor.vendor_id = '';
        this.getPayments();
      }
    );

  }

}
