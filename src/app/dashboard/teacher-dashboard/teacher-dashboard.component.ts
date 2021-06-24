import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../_services/dashboard.service';
import { TeacherService } from '../../_services/teacher.service';
import { ClasessService } from '../../_services/clasess.service';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {

  constructor(private service: DashboardService, private teacherservice: TeacherService, private classService: ClasessService, public dialog: MatDialog) { }

  employee_id;

  private currentDate;
  private day;
  private date;
  private month;
  public monthName;
  private year;
  private time;
  private current_date

  public schedule_tab = true;
  public tasks_tab = false;
  public events_tab = false;
  public claims_tab = false;

  public classTeacher:any = {};
  public section_attendance: any = [];
  public employeeAttendance: any = [];
  public employeeSchedule: any = [];
  private classSchedule: any = [];

  private tab_view: any = [];
  private tasks: any = [];
  private events: any = [];
  private noticeboard: any = [];
  private claims: any = [];

  private classes: any = [];
  private sections: any = [];
  private selected_class;
  private selected_section;

  public fees:any = {};

  private months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  ngOnInit() {
    this.employee_id = JSON.parse(localStorage.getItem('currentUser')).employee_id;
    this.today_date();
    this.getClassTeacher();
    this.getClass_Schedule();
    this.getEmployee_Attendance();
    this.getEmployee_Schedule();
  }

  today_date() {
    this.currentDate = new Date();
    this.date = this.currentDate.getDate();
    this.day = this.currentDate.getDay();
    this.month = this.currentDate.getMonth() + 1;
    this.monthName = this.months[this.month - 1];
    this.year = this.currentDate.getFullYear();
    if (this.date < 10) {
      this.date = '0' + this.date;
    }
    if (this.month < 10) {
      this.month = '0' + this.month;
    }
    this.current_date = this.year + '-' + this.month + '-' + this.date;
    console.log(this.current_date)
  }

  select_tab(select) {
    if (select == 'tasks_tab') {
      this.getTasks();
      this.tasks_tab = true;
      this.events_tab = false;
      this.schedule_tab = false;
      this.claims_tab = false;
    } else if (select == 'events_tab') {
      this.getEvents();
      this.tasks_tab = false;
      this.events_tab = true;
      this.schedule_tab = false;
      this.claims_tab = false;
    } else if (select == 'schedule_tab') {
      this.getClass_Schedule();
      this.tasks_tab = false;
      this.events_tab = false;
      this.schedule_tab = true;
      this.claims_tab = false;
    } else if (select == 'claims_tab') {
      this.getDayClaims();
      this.tasks_tab = false;
      this.events_tab = false;
      this.schedule_tab = false;
      this.claims_tab = true;
    }
  }

  getClassTeacher() {
    this.teacherservice.getClassTeacher(this.employee_id)
    .subscribe(
      res => { 
        this.classTeacher = res.class_teacher[0],
        this.getSectionAttendance();
        this.getsectionFees();
      }
    )
  }

  getTasks() {
    this.teacherservice.getTeacherTasks(this.employee_id)
      .subscribe(
        res => { this.tasks = res.tasks.filter(data => data.due_date === this.current_date) }
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

  getClass_Schedule() {
    this.teacherservice.getClass_Schedule(this.current_date, this.employee_id)
      .subscribe(
        res => { this.classSchedule = res.class_schedules }
      )
  }

  getSectionAttendance() {
    this.teacherservice.getSectionAttendance(this.current_date, this.classTeacher.section_id)
      .subscribe(
        res => { this.section_attendance = res }
      )
  }

  getEmployee_Attendance() {
    this.teacherservice.getEmployee_Attendance(this.month, this.employee_id)
      .subscribe(
        res => { this.employeeAttendance = res }
      )
  }

  getEmployee_Schedule() {
    this.teacherservice.getEmployee_Schedule(this.day, this.employee_id)
      .subscribe(
        res => { this.employeeSchedule = res.timetable }
      )
  }

  getDayClaims() {
    this.teacherservice.getDayClaims(this.current_date, this.employee_id)
      .subscribe(
        res => { this.claims = res.claims }
      )
  }

  getsectionFees() {
    this.teacherservice.getsectionFees(this.classTeacher.section_id)
      .subscribe(
        res => { 
          this.fees = res, 
          console.log(this.fees) 
        } 
      )
  }

  // getClasses() {
  //   this.classService.getClasses()
  //     .subscribe(
  //       res => { this.classes = res.school_classes, console.log(res)}
  //     )
  // }

  // getSections() {
  //   this.classService.getSections(this.selected_class)
  //     .subscribe(
  //       res => { this.sections = res.class_sections, console.log(res)}
  //     )
  // }

}