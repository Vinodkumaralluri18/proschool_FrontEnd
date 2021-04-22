import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { AcademicsService } from '../../_services/academics.service';

@Component({
  selector: 'app-addeditsubjects',
  templateUrl: './addeditsubjects.component.html',
  styleUrls: ['./addeditsubjects.component.css']
})
export class AddeditsubjectsComponent implements OnInit {

  class: string;
  section: string;
  subject = {
    subject_id: '',
    name: '',
    textbook: '',
    author: '',
    publisher: '',
  };
  dialog_type: string;
  alert_message: string;

  constructor(
    private fb: FormBuilder,
    private service: AcademicsService, 
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AddeditsubjectsComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      
      this.class = data.class;
      this.section = data.section;
      this.subject = data.subject;
      this.dialog_type = data.dialog_type;
  }

  subjectForm: FormGroup = this.fb.group({
    subject_id: '',
    name: ['', Validators.required],
    textbook: ['', Validators.required],
    author: ['', Validators.required],
    publisher: ['', Validators.required],
  });

  ngOnInit() {
    this.subjectForm.patchValue({
      subject_id: this.subject.subject_id,
      name: this.subject.name,
      textbook: this.subject.textbook,
      author: this.subject.author,
      publisher: this.subject.publisher,
    });
    console.log(this.subject);
  }

  close() {
    this.dialogRef.close();
  }

  submitSubject() {
    this.subjectForm.value.subject_id = this.subject.subject_id;
    if(this.section == undefined){
      this.alert_message = 'Please Select the Class and the Section';
      this.openAlert(this.alert_message)
    } else {
      if(this.dialog_type == 'add') {
        this.service.addSubject(this.subjectForm.value, this.section)
        .subscribe(
          res => { 
            if(res == true) {
              this.dialogRef.close(this.subjectForm.value);
              this.alert_message = "Subject Added Successfully";
              this.openAlert(this.alert_message)
            } else {
              this.alert_message = "Subject Not Added";
              this.openAlert(this.alert_message)
            }
          }
        )
      } else if(this.dialog_type == 'edit') {
        this.service.editSubject(this.subjectForm.value, this.subject.subject_id)
          .subscribe(
            res => { 
              if(res == true) {
                this.dialogRef.close(this.subjectForm.value);
                this.alert_message = "Subject Edited Successfully";
                this.openAlert(this.alert_message)
              } else {
                this.alert_message = "Subject Not Edited";
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
