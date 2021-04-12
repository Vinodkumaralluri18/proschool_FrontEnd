import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../services.service';
import { AssignmentsService } from '../../_services/assignments.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-ctaddmarks',
  templateUrl: './ctaddmarks.component.html',
  styleUrls: ['./ctaddmarks.component.css']
})
export class CTaddmarksComponent implements OnInit {

  constructor(private service: ServicesService, private assignmentservice: AssignmentsService, private fb: FormBuilder, private route: ActivatedRoute, public dialog: MatDialog) { }

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  user: User;

  section_id = this.route.snapshot.paramMap.get('sec_id');
  subject_id = this.route.snapshot.paramMap.get('sub_id');
  classtest_id = this.route.snapshot.paramMap.get('ct_id');
  data_type = this.route.snapshot.paramMap.get('data_type');

  pageChange(x) {
    this.pageNo = x;
    this.page_start = (x - 1) * 10;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if (this.data_type === 'add') {
      this.getStudents();
    } else if (this.data_type === 'view') {
      this.ctMarks();
    }
    this.getclassTestDetails();
  }

  classTest: any = [];
  ct_marks = [];
  students = [];

  selected_ct: string;
  alert_message: string;

  getclassTestDetails() {
    if (this.classtest_id == undefined || this.classtest_id == '') {
      this.alert_message = "Please Select Class Test";
      this.openAlert(this.alert_message)
    } else {
      this.classTest = [];
      this.assignmentservice.getClassTestDetails(this.classtest_id)
        .subscribe(
          res => {
            this.classTest = res.classTest,
            console.log(this.classTest)
          }
        )
    }
  }

  getStudents() {
    this.service.getStudents(this.section_id)
      .subscribe(
        res => {
          this.students = res.students.filter(std => std.status === 1),
          this.pages = Math.ceil(this.students.length / 10),
          console.log(this.students)
        }
      )
  }

  ctMarks() {
    if (this.classtest_id == undefined || this.classtest_id == '') {
      this.alert_message = "Please Select Class Test";
      this.openAlert(this.alert_message)
    } else {
      this.assignmentservice.getClassTest_marks(this.classtest_id, this.section_id)
        .subscribe(
          res => {
            this.students = res.CT_marks,
            this.pages = Math.ceil(this.students.length / 10),
            console.log(res)
          }
        )
    }
  }

  addClassTest_marks() {
    if (this.classtest_id == undefined || this.classtest_id == '') {
      this.alert_message = "Please Select Class Test";
      this.openAlert(this.alert_message)
    } else {
      var maxMarks = this.classTest[0].maxMarks;
      this.students.forEach(function (std) {
        if (!std.marks) {
          std.marks = null;
        } else if (std.marks > maxMarks) {
          std.marks = maxMarks;
        } else if (std.marks < 0) {
          std.marks = 0;
        }
      })
      this.assignmentservice.addClassTest_marks(this.students, this.section_id, this.subject_id, this.classtest_id)
        .subscribe(
          res => {
            if (res == true) {
              this.alert_message = 'Student Marks Added Successfully';
              this.openAlert(this.alert_message)
            } else {
              this.alert_message = 'Marks Not Added';
              this.openAlert(this.alert_message)
            }
          }
        )
    }
  }

  editMarks(classTest_result_id, marks) {
    var maxMarks = this.classTest[0].maxMarks;
    console.log(maxMarks)
    if (marks > maxMarks || marks < 0 || marks === null) {
      this.alert_message = 'Please Enter Valid Marks';
      this.openAlert(this.alert_message)
      this.students.filter(data => data.classTest_result_id === classTest_result_id)[0].marks = "";
    } else {
      this.assignmentservice.editClassTest_marks(classTest_result_id, marks)
        .subscribe(
          res => {
            if (res == true) {
              this.ctMarks();
              this.alert_message = 'Student Marks Edited Successfully';
              this.openAlert(this.alert_message)
            } else {
              this.alert_message = 'Marks Not Edited';
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
