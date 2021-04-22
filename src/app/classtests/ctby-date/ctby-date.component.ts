import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../../_services/assignments.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { CTAssignComponent } from '../ctassign/ctassign.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-ctby-date',
  templateUrl: './ctby-date.component.html',
  styleUrls: ['./ctby-date.component.css']
})
export class CTbyDateComponent implements OnInit {

  constructor(private service: AssignmentsService, public dialog: MatDialog) {}

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  user: User;

  current_date;
  current_day;
  current_month;
  current_year;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
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
    this.selected_date = this.current_date;
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

  classTests = [];
  all_classTests = [];
  selected_date: Date;

  selected_class: string;
  selected_section: string;
  selected_subject: string;
  selected_classtest;
  dialog_type: string;
  alert_message: string;

  receiveClass($event) {
    this.selected_class = $event
    console.log(this.selected_class)
  }

  receiveSection($event) {
    this.selected_section = $event
    console.log(this.selected_section)
  }

  receiveSubject($event) {
    this.selected_subject = $event
    console.log(this.selected_subject)
    this.getClassTests_byDate();
  }

  getClassTests_byDate() {
    console.log(this.selected_subject);
    if (this.selected_subject == undefined || this.selected_subject == '') {
      this.alert_message = "Please Select Class, Section and Subject";
      this.openAlert(this.alert_message, false)
    } else {
      this.service.getClassTests_byDate(this.selected_section, this.selected_subject)
        .subscribe(
          res => { 
            this.all_classTests = this.classTests = res.classTests, 
            this.pageNo = 1,
            this.page_start = 0,
            this.pages = Math.ceil(this.classTests.length / 10),
            console.log(res) 
          }
        )
    }
  }

  CT_filterByDate() {
    console.log(this.selected_date)
    this.classTests = this.all_classTests.filter(ct => ct.date === this.selected_date);
    this.pageNo = 1;
    this.page_start = 0;
    this.pages = Math.ceil(this.classTests.length / 10);
  }

  deleteConfirmation(classTest_id) {
    this.selected_classtest = classTest_id;  
    this.openAlert("Are you sure to delete the Classtest", true)
  }

  deleteClasstest() {
    this.service.deleteClassTest(this.selected_classtest)
      .subscribe(
        res => { 
          if(res == true) {
            this.classTests = this.classTests.filter(res => res.classTest_id !== this.selected_classtest)
            this.alert_message = "ClassTest Deleted Successfully";
            this.openAlert(this.alert_message, false)
          } else {
            this.alert_message = "ClassTest Not Deleted";
            this.openAlert(this.alert_message, false)
          }
        }
      )
  }

  addClasstest() {
    if(this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class, Section and Subject";
      this.openAlert(this.alert_message, false)
    } else {
      this.selected_classtest = {
        classTest_id: '',
        section_id: '',
        subject_id: '',
        title: '',
        date: '',
        assign_date: '',
        maxMarks: '',
      };
      this.dialog_type = 'add';
      this.openDialog(this.selected_classtest, this.dialog_type)
    }
  }

  editClasstest(i) {
    this.selected_classtest = this.classTests[i];
    this.dialog_type = 'edit';
    this.openDialog(this.selected_classtest, this.dialog_type)
  }

  openDialog(selected_classtest, dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      class: this.selected_class,
      section: this.selected_section,
      subject: this.selected_subject,
      classtest: selected_classtest,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(CTAssignComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data)          
        if (this.dialog_type == 'add') {
          this.getClassTests_byDate();
        } else if (this.dialog_type == 'edit') {
          this.getClassTests_byDate();
        }
      }
    );
  }

  openAlert(alert_message, status) {
    const alertConfig = new MatDialogConfig();

    alertConfig.autoFocus = true;
    alertConfig.width = '40%';

    alertConfig.data = {
      message: alert_message,
      confirm_status: status,
    };

    const alertRef = this.dialog.open(AlertComponent, alertConfig);

    alertRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data)
        if(data === true) {
          this.deleteClasstest();
        }
      }
    )
  }

}
