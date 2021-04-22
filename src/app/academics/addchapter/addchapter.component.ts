import { Component, OnInit, Inject } from '@angular/core';
import { AcademicsService } from '../../_services/academics.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-addchapter',
  templateUrl: './addchapter.component.html',
  styleUrls: ['./addchapter.component.css']
})
export class AddchapterComponent implements OnInit {

  class: string;
  section: string;
  subject: string;
  chapter = {
    lession_id: '',
    title: '',
    chapter_code: '',
    description: '',
  };
  dialog_type: string;
  alert_message: string;

  constructor(
    private service: AcademicsService, 
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AddchapterComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 

      this.class = data.class;
      this.section = data.section;
      this.subject = data.subject;
      this.chapter = data.chapter;
      this.dialog_type = data.dialog_type;
    }

  chapterForm: FormGroup = this.fb.group({
    lession_id: '',
    title: ['', Validators.required],
    chapter_code: ['', Validators.required],
    description: ['', Validators.required],
  });

  ngOnInit() {
    this.chapterForm.patchValue({
      lession_id: this.chapter.lession_id,
      title: this.chapter.title,
      chapter_code: this.chapter.chapter_code,
      description: this.chapter.description,
    });
    console.log(this.chapter)
  }

  close() {
    this.dialogRef.close();
  }

  submitChapter() {
    this.chapterForm.value.lession_id = this.chapter.lession_id;
    if(this.subject == undefined){
      alert('Please Select the Class, Section and Subject')
    } else {
      if(this.dialog_type == 'add') {
        this.service.addChapter(this.chapterForm.value, this.subject)
          .subscribe(
            res => { 
              if(res == true) {
                this.dialogRef.close(this.chapterForm.value);
                this.alert_message = "Chapter Added Successfully";
                this.openAlert(this.alert_message)
              } else {
                this.alert_message = "Chapter Not Added Successfully";
                this.openAlert(this.alert_message)
              }
            }
          )
      } else if(this.dialog_type == 'edit') {
        this.service.editChapter(this.chapterForm.value, this.chapter.lession_id)
          .subscribe(
            res => { 
              if(res == true) {
                this.dialogRef.close(this.chapterForm.value);
                this.alert_message = "Chapter Edited Successfully";
                this.openAlert(this.alert_message)
              } else {
                this.alert_message = "Chapter Not Edited Successfully";
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
