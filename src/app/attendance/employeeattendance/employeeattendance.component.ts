import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { FormControl } from '@angular/forms';
import { appConfig } from '../../app.config';

@Component({
  selector: 'app-employeeattendance',
  templateUrl: './employeeattendance.component.html',
  styleUrls: ['./employeeattendance.component.css']
})
export class EmployeeattendanceComponent implements OnInit {

  constructor(private service: ServicesService, private fb: FormBuilder, public dialog: MatDialog) { }

  current_date;
  current_day;
  current_month;
  current_year;

  private url = appConfig.apiUrl;

  ngOnInit() {
    this.getEmployees();
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
  }

  attendance = [];
  employees = [];
  all_employees = [];
  dateValue:boolean = false;

  alert_message: string;
  i;

  showEmployeeTypeList: boolean = false;
  employee_type = 'teaching';
  // date = new FormControl(new Date);
  date;

  employeeForm: FormGroup = this.fb.group({
    employee_type: ['', Validators.required],
    date: [''],
  });

  getDate() {
    this.current_date = new Date(this.date);
    this.current_month = this.current_date.getMonth() + 1;
    if(this.current_month < 10) {
      this.current_month = '0' + this.current_month;
    }
    this.current_day = this.current_date.getDate();
    if(this.current_day < 10) {
      this.current_day = '0' + this.current_day;
    }
    this.current_year = this.current_date.getFullYear();
    this.current_date = this.current_year + '-' + this.current_month + '-' + this.current_day;
    console.log(this.current_date)
  }

  getEmployees() {
    this.service.getEmployees()
      .subscribe(
        res => { this.all_employees = res.employee, this.get_selectedemployees(), console.log(this.all_employees) }
      )
  }

  get_selectedemployees() {   
    if(this.employee_type == undefined || this.employee_type == '') {
      this.alert_message = "Please Select Employee Type";
      this.openAlert(this.alert_message)
    } else {
      if(this.employee_type === "teaching") {
        this.employees = this.all_employees.filter(emp => emp.job_category === "teaching");
      } else if(this.employee_type === "non-teaching") {
        this.employees = this.all_employees.filter(emp => emp.job_category === "non-teaching");
      } else if(this.employee_type === "administrative") {
        this.employees = this.all_employees.filter(emp => emp.job_category === "administrative");
      } else {
        this.employees = this.all_employees;
      }
    }
  }

  submit(i, status) {
    this.employees[i].status = status;
  }

  allAttendance(status) {
    console.log(status)
    if(this.employees.length > 0) {
      for(this.i = 0; this.i < this.employees.length; this.i++) {
        this.employees[this.i].status = status;
      }
    } else {
      this.alert_message = "No Employees selected";
      this.openAlert(this.alert_message)
    }
  }

  addEmployeeAttendance() { 
    if(this.employee_type == undefined || this.employee_type == '') {
      this.alert_message = "Please Select the Employee Category";
      this.openAlert(this.alert_message)
    } else if(this.employees[0].status == 1) {
      this.alert_message = "Please Select Attendance Status";
      this.openAlert(this.alert_message)
    } else {
      console.log(this.current_date)
      this.service.addEmployeeAttendance(this.employees, this.current_date)
      .subscribe(
        res => {
          if (res == true) {
            this.alert_message = "Attendance Submitted";
            this.openAlert(this.alert_message)
          } else if(res == null) {
            this.alert_message = "Attendance Already taken";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Attendance Not Submitted";
            this.openAlert(this.alert_message)
          }
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
