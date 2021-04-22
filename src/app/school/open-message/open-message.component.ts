import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-open-message',
  templateUrl: './open-message.component.html',
  styleUrls: ['./open-message.component.css']
})
export class OpenMessageComponent implements OnInit {

  message;
  title;

  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<OpenMessageComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    
      this.message = data.message;
      this.title = data.title;
      console.log(this.message)
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
