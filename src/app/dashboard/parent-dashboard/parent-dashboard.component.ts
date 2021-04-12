import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../_services/dashboard.service';
import { User } from '../../_models/user';
import { Graph } from '../../_models/graph';

@Component({
  selector: 'app-parent-dashboard',
  templateUrl: './parent-dashboard.component.html',
  styleUrls: ['./parent-dashboard.component.css']
})
export class ParentDashboardComponent implements OnInit {

  constructor(private service: DashboardService) { }

  private user: User;
  private student_details;
  private currentDate;
  private day;
  private date;
  private month;
  private monthName;
  private year;
  private time;
  private current_date;
  i;

  private tasks_tab = true;
  private events_tab = false;
  private notice_tab = false;
  private feedback_back = false;
  
  private tab_view = [];
  private tasks = [];
  private events = [];
  private noticeboard = [];
  private feedbacks = [];

  private selected_month = new Date().getMonth();
  private student_attendance = {
    "donutchart": [

    ],
    "count": 5,
    "present": 4,
    "onleave": 0,
    "absent": 1,
    "presentpercent": "80.00",
    "absentpercent": "20.00",
    "leavepercent": "0.00"
  };
  private studentEvaluation = [];
  private student_fees = {
    "totalFee": '',
    "PaidFee": '',
    "BalanceFee": '',
    "Discount": '',
    "Fine": '',
    "TermwiseFee": []
  };
  private student_academics = [];
  private class_schedule = [];
  private section_schedule = [];

  view_fee = [400, 160];
  view_classAttendance = [220, 150]
  showXAxis = true;
  showYAxis = false;
  gradient = false;
  showLegend = true;
  showXAxisLabel = false;
  showYAxisLabel = false;
  FeexAxisLabel: any;
  FeeyAxisLabel: any;
  AcademicsxAxisLabel: any;
  AcademicsyAxisLabel: any;
  timeline = false;
  AttcolorScheme = {
    domain: []
  };
  FeecolorScheme = {
    domain: []
  };
  AcademicscolorScheme = {
    domain: []
  }
  showLabels = true;
  public fee_data: any;
  public stdAtt_data: any;
  public stdfee_data: any;
  public stdacad = [];
  public stdacad_data: Graph[] = [];

  chartData = [{
    label: 'Marks Scored',
    data: [],
  }];
  chartType = 'bar';
  chartLabels = [];
  public chartOptions: any = {
    responsive: true
  };
  public chartLegend: true;

  private months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.student_details = this.user.users[0];
    console.log(this.student_details)
    this.today_date();
    this.getTasks();
    this.getStudentAttendance();
    this.getStudentFeeDetails();
    this.getStudentAcademics();
    this.getSchedules();
  }

  today_date() {
    this.currentDate = new Date();
    this.date = this.currentDate.getDate();
    this.day = this.currentDate.getDay();
    this.month = this.currentDate.getMonth() + 1;
    this.monthName = this.months[this.month - 1];
    this.year = this.currentDate.getFullYear();
    if (this.month < 10) {
      this.month = '0' + this.month;
    }
    this.current_date = this.year + '-' + this.month + '-' + this.date;
  }

  select_tab(select) {
    if (select == 'tasks_tab') {
      this.getTasks();
      this.tasks_tab = true;
      this.events_tab = false;
      this.notice_tab = false;
      this.feedback_back = false;
    } else if (select == 'events_tab') {
      this.getEvents();
      this.tasks_tab = false;
      this.events_tab = true;
      this.notice_tab = false;
      this.feedback_back = false;
    } else if (select == 'notice_tab') {
      this.getNoticeBoard();
      this.tasks_tab = false;
      this.events_tab = false;
      this.notice_tab = true;
      this.feedback_back = false;
    } else if (select == 'feedback_back') {
      this.getTasks();
      this.tasks_tab = false;
      this.events_tab = false;
      this.notice_tab = false;
      this.feedback_back = true;
    }
  }

  getTasks() {
    this.service.getTasks(this.current_date)
      .subscribe(
        res => { this.tasks = res.tasks }
      )
  }

  getEvents() {
    this.service.getEvents(this.current_date)
      .subscribe(
        res => { this.events = res.school_events }
      )
  }

  getNoticeBoard() {
    this.service.getNoticeBoard(this.current_date)
      .subscribe(
        res => { this.noticeboard = res.noticeboard }
      )
  }

  getStudentAttendance() {
    this.service.getStudentMonthlyAttendance(this.selected_month + 1, this.student_details.student_id)
    .subscribe(
      res => { this.student_attendance = res, this.viewStudentAttendance(), console.log(this.student_attendance)}
    )
  }

  getStudentFeeDetails() {
    this.service.getStudentFeeDetails(this.student_details.student_id)
    .subscribe(
      res => { this.student_fees = res.TermFeeDetails[0], this.viewStudentFee(), console.log(this.student_fees)}
    )
  }

  getSchedules() {
    this.service.getSchedules(this.day, this.current_date, this.student_details.class_id)
      .subscribe(
        res => { this.class_schedule = res.timetable, this.getSectionSchedule(), console.log(res) }
      )
  }

  getSectionSchedule() {
    this.section_schedule = this.class_schedule.filter(data => data.section_id === this.student_details.section_id)
    console.log(this.section_schedule)
  }

  getStudentAcademics() {
    this.service.getStudentAcademics(this.student_details.student_id)
      .subscribe(
        res => { this.student_academics = res.students[0].exam_marks, this.viewStudentAcademics(), console.log(this.student_academics) }
      )
  }

  viewStudentAttendance() {
    const isDoughnut: boolean = false;
    const legendPosition: string = 'below';
    this.showLegend = false;
    this.AttcolorScheme = {
      domain: ['#5cb85c', '#d9534f', '#f0ad4e']
    };

    this.stdAtt_data = [
      { "name": "Present", "value": this.student_attendance.present },
      { "name": "Absent", "value": this.student_attendance.absent },
      { "name": "Leave", "value": this.student_attendance.onleave }
    ];

  }

  viewStudentFee() {
    this.showLegend = false;
    this.FeecolorScheme = {
      domain: ['#f0ad4e', '#5cb85c', '#d9534f']
    };

    this.stdfee_data = [
      { "name": "Total Fee", "value": this.student_fees.totalFee },
      { "name": "Paid Fee", "value": this.student_fees.PaidFee },
      { "name": "Balance Fee", "value": this.student_fees.BalanceFee }
    ];
  }

  viewStudentAcademics() { 
    
    for(this.i = 0; this.i < this.student_academics.length; this.i++) {

      if(this.student_academics[this.i].percentage !== null) {
        this.AcademicscolorScheme.domain.push('#5e81f4');      
        this.stdacad.push({name: this.student_academics[this.i].exam_title, value: this.student_academics[this.i].percentage})
      }
    }
    this.stdacad_data = this.stdacad;
  }

  // viewStudentAcademics() {

  //   this.chartData = [{
  //     label: 'Marks Scored',
  //     data: [],
  //   }];
  //   this.chartLabels = [];

  //   for (this.i = 0; this.i < this.student_academics.length; this.i++) {
  //     this.chartData[0].data.push(this.student_academics[this.i].percentage);
  //     this.chartLabels.push(this.student_academics[this.i].exam_title)
  //   }
  // }

}
