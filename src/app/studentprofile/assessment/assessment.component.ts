import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { StudentsService } from '../../_services/students.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { appConfig } from '../../app.config';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {

  constructor(private service: ServicesService, private studentservice: StudentsService, private route: ActivatedRoute, public dialog: MatDialog) { }

  student_details: any = {};
  profileImage;

  private url = appConfig.apiUrl;

  ngOnInit() {
    this.getStudentAssessments();
    this.getStudentDetails();
  }

  student_id = this.route.snapshot.paramMap.get('id');
  section_id = this.route.snapshot.paramMap.get('sec_id');
  i;

  assessment_type = "Assignments";
  showSubjectList: boolean = false;

  allAssessments: boolean = true;
  alert_message: string;

  all_assessments:any = [{subjects: []}];
  assessments:any = [{subjects: []}];

  subject_Assessments:any = [];

  selected_subject = 'All Subjects';
  selected_chapter;

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

  getStudentAssessments() {
    if (this.student_id == undefined || this.student_id == '') {
      this.alert_message = "lease Select the Student";
      this.openAlert(this.alert_message)
    } else {
      if (this.assessment_type == "Assignments") {
        this.service.getStudentAssignments(this.student_id, this.section_id)
          .subscribe(
            res => { this.all_assessments = this.assessments = res.students, console.log(res) }
          )
      } else if (this.assessment_type == "Classtests") {
        this.service.getStudentClasstests(this.student_id, this.section_id)
          .subscribe(
            res => { this.all_assessments = this.assessments = res.students, console.log(res) }
          )
      } else if (this.assessment_type == "Projectworks") {
        this.service.getStudentProjectworks(this.student_id, this.section_id)
          .subscribe(
            res => { this.all_assessments = this.assessments = res.students, console.log(res) }
          )
      }
    }
  }

  getSubjectAssessments(select) {
    if(select === 'All') {
      this.selected_subject = 'All Subjects';
      this.allAssessments = true;
      console.log(this.assessments)
    } else {
      this.selected_subject = select.subject_name;
      this.allAssessments = false;
      this.subject_Assessments = this.all_assessments[0].subjects.filter(data => data.subject_id === select.subject_id)[0].chapters;
    }
  }

  select_assessment(select) {
    this.assessment_type = select;
    this.allAssessments = true;
    this.selected_subject = '';
    this.getStudentAssessments();
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
