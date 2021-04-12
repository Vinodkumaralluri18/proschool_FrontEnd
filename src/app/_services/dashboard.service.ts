import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { appConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  private url = appConfig.apiUrl;
  private school_id = appConfig.school_id;
  private employee_id = appConfig.employee_id;
  private role = appConfig.role;
  private token = appConfig.token;

  getTasks(current_date): Observable<any> {
    console.log(current_date)
    return this.http.get<any>(this.url + '/currentDay_task/' + current_date + '/' + this.school_id);
  }

  getEvents(current_date): Observable<any> {
    return this.http.get<any>(this.url + '/eventsByDate/' + current_date + '/' + this.school_id);
  }

  getNoticeBoard(current_date): Observable<any> {
    return this.http.get<any>(this.url + '/daily_noticeboard/' + current_date + '/' + this.school_id);
  }

  getStudentsAttendance(current_date): Observable<any> {
    return this.http.get<any>(this.url + '/totalstudents_attendance/' + current_date + '/' + this.school_id);
  }

  getEmployeesAttendance(current_date): Observable<any> {
    return this.http.get<any>(this.url + '/totalemployees_attendance/' + current_date + '/' + this.school_id);
  }

  getPayments(current_date): Observable<any> {
    return this.http.get<any>(this.url + '/daily_payments/' + current_date + '/' + this.school_id);
  }

  getExpenses(current_date): Observable<any> {
    return this.http.get<any>(this.url + '/daily_expenses/' + current_date + '/' + this.school_id);
  }

  getStudentAttendance(current_date): Observable<any> {
    return this.http.get<any>(this.url + '/totalstudents_attendance/' + current_date + '/' + this.school_id);
  }

  getEmployeeAttedance(current_date): Observable<any> {
    return this.http.get<any>(this.url + '/totalemployees_attendance/' + current_date + '/' + this.school_id);
  }

  getFeeCollection(): Observable<any> {
    return this.http.get<any>(this.url + '/totalFee_collection/' + this.school_id);
  }

  getSchedules(day, current_date, select_class): Observable<any> {
    console.log(day)
    console.log(current_date)
    console.log(select_class)
    return this.http.get<any>(this.url + '/classes_timetable_by_day/' + day + '/' + current_date + '/' + select_class);
  }

  // Teacher Services

  getClassTeacher_class(): Observable<any> {
    return this.http.get<any>(this.url + '/ClassteacherClassesList/' + this.employee_id);
  }

  getClassTeacher_section(class_id): Observable<any> {
    return this.http.get<any>(this.url + '/ClassteacherSectionsList/' + this.employee_id + '/' + class_id);
  }

  getEmployeeAttendance(): Observable<any> {
    return this.http.get<any>(this.url + '/employee_till_Date_attendence/' + this.employee_id);
  }

  getTeacherSchedule(day): Observable<any> {
    console.log(day)
    return this.http.get<any>(this.url + '/teacher_schedule_by_day/' + day + '/' + this.employee_id + '/' + this.school_id)
  }

  getClassAcademics(section_id): Observable<any> {
    return this.http.get<any>(this.url + '/overall_assessment_marks_by_section_id/' + section_id)
  }

  // Parent Services

  getStudentMonthlyAttendance(month, student_id): Observable<any> {
    return this.http.get<any>(this.url + '/attendancechartbymonth/' + month + '/' + student_id)
  }

  getStudentFeeDetails(student_id): Observable<any> {
    return this.http.get<any>(this.url + '/student_termwise_fee_details/' + student_id + '/' + this.school_id)
  }

  getStudentAcademics(student_id): Observable<any> {
    return this.http.get<any>(this.url + '/all_assessment_marks_by_student_id/' + student_id + '/' + this.school_id)
  }

}
