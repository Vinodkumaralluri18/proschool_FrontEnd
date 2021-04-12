import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-emp-reports',
  templateUrl: './emp-reports.component.html',
  styleUrls: ['./emp-reports.component.css']
})
export class EmpReportsComponent implements OnInit {

  constructor(private service: ServicesService, public dialog: MatDialog) { }

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  current_date;
  current_day;
  current_month;
  current_year;

  ngOnInit() {
    var d = new Date();
    this.current_month = d.getMonth() + 1;
    if(this.current_month < 10) {
      this.current_month = '0' + this.current_month;
    }
    this.current_day = d.getDate();
    if(this.current_day < 10) {
      this.current_day = '0' + this.current_day;
    }
    this.current_year = d.getFullYear();
    this.current_date = this.current_year + '-' + this.current_month + '-' + this.current_day;
    this.date = this.current_date;
    this.category = 'teaching';
    this.getEmployeeAttendance();
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

  attendance:any = {
    present: '',
    absent: '',
    onleave: '',
    employeeAttendence: '',
    count: '',
  };
  attendanceRange = [];
  showEmployeeTypeList: boolean = false;
  chart = [];
  category;
  date;
  end_date;
  attenBy_date: boolean = true;
  alert_message: string;

  selectreport(select) {
    if(select === 'date') {
      this.attenBy_date = true;
    } else if(select === 'range') {
      this.attenBy_date = false;
    } else if(select === 'none') {
      this.getAttendance();
    }
  }

  getAttendance() {
    if(this.attenBy_date === true) {
      this.getEmployeeAttendance();
    } else if(this.attenBy_date === false) {
      this.getRangeAttendance();
    }
  }

  getEmployeeAttendance() {
    if(this.category == undefined || this.date == undefined || this.category == '' || this.date == '') {
      this.alert_message = "Please Select the Category and Date";
      this.openAlert(this.alert_message)
    } else {
      this.service.getEmployeeAttendance(this.category ,this.date)
      .subscribe(
        res => { 
          if(res.count === 0) {
            this.attendance = {employeeAttendence: []},
            this.alert_message = "Attendance Not Yet Taken";
            this.openAlert(this.alert_message)
          } else {
            this.attendance = res, 
            this.pageNo = 1,
            this.page_start = 0,
            this.pages = Math.ceil(this.attendance.employeeAttendence.length / 10),
            console.log(res)
          } 
        }
      )
    }
  }

  getRangeAttendance() {
    if(this.category == undefined || this.category == '') {
      this.alert_message = "Please Select the Employee";
      this.openAlert(this.alert_message)
    } else {
      this.service.getEmployeeRangeAttendance(this.category, this.date, this.end_date)
      .subscribe(
        res => { 
          this.attendanceRange = res, 
          this.pageNo = 1,
          this.page_start = 0,
          this.pages = Math.ceil(this.attendanceRange.length / 10),
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
