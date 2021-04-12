import { Component, OnInit, Inject } from '@angular/core';
import { StoreService } from '../../_services/store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-editpayments',
  templateUrl: './editpayments.component.html',
  styleUrls: ['./editpayments.component.css']
})
export class EditpaymentsComponent implements OnInit {

  payments = {
    payment_id: '',
    payment: '',
    payment_date: '',
  };

  paymentForm: FormGroup = this.fb.group({
    payment_id: '',
    payment: ['', Validators.required],
    payment_date: ['', Validators.required],
  });
  alert_message: string;

  constructor(
    private service: StoreService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<EditpaymentsComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.payments = data.selected_payment;
  }

  ngOnInit() {
    console.log(this.payments)
    this.paymentForm.value.payment_id = this.payments.payment_id;
  }

  close() {
    this.dialogRef.close();
  }

  editPayment() {
    console.log(this.paymentForm.value.payment_id)
    this.dialogRef.close(this.paymentForm.value);
    this.service.editPayments(this.paymentForm.value, this.payments.payment_id)
    .subscribe(
      res => { 
        if(res == true) {
          this.alert_message = "Payment Edited Successfully";
          this.openAlert(this.alert_message)
        } else {
          this.alert_message = "Payment Not Edited";
          this.openAlert(this.alert_message)
        }
      }
    )
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
