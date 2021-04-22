import { Component, OnInit, Inject } from '@angular/core';
import { StoreService } from '../../_services/store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-addpayments',
  templateUrl: './addpayments.component.html',
  styleUrls: ['./addpayments.component.css']
})
export class AddpaymentsComponent implements OnInit {

  selected_payments: any = {};
  payment_date = new FormControl(new Date);
  alert_message;

  constructor(
    private service: StoreService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AddpaymentsComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.selected_payments = data.selected_payment[0];
  }

  ngOnInit() {
    console.log(this.selected_payments)
  }

  close() {
    this.dialogRef.close();
  }

  paymentForm: FormGroup = this.fb.group({
    vendor: ['', Validators.required],
    material: ['', Validators.required],
    payment_id: ['', Validators.required],
    payment_toPay: [{value: '', disabled: true}, Validators.required],
    balance_payment: [{value: '', disabled: true}, Validators.required],
    payment: ['', Validators.required],
    payment_date: ['', Validators.required],
  });

  addPayments() {
    if(this.paymentForm.value.payment === "" || this.paymentForm.value.payment === undefined || 
      this.paymentForm.value.payment_date === "" || this.paymentForm.value.payment_date === undefined ) {
        this.alert_message = "Please Add Required Payment Details";
        this.openAlert(this.alert_message);
    } else {
      this.paymentForm.value.payment_id = this.selected_payments.payment_id;
      this.paymentForm.value.payment_toPay = this.selected_payments.payment_toPay;
      this.paymentForm.value.balance_payment = this.selected_payments.payment_balance;
      this.paymentForm.value.vendor = this.selected_payments.vendor_id;
      this.paymentForm.value.material = this.selected_payments.material_id;
      this.service.addPayments(this.paymentForm.value)
      .subscribe(
        res => { 
          if(res == true) {
            this.alert_message = "Payment Added Successfully";
            this.openAlert(this.alert_message)
            this.dialogRef.close();
          } else if(res == null) {
            this.alert_message = "Added Payment is More than the Balance Payment";
            this.openAlert(this.alert_message);
            this.dialogRef.close();
          } else {
            this.alert_message = "Payment Not Added";
            this.openAlert(this.alert_message)
          }
          this.paymentForm.reset();
        }
      )
    }
  }

  openAlert(alert_message) {
    const alertConfig = new MatDialogConfig();

    alertConfig.autoFocus = true;
    alertConfig.width = '40%';

    alertConfig.data = {
      message: alert_message,
    };

    const alertRef = this.dialog.open(AlertComponent, alertConfig);

    alertRef.afterClosed().subscribe()
  }

}
