import { Component, OnInit, Inject } from '@angular/core';
import { AssignmentsService } from '../../_services/assignments.service';
import { AcademicsService } from '../../_services/academics.service';
import { TeacherService } from '../../_services/teacher.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../../_models/user';

@Component({
  selector: 'app-assign-assignments',
  templateUrl: './assign-assignments.component.html',
  styleUrls: ['./assign-assignments.component.css']
})
export class AssignAssignmentsComponent implements OnInit {

  user;
  class: string;
  section: string;
  employee_id;

  assignment: any = {
    assignment_id: '',
    assignment_title: '',
    subject_id: '',
    subject_name: '',
    lession_id: '',
    chapter_name: '',
    assign_date: '',
    due_date: '',
    maxMarks: '',
    description: '',
  }
  dialog_type: string;
  alert_message: string;

  subjects = [];
  chapters = [];

  constructor(
    private service: AssignmentsService,
    private academicsservice: AcademicsService,
    private teacherService: TeacherService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AssignAssignmentsComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.class = data.class;
    this.section = data.section;
    this.assignment = data.assignment;
    this.dialog_type = data.dialog_type;
  }

  assignmentForm: FormGroup = this.fb.group({
    assignment_id: '',
    assignment_title: ['', Validators.required],
    subject_id: ['', Validators.required],
    lession_id: ['', Validators.required],
    maxMarks: ['', Validators.required],
    assign_date: ['', Validators.required],
    due_date: ['', Validators.required],
    description: ['', Validators.required],
  });

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if(this.user.role === 'teacher') {
      this.employee_id = this.user.employee_id;
    }
    this.getSubjects();
    console.log(this.assignment)
    console.log(this.subjects)
    this.assignmentForm.patchValue({
      assignment_id: this.assignment.assignment_id,
      assignment_title: this.assignment.assignment_title,
      subject_id: this.assignment.subject_id,
      lession_id: this.assignment.lession_id,
      maxMarks: this.assignment.maxMarks,
      assign_date: this.assignment.assign_date,
      due_date: this.assignment.due_date,
      description: this.assignment.description,
    });
  }

  getSubjects() {
    if(this.user.role === 'admin') {
      this.academicsservice.getSubjects(this.section)
      .subscribe(
        res => { this.subjects = res.subjects, this.getChapters(), console.log(res) }
      )
    } else if(this.user.role === 'teacher') {
      this.teacherService.getTeacherSubjects(this.employee_id, this.section)
      .subscribe(
        res => { this.subjects = res.subjects, this.getChapters(), console.log(res) }
      )
    }
  }

  getChapters() {
    this.academicsservice.getChapters(this.assignmentForm.value.subject_id)
      .subscribe(
        res => { this.chapters = res.chapters, console.log(res) }
      )
  }

  close() {
    this.dialogRef.close();
  }

  assignAssignment() {
    this.assignmentForm.value.assignment_id = this.assignment.assignment_id;
    if (this.section == undefined) {
      this.alert_message = "Please Select Class and Section";
      this.openAlert(this.alert_message)
    } else if(this.assignmentForm.value.assignment_title === '' || this.assignmentForm.value.assignment_title === undefined ||
      this.assignmentForm.value.assign_date === ''|| this.assignmentForm.value.assign_date === undefined ||
      this.assignmentForm.value.due_date === '' || this.assignmentForm.value.due_date === undefined) {
      this.alert_message = "Please Enter All Details";
      this.openAlert(this.alert_message)
    } else {
      if(this.assignment.maxMarks === '' || this.assignment.maxMarks === undefined) {
        this.assignment.maxMarks = 0;
      }
      if (this.dialog_type == 'add') {
        this.service.addAssignment(this.assignmentForm.value, this.section)
          .subscribe(
            res => {
              this.dialogRef.close();
              if (res == true) {
                this.alert_message = "Assignment Added Successfully";
                this.openAlert(this.alert_message)
              } else {
                this.alert_message = "Assignment Not added";
                this.openAlert(this.alert_message)
              }
            }
          )
      } else if (this.dialog_type == 'edit') {
        this.service.editAssignment(this.assignmentForm.value, this.assignment.assignment_id)
          .subscribe(
            res => {
              this.dialogRef.close();
              if (res == true) {
                this.alert_message = "Assignment Edited Successfully";
                this.openAlert(this.alert_message)
              } else {
                this.alert_message = "Assignment Not Edited";
                this.openAlert(this.alert_message)
              }
            }
          )
      }
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
