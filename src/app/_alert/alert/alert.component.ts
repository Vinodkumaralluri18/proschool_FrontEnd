import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  message: string;
  confirm_status: boolean;

  constructor(
    private dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.message = data.message;
    this.confirm_status = data.confirm_status;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  confirmation() {
    this.dialogRef.close(true);
  }

}
