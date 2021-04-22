import { Component, OnInit, Inject } from '@angular/core';
import { AssignmentsService } from '../../_services/assignments.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-pwassign',
  templateUrl: './pwassign.component.html',
  styleUrls: ['./pwassign.component.css']
})
export class PwassignComponent implements OnInit {

  class: string;
  section: string;
  subject: string;
  projectwork: any = {
    projectwork_id: '',
    section_id: '',
    subject_id: '',
    project_work: '',
    due_date: '',
    assign_date: '',
    maxMarks: '',
    description: '',
  };
  dialog_type: string;
  alert_message: string;

  constructor(private service: AssignmentsService, 
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<PwassignComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 

      this.class = data.class;
      this.section = data.section;
      this.subject = data.subject;
      this.projectwork = data.projectwork;
      this.dialog_type = data.dialog_type;
    }

    projectworkForm: FormGroup = this.fb.group({
      projectwork_id: ['', Validators.required],
      project_work: ['', Validators.required],
      maxMarks: ['', Validators.required],
      assign_date: ['', Validators.required],
      due_date: ['', Validators.required],
      description: ['', Validators.required],
    });

  ngOnInit() {
    console.log(this.projectwork)
    this.projectworkForm.patchValue({
      projectwork_id: this.projectwork.projectwork_id,
      project_work: this.projectwork.project_work,
      maxMarks: this.projectwork.maxMarks,
      assign_date: this.projectwork.assign_date,
      due_date: this.projectwork.due_date,
      description: this.projectwork.description,
    });
  }

  close() {
    this.dialogRef.close();
  }

  assignProjectwork() {
    this.projectworkForm.value.projectwork_id = this.projectwork.projectwork_id;
    if(this.section == undefined || this.subject == undefined ||
      this.section == '' || this.subject == '') {
      this.alert_message = "Please Select Class, Section and Subject";
      this.openAlert(this.alert_message)
    } else if(this.projectworkForm.value.project_work === '' || this.projectworkForm.value.project_work === undefined ||
      this.projectworkForm.value.assign_date === ''|| this.projectworkForm.value.assign_date === undefined ||
      this.projectworkForm.value.due_date === '' || this.projectworkForm.value.due_date === undefined) {
      this.alert_message = "Please Enter All Details";
      this.openAlert(this.alert_message)
    } else {
      if(this.projectwork.maxMarks === '' || this.projectwork.maxMarks === undefined) {
        this.projectwork.maxMarks = 0;
      }
      if (this.dialog_type == 'add') {
        this.service.assignProjectwork(this.projectworkForm.value, this.section, this.subject)
          .subscribe(
            res => { 
              if(res == true) {
                this.dialogRef.close(this.projectworkForm.value);
                this.alert_message = "Projectwork Added Successfully";
                this.openAlert(this.alert_message)
              } else {
                this.alert_message = "Projectwork Not added";
                this.openAlert(this.alert_message)
              }
            }
          )
      } else if (this.dialog_type == 'edit') {
        this.service.editProjectwork(this.projectworkForm.value, this.projectwork.projectwork_id)
          .subscribe(
            res => {
              if (res == true) {
                this.dialogRef.close(this.projectworkForm.value);
                this.alert_message = "Projectwork Edited Successfully";
                this.openAlert(this.alert_message)
              } else {
                this.alert_message = "Projectwork Not Edited";
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
