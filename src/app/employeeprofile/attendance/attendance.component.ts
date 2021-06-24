import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  constructor(private service: ServicesService, private route: ActivatedRoute, public dialog: MatDialog) { }

  employee_id = this.route.snapshot.paramMap.get('id');

  
  selected_month: any = {'month': '', 'value': ''};
  months = [{ 'month': 'January', 'value': 1 }, { 'month': 'February', 'value': 2 }, { 'month': 'March', 'value': 3 }, { 'month': 'April', 'value': 4 }, { 'month': 'May', 'value': 5 }, { 'month': 'June', 'value': 6 }, { 'month': 'July', 'value': 7 }, { 'month': 'August', 'value': 8 }, { 'month': 'September', 'value': 9 }, { 'month': 'October', 'value': 10 }, { 'month': 'November', 'value': 11 }, { 'month': 'December', 'value': 12 }]
  
  ngOnInit() {
    this.selected_month = this.months[new Date().getMonth()]
    this.getEmployeeMonthlyAttendance();
  }

  showMonthList: boolean = false;
  currentDate = new Date();
  currentYear = this.currentDate.getFullYear();
  currentMonth = this.selected_month.value;
  days: Number = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
  dummy_days = new Date(this.currentYear, this.selected_month.value + 1, 1).getDay();
  alert_message: string;
  attendance: any = [];
  attendance_data:any = {};

  daylist:any = [];
  chunked_data:any = [];
  dayslist:any = [];

  chunk(array, size) {
    this.dayslist = [];
    for(let j = 0; j < this.dummy_days; j++) {
      this.attendance.unshift({
        day: '',
        status: '',
      })
    }
    for (let i = 0; i < array.length; i += size) {
      this.chunked_data = array.slice(i, i+size);
      this.dayslist.push(this.chunked_data);
    }
    console.log(this.dayslist)
  }

  getEmployeeMonthlyAttendance() {
    console.log(this.selected_month)
    if (this.employee_id == undefined || this.employee_id == '') {
      this.alert_message = "Please Select the Employee";
      this.openAlert(this.alert_message)
    } else {
        this.service.getEmployeeMonthlyAttendance(this.selected_month.value, this.employee_id)
          .subscribe(
            res => { this.attendance = res.attendance, this.attendance_data = res, this.chunk(this.attendance, 7), console.log(this.attendance) }
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