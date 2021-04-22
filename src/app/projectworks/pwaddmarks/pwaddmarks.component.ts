import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentsService } from '../../_services/assignments.service';
import { TeacherService } from '../../_services/teacher.service';
import { AcademicsService } from '../../_services/academics.service';
import { ServicesService } from '../../services.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-pwaddmarks',
  templateUrl: './pwaddmarks.component.html',
  styleUrls: ['./pwaddmarks.component.css']
})
export class PwaddmarksComponent implements OnInit {

  constructor(private service: ServicesService, private assignmentservice: AssignmentsService, private academicservice: AcademicsService, private teacherService: TeacherService, private route: ActivatedRoute, public dialog: MatDialog) {}
    
  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  user: User;
  
  section_id = this.route.snapshot.paramMap.get('sec_id');
  subject_id = this.route.snapshot.paramMap.get('sub_id');
  projectwork_id = this.route.snapshot.paramMap.get('pw_id');
  data_type = this.route.snapshot.paramMap.get('data_type');

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if(this.data_type === 'add') {
      this.getStudents();
    } else if(this.data_type === 'view') {
      this.getProjectwork_marks();
    }
    this.getprojectDetails();
  }

  pageChange(x) {
    this.pageNo = x;
    this.page_start = (x - 1) * 10;
  }

  alert_message: string;
  students = [];
  students_marks = [];

  projectwork:any = [];
  PW_marks = [];
  i;

  getprojectDetails() {
    if (this.projectwork_id == undefined || this.projectwork_id == '') {
      this.alert_message = "Please Select Projectwork";
      this.openAlert(this.alert_message)
    } else {
      this.projectwork = [];
      this.assignmentservice.getProjectworkDetails(this.projectwork_id)
        .subscribe(
          res => { this.projectwork = res.projectwork, 
            console.log(this.projectwork) 
          }
        )
    }
  }

  getStudents() {
    this.service.getStudents(this.section_id)
      .subscribe(
        res => { this.students = res.students.filter(std => std.status === 1), 
          this.pages = Math.ceil(this.students.length / 10);
          console.log(this.students) 
        }
      )
  }

  getProjectwork_marks() {
    if(this.projectwork_id == undefined || this.projectwork_id == ''){
      this.alert_message = "Please Select Project Work";
      this.openAlert(this.alert_message)
    } else {
      this.assignmentservice.getProjectwork_marks(this.projectwork_id, this.section_id)
      .subscribe(
        res => { this.students = res.PW_marks, 
          this.pages = Math.ceil(this.students.length / 10),
          console.log(res) 
        }
      )
    }
  }

  addProjectwork_marks() {
    if(this.projectwork_id == undefined || this.projectwork_id == '') {
      this.alert_message = "Please Select Project Work";
      this.openAlert(this.alert_message)
    } else {
      var maxMarks = this.projectwork[0].maxMarks;
      this.students.forEach(function(std) {
        if(!std.marks) {
          std.marks = null;
        } else if(std.marks > maxMarks) {
          std.marks = maxMarks;
        } else if(std.marks < 0) {
          std.marks = 0;
        }
      })
      this.service.addProjectwork_marks(this.students, this.section_id, this.subject_id, this.projectwork_id)
      .subscribe(
        res => {
          if (res == true) {
            this.alert_message = "Marks Added Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Marks Not added";
            this.openAlert(this.alert_message)
          }
        }
      )
    }    
  }
  
  editMarks(projectwork_result_id, marks) {
    console.log(this.projectwork[0].maxMarks)
    var maxMarks = this.projectwork[0].maxMarks;
    if (marks > maxMarks || marks < 0 || marks === null) {
      this.alert_message = 'Please Enter Valid Marks';
      this.openAlert(this.alert_message)
      this.students.filter(data => data.projectwork_result_id === projectwork_result_id)[0].marks = "";
    } else {
      this.assignmentservice.editProjectwork_marks(projectwork_result_id, marks)
      .subscribe(
        res => {
          if (res == true) {
            this.getProjectwork_marks();
            this.alert_message = 'Student Marks Edited Successfully';
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = 'Marks Not Edited';
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
