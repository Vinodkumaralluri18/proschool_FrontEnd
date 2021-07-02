import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-add-papers',
  templateUrl: './add-papers.component.html',
  styleUrls: ['./add-papers.component.css']
})
export class AddPapersComponent implements OnInit {

  constructor(private service: ServicesService, private fb: FormBuilder, public dialog: MatDialog) { }

  ngOnInit() {
  }

  selected_class:string;
  selected_section:string;
  selected_schedule:string;
  selected_subject:string;
  alert_message: string;

  subjects = [];
  inner_assessments = [];
  exam_papers = [];
  subject_papers = {};
  assessment_type;

  receiveClass($event) {
    this.selected_class = $event
    console.log(this.selected_class)
  }

  receiveSection($event) {
    this.selected_section = $event
    console.log(this.selected_section)
    this.getSubjects();
  }

  receiveSchedule($event) {
    this.selected_schedule = $event
    console.log(this.selected_schedule);
    this.getinner_assessments();
    this.getExam_papers();
  }

  getSubjects() {
    if(this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class and Section";
      this.openAlert(this.alert_message)
    } else {
      this.service.getSubjects(this.selected_section)
      .subscribe(
        res => { this.subjects = res.subjects, console.log(res) }
      )
    }
  }

  getinner_assessments() {
    if(this.selected_schedule == undefined || this.selected_schedule == '') {
      this.alert_message = "Please Select Exam Schedule";
      this.openAlert(this.alert_message)
    } else {
      this.service.getinner_assessments(this.selected_schedule)
      .subscribe(
        res => { this.inner_assessments = res.assessment[0].assMarks, console.log(this.inner_assessments) }
      )
    }
  }

  getExam_papers() {
    if(this.selected_schedule == undefined || this.selected_section == undefined ||
      this.selected_schedule == '' || this.selected_section == '') {
      this.alert_message = "Please Select Class, Section, Subject and Schedule";
      this.openAlert(this.alert_message)
    } else {
      this.service.getExam_papers(this.selected_schedule, this.selected_section)
      .subscribe(
        res => { this.exam_papers = res.exams, console.log(res) }
      )
    }
  }

  getSubject_papers() {
    this.subject_papers = this.exam_papers.filter( res => res.subject_id === this.selected_subject)[0];
  } 

  addExam_papers() {
  //   console.log(this.inner_assessments)
  //   if(this.selected_subject == undefined || this.selected_subject == '') {
  //     this.alert_message = "Please Select Subject";
  //     this.openAlert(this.alert_message)
  //   } else {
  //     console.log(this.selected_subject);
  //     this.service.addExam_papers(this.inner_assessments, this.selected_section, this.selected_schedule, this.selected_subject, this.e)
  //     .subscribe(
  //       res => { 
  //         if(res == true) {
  //           this.alert_message = "Exam Timing Updated Successfully";
  //           this.openAlert(this.alert_message)
  //         } else {
  //           this.alert_message = "Exam Timing Not Updated";
  //           this.openAlert(this.alert_message)
  //         }
  //       }
  //     )
  //   }    
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
