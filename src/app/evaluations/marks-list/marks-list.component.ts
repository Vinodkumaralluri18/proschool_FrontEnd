import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-marks-list',
  templateUrl: './marks-list.component.html',
  styleUrls: ['./marks-list.component.css']
})
export class MarksListComponent implements OnInit {

  constructor(private service: ServicesService, private fb: FormBuilder, public dialog: MatDialog) {}

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;
      
  user: User;
  showScheduleList: boolean = false;

  ngOnInit() {
    // this.getassessment_patterns();
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
  parent_schedule: any = {code: ''}
  alert_message: string;

  subjects = [];
  assessment_patterns = [];

  marks = [
    {
      assessments: [

      ]
    }
  ];

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
    console.log(this.selected_schedule)
    this.getEvaluations();
  }

  getEvaluations() {
    if(this.selected_section == undefined || this.selected_schedule == undefined ||
      this.selected_section == '' || this.selected_schedule == '') {
      this.alert_message = "Please Select Class, Section and Exam Schedule";
      this.openAlert(this.alert_message)
    } else {
      this.service.getEvaluations(this.selected_schedule, this.selected_section)
      .subscribe(
        res => { this.marks = res.students, 
          this.pageNo = 1,
          this.page_start = 0,
          this.pages = Math.ceil(this.marks.length / 10),
          console.log(res) 
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
