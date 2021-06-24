import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../_services/dashboard.service';
import { ClasessService } from '../../_services/clasess.service';
import { ServicesService } from '../../services.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { User } from '../../_models/user';
import { appConfig } from '../../app.config';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private allservice: ServicesService, private service: DashboardService, private classService: ClasessService, public dialog: MatDialog) { }

  private user: User;
  private currentDate;
  private day;
  private date;
  private month;
  private monthName;
  private year;
  private time;
  private current_date;
  public selectedTab: string = 'tasks';
  i;

  private tasks_tab = true;
  private events_tab = false;
  private notice_tab = false;
  private feedback_tab = false;

  private tab_view = [];
  private tasks = [];
  private events = [];
  private noticeboard = [];
  private feedbacks = [];

  public classes = [];
  public sections = [];
  public selected_class = 'all';
  public selected_section;
  public class_teacher;
  private selected_month: any = 'all';

  private class_attendance = {
    present: '',
    absent: '',
    onleave: '',
    donutchart: [],
  };

  private all_employee_attendance = {
    "totalDays": '',
    "totalAbsent": '',
    "totalOnLeave": '',
    "totalPresent": '',
    "employeeAttendence": [
      {
        "monthName": '',
        "month": '',
        "count": '',
        "attendance": {
          "present": '',
          "absent": '',
          "onLeave": '',
          "presentPercent": '',
          "absentPercent": '',
          "onLeavePercent": ''
        }
      },
    ],
    "designation": '',
    "employee_code": '',
    "job_category": '',
    "employeeName": '',
    "gender": ''
  }

  private monthly_attendance = [];

  private employee_attendance = {
    present: '',
    absent: '',
    onleave: '',
  }

  private classEvaluation = [];

  private studentAttendance: any = {};
  private employeeAttendance: any = {};
  public attendance_data: any = {}

  std_attendance: boolean = true;
  payments_data: boolean = true;

  private payments: any = {};
  private expenses: any = {};
  public finances: any = {}
  public fees;

  private class_schedule = [];
  public section_schedule = [];

  view_fee = [400, 180];
  view_classAttendance = [220, 150]

  public fee_data: any;
  public classAtt_data: any;
  public empAtt_data: any;
  public classAcademics = [];
  public classAca_data: any;

  private months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  public feesLoading;
  ngOnInit() {
    console.log(appConfig.activities)
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user);
    this.today_date();
    console.log(this.current_date)
    this.getTasks();
    this.getEvents();
    if (this.user.role === "admin") {
      this.getClasses();
      this.getStudentAttendance();
      this.getEmployeeAttedance();
      console.log({'attendance': this.attendance_data})
      this.getPayments();
      this.getExpenses();
      this.feesLoading = true;
      this.getFeeCollection();
    } else if (this.user.role === "teacher") {
      this.getClassTeacher_class();
      this.getEmployeeAttendance();
      this.getTeacherSchedule();
    }
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
    if (this.date < 10) {
      this.date = '0' + this.date;
    }
    this.current_date = this.year + '-' + this.month + '-' + this.date;
  }

  select_tab(select) {
    if (select == 'tasks_tab') {
      this.getTasks();
      this.tasks_tab = true;
      this.events_tab = false;
      this.notice_tab = false;
      this.feedback_tab = false;
    } else if (select == 'events_tab') {
      this.getEvents();
      this.tasks_tab = false;
      this.events_tab = true;
      this.notice_tab = false;
      this.feedback_tab = false;
    } else if (select == 'notice_tab') {
      this.getNoticeBoard();
      this.tasks_tab = false;
      this.events_tab = false;
      this.notice_tab = true;
      this.feedback_tab = false;
    } else if (select == 'feedback_tab') {
      this.getTasks();
      this.tasks_tab = false;
      this.events_tab = false;
      this.notice_tab = false;
      this.feedback_tab = true;
    }
  }

  getClassTeacher_class() {
    this.service.getClassTeacher_class()
      .subscribe(
        res => { this.classes = res.school_classes.filter(res => res.status === 1), this.getClassTeacher_section(this.classes[0].class_id), console.log(this.classes) }
      )
  }

  getClassTeacher_section(class_id) {
    this.selected_class = class_id;
    this.service.getClassTeacher_section(this.selected_class)
      .subscribe(
        res => { this.sections = res.class_sections.filter(res => res.status === 1), this.selected_section = this.sections[0].section_id, this.getClassAttendance(), this.getClassAcademics(), console.log(res) }
      )
  }

  getClassAttendance() {
    this.allservice.getAttendance(this.current_date, this.selected_section)
      .subscribe(
        res => { this.class_attendance = res, this.viewClassAttendance(), console.log(this.class_attendance) }
      )
  }

  getEmployeeAttendance() {
    this.service.getEmployeeAttendance()
      .subscribe(
        res => { this.all_employee_attendance = res,
            this.employee_attendance.present = res.totalPresent;
            this.employee_attendance.absent = res.totalAbsent;
            this.employee_attendance.onleave = res.totalOnLeave;
            this.viewEmployeeAttendance(), 
            console.log(this.all_employee_attendance) }
      )
  }

  getAttendance(select) {
    if(select == 'students') {
      this.attendance_data = this.studentAttendance;
      this.std_attendance = true;
    } else if(select == 'employees') {
      this.attendance_data = this.employeeAttendance;
      this.std_attendance = false;
    }
    console.log(this.attendance_data)
  }

  getmonthlyEmployeeAttendance() {
    console.log(this.selected_month)
    if(this.month === 'all') {
      this.employee_attendance.present = this.all_employee_attendance.totalPresent;
      this.employee_attendance.absent = this.all_employee_attendance.totalAbsent;
      this.employee_attendance.onleave = this.all_employee_attendance.totalOnLeave;
    } else {
      this.selected_month = (this.selected_month)
      this.employee_attendance.present = this.all_employee_attendance.employeeAttendence.filter(data => data.month === (this.selected_month + 1))[0].attendance.present;
      this.employee_attendance.absent = this.all_employee_attendance.employeeAttendence.filter(data => data.month === (this.selected_month + 1))[0].attendance.absent;
      this.employee_attendance.onleave = this.all_employee_attendance.employeeAttendence.filter(data => data.month === (this.selected_month + 1))[0].attendance.onLeave;
      console.log(this.employee_attendance)
    }
    this.viewEmployeeAttendance();
  }

  getTeacherSchedule() {
    console.log(this.day)
    this.service.getTeacherSchedule(this.day)
    .subscribe(
      res => { this.section_schedule = res.teacherSchedule, console.log(this.section_schedule) }
    )
  }

  getClassAcademics() {
    this.service.getClassAcademics(this.selected_section)
    .subscribe(
      res => { this.classEvaluation = res.students, console.log(this.classEvaluation) }
    )
  }

  getTasks() {
    this.service.getTasks(this.current_date)
      .subscribe(
        res => { this.tasks = res.tasks, console.log(res) }
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
    this.service.getStudentAttendance(this.current_date)
      .subscribe(
        res => { this.studentAttendance = this.attendance_data = res.school_attendance }
      )
  }

  getEmployeeAttedance() {
    this.service.getEmployeeAttedance(this.current_date)
      .subscribe(
        res => { this.employeeAttendance = res.Employee_attendance, console.log(this.employeeAttendance) }
      )
  }

  getPayments() {
    this.service.getPayments(this.current_date)
      .subscribe(
        res => { this.payments = this.finances = res, console.log(res) }
      )
  }

  getExpenses() {
    this.service.getExpenses(this.current_date)
      .subscribe(
        res => { this.expenses = res, console.log(res) }
      )
  }

  getFinance(select) {
    if(select === 'payments') {
      this.finances = this.payments;
      this.payments_data = true;
    } else if(select === 'expenses') {
      this.finances = this.expenses;
      this.payments_data = false;
    }
    console.log(this.finances)
  }

  getFeeCollection() {
    this.service.getFeeCollection()
      .subscribe(
        res => { 
          this.feesLoading = false
          if(this.selected_class === 'all') {
            this.fees = res
          } else {
            this.fees = res.classFee.filter(data => data.class_id === this.selected_class)[0]
          }
          // this.fees = res, this.viewFees() 
        }
      ), (err) => {
        this.feesLoading = false
      }
  }

  getClasses() {
    this.classService.getClasses()
      .subscribe(
        res => { this.classes = res.school_classes.filter(data => data.status === 1), this.selected_class = res.school_classes[0].class_id, this.getSchedules(), console.log(res) }
      )
  }

  getSchedules() {
    console.log(this.selected_class)
    this.service.getSchedules(this.day, this.current_date, this.selected_class)
      .subscribe(
        res => { this.class_schedule = res.timetable, this.getSections(), console.log(res) }
      )
  }

  getSections() {
    this.classService.getSections(this.selected_class)
      .subscribe(
        res => { this.sections = res.class_sections.filter(data => data.status === 1), this.selected_section = res.class_sections[0].section_id, this.getSectionSchedule(), console.log(res) }
      )
  }

  getSectionSchedule() {
    this.section_schedule = this.class_schedule.filter(data => data.section_id === this.selected_section)
    this.getClassTeacher();
    console.log(this.section_schedule)
  }

  getClassTeacher() {
    this.class_teacher = this.sections.filter(data => data.section_id === this.selected_section)[0].teacher_name;
  }

  viewFees() {
    this.fee_data = [
      { "name": "Total", "value": this.fees.totalFees },
      { "name": "Collected", "value": this.fees.paidFees },
      { "name": "Balance", "value": this.fees.balanceFees }
    ];
  }

  viewClassAttendance() {
    this.classAtt_data = [
      { "name": "Present", "value": this.class_attendance.present },
      { "name": "Absent", "value": this.class_attendance.absent },
      { "name": "Leave", "value": this.class_attendance.onleave }
    ];
  }

  viewEmployeeAttendance() {
    this.empAtt_data = [
      { "name": "Present", "value": this.employee_attendance.present },
      { "name": "Absent", "value": this.employee_attendance.absent },
      { "name": "Leave", "value": this.employee_attendance.onleave }
    ];
  }
}
