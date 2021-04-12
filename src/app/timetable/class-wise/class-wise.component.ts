import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { AddtimetableComponent } from '../addtimetable/addtimetable.component';
import { User } from '../../_models/user';
import { appConfig } from '../../app.config';

@Component({
  selector: 'app-class-wise',
  templateUrl: './class-wise.component.html',
  styleUrls: ['./class-wise.component.css']
})
export class ClassWiseComponent implements OnInit {

  constructor(private service: ServicesService, private fb: FormBuilder, public dialog: MatDialog) { }
        
  user: User;
  dialog_type: string;
  submit_type: string;

  private url = appConfig.apiUrl;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if (this.user.role === 'parent') {
      console.log(this.user.users[0].section_id)
      this.selected_section = this.user.users[0].section_id;
      this.getTimetable();
    }
    this.getTimings();
    console.log(this.user.role)
  }

  timetableForm: FormGroup = this.fb.group({
    subject_id: ['', Validators.required],
    teacher_id: ['', Validators.required],
    day: ['', Validators.required],
    session_id: ['', Validators.required],
    start_time: ['', Validators.required],
    end_time: ['', Validators.required],
  });

  timetable: any = [];
  subjects = [];
  teachers = [];
  timings = [];
  days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

  selected_class:string;
  selected_section:string;
  selected_schedule: any;
  selected_session: any = {session_id: '', session: '', start_time: '', end_time: ''};

  alert_message: string;

  receiveClass($event) {
    this.selected_class = $event
    console.log(this.selected_class)
  }

  receiveSection($event) {
    this.selected_section = $event
    console.log(this.selected_section)
    this.getTimetable();
  }

  getTimings() {
    this.service.getTimings()
      .subscribe(
        res => { this.timings = res, console.log(res) }
      )
  }

  getTime() {
    this.timetableForm.value.start_time = this.timings.filter(time => time.session_id == this.timetableForm.value.session_id)[0].start_time;
    console.log(this.timetableForm.value.start_time)
    this.timetableForm.value.end_time = this.timings.filter(time => time.session_id == this.timetableForm.value.session_id)[0].end_time;
    console.log(this.timetableForm.value.end_time)
  }

  getTimetable() {
    if(this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class and Section";
      this.openAlert(this.alert_message)
    } else {
      this.service.getTimetable(this.selected_section)
      .subscribe(
        res => { this.timetable = res, console.log(res) }
      )
    }
  }

  filtered_timetable(day, time) {
    this.timetable.filter(x => x.day == day && x.start_time == time);
  }

  addTimetable() {
    if(this.selected_section == undefined || this.selected_section == ''){
      this.alert_message = "Please Select Class and Section";
      this.openAlert(this.alert_message)
    } else {
      console.log(this.selected_section);
      this.service.addTimetable(this.timetableForm.value, this.selected_section)
      .subscribe(
        res => { console.log(res) }
      )
    }    
  }

  deleteSchedule(id){
   console.log("delete schedule********");
   console.log(id);

   this.service.deleteSchedule(id,this.selected_section)
      .subscribe(
        res => { console.log(res),
          this.alert_message = "Your Schedule is Deleted Successfully";
          this.openAlert(this.alert_message),
          this.getTimetable(); }
      )
  }

  markHoliday(i, j) {
    this.timetableForm.value.day = this.timetable[i].schedule[j].day;
    this.timetableForm.value.session_id = this.timetable[i].session_id;
    this.timetableForm.value.start_time = this.timetable[i].start_time;
    this.timetableForm.value.end_time = this.timetable[i].end_time;
    this.timetableForm.value.room_no = 'Holiday';
    this.addTimetable();
  }

  addSchedule(i, j) {
    this.selected_schedule = this.timetable[i].schedule[j];
    this.selected_schedule.start_time = this.timetable[i].start_time;
    this.selected_schedule.end_time = this.timetable[i].end_time;
    this.selected_schedule.session_id = this.timetable[i].session_id;
    console.log(this.selected_schedule)
    this.dialog_type = 'subject';
    this.submit_type = 'add';
    this.openDialog(this.dialog_type, this.submit_type)
  }

  addtimeslot() {
    this.selected_session = '';
    this.dialog_type = 'timeslot';
    this.submit_type = 'add';
    this.openDialog(this.dialog_type, this.submit_type)
  }

  editTimeslot(i) {
    console.log(i)
    console.log(this.timetable[i].session)
    this.selected_session.session = this.timetable[i].session;
    this.selected_session.session_id = this.timetable[i].session_id;
    this.selected_session.start_time = this.timetable[i].start_time;
    this.selected_session.end_time = this.timetable[i].end_time;
    this.dialog_type = 'timeslot';
    this.submit_type = 'edit';
    this.openDialog(this.dialog_type, this.submit_type)
  }

  openDialog(dialog_type, submit_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      selected_class: this.selected_class,
      selected_section: this.selected_section,
      selected_schedule: this.selected_schedule,
      selected_session: this.selected_session,
      dialog_type: dialog_type,
      submit_type: submit_type,
    };

    const dialogRef = this.dialog.open(AddtimetableComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        this.getTimetable();   
      }
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

    alertRef.afterClosed().subscribe()
  }

}
