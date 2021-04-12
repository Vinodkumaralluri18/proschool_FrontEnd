import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../services.service';
import { FeeService } from '../../_services/fee.service';
import { StudentsService } from '../../_services/students.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { AddfeeComponent } from '../addfee/addfee.component';
import { EditfeeComponent } from '../editfee/editfee.component';
import { ListPaymentsComponent } from '../list-payments/list-payments.component';
import { Location } from '@angular/common'
import { User } from '../../_models/user';

@Component({
  selector: 'app-collectfee',
  templateUrl: './collectfee.component.html',
  styleUrls: ['./collectfee.component.css']
})
export class CollectfeeComponent implements OnInit {

  constructor(private service: ServicesService, private feeservice: FeeService, private studentservice: StudentsService, private route: ActivatedRoute, private fb: FormBuilder, public dialog: MatDialog, private location: Location) {}

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  collect:boolean;        
  user: User;
  showStudentList: boolean = false;

  student_id = this.route.snapshot.paramMap.get('student_id');

  selected_class:string;
  selected_section:string;
  selected_student: any = {};
  dialog_type: string;
  alert_message: string;

  pageChange(x) {
    this.pageNo = x;
    this.page_start = (x - 1) * 10;
  } 

  students = [];
  collected_fee:any = [];
  studentFee:any = {};
  fee_types = [];
  selected_payments = [];

  // receiveClass($event) {
  //   this.selected_class = $event;
  //   console.log(this.selected_class)
  // }

  // receiveSection($event) {
  //   this.selected_section = $event
  //   console.log(this.selected_section)
  //   this.getStudents();
  // }

  // getStudents() {
  //   if(this.selected_section == undefined || this.selected_section == '') {
  //     this.alert_message = "Please Select Class and Section";
  //     this.openAlert(this.alert_message)
  //   } else {
  //     this.service.getStudents(this.selected_section)
  //     .subscribe(
  //       res => { 
  //         this.students = res.students.filter(data => data.status === 1), 

  //         this.getCollectedFee()
  //       }
  //     )
  //   }
  // }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getFeeTypes();
    this.selected_student.student_id = this.student_id;
    console.log(this.selected_student);
    this.getCollectedFee();
  }

  getStudentDetails() {
    if(this.student_id == undefined || this.student_id == '') {
      this.alert_message = "Please Select Student";
      this.openAlert(this.alert_message)
    } else {
      this.studentservice.getStudentDetails(this.student_id)
      .subscribe(
        res => { 
          this.selected_student = res.students[0],
          this.getCollectedFee()
        }
      )
    }
  }

  getCollectedFee() {
    this.service.getCollectedFee(this.selected_student.student_id)
    .subscribe(
      res => { 
        if(res.StudentFeeDetails.length > 0) {
          this.collected_fee = res.StudentFeeDetails, 
          this.pages = Math.ceil(this.collected_fee.length / 10);
          console.log(this.collected_fee) 
        } else {
          this.openAlert('No Student Fees are Available');
        }
      }
    )
  }

  getFeeTypes() {
    this.service.getFeeTypes()
      .subscribe(
        res => { this.fee_types = res.fee_type, console.log(res) }
      )
  }

  addCollectedFee(i, fee_types_id, fee) {
    if (this.selected_student.student_id == undefined || this.selected_student.student_id == '') {
      this.alert_message = "Please Select Class, Section and Student";
      this.openAlert(this.alert_message)
    } else if(this.collected_fee[i].total_fee === null || this.collected_fee[i].balance_fee === null || this.collected_fee[i].discount === null) {
      this.alert_message = "Student Fee Structure is not valid";
      this.openAlert(this.alert_message)
    } else { 
      this.dialog_type = 'add';
      this.studentFee = this.collected_fee[i];
      this.openDialog(this.studentFee, fee, fee_types_id, this.dialog_type)
    }
  }

  addStudentFee() {
    if (this.selected_student.student_id == undefined || this.selected_student.student_id == '') {
      this.alert_message = "Please Select Class, Section and Student";
      this.openAlert(this.alert_message)
    } else { 
      this.dialog_type = 'add';
      this.studentFee = {class_id: this.collected_fee[0].class_id, student_id: this.collected_fee[0].student_id, installment_type: this.collected_fee[0].installment_type}
      this.studentFee_dialog(this.studentFee, this.dialog_type)
    }
  }

  editStudentFee(studentFee_id) {
    if (this.selected_student.student_id == undefined || this.selected_student.student_id == '') {
      this.alert_message = "Please Select Class, Section and Student";
      this.openAlert(this.alert_message)
    } else { 
      this.dialog_type = 'edit';
      this.studentFee = this.collected_fee.filter(data => data.studentFee_id === studentFee_id)[0]
      this.studentFee_dialog(this.studentFee, this.dialog_type)
    }
  }

  deleteStudentFee(studentFee_id) {
    this.feeservice.deleteStudentFee(studentFee_id)
    .subscribe(
      res => { 
        if(res == true) {
          this.alert_message = "StudentFee Deleted Successfully";
          this.openAlert(this.alert_message);
          this.getCollectedFee();
        } else {
          this.alert_message = "StudentFee Not Deleted";
          this.openAlert(this.alert_message)
        }
      }
    )
  }

  openDialog(studentFee, fee, fee_types_id, dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      student_fee: studentFee,
      fee: fee,
      fee_types_id: fee_types_id,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(AddfeeComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data)
        this.getCollectedFee();
      }
    );

  }

  studentFee_dialog(studentFee, submit_type): void {

    const std_dialogConfig = new MatDialogConfig();

    std_dialogConfig.autoFocus = true;
    std_dialogConfig.width = '40%';

    std_dialogConfig.data = {
      student_fee: studentFee,
      dialog_type: 'StudentFee',
      submit_type: submit_type,
    };

    const dialogRef = this.dialog.open(EditfeeComponent, std_dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data)
        this.getCollectedFee();
      }
    );

  }

  viewPayments(fee_types_id) {
    this.selected_payments = this.collected_fee.filter(data => data.fee_types_id === fee_types_id)[0];
    this.openPayments(this.selected_payments)
  }

  openPayments(FeePayments): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';

    dialogConfig.data = {
      FeePayments: FeePayments,
    };

    const dialogRef = this.dialog.open(ListPaymentsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {}
    );
    
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
        this.location.back()
      }
    )
  }

}
