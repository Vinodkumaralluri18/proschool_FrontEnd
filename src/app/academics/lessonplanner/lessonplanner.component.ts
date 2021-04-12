import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-lessonplanner',
  templateUrl: './lessonplanner.component.html',
  styleUrls: ['./lessonplanner.component.css']
})
export class LessonplannerComponent implements OnInit {

  constructor(private service: ServicesService, public dialog: MatDialog) {}

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  user: User;
  i;

  ngOnInit() { 
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if (this.user.role === 'parent') {
      console.log(this.user.users[0].section_id)
      this.selected_section = this.user.users[0].section_id;
      this.getSubjects();
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

  subjects = [];
  chapters = [];
  start_date;
  end_date;

  daysCalculation = 0;

  selected_class:string;
  selected_section:string;
  selected_subject:string;
  alert_message: string;

  receiveClass($event) {
    this.selected_class = $event
    console.log(this.selected_class)
  }

  receiveSection($event) {
    this.selected_section = $event
    console.log(this.selected_section)
  }

  receiveSubject($event) {
    this.selected_subject = $event
    console.log(this.selected_subject)
    this.getChapters();
  }

  getSubjects() {
    this.service.getSubjects(this.selected_section)
      .subscribe(
        res => { this.subjects = res.subjects, console.log(res) }
      )
  }
  
  getChapters() {
    if(this.selected_subject == undefined || this.selected_subject == '') {
      this.alert_message = "Please Select Class, Section and Subject";
      this.openAlert(this.alert_message)
    } else {
      this.service.getChapters(this.selected_subject)
      .subscribe(
        res => { 
          this.chapters = res.chapters,
          this.pageNo = 1,
          this.page_start = 0,
          this.pages = Math.ceil(this.chapters.length / 10),
          console.log(res) 
        }
      )
    }
  }

  getDays(i) {
    this.start_date = new Date(this.chapters[i].start_date);
    this.end_date = new Date(this.chapters[i].end_date);
    this.chapters[i].days = ((this.end_date.getTime() - this.start_date.getTime()) / (1000 * 24 * 60 * 60)) + 1;
  }

  addPlanner() {
    for(this.i = 0; this.i < this.chapters.length; this.i++) {
      if(this.chapters[this.i].days > 0) {
        this.daysCalculation++;
      }
    }
    if(this.daysCalculation === this.chapters.length) {
      this.service.addPlanner(this.chapters)
      .subscribe(
        res => { 
          if(res == true) {
            this.alert_message = "Lesson-Plan Updated Successfully";
            this.openAlert(this.alert_message)
            this.daysCalculation = 0;
          } else {
            this.alert_message = "Lesson-Plan Not Updated";
            this.openAlert(this.alert_message)
          }
        }
      )
    } else {
      this.daysCalculation = 0;
      this.alert_message = "Please Enter End Date greater than Start Date";
      this.openAlert(this.alert_message);
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
