import { Component, OnInit, ElementRef } from '@angular/core';
import { ServicesService } from '../../services.service';
import { StudentsService } from '../../_services/students.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { appConfig } from '../../app.config';

@Component({
  selector: 'app-academics',
  templateUrl: './academics.component.html',
  styleUrls: ['./academics.component.css']
})
export class AcademicsComponent implements OnInit {

  constructor(private service: ServicesService, private studentservice: StudentsService, private route: ActivatedRoute, public dialog: MatDialog, private el: ElementRef) { }

  student_details: any = {};
  profileImage;

  private url = appConfig.apiUrl;

  ngOnInit() {
    this.getStudentDetails();
    this.getStudentAcademics();
  }

  student_id = this.route.snapshot.paramMap.get('id');
  section_id = this.route.snapshot.paramMap.get('sec_id');
  i;

  allExams:boolean = true;
  alert_message: string;

  academics:any = []

  selected_exam;

  subjectMarks:any = []

  showExamList: boolean = false;

  getStudentDetails() {    
    this.studentservice.getStudentDetails(this.student_id)      
    .subscribe(        
      res => { this.student_details = res.students[0], this.getStudentImage(), console.log(res) 
      }      
    )  
  }

  getStudentImage() {
    this.profileImage = this.url + '/image/' + this.student_details.studentImage.filename;
  }

  getStudentAcademics() {
    if (this.student_id == undefined || this.student_id == '') {
      this.alert_message = "Please Select the Student";
      this.openAlert(this.alert_message)
    } else {
      this.service.getStudentAcademics(this.student_id)
        .subscribe(
          res => { this.academics = res.students[0].exam_marks, console.log(res) }
        )
    }
  }

  setProgressBar(id, height) {
    var elem = document.getElementById(id);
    (elem as HTMLElement).style.setProperty('--progress', height + '%');
  }

  getExamAcademics() {

    if (this.selected_exam == "All") {
      this.allExams = true;

    } else {

      this.allExams = false;

      this.subjectMarks = [];

      this.subjectMarks = this.academics.filter(data => data.exam_title === this.selected_exam)[0].subjects;

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
