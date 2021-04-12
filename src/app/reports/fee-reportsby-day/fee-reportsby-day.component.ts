import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-fee-reportsby-day',
  templateUrl: './fee-reportsby-day.component.html',
  styleUrls: ['./fee-reportsby-day.component.css']
})
export class FeeReportsbyDayComponent implements OnInit {

  constructor(private service: ServicesService, public dialog: MatDialog) {}

  ngOnInit() {
  }
  
  day_fees = [];
  select_date:string;
  alert_message: string;

  getDay_fee() {
    if(this.select_date == undefined || this.select_date == '') {
      this.alert_message = "Please Select Date";
      this.openAlert(this.alert_message)
    } else {
      this.service.getDay_fee(this.select_date)
        .subscribe(
          res => { 
            this.day_fees = res.fee, 
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
