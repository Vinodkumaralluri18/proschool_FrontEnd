import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServicesService } from '../../services.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  constructor(private service: ServicesService, private fb: FormBuilder, public dialog: MatDialog) { }

  @Output() classEvent = new EventEmitter<string>();
  @Output() sectionEvent = new EventEmitter<string>();
  @Output() subjectEvent = new EventEmitter<string>();

  selected_class:any = {class_id: '', name: ''};
  selected_section:any = {section_id: '', name: ''};
  selected_subject:any = {subject_id: '', name: ''};

  showClassList: boolean = false;
  showSectionList: boolean = false;
  showSubjectList: boolean = false;

  classes = [];
  all_sections = [];
  class_sections = [];
  subjects = [];
  alert_message: string;

  ngOnInit() {
    this.getClasses();
  }

  getClasses() {
    this.service.getClasses()
      .subscribe(
        res => { this.classes = res.school_classes.filter(data => data.status === 1);
          if(this.classes.length > 0) {
            this.selected_class = this.classes[0];
          } else {
            this.alert_message = "There are No Classes";
            this.openAlert(this.alert_message, false)
            this.selected_class.class_id = 'No Classes';
          }
          this.getSections(),
          console.log(res)
        }
      )
  }

  getSections() {
    if(this.selected_class.class_id !== 'No Classes') {
      this.service.getSections(this.selected_class.class_id)
      .subscribe(
        res => { this.class_sections = res.class_sections;
          if(this.class_sections.length > 0) {
            this.selected_section = this.class_sections[0];
          } else {
            this.alert_message = "There are No Sections for the selected Class";
            this.openAlert(this.alert_message, false)
            this.selected_section.section_id = 'No Sections';
          }
          this.getSubjects(),
          console.log(res)
        }
      )
    } else {
      this.selected_section.section_id = 'No Sections';
      this.get_sub();
    }
  }
  
  getSubjects() {
    if(this.selected_section.section_id !== 'No Sections' || this.selected_section.section_id === '') {
      this.service.getSubjects(this.selected_section.section_id)
      .subscribe(
        res => { this.subjects = res.subjects;
          if(this.subjects.length > 0) {
            this.selected_subject = this.subjects[0];
          } else {
            this.alert_message = "There are No Subjects for the selected Section";
            this.openAlert(this.alert_message, false)
            this.selected_subject.subject_id = 'No Subjects';
          }
          this.get_sub(),
          console.log(res) 
        }
      )
    } else {
      this.selected_subject.subject_id = 'No Subjects';
      this.get_sub();
    }
  }

  get_sub() {
    this.classEvent.emit(this.selected_class.class_id);
    this.sectionEvent.emit(this.selected_section.section_id);
    this.subjectEvent.emit(this.selected_subject.subject_id);
  }

  openAlert(alert_message, status) {
    const alertConfig = new MatDialogConfig();

    alertConfig.autoFocus = true;
    alertConfig.width = '40%';

    alertConfig.data = {
      message: alert_message,
      confirm_status: status,
    };

    const alertRef = this.dialog.open(AlertComponent, alertConfig);

    alertRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data)
        if(data === true) {
        }
      }
    )
  }

}
