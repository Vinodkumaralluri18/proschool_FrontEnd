import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { FeeService } from '../../_services/fee.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-studentfee-reports',
  templateUrl: './studentfee-reports.component.html',
  styleUrls: ['./studentfee-reports.component.css']
})
export class StudentfeeReportsComponent implements OnInit {

  constructor(private service: ServicesService, private feeservice: FeeService, public dialog: MatDialog) { }

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  user: User;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if(this.user.role === 'parent') {
      this.selected_student = this.user.users[0].student_id;
      this.selected_section = this.user.users[0].section_id;
      this.getStudent_fee();
    }
  }

  pageChange(x) {
    this.pageNo = x;
    this.page_start = (x - 1) * 10;
  } 

  students = [];
  student_fee = [{
    'TermwiseFee': []
  }];
  fee_terms = [];
  student_TermFee: any = [];
  showStudentList: boolean = false;
  showTermList: boolean = false;
  getTermFilter: boolean = false;
  getTypeFee: boolean = false;
  i; j;

  list: boolean = true;

  selected_class:string;
  selected_section:string;
  selected_student:any = {student_id: '', first_name: '', last_name: ''};
  selected_feeterm:any = {fee_term_id: '', fee_term: ''};
  alert_message: string;

  receiveClass($event) {
    this.selected_class = $event
    console.log(this.selected_class)
  }

  receiveSection($event) {
    this.selected_section = $event
    console.log(this.selected_section)
    this.getStudents();
  }

  getStudents() {
    if(this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class and Section";
      this.openAlert(this.alert_message)
    } else {
      this.service.getStudents(this.selected_section)
      .subscribe(
        res => { 
          this.students = res.students, 
          this.selected_student = this.students[0],
          console.log(res) 
        }
      )
    }
  }

  getStudent_fee() {
    if(this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class and Section";
      this.openAlert(this.alert_message)
    } else {
      this.service.getStudent_fee(this.selected_student.student_id, this.selected_class)
      .subscribe(
        res => { 
          this.student_fee = res.TermFeeDetails, 
          this.getTermFilter = true;
          this.getTypeFee = false;
          this.pages = Math.ceil(this.student_fee.length / 10),
          this.getFeeTerms(),
          console.log(res) 
        }
      )
    }
  }

  getFeeTerms() {
    this.feeservice.getFeeTerms()
      .subscribe(
        res => { this.fee_terms = res.fee_term, console.log(res) }
      )
  }

  getTerm_fee(fee_term_id) {
    if(this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class and Section";
      this.openAlert(this.alert_message)
    } else {
      this.service.getStudent_TermFee(this.selected_student.student_id, fee_term_id, this.selected_class)
      .subscribe(
        res => { 
          this.student_TermFee = res.TermFeeDetails[0].studentFeeDetails, 
          this.getTypeFee = true;
          this.pages = Math.ceil(this.student_fee.length / 10),
          console.log(this.student_TermFee) 
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
