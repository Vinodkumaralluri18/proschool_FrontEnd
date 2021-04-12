import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-fee-reportsby-month',
  templateUrl: './fee-reportsby-month.component.html',
  styleUrls: ['./fee-reportsby-month.component.css']
})
export class FeeReportsbyMonthComponent implements OnInit {

  constructor(private service: ServicesService, public dialog: MatDialog) {}

  ngOnInit() {
  }
  
  month_fees = [];
  months = [{'month': 'January', 'value': '01'}, {'month': 'February', 'value': '02'}, {'month': 'March', 'value': '03'}, {'month': 'April', 'value': '04'}, {'month': 'May', 'value': '05'}, {'month': 'June', 'value': '06'}, {'month': 'July', 'value': '07'}, {'month': 'August', 'value': '08'}, {'month': 'September', 'value': '09'}, {'month': 'October', 'value': '10'}, {'month': 'November', 'value': '11'}, {'month': 'December', 'value': '12'}]
  select_month;
  alert_message: string;

  getMonth_fee() {
    if(this.select_month == undefined || this.select_month == '') {
      this.alert_message = "Please Select Month";
      this.openAlert(this.alert_message)
    } else {
      console.log(this.select_month)
      this.service.getMonth_fee(this.select_month)
        .subscribe(
          res => { 
            this.month_fees = res.fee, 
            console.log(res)
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
