import { Component, OnInit, Inject } from '@angular/core';
import { ExamsService } from '../../_services/exams.service';
import { ClasessService } from '../../_services/clasess.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-edit-assessments',
  templateUrl: './edit-assessments.component.html',
  styleUrls: ['./edit-assessments.component.css']
})
export class EditAssessmentsComponent implements OnInit {

  examination_pattern: any = {};
  examination_pattern_id;
  assessment_patterns: any = [];
  assessment_pattern_id;
  classes = [];
  selectedclasses = [];
  dropdownSettings = {};

  dialog_type: string;
  submit_type: string;
  alert_message: string;

  exampatternForm: FormGroup = this.fb.group({
    examination_pattern_id: '',
    assessment_type: ['', Validators.required],
    examination_title: ['', Validators.required],
    no_of_assessments: ['', Validators.required],
    classes: [],
  });

  asspatternForm: FormGroup = this.fb.group({
    Assessment: ['', Validators.required],
    assessment_mode: ['', Validators.required],
    max_marks: ['', Validators.required],
  });

  constructor(
    private service: ExamsService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private classservice: ClasessService, 
    private dialogRef: MatDialogRef<EditAssessmentsComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.dialog_type = data.dialog_type;
    this.submit_type = data.submit_type;

    this.examination_pattern = data.selected_examination_pattern;
    this.assessment_patterns = data.selected_examination_pattern.assessments;
    this.examination_pattern_id = data.selected_examination_pattern.examination_pattern_id;
    
    if(this.dialog_type === 'examination_pattern') {
      this.exampatternForm.patchValue({
        examination_pattern_id: this.examination_pattern.examination_pattern_id,
        assessment_type: this.examination_pattern.assessment_type,
        examination_title: this.examination_pattern.examination_title,
        no_of_assessments: this.examination_pattern.no_of_assessments,
        classes: this.examination_pattern.classes,
      })
    }
  }

  ngOnInit() {
    console.log(this.examination_pattern)
    this.getClasses();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'class_id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  close() {
    this.dialogRef.close();
  }

  getClasses() {
    this.classservice.getClasses()
      .subscribe(
        res => { 
          this.classes = res.school_classes, 
          console.log(res) 
        }
      )
  }

  onItemSelect(item) {
    this.selectedclasses.push(item)
    console.log(item)
  }

  submitExampattern() {
    if(this.submit_type === 'add') {
      this.exampatternForm.value.classes = this.selectedclasses;
      this.service.addExamination_Pattern(this.exampatternForm.value)
      .subscribe(
        res => { 
          if(res == true) {
            this.alert_message = "Examination Pattern Added Successfully";
            this.openAlert(this.alert_message)
            this.close();
            this.selectedclasses = [];
          } else {
            this.alert_message = "Examination Pattern Not Added";
            this.openAlert(this.alert_message);
            this.exampatternForm.reset();
            this.selectedclasses = [];
          }
        }
      )
    } else if(this.submit_type === 'edit') {
      this.service.editExamination_Pattern(this.exampatternForm.value, this.examination_pattern.examination_pattern_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.alert_message = "Examination Pattern Edited Successfully";
            this.openAlert(this.alert_message);
            this.close();
          } else {
            this.alert_message = "Examination Pattern Not Edited";
            this.openAlert(this.alert_message);
            this.exampatternForm.reset();
          }
        }
      )
    }
  }

  submitAssessmentpattern() {
    if(this.submit_type === 'add') {
      console.log(this.assessment_patterns)
      this.service.addAssessment_Pattern(this.assessment_patterns, this.examination_pattern_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.alert_message = "Assessment Pattern Updated Successfully";
            this.openAlert(this.alert_message)
            this.close();
          } else {
            this.alert_message = "Assessment Pattern Not Updated";
            this.openAlert(this.alert_message);
          }
        }
      )
    } else if(this.submit_type === 'edit') {

    }
  }

  addPattern() {
    if(this.submit_type === 'add') {
      this.service.addPattern(this.asspatternForm.value, this.examination_pattern_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.alert_message = "Assessment Pattern Added Successfully";
            this.openAlert(this.alert_message)
            this.close();
          } else {
            this.alert_message = "Assessment Pattern Not Added";
            this.openAlert(this.alert_message);
          }
        }
      )
    } else if(this.submit_type === 'edit') {

    }
  }

  addAssessment() {
    this.assessment_patterns.push({
      "Assessment" : "",
      "assessment_mode" : "",
      "max_marks" : 0
    })
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
