import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { StudentsService } from '../../_services/students.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { appConfig } from '../../app.config';

import { User } from '../../_models/user';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  constructor(private service: ServicesService, private studentservice: StudentsService, private route: ActivatedRoute, public dialog: MatDialog) { }

  user: User;
  student_details: any = {};
  profileImage;

  private url = appConfig.apiUrl;
  student_id = this.route.snapshot.paramMap.get('id');
  section_id = this.route.snapshot.paramMap.get('sec_id');

  currentDate = new Date();
  currentYear = this.currentDate.getFullYear();
  selected_month: any = {month: '', value: ''};
  months = [{ 'month': 'January', 'value': '1' }, { 'month': 'February', 'value': '2' }, { 'month': 'March', 'value': '3' }, { 'month': 'April', 'value': '4' }, { 'month': 'May', 'value': '5' }, { 'month': 'June', 'value': '6' }, { 'month': 'July', 'value': '7' }, { 'month': 'August', 'value': '8' }, { 'month': 'September', 'value': '9' }, { 'month': 'October', 'value': '10' }, { 'month': 'November', 'value': '11' }, { 'month': 'December', 'value': '12' }]
  showMonthList: boolean = false;
  currentMonth = this.selected_month.value;
  days: Number = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
  dummy_days = new Date(this.currentYear, this.selected_month.value + 1, 1).getDay();
  alert_message: string;
  attendance = [];
  attendance_data = {};
  j;

  daylist = [];
  chunked_data = [];
  dayslist = [];

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.selected_month = this.months[new Date().getMonth()];
    this.getstudentMonthAttendance()
  }

  chunk(array, size) {
    this.dayslist = [];
    for(this.j = 0; this.j < this.dummy_days; this.j++) {
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

  getstudentMonthAttendance() {
    if (this.student_id == undefined || this.student_id == '') {
      this.alert_message = "Please Select the Student";
      this.openAlert(this.alert_message)
    } else {
      this.dummy_days = new Date(this.currentYear, this.selected_month.value + 1, 1).getDay();
      this.service.getStudentAttendance(this.selected_month.value, this.student_id)
        .subscribe(
          res => { this.attendance = res.attendance, this.attendance_data = res, this.chunk(this.attendance, 7), console.log(res) }
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
