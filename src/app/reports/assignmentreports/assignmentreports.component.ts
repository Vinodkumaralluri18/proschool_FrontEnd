
import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-assignmentreports',
  templateUrl: './assignmentreports.component.html',
  styleUrls: ['./assignmentreports.component.css']
})

export class AssignmentreportsComponent implements OnInit {

  constructor(private service: ServicesService, public dialog: MatDialog) {}
    
  user: User;

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
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

  academics:any = [{subjects: []}]

  // academics:any = [{
  //   student_id: "",
  //   student_name: "",
  //   subjects: [{
  //     subject_id: '',
  //     subject_name: '',
  //   }]
  // }];

  selected_class:string;
  selected_section:string;
  selected_assessment:string = 'Assignments';
  alert_message: string;

  receiveClass($event) {
    this.selected_class = $event
    console.log(this.selected_class)
  }

  receiveSection($event) {
    this.selected_section = $event
    console.log(this.selected_section)
    this.getAssignmentreports();
  }

  select_assessment(assessment) {
    this.selected_assessment = assessment;
    this.getAssignmentreports();
  }

  getAssignmentreports() {
    this.pageChange(1);
    if(this.selected_class == undefined || this.selected_section == undefined) {
      this.alert_message = "Please Select Class and Section";
      this.openAlert(this.alert_message)
    } else if(this.selected_class == '' || this.selected_section == ''){
      this.academics = [];
    } else {
      if (this.selected_assessment == 'Assignments') {
        this.service.getdashboard_assignments(this.selected_section)
          .subscribe(
            res => { this.academics = res.students, 
              this.pageNo = 1,
              this.page_start = 0,
              this.pages = Math.ceil(this.academics.length / 10),
              console.log(res) 
            }
          )
      } else if (this.selected_assessment == 'Class Tests') {
        this.service.getdashboard_classtests(this.selected_section)
          .subscribe(
            res => { this.academics = res.students, 
              this.pageNo = 1,
              this.page_start = 0,
              this.pages = Math.ceil(this.academics.length / 10),
              console.log(res) 
            }
          )
      } else if (this.selected_assessment == 'Project Works') {
        this.service.getdashboard_projectworks(this.selected_section)
          .subscribe(
            res => { this.academics = res.students, 
              this.pageNo = 1,
              this.page_start = 0,
              this.pages = Math.ceil(this.academics.length / 10), 
              console.log(res) 
            }
          )
      }
    }
    // this.pages = Math.ceil(this.academics.length / 10) 
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

  // getreports(event, j) {
  //   this.j = j;
  //   this.selected_chapter = event.target.value;
  //   console.log(j);
  //   console.log(this.selected_chapter)
  //   for(this.i = 0; this.i < this.all_assignments; this.i++) {
  //     this.assignments.push(this.all_assignments[this.i].assignment_marks.filter(ass => ass.chapter_name === this.selected_chapter))
  //   }
  //   console.log(this.assignments)
  //   // this.assignments = this.all_assignments.filter(data => data.)
  // }

}
