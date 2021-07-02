import { Component, OnInit } from '@angular/core';
import { TimetableService } from '../../_services/timetable.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { EventlistsComponent } from '../../_alert/events/events.component';
import { AddeventComponent } from "../addevent/addevent.component";
import { User } from '../../_models/user';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(private service: TimetableService, private fb: FormBuilder, public dialog: MatDialog) { }
        
  user: User;
  Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  selected_event;

  currentDate = new Date();
  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();
  selectedMonth = this.currentMonth;
  selectedYear = this.currentYear;
  private monthNumber;
  public month = this.Months[this.currentMonth];
  public year = this.currentDate.getFullYear();
  private date = this.currentDate.getDate();
  days: Number = new Date(this.year, this.selectedMonth + 1, 0).getDate();
  dummy_days = new Date(this.year, this.selectedMonth, 1).getDay();
  i;j;
  getdate;
  daylist = [];
  chunked_data = [];
  dayslist = [];
  events = [];
  event_titles = [];
  day_events = false;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    // this.getMonth_days();
    this.getEvents(this.selectedMonth + 1);
    console.log(this.date)
  }

  eventForm: FormGroup = this.fb.group({
    event_title: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    description: ['', Validators.required],
  });

  alert_message: string;
  event: string;

  // getMonth_days() {
  //   this.daylist = [];
  //    for(this.i = 1; this.i <= this.days; this.i++) {
  //    this.daylist.push(this.i)
  //   }
  //   for(this.j = 0; this.j < this.dummy_days; this.j++) {
  //     this.daylist.unshift('')
  //   }
  //   console.log('Days: ' + this.daylist)
  //   this.chunk(this.daylist, 7);
  // }

  
  chunk(array, size) {
    this.dayslist = [];
    for(this.j = 0; this.j < this.dummy_days; this.j++) {
      this.events.unshift({
        day: '',
        school_event_id: '',
        event_title: '',
        date: '',
        month: '',
        start_time: '',
        end_time: '',
        description: '',
        priority: '', 
        employees: [],
        students: [],
      })
    }
    for (let i = 0; i < array.length; i += size) {
      this.chunked_data = array.slice(i, i+size);
      this.dayslist.push(this.chunked_data);
    }
    console.log(this.dayslist)
  }

  getEvents(month) {
    if(month < 10) {
      month = '0' + month;
    }
    this.service.getEvents(month)
    .subscribe(
      res => { this.events = res.school_events, this.chunk(this.events, 7), this.getEventTitles() }
    )
  }

  getEventTitles() {
    this.event_titles = this.events.filter(data => data.event_title !== '');
    this.day_events = false;
  }

  getPrevious() {
    if(this.currentMonth == 0) {
      this.currentMonth = 11
      this.month = this.Months[this.currentMonth];
      this.year = this.year - 1
    } else {
      this.currentMonth = this.currentMonth - 1;
      this.month = this.Months[this.currentMonth];
    }
    this.selectedMonth = this.currentMonth;
    this.selectedYear = this.year;
    this.days = new Date(this.year, this.selectedMonth + 1, 0).getDate();
    this.dummy_days = new Date(this.year, this.selectedMonth, 1).getDay();
    this.getEvents(this.selectedMonth + 1);
  }

  getNext() {
    if(this.currentMonth == 11) {
      this.currentMonth = 0
      this.month = this.Months[this.currentMonth];
      this.year = this.year + 1
    } else {
      this.currentMonth = this.currentMonth + 1;
      this.month = this.Months[this.currentMonth];
    }
    this.selectedMonth = this.currentMonth;
    this.selectedYear = this.year;
    this.days = new Date(this.year, this.selectedMonth + 1, 0).getDate();
    this.dummy_days = new Date(this.year, this.selectedMonth, 1).getDay();
    console.log(this.dummy_days)
    this.getEvents(this.selectedMonth + 1);
  }

  getDayEvents(day) {
    if(day < 10) {
      day = '0' + day;
    }
    var selectmonth:any = (this.currentMonth + 1);
    if(selectmonth < 10) {
      selectmonth = '0' + selectmonth;
    }
    var current_Date = this.currentYear + '-' + selectmonth + '-' + day;
    this.service.getDayEvents(current_Date)
    .subscribe(
      res => { this.event_titles = res.school_events, this.day_events = true; }
    )
  }

  addEvent(day) {
    this.selected_event = {event_title: '', event_type: '', priority: '', date: '', start_time: '', end_time: '', description: ''}
    this.opendialog(this.selected_event, 'add');
  }

  editEvent(event_id) {
    this.selected_event = this.event_titles.filter(data => data.school_event_id === event_id)[0]
    this.opendialog(this.selected_event, 'edit');
  }

  deleteEvent(event_id) {
    this.service.deleteEvents(event_id)
    .subscribe(
      res => { 
        if(res == true) {
          this.alert_message = "Event Deleted Successfully";
          this.openAlert(this.alert_message);
          this.getEvents(this.selectedMonth + 1);
        } else {
          this.alert_message = "Event Not Deleted";
          this.openAlert(this.alert_message)
        }
      }
    ) 
  }

  opendialog(selected_event, dialog_type) {
    const eventConfig = new MatDialogConfig();

    eventConfig.autoFocus = true;
    eventConfig.width = '60%';

    eventConfig.data = {
      selected_event: selected_event,
      dialog_type: dialog_type,
    };

    const eventRef = this.dialog.open(AddeventComponent, eventConfig);

    eventRef.afterClosed().subscribe(
      data => {
        this.getEvents(this.selectedMonth + 1);
      }
    )
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