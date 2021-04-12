import { Component, OnInit, Inject } from '@angular/core';
import { ExamsService } from '../../_services/exams.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-editschedules',
  templateUrl: './editschedules.component.html',
  styleUrls: ['./editschedules.component.css']
})
export class EditschedulesComponent implements OnInit {

  examinations: any = [];
  
  schedule = {
    exam_sch_id: '',
    exam_title: '',
    unique_code: '',
    from_date: '',
    end_date: '',
    classes: [],
  };
  selected_examination: any = {};
  dialog_type: string;
  alert_message: string;

  constructor(
    private service: ExamsService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<EditschedulesComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.schedule = data.schedule;
    this.dialog_type = data.dialog_type;
  }

  scheduleForm: FormGroup = this.fb.group({
    exam_sch_id: '',
    exam_title: ['', Validators.required],
    unique_code: ['', Validators.required],
    from_date: ['', Validators.required],
    end_date: ['', Validators.required],
    classes: [],
  });

  ngOnInit() {
    this.scheduleForm.patchValue({
      exam_sch_id: this.schedule.exam_sch_id,
      exam_title: this.schedule.exam_title,
      unique_code: this.schedule.unique_code,
      from_date: this.schedule.from_date,
      end_date: this.schedule.end_date,
      classes: this.schedule.classes,
    });
    this.getExaminations();
    console.log(this.schedule);
  }

  getExaminations() {
    this.service.getExaminations()
      .subscribe(
        res => { this.examinations = res.examinations, console.log(res) }
      )
  }

  close() {
    this.dialogRef.close();
  }

  getSchedule(i) {
    this.selected_examination = this.examinations.filter(data => parseInt(data.unique_code) === parseInt(this.scheduleForm.value.unique_code))[0];
    console.log(this.selected_examination)
  }

  editExam_schedules() {
    var selected_examination = this.examinations.filter(data => data.unique_code === parseInt(this.scheduleForm.value.unique_code))[0]
    this.scheduleForm.value.exam_title = this.examinations.filter(data => data.unique_code === parseInt(this.scheduleForm.value.unique_code))[0].examination_title;
    this.scheduleForm.value.classes = this.examinations.filter(data => data.unique_code === parseInt(this.scheduleForm.value.unique_code))[0].classes;
    console.log(this.scheduleForm.value)
    if(this.dialog_type === 'add') {
      this.dialogRef.close();
      this.service.addExam_schedules(this.scheduleForm.value)
      .subscribe(
        res => { 
          if(res == true) {
            this.alert_message = "ExamSchedule Added Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "ExamSchedule Not Added";
            this.openAlert(this.alert_message)
          }
        }
      )
    } else if(this.dialog_type === 'edit') {
      this.scheduleForm.value.exam_sch_id = this.schedule.exam_sch_id;
      this.dialogRef.close();
      this.service.editExam_schedules(this.scheduleForm.value, this.schedule.exam_sch_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.alert_message = "Exam Schedule Edited Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Exam Schedule Not Edited";
            this.openAlert(this.alert_message)
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
