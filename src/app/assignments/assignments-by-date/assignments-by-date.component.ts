import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../../_services/assignments.service';
import { AcademicsService } from '../../_services/academics.service';
import { TeacherService } from '../../_services/teacher.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { AssignAssignmentsComponent } from '../assign-assignments/assign-assignments.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-assignments-by-date',
  templateUrl: './assignments-by-date.component.html',
  styleUrls: ['./assignments-by-date.component.css']
})
export class AssignmentsByDateComponent implements OnInit {

  constructor(private service: AssignmentsService, private academicsservice: AcademicsService,
  private teacherService: TeacherService, public dialog: MatDialog) { }

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  user: User;
  employee_id;

  current_date;
  current_day;
  current_month;
  current_year;

  ngOnInit() { 
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if (this.user.role === 'parent') {
      console.log(this.user.users[0].section_id)
      this.selected_section = this.user.users[0].section_id;
      this.getAssignments_byDate();
    } else if(this.user.role === 'teacher') {
      this.employee_id = this.user.employee_id;
    }
    var d = new Date();
    this.current_month = d.getMonth() + 1;
    if(this.current_month < 10) {
      this.current_month = '0' + this.current_month;
    }
    this.current_day = d.getDate();
    if(this.current_day < 10) {
      this.current_day = '0' + this.current_day;
    }
    this.current_year = d.getFullYear();
    this.current_date = this.current_year + '-' + this.current_month + '-' + this.current_day;
    this.selected_date = this.current_date;
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

  assignments = [
    {
      name: '',
      subject_id: '',
      assignments: [
        {
          assignment_id: '',
          assignment_title: '',
          subject_id: '',
          lession_id: '',
          chapter_name: '',
          assign_date: '',
          due_date: '',
          maxMarks: '',
          description: '',
        }
      ]
    }
  ];

  subject_assignments: any = [];

  SectionAssignments = [];
  section_assignments = true;
  subjects = [];

  selected_class:string;
  selected_section:string;
  selected_subject:string;
  selected_date;
  selected_assignment;
  dialog_type: string;
  alert_message: string;
  i;

  receiveClass($event) {
    this.selected_class = $event
    console.log(this.selected_class)
  }

  receiveSection($event) {
    this.selected_section = $event
    console.log(this.selected_section)
    // this.getSubjects();
    this.getAssignmentsBySection()
  }

  getAssignmentsBySection() {
    this.section_assignments = true;
    console.log(this.selected_section)
    if(this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class and Section";
      this.openAlert(this.alert_message, false)
    } else if(this.selected_class == 'No Classes' || this.selected_section == 'No Sections') {
      this.assignments = [];
    } else {
      this.service.getAssignmentsBySection(this.selected_section)
      .subscribe(
        res => { this.assignments = res, 
          this.selected_subject = this.assignments[0].subject_id;
          this.subject_assignments = this.assignments[0].assignments;
          this.pageNo = 1,
          this.page_start = 0,
          this.pages = Math.ceil(this.subject_assignments.length / 10),
          console.log(this.assignments) 
        }
      )
    }
  }

  getAssignmentsBySubject(subject_id) {
    this.selected_subject = subject_id;
    this.subject_assignments = this.assignments.filter(data => data.subject_id === subject_id)[0].assignments;
    this.pageNo = 1;
    this.page_start = 0;
    this.pages = Math.ceil(this.subject_assignments.length / 10);
  }

  getAssignments_byDate() {
    this.section_assignments = false;
    console.log(this.selected_date);
    if(this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class and Section";
      this.openAlert(this.alert_message, false)
    } else {
      this.service.getAssignments_byDate(this.selected_date, this.selected_section)
      .subscribe(
        res => { this.assignments = res, console.log(this.assignments) }
      )
    }
  }

  // getSubjects() {
  //   if(this.user.role === 'admin' || this.user.role === 'parent') {
  //     this.academicsservice.getSubjects(this.selected_section)
  //     .subscribe(
  //       res => { this.subjects = res.subjects, console.log(res) }
  //     )
  //   } else if(this.user.role === 'teacher') {
  //     this.teacherService.getTeacherSubjects(this.employee_id, this.selected_section)
  //     .subscribe(
  //       res => { this.subjects = res.subjects, console.log(res) }
  //     )
  //   }
  // }

  deleteConfirmation(assignment_id, i) {
    this.selected_assignment = assignment_id;  
    this.i = i;
    this.openAlert("Are you sure to delete the Assignment", true)
  }

  deleteAssignment() {
    this.service.deleteAssignment(this.selected_assignment)
      .subscribe(
        res => { 
          if(res == true) {
            this.getAssignmentsBySection();
            this.alert_message = "Assignment Deleted Successfully";
            this.openAlert(this.alert_message, false)
          } else {
            this.alert_message = "Assignment Not Deleted";
            this.openAlert(this.alert_message, false)
          }
        }
      )
  }

  addAssignment() {
    if(this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class, Section and Subject";
      this.openAlert(this.alert_message, false)
    } else {
      this.selected_assignment = {
        subjectName: '',
        assignments: [
          {
            assignment_id: '',
            assignment_title: '',
            subject_id: '',
            lession_id: '',
            assign_date: '',
            due_date: '',
            maxMarks: '',
            description: '',
          }
        ]
      };
      this.dialog_type = 'add';
      this.openDialog(this.selected_assignment, this.dialog_type)
    }    
  }

  editAssignment(j) {
    this.selected_assignment = this.subject_assignments[j];
    // this.i = i;
    this.dialog_type = 'edit';
    this.openDialog(this.selected_assignment, this.dialog_type)
  }

  openDialog(selected_assignment, dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      class: this.selected_class,
      section: this.selected_section,
      assignment: selected_assignment,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(AssignAssignmentsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => {
          console.log("Dialog output:", data)          
          if (this.dialog_type == 'add') {
            this.getAssignmentsBySection();
          } else if (this.dialog_type == 'edit') {
            this.getAssignmentsBySection();
          }
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
          this.deleteAssignment();
        }
      }
    )
  }

}
