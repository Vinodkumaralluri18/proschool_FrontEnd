import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamsService } from '../../_services/exams.service';
import { ClasessService } from '../../_services/clasess.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { EditAssessmentsComponent } from '../edit-assessments/edit-assessments.component';
import { User } from '../../_models/user';;

@Component({
  selector: 'app-assessment-pattern',
  templateUrl: './assessment-pattern.component.html',
  styleUrls: ['./assessment-pattern.component.css']
})
export class AssessmentPatternComponent implements OnInit {

  constructor(private classservice: ClasessService, private service: ExamsService, private fb: FormBuilder, public dialog: MatDialog) { }

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  user: User;

  classes = [];
  selected_class: any;

  examination_patterns = [];
  selected_examination_pattern: any = {};

  assessment_patterns = [];
  selected_assessment_pattern: any;

  selected_assessment;
  max_marks;

  examination_title;
  showClassList: boolean = false;
  showExamList: boolean = false;
  alert_message: string;
  dialog_type: string;
  submit_type: string;

  ngOnInit() {
    this.getClasses();
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  pageChange(x) {
    this.pageNo = x;
    this.page_start = (x - 1) * 10;
  }

  nextPage() {
    if (this.pageNo < this.pages) {
      this.pageNo++;
      this.page_start = (this.pageNo - 1) * 10;
    } else {
      return;
    }
  }

  previousPage() {
    if (this.pageNo > 1) {
      this.pageNo--;
      this.page_start = this.page_start - 10;
    } else {
      return;
    }
  }

  getClasses() {
    this.classservice.getClasses()
      .subscribe(
        res => {
          this.classes = res.school_classes.filter(data => data.status === 1),
            this.selected_class = this.classes[0];
          this.getExamination_Pattern();
          console.log(res)
        }
      )
  }

  getExamination_Pattern() {
    this.service.getExamination_Pattern(this.selected_class.class_id)
      .subscribe(
        res => {
          if (res.examination_pattern.length) {
            this.examination_patterns = res.examination_pattern,
              this.getAssessment_Pattern(this.examination_patterns[0].examination_pattern_id);
            console.log(res);
          } else {
            this.assessment_patterns = [];
          }
        }
      )
  }

  getAssessment_Pattern(examination_pattern_id) {
    this.selected_examination_pattern = this.examination_patterns.filter(data => data.examination_pattern_id === examination_pattern_id)[0];
    this.assessment_patterns = this.selected_examination_pattern.assessments;
    this.pageNo = 1;
    this.page_start = 0;
    this.pages = Math.ceil(this.assessment_patterns.length / 10);
  }

  addPattern() {
    if (this.classes.length === 0 || this.assessment_patterns.length === 0) {
      this.alert_message = "There are No Assessment Patterns";
      this.openAlert(this.alert_message, false);
    } else {
      this.dialog_type = 'pattern';
      this.submit_type = 'add';
      this.openDialog(this.dialog_type, this.submit_type)
    }
  }

  addAssessment_Pattern() {
    if (this.classes.length === 0 || this.assessment_patterns.length === 0) {
      this.alert_message = "There are No Assessment Patterns";
      this.openAlert(this.alert_message, false);
    } else {
      this.dialog_type = 'assessment_pattern';
      this.submit_type = 'add';
      this.openDialog(this.dialog_type, this.submit_type)
    }
  }

  deleteConfirmation(assessment, max_marks) {
    this.selected_assessment = assessment;
    this.max_marks = max_marks;
    this.openAlert("Are you sure to delete the Assessment", true)
  }

  deleteAssessment_Pattern() {
    var totalMarks = this.selected_examination_pattern.total_marks - this.max_marks;
    var no_of_assessments = this.selected_examination_pattern.no_of_assessments;
    this.service.deleteAssessment_Pattern(this.selected_examination_pattern.examination_pattern_id, totalMarks, no_of_assessments, this.selected_assessment)
      .subscribe(
        res => {
          if (res == true) {
            this.alert_message = "Assessment Pattern Deleted Successfully";
            this.openAlert(this.alert_message, false)
            this.getExamination_Pattern();
          } else {
            this.alert_message = "Assessment Pattern Not Deleted";
            this.openAlert(this.alert_message, false)
          }
        }
      )
  }

  editAssessment_Types(i) {
    this.selected_assessment_pattern = this.assessment_patterns[0].assessments[i];
    this.dialog_type = 'assessment_pattern';
    this.submit_type = 'edit';
    this.openDialog(this.dialog_type, this.submit_type)
  }

  openDialog(dialog_type, submit_type): void {

    let dialogConfig = new MatDialogConfig();

    dialogConfig = {
      autoFocus: true,
      width: '60vw',
      maxHeight: '100vh',
    };

    dialogConfig.data = {
      selected_examination_pattern: this.selected_examination_pattern,
      dialog_type: dialog_type,
      submit_type: submit_type,
    };

    const dialogRef = this.dialog.open(EditAssessmentsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        this.getExamination_Pattern();
        console.log("Dialog output:", data)
      }
    );
  }

  openAlert(alert_message, status) {
    const alertConfig = new MatDialogConfig();

    alertConfig.autoFocus = true;
    alertConfig.width = '80%';

    alertConfig.data = {
      message: alert_message,
      confirm_status: status,
    };

    const alertRef = this.dialog.open(AlertComponent, alertConfig);

    alertRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data)
        if (data === true) {
          this.deleteAssessment_Pattern();
        }
      }
    )
  }


}
