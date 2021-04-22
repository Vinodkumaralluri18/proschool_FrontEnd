import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { TeacherService } from '../../_services/teacher.service';
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

  constructor(private service: ServicesService, private teacherService: TeacherService, private route: ActivatedRoute, public dialog: MatDialog) { }

  employee_id = this.route.snapshot.paramMap.get('id');
  i;j;

  showClassList: boolean = false;
  showSectionList: boolean = false;
  showSubjectList: boolean = false;

  alert_message: string;

  academics = [
    {
      'exam_title': '',
      data: [
        {
          "grade": '',
          "count": '',
          "students": [
            {
              "student_id": '',
              "student_name": ''
            },
          ]
        },
      ],
    },
  ]

  selected_class: any = {class_id: '', name: ''};
  selected_section: any = {section_id: '', name: ''};
  selected_subject: any = {subject_id: '', name: ''};

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
      res => { this.sections = res.class_sections, this.selected_section = res.class_sections[0], this.getTeacherSubjects(), console.log(res) }
    )
  }

  getTeacherSubjects() {
    this.teacherService.getTeacherSubjects(this.employee_id, this.selected_section.section_id)
    .subscribe(
      res => { this.subjects = res.subjects, this.selected_subject = res.subjects[0], this.getAcademicEvaluation(), console.log(res) }
    )
  }

  getAcademicEvaluation() {
    this.teacherService.getAcademicEvaluation(this.selected_subject.subject_id, this.selected_section.section_id)
    .subscribe(
      res => { this.academics = res.students, this.View(), console.log(this.academics)}
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

  View() {
    this.chartData = [
      { data: [], label: 'A1' },
      { data: [], label: 'A2' },
      { data: [], label: 'B1' },
      { data: [], label: 'B2' },
      { data: [], label: 'C1' },
      { data: [], label: 'C2' },
      { data: [], label: 'D' },
      { data: [], label: 'E' },
    ];
    this.chartLabels = [];

    for(this.i = 0; this.i < this.academics.length; this.i++) {      
      for(this.j = 0; this.j < this.academics[this.i].data.length; this.j++) {
        this.chartData[this.j].data.push(this.academics[this.i].data[this.j].count);
    
      }  
      console.log(this.chartData)
      this.chartLabels.push(this.academics[this.i].exam_title);
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
