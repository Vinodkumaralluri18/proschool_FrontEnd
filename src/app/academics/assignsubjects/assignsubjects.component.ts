import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { AcademicsService } from '../../_services/academics.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../_models/user';

@Component({
  selector: 'app-assignsubjects',
  templateUrl: './assignsubjects.component.html',
  styleUrls: ['./assignsubjects.component.css']
})
export class AssignsubjectsComponent implements OnInit {

  constructor(private service: ServicesService, private academicservice: AcademicsService, private fb: FormBuilder, public dialog: MatDialog) {}
    
  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  user: User;
  
  ngOnInit() {
    this.getEmployees();
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if(this.user.role === 'parent') {
      console.log(this.user.users[0].section_id)
      this.selected_section = this.user.users[0].section_id;
      this.getTeachers();
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

  assigned_teachers = [];
  teachers = [];
  subjects = [];
  alert_message: string;

  teachersForm: FormGroup = this.fb.group({
    subject_id: [''],
    teacher_id: [''],
  });

  selected_class:string;
  selected_section:string;
  teacher_name:string;
  selected_subject:string;
  selected_teacher:string;
  i;j;

  receiveClass($event) {
    this.selected_class = $event
    console.log(this.selected_class)
  }

  receiveSection($event) {
    this.selected_section = $event
    console.log(this.selected_section)
    this.getTeachers();
    this.getSubjects();
  }

  getEmployees() {
    this.service.getEmployees()
      .subscribe(
        res => { this.teachers = res.employee.filter(res => res.job_category == "teaching"), console.log(res) }
      )
  }

  getTeachers() {
    if(this.selected_section == undefined) {
      this.alert_message = 'Please Select the Class and Section';
      this.openAlert(this.alert_message, false)
    } else {
      this.academicservice.getTeachers(this.selected_section)
      .subscribe(
        res => { 
          this.assigned_teachers = res.teachers, 
          this.pageNo = 1,
          this.page_start = 0,
          this.pages = Math.ceil(this.assigned_teachers.length / 10),
          console.log(res) 
        }
      )
    }
  }

  getSubjects() {
    if(this.selected_class === '' || this.selected_section === '') {
      this.alert_message = 'Please Select the Class and Section';
      this.openAlert(this.alert_message, false)
    } else {
      this.academicservice.getSubjects(this.selected_section)
      .subscribe(
        res => { this.subjects = res.subjects, console.log(res) }
      )
    }
  }

  assignTeachers() {
    console.log(this.teachersForm.value)
    if(this.selected_section == undefined){
      this.alert_message = 'Please Select the Class and Section';
      this.openAlert(this.alert_message, false)
    } else if(this.teachersForm.value.subject_id == "" || this.teachersForm.value.subject_id == undefined ||
              this.teachersForm.value.teacher_id == "" || this.teachersForm.value.teacher_id == undefined ){
      this.alert_message = 'Please Select the Subject and the Teacher';
      this.openAlert(this.alert_message, false)
    } else {
      // this.teacher_name = this.teachers.filter( tch => tch.employee_id === this.teachersForm.value.teacher_id)[0].first_name;
      this.academicservice.assignTeachers(this.teachersForm.value, this.selected_section)
        .subscribe(
          res => { 
            if(res == true) {
              this.getTeachers();
              // this.collection.assigned_teachers.filter( sub => sub.subject_id === this.teachersForm.value.subject_id)[0].teachers.push({teacher_name: this.teacher_name})
              this.alert_message = 'Teacher Assigned Successfully to the Subject';
              this.openAlert(this.alert_message, false)
            } else {
              this.alert_message = 'Teacher Not Assigned';
              this.openAlert(this.alert_message, false)
            }
          }
        )
    }    
  }

  deleteConfirmation(teacher_id, subject_id, i, j) {
    this.selected_teacher = teacher_id;
    this.selected_subject = subject_id;
    this.i = i;
    this.j = j;
    this.openAlert("Are you sure to Unassign teacher from the subject", true)
  }

  deleteAssignsubject() {
    this.academicservice.deleteAssignsubject(this.selected_teacher, this.selected_subject)
      .subscribe(
        res => { 
          if(res == true) {
            this.assigned_teachers[this.i].teachers = this.assigned_teachers[this.i].teachers.filter( res => res.teacher_id !== this.selected_teacher);
            this.alert_message = 'Teacher Successfully Unassigned from the Subject';
            this.openAlert(this.alert_message, false)
          } else {
            this.alert_message = 'Teacher Not Unassigned from the Subject';
            this.openAlert(this.alert_message, false)
          }
        }
      )
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
          this.deleteAssignsubject();
        }
      }
    )
  }

}
