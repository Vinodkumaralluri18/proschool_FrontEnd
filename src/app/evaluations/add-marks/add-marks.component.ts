import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { User } from '../../_models/user';
import { iif } from 'rxjs';

@Component({
  selector: 'app-add-marks',
  templateUrl: './add-marks.component.html',
  styleUrls: ['./add-marks.component.css']
})
export class AddMarksComponent implements OnInit {

  constructor(private service: ServicesService, private fb: FormBuilder, public dialog: MatDialog) {}

  searchText = ''
  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  showSubjectList: boolean = false;

  subjects = [];
  inner_assessments = [];
  students: any = [];
  studentMarks = [];
  exams: any = [];
  student_marks: any =
    {
      student_id: '',
      assessment_id: '',
      section_id: '',
      assMarks: [{
        Assessment: '',
        marks: '',
        maxMarks: '',
      }]
    }
  selected_subject = {subject_id: '', name: ''};
  totalMarks = 0;
  totalinnermarks = [];
  totalmarks = [];
  subjectMarks = [];
  assMarks = [{'Assessment': '', 'marks': '', 'maxMarks': ''}, {'Assessment': '', 'marks': '', 'maxMarks': ''}, {'Assessment': '', 'marks': '', 'maxMarks': ''}, {'Assessment': '', 'marks': '', 'maxMarks': ''}];
  marks = 0;
  counter = 0;
  marks_status: string;
  examsData: boolean = true;
  add_marks: boolean = false;
  edit_marks: boolean = false;
    
  user: User;
  i;

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

  addExam_papers() {
    // this.service.addExam_papers()
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
  alert_message: string;

  receiveClass($event) {
    this.selected_class = $event
    console.log(this.selected_class);
    if(this.selected_class === '') {
      this.no_data();
    }
  }

  receiveSection($event) {
    this.selected_section = $event
    console.log(this.selected_section);
    if(this.selected_section === '') {
      this.no_data();
    }
  }

  receiveSchedule($event) {
    this.selected_schedule = $event
    console.log(this.selected_schedule)
    if(this.selected_schedule === '') {
      this.no_data();
    } else {
      this.getSubjects();
    }
  }

  getSubjects() {
    if(this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class and Section";
      this.no_data();
    } else {
      this.service.getSubjects(this.selected_section)
      .subscribe(
        res => { 
          if(res.subjects.length > 0) {
            this.subjects = res.subjects;
            this.selected_subject = this.subjects[0]
            this.getExamSchedule(); 
          } else {
            this.no_data();
          }
          console.log(res) }
      )
    }
  }

  getExamSchedule() {
    if(this.selected_subject.subject_id == undefined || this.selected_schedule == undefined ||
      this.selected_subject.subject_id == '' || this.selected_schedule == '') {
      this.alert_message = "Please Select Subject and Exam Schedule";
      this.no_data();
    } else {
      this.totalmarks = [];
      this.service.getExamSchedule(this.selected_schedule, this.selected_section, this.selected_subject.subject_id)
      .subscribe(
        res => { 
          if(res.length > 0) {
            this.exams = res;
            this.getEvaluations(); 
          } else {
            this.alert_message = "Student Exam Marks are not Available"; 
            this.no_data();
          }
          console.log(res) 
        }
      )
    }

  }

  getEvaluations() {
    if(this.selected_subject.subject_id == undefined || this.selected_schedule == undefined ||
      this.selected_subject.subject_id == '' || this.selected_schedule == '') {
      this.alert_message = "Please Select Subject and Exam Schedule";
      this.no_data();
    } else if(this.exams.length === 0) {
      this.alert_message = "Exam is not yet Schedule for the Selected Subject";
      this.no_data();
    } else if(this.exams[0].exam_status === "Pending") {
      this.alert_message = "Exam is not yet Conducted";
      this.no_data();
    } else {
      console.log(this.exams)
      this.totalmarks = [];
      this.service.getSubjectEvaluations(this.selected_schedule, this.selected_section, this.selected_subject.subject_id)
      .subscribe(
        res => { 
          this.marks_status = res.marks_status;
          if(res.students.length > 0) {
            this.students = res.students;
            this.getMarks_status();
          } else {       
            this.alert_message = "Student Exam Marks are not Available";     
            this.no_data();
          }
          console.log(res) 
        }
      )
    }
  }

  getMarks_status() {
    if(this.marks_status === 'Pending') {
      this.add_marks = true;
      this.edit_marks = false;
    } else if(this.marks_status === 'Evaluated') {
      this.add_marks = false;
      this.edit_marks = true;
    }
    this.pageNo = 1;
    this.page_start = 0;
    this.pages = Math.ceil(this.students.length / 10);
  }

  no_data() {
    this.students = [];
    this.add_marks = false;
    this.edit_marks = false;
    this.openAlert(this.alert_message);
  }

  // getSubjectMarks() {
  //   if(this.selected_subject == undefined || this.selected_subject == '') {
  //     this.alert_message = "Please Select Class, Section and Exam Schedule";
  //     this.openAlert(this.alert_message)
  //   } else {
  //     for(this.i = 0; this.i < this.studentMarks.length; this.i++) {
  //       this.subjectMarks.push(this.studentMarks[this.i].assessments.filter(res => res.subject_id === this.selected_subject)[0])
  //     }
  //   }
  // }

  getinner_assessments() {
    if(this.selected_schedule == undefined || this.selected_schedule == '') {
      this.alert_message = "Please Select Schedule";
      this.openAlert(this.alert_message)
    } else {
      this.service.getinner_assessments(this.selected_schedule)
      .subscribe(
        res => { this.inner_assessments = res.assessment[0].assMarks, console.log(this.inner_assessments)}
      )
    }
  }

  add_toStudent(i, j, event) {
    console.log(i);
    console.log(j);
    console.log(event.target.value)
    var marks = parseInt(event.target.value);
    if(marks > parseInt(this.students[i].subjects.assMarks[j].maxMarks)) {
      marks = parseInt(this.students[i].subjects.assMarks[j].maxMarks);
    } else if(marks < 0) {
      marks = 0;
    }
    this.students[i].subjects.assMarks[j].marks = marks;
    this.totalinnermarks[j] = marks;
    this.totalMarks += marks;
    if(j == (this.students[i].subjects.assMarks.length - 1)) {
      this.totalmarks[i] = this.totalMarks;
      this.student_marks.student_id = this.students[i].student_id;
      this.student_marks.exam_paper_id = this.exams[0].exam_paper_id;
      this.student_marks.exam_title = this.students[i].subjects.exam_title;
      this.student_marks.section_id = this.students[i].section_id;
      this.student_marks.assMarks = this.students[i].subjects.assMarks;
      this.studentMarks[i] = this.student_marks;
      console.log(this.studentMarks)
      this.student_marks = {};
      this.totalMarks = 0;
    }
  }

  addEvaluations() {
    console.log(this.totalmarks.length)
    console.log(this.studentMarks.length)
    console.log(this.studentMarks);
    // if(this.totalmarks.length !== this.collection.students.length) {
    //   console.log(this.collection.students.length)
    //   this.alert_message = 'Please Enter All Student Marks';
    //   this.openAlert(this.alert_message)
    //   console.log(this.collection.students)
    //   this.totalmarks = [];
    // }else 
    if(this.students.length = 0) {
      this.alert_message = 'No Students Found';
      this.openAlert(this.alert_message)
      this.totalmarks = [];
    } else if(this.selected_section == undefined || this.selected_schedule == undefined || this.selected_subject.subject_id == undefined ||
      this.selected_section == '' || this.selected_schedule == '' || this.selected_subject.subject_id == '') {
      this.alert_message = "Please Select Class, Section, Schedule and Subject";
      this.openAlert(this.alert_message)
      this.totalmarks = [];
    // } else if(this.add_marks === false){
    //   this.alert_message = "Unable to Add Marks";
    //   this.openAlert(this.alert_message)
    } else if(parseInt(this.exams[0].maxMarks) < 1) {
      this.alert_message = "There is no Max Marks for this Examination";
      this.openAlert(this.alert_message);
      this.totalmarks = [];
    } else {
      console.log(this.students);
      this.service.addEvaluations(this.studentMarks, this.selected_schedule, this.selected_section, this.selected_subject.subject_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.alert_message = "Marks Added Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Marks Not Added";
            this.openAlert(this.alert_message)
          }
        }
      )
    }
  }

  EditMarks(i) {
    this.student_marks.subject_id = this.students[i].subjects.subjectId;
    this.service.editEvaluations(this.studentMarks[i], this.students[i].subjects.subjectId)
    .subscribe(
      res => { 
        if(res == true) {
          this.alert_message = "Marks Added Successfully";
          this.openAlert(this.alert_message)
        } else {
          this.alert_message = "Marks Not Added";
          this.openAlert(this.alert_message)
        }
      }
    )
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