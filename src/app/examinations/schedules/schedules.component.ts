import { Component, OnInit } from '@angular/core';
import { ExamsService } from '../../_services/exams.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { EditschedulesComponent } from '../editschedules/editschedules.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {

  constructor(private service: ExamsService, private fb: FormBuilder, public dialog: MatDialog) {}

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  exam_schedules = [];

  selected_schedule;
  dialog_type: string;
  alert_message: string;

  scheduleForm: FormGroup = this.fb.group({
    exam_title: ['', Validators.required],
    from_date: ['', Validators.required],
    end_date: ['', Validators.required],
  });
      
  user: User;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getExam_schedules();
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

  getExam_schedules() {
    this.service.getExam_schedules()
      .subscribe(
        res => { this.exam_schedules = res.exam_schedules, 
          this.pageNo = 1,
          this.page_start = 0,
          this.pages = Math.ceil(this.exam_schedules.length / 10), 
          console.log(res) 
        }
      )
  }

  deleteConfirmation(exam_sch_id) {
    this.selected_schedule = exam_sch_id;  
    this.openAlert("Are you sure to delete the Schedule", true)
  }

  deleteSchedules() {
    this.service.deleteExam_schedules(this.selected_schedule)
      .subscribe(
        res => { 
          if(res == true) {
            this.exam_schedules = this.exam_schedules.filter(res => res.exam_sch_id !== this.selected_schedule)
            this.alert_message = "ExamSchedule Deleted Successfully";
            this.openAlert(this.alert_message, false)
          } else {
            this.alert_message = "ExamSchedule Not Deleted";
            this.openAlert(this.alert_message, false)
          }
        }
      )
  }

  addSchedule() {
    this.selected_schedule = '';
    this.dialog_type = 'add';
    this.openDialog(this.selected_schedule, this.dialog_type)
  }

  editSchedules(i) {
    this.selected_schedule = this.exam_schedules[i];
    this.dialog_type = 'edit';
    this.openDialog(this.selected_schedule, this.dialog_type)
  }

  openDialog(selected_schedule, dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      schedule: selected_schedule,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(EditschedulesComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data),
        this.getExam_schedules();
      }
    );

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
          this.deleteSchedules();
        }
      }
    )
  }

}
