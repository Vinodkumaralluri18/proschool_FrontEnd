import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServicesService } from '../../services.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor(private service: ServicesService, private fb: FormBuilder, public dialog: MatDialog) { }

  @Output() classEvent = new EventEmitter<string>();
  @Output() sectionEvent = new EventEmitter<string>();
  @Output() scheduleEvent = new EventEmitter<string>();

  showClassList: boolean = false;
  showSectionList: boolean = false;
  showScheduleList: boolean = false;

  selected_class:any = {class_id: '', name: ''};
  selected_section:any = {section_id: '', name: ''};
  selected_schedule:any = {exam_title: ''};
  
  classes = [];
  all_sections = [];
  class_sections = [];
  exam_schedules = [];
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
          if(this.classes.length > 0) {
            this.selected_section = this.class_sections[0];
          } else {
            this.alert_message = "There are No Sections for the selected Class";
            this.openAlert(this.alert_message, false)
            this.selected_section.section_id = 'No Sections';
          }
          this.getExam_schedules(),
          console.log(res)
        }
      )
    } else {
      this.selected_section.section_id = 'No Sections';
      this.getExam_schedules();
    }
  }

  getExam_schedules() {
    if(this.selected_section.section_id !== 'No Sections' || this.selected_section.section_id === '') {
      this.service.getClass_Examschedules(this.selected_class.class_id)
      .subscribe(
        res => {  
          console.log(res) 
          if(res.exam_schedule.length === 0) {
            this.alert_message = "There are No Exams for the selected Section";
            this.openAlert(this.alert_message, false)
            this.selected_schedule.exam_title = 'No Schedules';
          } else {
            this.exam_schedules = res.exam_schedule;
            this.selected_schedule = this.exam_schedules[0];
          }
          this.get_sch();
        }
      )
    } else {
      this.selected_schedule.exam_title = 'No Exams';
      this.get_sch();
    }
  }

  get_sch() {
    this.classEvent.emit(this.selected_class.class_id);
    this.sectionEvent.emit(this.selected_section.section_id);
    this.scheduleEvent.emit(this.selected_schedule.exam_title);
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
