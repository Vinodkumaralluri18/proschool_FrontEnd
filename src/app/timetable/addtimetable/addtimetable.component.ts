import { Component, OnInit, Inject } from '@angular/core';
import { ServicesService } from '../../services.service';
import { TimingsService } from '../../_services/timings.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-addtimetable',
  templateUrl: './addtimetable.component.html',
  styleUrls: ['./addtimetable.component.css']
})
export class AddtimetableComponent implements OnInit {

  subjects = [];
  teachers = [];
  selected_schedule;
  selected_class;
  selected_section;
  selected_subject;
  selected_teacher;
  selected_session;
  dialog_type: string;
  submit_type: string;
  alert_message: string;

  constructor(
    private service: ServicesService,
    private timingservice: TimingsService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AddtimetableComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.dialog_type = data.dialog_type;
    this.submit_type = data.submit_type;

    this.selected_class = data.selected_class;
    this.selected_section = data.selected_section;
    this.selected_schedule = data.selected_schedule;
    this.selected_session = data.selected_session;
  }

  timetableForm: FormGroup = this.fb.group({
    subject_id: ['', Validators.required],
    teacher_id: ['', Validators.required],
    day: ['', Validators.required],
    session_id: ['', Validators.required],
    start_time: ['', Validators.required],
    end_time: ['', Validators.required],
  });

  timingsForm: FormGroup = this.fb.group({
    class: '',
    section: '',
    session: ['', Validators.required],
    start_time: ['', Validators.required],
    end_time: ['', Validators.required],
  });

  ngOnInit() {
    this.getSubjects();
    if(this.dialog_type === 'subject') {
      this.timetableForm.patchValue({
        subject_id: '',
        teacher_id: '',
        day: this.selected_schedule.day,
        session_id: this.selected_schedule.session_id,
        start_time: this.selected_schedule.start_time,
        end_time: this.selected_schedule.end_time,
      })
    } else if(this.dialog_type === 'timeslot') {
      this.timingsForm.patchValue({
        class: this.selected_class,
        section: this.selected_section,
        session: this.selected_session.session,
        start_time: this.selected_session.start_time,
        end_time: this.selected_session.end_time
      });
    }
  }

  getSubjects() {
    if(this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class and Section";
      this.openAlert(this.alert_message)
    } else {
      this.service.getSubjects(this.selected_section)
      .subscribe(
        res => { this.subjects = res.subjects, console.log(res) }
      )
    }
  }

  getSubject_teachers() {
    if(this.selected_subject == undefined || this.selected_subject == '') {
      this.alert_message = "Please Select Subject";
      this.openAlert(this.alert_message)
    } else {
      this.service.getSubject_teachers(this.selected_subject)
      .subscribe(
        res => { this.teachers = res.teachers, console.log(res) }
      )
    }
  }

  getSelected_subject() {
    this.selected_subject = this.timetableForm.value.subject_id;
    this.getSubject_teachers();
  }

  getSelected_teacher(teacher_id) {
    this.timetableForm.value.teacher_id = teacher_id;
    this.timetableForm.value.subject_id = this.selected_subject;
  }

  submitTimetable() {
    if(this.submit_type === 'add') {
      if(this.selected_section == undefined || this.selected_section == ''){
        this.alert_message = "Please Select Class and Section";
        this.openAlert(this.alert_message)
      } else {
        if(this.timetableForm.value.subject_id === '' || this.timetableForm.value.subject_id === undefined) {
          this.alert_message = "Please Select the Subject";
          this.openAlert(this.alert_message);
        } else if(this.timetableForm.value.teacher_id === '' || this.timetableForm.value.teacher_id === undefined) {
          this.alert_message = "Please Select the Teacher";
          this.openAlert(this.alert_message);
        } else {
          this.service.addTimetable(this.timetableForm.value, this.selected_section)
          .subscribe(
            res => { 
              if(res == true) {
                this.alert_message = "Schedule Added Successfully";
                this.openAlert(this.alert_message);
                this.dialogRef.close();
              } else {
                this.alert_message = "Schedule Not Added";
                this.openAlert(this.alert_message);
              }
            }
          )
        }
      } 
    } else if(this.submit_type === 'edit') {

    }
  }

  submitTimings() {
    if(this.submit_type === 'add') {
      console.log(this.timingsForm.value);
      this.timingservice.addTimings(this.timingsForm.value)
      .subscribe(
        res => { 
          if(res == true) {
            this.alert_message = "Timing Added Successfully";
            this.openAlert(this.alert_message);
            this.dialogRef.close();
          } else {
            this.alert_message = "Timing Not Added";
            this.openAlert(this.alert_message)
          }
        }
      )
    } else if(this.submit_type === 'edit') {
      console.log(this.timingsForm.value);
      console.log(this.selected_session.session_id);
      this.timingservice.editTimings(this.timingsForm.value, this.selected_session.session_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.alert_message = "Timing Edited Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Timing Not Edited";
            this.openAlert(this.alert_message)
          }
        }
      )
    }
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
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
