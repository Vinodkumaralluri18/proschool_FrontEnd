import { Component, OnInit, Inject } from '@angular/core';
import { TimetableService } from '../../_services/timetable.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css']
})
export class AddeventComponent implements OnInit {

  selected_event;
  dialog_type;
  alert_message: string;

  constructor(
    private service: TimetableService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AddeventComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.dialog_type = data.dialog_type;
    this.selected_event = data.selected_event;
  }

  eventForm: FormGroup = this.fb.group({
    event_title: ['', Validators.required],
    event_type: 'School Event',
    priority: ['', Validators.required],
    date: ['', Validators.required],
    start_time: ['', Validators.required],
    end_time: ['', Validators.required],
    description: ['', Validators.required],
  });

  ngOnInit() {
    console.log(this.selected_event)
    this.eventForm.patchValue({
      event_title: this.selected_event.event_title,
      event_type: this.selected_event.event_type,
      priority: this.selected_event.priority,
      date: this.selected_event.date,
      start_time: this.selected_event.start_time,
      end_time: this.selected_event.end_time,
      description: this.selected_event.description,
    })
  }

  submitEvent() {
    console.log(this.selected_event)
    if (this.eventForm.value.event_title === '' || this.eventForm.value.event_title === undefined) {
      this.alert_message = "Please Enter the Event Title";
      this.openAlert(this.alert_message);
    } else if (this.eventForm.value.priority === '' || this.eventForm.value.priority === undefined) {
      this.alert_message = "Please Enter the Event Priority";
      this.openAlert(this.alert_message);
    } else if (this.eventForm.value.date === '' || this.eventForm.value.date === undefined) {
      this.alert_message = "Please Enter the Event Date";
      this.openAlert(this.alert_message);
    } else if (this.eventForm.value.start_time === '' || this.eventForm.value.start_time === undefined) {
      this.alert_message = "Please Enter the Event Start Time";
      this.openAlert(this.alert_message);
    } else if (this.eventForm.value.end_time === '' || this.eventForm.value.end_time === undefined) {
      this.alert_message = "Please Enter the Event End Time";
      this.openAlert(this.alert_message);
    } else {
      if (this.dialog_type === 'add') {
        this.eventForm.value.event_type = 'School Event';
        this.service.addEvents(this.eventForm.value)
          .subscribe(
            res => {
              if (res == true) {
                this.alert_message = "Event Added Successfully";
                this.openAlert(this.alert_message);
                this.dialogRef.close();
              } else {
                this.alert_message = "Event Not Added";
                this.openAlert(this.alert_message)
              }
            }
          )
      } else if (this.dialog_type === 'edit') {
        this.service.editEvents(this.eventForm.value, this.selected_event.school_event_id)
        .subscribe(
          res => {
            if (res == false) {
              this.alert_message = "Event Not Edited Successfully";
              this.openAlert(this.alert_message);
            } else {
              this.alert_message = "Event Edited Successfully";
              this.openAlert(this.alert_message);
              this.dialogRef.close();
            }
          }
        )
      }
    } 
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
