import { Component, OnInit, Inject } from '@angular/core';
import { ClasessService } from '../../_services/clasess.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-editclass',
  templateUrl: './editclass.component.html',
  styleUrls: ['./editclass.component.css']
})
export class EditclassComponent implements OnInit {

  class: any = {};
  section: any = {};
  teachers = [];
  class_id;
  section_id;
  dialog_type: string;
  submit_type: string;
  alert_message: string;

  showTeacherList: boolean = false;
  selected_teacher:any = {employee_id: '', first_name: '', last_name: ''}

  classForm: FormGroup = this.fb.group({
    class_id: '',
    name: ['', Validators.required],
  });

  sectionForm: FormGroup = this.fb.group({
    section_id: '',
    selected_class: ['', Validators.required],
    name: ['', Validators.required],
    employee_id: [''],
    teacher_name: [''],
  });

  constructor(
    private service: ClasessService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<EditclassComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.dialog_type = data.dialog_type;
    this.submit_type = data.submit_type;
    
    if(this.dialog_type === 'class') {
      this.classForm.patchValue({
        class_id: data.selected_class.class_id,
        name: data.selected_class.name,
      })
    } else if(this.dialog_type === 'section') {
      this.sectionForm.patchValue({
        section_id: data.selected_section.section_id,
        selected_class: data.selected_section.class_id,
        name: data.selected_section.name,
        employee_id: data.selected_section.employee_id,
        teacher_name: data.selected_section.employee_id,
      })
    }

    this.class = data.selected_class;
    this.section = data.selected_section;
    this.teachers = data.teachers;

  }

  ngOnInit() {
    console.log(this.section)
  }

  close() {
    this.dialogRef.close();
  }

  submitClass() {
    if(this.submit_type === 'add') {
      this.service.addClass(this.classForm.value)
      .subscribe(
        res => { 
          if(res == true) {
            this.alert_message = "Class Added Successfully";
            this.openAlert(this.alert_message)
            this.close();
          } else {
            this.alert_message = "Class Not Added";
            this.openAlert(this.alert_message);
            this.sectionForm.reset();
          }
        }
      )
    } else if(this.submit_type === 'edit') {
      this.service.editClass(this.classForm.value, this.class.class_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.alert_message = "Class Edited Successfully";
            this.openAlert(this.alert_message);
            this.close();
          } else {
            this.alert_message = "Class Not Edited";
            this.openAlert(this.alert_message);
            this.sectionForm.reset();
          }
        }
      )
    }
  }

  submitSection() {
    if(this.submit_type === 'add') {
      this.service.addSection(this.sectionForm.value, this.section.class_id)
      .subscribe(
        res => { 
          if(res == true) {
            // this.getSections();
            this.alert_message = "Section Added Successfully";
            this.openAlert(this.alert_message);
            this.dialogRef.close(this.sectionForm.value);
          } else {
            this.alert_message = "Section Not Added";
            this.openAlert(this.alert_message)
            this.sectionForm.reset();
          }
        }
      )
      this.dialogRef.close(this.sectionForm.value);
    } else if(this.submit_type === 'edit') {
      this.service.editSection(this.sectionForm.value, this.section.section_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.alert_message = "Section Edited Successfully";
            this.openAlert(this.alert_message);
            this.dialogRef.close(this.sectionForm.value);
          } else {
            this.alert_message = "Section Not Edited";
            this.openAlert(this.alert_message);
            this.sectionForm.reset();
          }
        }
      )
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
