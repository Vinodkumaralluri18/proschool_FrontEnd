import { Component, OnInit, Inject } from '@angular/core';
import { FeeService } from '../../_services/fee.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-list-payments',
  templateUrl: './list-payments.component.html',
  styleUrls: ['./list-payments.component.css']
})
export class ListPaymentsComponent implements OnInit {

  alert_message: string;
  FeePayments:any = {};

  constructor(
    private feeservice: FeeService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<ListPaymentsComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.FeePayments = data.FeePayments;
    // if(data.FeePayments.payments.length > 0) {
    //   console.log(data.FeePayments.payments.length)
    //   this.openAlert('No Fee Payments are available for this Fee Type')
    //   this.close();
    // } else {
    //   this.FeePayments = data.FeePayments; 
    // }
  }

  ngOnInit() {
    console.log(this.FeePayments)
    if(this.FeePayments.payments.length > 0) {
      this.FeePayments = this.FeePayments; 
    } else {
      console.log(this.FeePayments.payments.length)
      this.openAlert('No Fee Payments are available for this Fee Type');
    }
  }

  close() {
    this.dialogRef.close();
  }

  deletePayment(i) {

  }

  openAlert(alert_message) {
    const alertConfig = new MatDialogConfig();

    alertConfig.autoFocus = true;
    alertConfig.width = '40%';

    alertConfig.data = {
      message: alert_message,
    };

    const alertRef = this.dialog.open(AlertComponent, alertConfig);

    alertRef.afterClosed().subscribe(
      data => {
        this.close()
      }
    )
  }

}
