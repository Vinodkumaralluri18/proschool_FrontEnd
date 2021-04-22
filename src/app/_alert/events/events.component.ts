import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventlistsComponent implements OnInit {

  events: string;

  constructor(
    private dialogRef: MatDialogRef<EventlistsComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    console.log(data)

    this.events = data.eventslist;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
