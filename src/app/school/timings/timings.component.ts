import { Component, OnInit } from '@angular/core';
import { TimingsService } from '../../_services/timings.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-timings',
  templateUrl: './timings.component.html',
  styleUrls: ['./timings.component.css']
})
export class TimingsComponent implements OnInit {

  constructor(private service: TimingsService, private fb: FormBuilder, public dialog: MatDialog) {}
  
  timings = [];

  selected_class: string;
  selected_section: string;

  ngOnInit() {
    // this.getTimings();
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user.role)
  }

  receiveClass($event) {
    this.selected_class = $event
    console.log(this.selected_class)
  }

  receiveSection($event) {
    this.selected_section = $event
    console.log(this.selected_section)
    this.getTimingsBySection(this.selected_section);
  }

  user: User;
  //timings = [];
  alert_message: string;

  timingsForm: FormGroup = this.fb.group({
    class: '',
    section: '',
    session: ['', Validators.required],
    start_time: ['', Validators.required],
    end_time: ['', Validators.required],
  });

  getTimings() {
    this.service.getTimings()
      .subscribe(
        res => { this.timings = res.session_timings, this.timings = res.session_timings, console.log(res) }
      )
  }

  getTimingsBySection(section) {
    console.log(section)
    this.service.getTimingsBySection(section)
      .subscribe(
        res => { this.timings = res.session_timings, console.log(res) }
      )
  }

  addTimings() {
    this.timingsForm.value.class = this.selected_class;
    this.timingsForm.value.section = this.selected_section;
    console.log(this.timingsForm.value)
    this.service.addTimings(this.timingsForm.value)
    .subscribe(
      res => { 
        if(res == true) {
          // this.collection.timings.push(this.timingsForm.value);
          this.alert_message = "Timing Added Successfully";
          this.openAlert(this.alert_message)
          this.getTimingsBySection(this.selected_section);
        } else {
          this.alert_message = "Timing Not Added";
          this.openAlert(this.alert_message)
        }
        this.timingsForm.reset();
      }
    )
  }

  deleteTimings(session_id) {
    console.log(session_id)
    this.service.deleteTimings(session_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.timings = this.timings.filter(res => res.session_id !== session_id)
            this.alert_message = "Timing Deleted Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Timing Not Deleted";
            this.openAlert(this.alert_message)
          }
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
