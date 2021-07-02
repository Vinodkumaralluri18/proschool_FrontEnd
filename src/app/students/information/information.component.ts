import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../_services/students.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AdmissionComponent } from '../admission/admission.component';
import { AlertComponent } from '../../_alert/alert/alert.component';

import { User } from '../../_models/user';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  constructor(private service: StudentsService, public dialog: MatDialog) {}
    
  user: User;
  searchText = ''
  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  selected_student;
  fileData: File = null;
  dialog_type;
  
  selected_class: string;
  selected_section: string;
  status = 'active';
  all_students = [];
  students = [];

  showStatusList: boolean = false;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if(this.user.role === 'parent') {
      console.log(this.user.users[0].section_id)
      this.selected_section = this.user.users[0].section_id;
      this.getStudents();
    }
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
    if (this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class and Section";
      this.openAlert(this.alert_message, false)
    } else {
      this.service.getStudents(this.selected_section)
        .subscribe(
          res => { this.all_students = res.students, this.students = res.students, this.getStudentsByStatus(), console.log(res) }
        )
    }
  }

  getStudentsByStatus() {
    if(this.status === 'active') {
      this.students = this.all_students.filter(data => data.status === 1);
    } else if(this.status === 'inactive') {
      this.students = this.all_students.filter(data => data.status === 0)
    }   
    this.pageNo = 1,
    this.page_start = 0,
    this.pages = Math.ceil(this.students.length / 10)
  }

  deleteConfirmation(student_id) {
    this.selected_student = student_id;  
    this.openAlert("Are you sure to delete the Student", true)
  }

  deleteStudent() {
    this.service.deleteStudent(this.selected_student)
      .subscribe(
        res => { 
          if(res == true) {
            this.students.filter(res => res.student_id === this.selected_student)[0].status = 0;
            this.students = this.students.filter(res => res.student_id !== this.selected_student)
            this.alert_message = "Student Deleted Successfully";
            this.openAlert(this.alert_message, false)
          } else {
            this.alert_message = "Student Not Deleted";
            this.openAlert(this.alert_message, false)
          }
        }
      )
  }

  restoreStudent(student_id) {
    this.service.restoreStudent(student_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.students.filter(data => data.student_id === student_id)[0].status = 1;
            this.status = 'activated';
            this.getStudentsByStatus();
            this.alert_message = "Student Restored Successfully";
            this.openAlert(this.alert_message, false)
          } else {
            this.alert_message = "Student Not Restored";
            this.openAlert(this.alert_message, false)
          }
        }
      )
  }

  student_details = {};

  getStudentDetails() {
    this.service.getStudentDetails(this.student_id)
      .subscribe(res => { this.student_details = res.students[0], console.log(res) }
      )
  }

  student_id(student_id: any) {
    throw new Error("Method not implemented.");
  }

  studentsUpload(files: any){
    this.fileData = files[0];
    this.onSubmitFile();
  }

  onSubmitFile() {
    const formData = new FormData();
    formData.append('file', this.fileData);
    if (this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class and Section";
      this.openAlert(this.alert_message, false)
    } else {
      this.service.bulkStudentsUpload(formData, this.selected_section)
      .subscribe(
        res => { 
          console.log(res)
          if(res === true) {
            this.getStudents();
            this.alert_message = "Bulk Students Uploaded Successfully";
            this.openAlert(this.alert_message, false)
          } else if(res.data === "Students are already Added") {
            this.alert_message = "Students are already Added";
            this.openAlert(this.alert_message, false)
          } else {
            this.alert_message = "Bulk Students Not Uploaded";
            this.openAlert(this.alert_message, false)
          }
        }
      )
    }
  }

  addStudent() {
    this.selected_student = {};
    this.dialog_type = 'add';
    this.openDialog(this.selected_student, this.dialog_type)
  }

  
  editStudent(student_id) {
    this.selected_student = this.students.filter(data => data.student_id === student_id)[0];
    this.dialog_type = 'edit';
    this.openDialog(this.selected_student, this.dialog_type)
    this.getStudents();
  }

  openDialog(selected_student, dialog_type): void {

    let dialogConfig = new MatDialogConfig();

    dialogConfig = {
      autoFocus:true,
      width: '60vw',
      maxHeight: '100vh',
    };

    dialogConfig.data = {
      class: this.selected_class,
      section: this.selected_section,
      student: selected_student,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(AdmissionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(        
      data => {
        console.log("Dialog output:", data)
        this.getStudents();
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
          this.deleteStudent();
        }
      }
    )
  }

}