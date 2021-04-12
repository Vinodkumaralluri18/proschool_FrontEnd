import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { EditPapersComponent } from '../edit-papers/edit-papers.component';
import { User } from '../../_models/user';
import { concatAll } from 'rxjs/operators';

@Component({
  selector: 'app-exam-papers',
  templateUrl: './exam-papers.component.html',
  styleUrls: ['./exam-papers.component.css']
})
export class ExamPapersComponent implements OnInit {

  constructor(private service: ServicesService, private fb: FormBuilder, public dialog: MatDialog) { }

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  exam_papers = [];
  assessment_patterns = [];
  inner_assessments = [];
  subject_exams = [];
    
  user: User;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if (this.user.role === 'parent') {
      console.log(this.user.users[0].section_id)
      this.selected_section = this.user.users[0].section_id;
    }
  }

  pageChange(x) {
    this.pageNo = x;
    this.page_start = (x - 1) * 10;
  } 

  nextPage() {
    if(this.pageNo < this.pages) {
      this.pageNo++;
      this.page_start = (this.pageNo - 1) * 10;
    } else {
      return;
    }
  } 

  previousPage() {
    if(this.pageNo > 1) {
      this.pageNo--;
      this.page_start = this.page_start - 10;
    } else {
      return;
    }
  }

  selected_class:string;
  selected_section:string;
  selected_schedule:string;
  selected_subject:string;
  selected_exam;
  selected_exam_id;
  examsData: boolean = true;
  alert_message: string;

  receiveClass($event) {
    this.selected_class = $event
    console.log(this.selected_class)
  }

  receiveSection($event) {
    this.selected_section = $event
    console.log(this.selected_section)
  }

  receiveSchedule($event) {
    this.selected_schedule = $event
    console.log(this.selected_schedule);
    if(this.selected_schedule === 'No Data') {
      this.openAlert('No Exams Scheduled for this Class & Section')
      this.examsData = false;
    } else {
      this.getExam_papers();
      this.examsData = true;
    }
  }

  getExam_papers() {
    if(this.selected_schedule == undefined || this.selected_section == undefined ||
      this.selected_schedule == '' || this.selected_section == '') {
      this.alert_message = "Please Select Class, Section and Schedule";
      this.openAlert(this.alert_message)
    } else if(this.selected_class == 'No Classes' || this.selected_section == 'No Sections' || this.selected_schedule == 'No Schedules') {
      this.subject_exams = [];
    } else {
      this.service.getExam_papers(this.selected_schedule, this.selected_section)
      .subscribe(
        res => { 
          this.exam_papers = res.exams; 
          if(this.exam_papers.length > 0) {
            this.selected_subject = this.exam_papers[0].subject_id;
            this.getSubject_exams(this.selected_subject);
          } else {
            this.subject_exams = [];
          }
          console.log(res)
        }
      )
    }
  }

  getSubject_exams(subject_id) {
    this.selected_subject = subject_id;
    this.subject_exams = this.exam_papers.filter(data => data.subject_id === subject_id);
    this.pageNo = 1;
    this.page_start = 0;
    this.pages = Math.ceil(this.subject_exams[0].exams.length / 10);
  }

  addExamPaper() {
    if(this.selected_schedule == undefined || this.selected_section == undefined ||
      this.selected_schedule == '' || this.selected_section == '') {
      this.alert_message = "Please Select Class, Section, Subject and Schedule";
      this.openAlert(this.alert_message)
    } else {
      this.selected_exam_id = '';
      this.selected_exam = this.inner_assessments;
      this.openDialog(this.selected_exam, this.selected_subject, this.selected_exam_id, 'add')
    }
  }

  editExamPaper() {
    if(this.selected_schedule == undefined || this.selected_section == undefined ||
      this.selected_schedule == '' || this.selected_section == '') {
      this.alert_message = "Please Select Class, Section, Subject and Schedule";
      this.openAlert(this.alert_message)
    } else {
      this.selected_exam_id = this.subject_exams[0].exam_paper_id;
      this.selected_exam = this.subject_exams[0].exams;
      this.openDialog(this.selected_exam, this.selected_subject, this.selected_exam_id, 'edit')
    }
  }

  // deleteExamPaper(exam_paper_id) {

  // }

  openDialog(selected_exam, selected_subject, selected_exam_id, dialog_type): void {

    console.log(this.selected_schedule)

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';

    dialogConfig.data = {
      selected_class: this.selected_class,
      selected_section: this.selected_section,
      selected_schedule: this.selected_schedule,
      selected_subject: selected_subject,
      exam: selected_exam,
      selected_exam_id: selected_exam_id,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(EditPapersComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => {
          console.log("Dialog output:", data)      
          this.getExam_papers();
        }
    );    

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
