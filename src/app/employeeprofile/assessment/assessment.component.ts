import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { TeacherService } from '../../_services/teacher.service';
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

  constructor(private service: ServicesService, private teacherService: TeacherService, private route: ActivatedRoute, public dialog: MatDialog) { }

  employee_id = this.route.snapshot.paramMap.get('id');
  i;j;
  n = 0;
  showClassList: boolean = false;
  showSectionList: boolean = false;

  alert_message: string;

  teaching_assessments = [
    {
      "subject_id": '',
      "subject_name": '',
      "textbook": '',
      "author": '',
      "examResults": [
          {
              "exam_sch_id": '',
              "subject_id": '',
              "exam_title": '',
              "efficiency": '',
          },
      ],
      "totalEfficiency": ''
    }
  ]

  delivery_assessments = [
    {
      "subject_id": '',
      "subject_name": '',
      "textbook": '',
      "author": '',
      "chapters": [
          {
              "lession_id": '',
              "subject_id": '',
              "title": '',
              "chapter_code": '',
              "lession_status": '',
              "started_date": '',
              "delivery_efficiency": ''
          },
      ],
      "totalEfficiency": ''
    }
  ]

  selected_class: any = {class_id: '', name: ''};
  selected_section: any = {section_id: '', name: ''};

  classes = [];
  sections = [];
  subjects = [];

  chartData = [];
  chartType = 'bar';
  chartLabels = [];
  public chartOptions: any = {
    responsive: true
  };
  public chartLegend: true;

  ngOnInit() {
    localStorage.setItem('employee_id', this.employee_id);
    console.log(localStorage.getItem('employee_id'))
    this.getTeacherClasses();
  }

  getTeacherClasses() {
    this.teacherService.getTeacherClasses(this.employee_id)
    .subscribe(
      res => { this.classes = res.school_classes, this.selected_class = res.school_classes[0], this.getTeacherSections(), console.log(res) }
    )
  }

  getTeacherSections() {
    this.teacherService.getTeacherSections(this.employee_id, this.selected_class.class_id)
    .subscribe(
      res => { this.sections = res.class_sections, this.selected_section = res.class_sections[0], this.getTeachingAssessment(), this.getCourseAssessment(), console.log(res) }
    )
  }

  getTeachingAssessment() {
    this.teacherService.getTeachingAssessment(this.employee_id, this.selected_section.section_id)
    .subscribe(
      res => { this.teaching_assessments = res, this.View(this.n, 'teaching'), console.log(this.teaching_assessments)}
    )
  }

  getCourseAssessment() {
    this.teacherService.getCourseAssessment(this.employee_id, this.selected_section.section_id)
    .subscribe(
      res => { this.delivery_assessments = res, console.log(this.delivery_assessments)}
    )
  }

  // getStudentAcademics() {
  //   if (this.student_id == undefined || this.student_id == '') {
  //     this.alert_message = "Please Select the Student";
  //     this.openAlert(this.alert_message)
  //   } else {
  //     this.service.getStudentAcademics(this.student_id)
  //       .subscribe(
  //         res => { this.academics = res.students[0].exam_marks, this.View(), console.log(res) }
  //       )
  //   }
  // }

  View(n, assessment) {
    this.chartData = [];
    this.chartLabels = [];

    if(assessment === 'teaching') {
      for(this.i = 0; this.i < this.teaching_assessments[n].examResults.length; this.i++) {      
        this.chartData.push(this.teaching_assessments[n].examResults[this.i].efficiency);
        console.log(this.chartData)
        this.chartLabels.push(this.teaching_assessments[n].examResults[this.i].exam_title);
        console.log(this.chartLabels)
      }
    } else if(assessment === 'course') {
      for(this.i = 0; this.i < this.delivery_assessments[n].chapters.length; this.i++) {      
        this.chartData.push(this.delivery_assessments[n].chapters[this.i].delivery_efficiency);
        console.log(this.chartData)
        this.chartLabels.push(this.delivery_assessments[n].chapters[this.i].chapter_code);
      }
    }
  }




  // getExamAcademics() {

  //   if (this.selected_exam == "All") {
  //     this.allExams = true;
  //     this.View();

  //   } else {

  //     this.allExams = false;

  //     this.chartData = [{
  //       label: 'Marks Scored',
  //       data: [],
  //       order: 1
  //     },
  //     {
  //       label: 'Marks Scored',
  //       data: [],
  //       type: 'line',
  //       order: 2
  //     }
  //     ];
  //     this.chartLabels = [];
  //     this.subjectMarks = [];

  //     this.subjectMarks = this.academics.filter(data => data.exam_title === this.selected_exam)[0].subjects;

  //     for (this.i = 0; this.i < this.subjectMarks.length; this.i++) {
  //       this.chartData[0].data.push(this.subjectMarks[this.i].percentage);
  //       this.chartData[1].data.push(this.subjectMarks[this.i].percentage);
  //       this.chartLabels.push(this.subjectMarks[this.i].subject_name)
  //     }
  //   }

  // }

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

