import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { appConfig } from './app.config';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  private url = appConfig.apiUrl;
  private school_id = appConfig.school_id;
  private role = appConfig.role;
  private token = appConfig.token;
  empty_data;

  // Registration
  register(data): Observable<any> {
    return this.http.post<any>(this.url + '/schools', data)
  }

  editSchoolDetails(data, school_id): Observable<any> {  
    console.log(school_id)  
    return this.http.put<any>(this.url + '/edit_school_details/' + school_id, data)  
  }  

  editSchool_managementDetails(data, school_id): Observable<any> {  
    console.log(school_id)  
    return this.http.put<any>(this.url + '/edit_schoolManagement_details/' + school_id, data)  
  } 

  editSchool_contactDetails(data, school_id): Observable<any> {  
    console.log(school_id)  
    return this.http.put<any>(this.url + '/edit_schoolContact_details/' + school_id, data)  
  } 
  
  getSchools() : Observable<any> {    
    return this.http.get<any>(this.url + '/school_details/' + this.school_id)  
  }

  addSchoolImags(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/schools_photo_edit/' + this.school_id, data)
  }

  addProfileImage(formData): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post<any>(this.url + '/schools_photo_edit/' + this.school_id, formData, {headers: headers} )
  }

  addSchoolLogo(formData): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post<any>(this.url + '/school_Logo_edit/' + this.school_id, formData, {headers: headers} )
  }

  // Dashboard
  getday_attendance(select_date): Observable<any> {
    return this.http.get<any>(this.url + '/all_cses_att_date_testing/' + select_date + '/' + this.school_id);
  }

  getday_schedule(day, select_date, select_class): Observable<any> {
    return this.http.get<any>(this.url + '/classes_timetable_by_day/' + day + '/' + select_date + '/' + select_class);
  }

  getdashboard_assignments(selected_section): Observable<any> {
    return this.http.get<any>(this.url + '/all_assignment_marks_by_section_id/' + selected_section);
  }

  getdashboard_classtests(selected_section): Observable<any> {
    return this.http.get<any>(this.url + '/all_classTests_marks_by_section_id/' + selected_section);
  }

  getdashboard_projectworks(selected_section): Observable<any> {
    return this.http.get<any>(this.url + '/all_projectworks_marks_by_section_id/' + selected_section);
  }

  getdashboard_fees(section_id): Observable<any> {
    return this.http.get<any>(this.url + '/section_student_termfee_details/' + section_id + '/' + this.school_id);
  }

  // Class  
  getClasses(): Observable<any> {
    return this.http.get<any>(this.url + '/school_classes/' + this.school_id);
  }

  addClass(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/school_classes/' + this.school_id, data)
  }

  // Sections
  getSections(selected_class): Observable<any> {
    return this.http.get<any>(this.url + '/class_sections/' + selected_class);
  }

  addSection(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/class_sections/' + this.school_id, data)
  }

  // School Timings
  getTimings(): Observable<any> {
    return this.http.get<any>(this.url + '/session_timings/' + this.school_id);
  }

  addTimings(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/session_timings/' + this.school_id, data)
  }

  // Assessment Patterns
  getassessment_patterns(): Observable<any> {
    return this.http.get<any>(this.url + '/school_assessments/' + this.school_id)
  }

  // Inner Assessment Patterns
  getinner_assessments(selected_schedule): Observable<any> {
    return this.http.get<any>(this.url + '/assessments/' + selected_schedule + '/' + this.school_id)
  }

  // User Info 
  getParentsInfo(section_id): Observable<any> {
    return this.http.get<any>(this.url + '/get_parents_by_section_id/' + section_id);
  } 
  
  getEmployeesInfo(employee_type): Observable<any> {
    return this.http.get<any>(this.url + '/Staff_information/' + employee_type + '/' + this.school_id);
  } 

  // Tasks 
  getTasks(): Observable<any> {
    return this.http.get<any>(this.url + '/tasks_manager/' + this.school_id);
  } 
  
  addTasks(data): Observable<any> {
    return this.http.get<any>(this.url + '/task/' + this.school_id);
  } 

  
  // Payments
  getPayments(): Observable<any> {
    return this.http.get<any>(this.url + '/payments/' + this.school_id);
  } 
  
  addPayments(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/addpayment/' + this.school_id, data);
  } 

  // Expenses
  getExpenses(): Observable<any> {
    return this.http.get<any>(this.url + '/expenses/' + this.school_id);
  } 
  
  addExpenses(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/expenses/' + this.school_id, data);
  } 

  update_expense(data, expense_id): Observable<any> {
    console.log(data)
    var test = {
      payment_status: data
    }
    return this.http.put<any>(this.url + '/update_expense/' + expense_id, test);
  } 

  // Claims
  getClaims(): Observable<any> {
    return this.http.get<any>(this.url + '/claims/' + this.school_id);
  } 
  
  addClaims(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/claims/' + this.school_id, data);
  } 

  update_claim(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/update_claim/' + this.school_id, data);
  } 

  // Students
  getStudents(section_id): Observable<any> {
    return this.http.get<any>(this.url + '/students/' + section_id);
  }

  addStudentadmission(section_id, data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/students/' + section_id + '/' + this.school_id, data)
  }

  getStudentAttendance(month, student_id): Observable<any> {
    return this.http.get<any>(this.url + '/attendancechartbymonth/' + month + '/' + student_id)
  }

  getStudentAcademics(student_id): Observable<any> {
    return this.http.get<any>(this.url + '/all_assessment_marks_by_student_id/' + student_id + '/' + this.school_id)
  }

  getStudentAssignments(student_id, section_id): Observable<any> {
    return this.http.get<any>(this.url + '/all_assignment_marks_by_student_id/' + student_id + '/' + section_id)
  }

  getStudentClasstests(student_id, section_id): Observable<any> {
    return this.http.get<any>(this.url + '/all_classtest_marks_by_student_id/' + student_id + '/' + section_id)
  }

  getStudentProjectworks(student_id, section_id): Observable<any> {
    return this.http.get<any>(this.url + '/all_projectworks_marks_by_student_id/' + student_id + '/' + section_id)
  }

  getStudentFees(student_id): Observable<any> {
    return this.http.get<any>(this.url + '/student_termwise_fee_details/' + student_id + '/' + this.school_id)
  }

  getStudentTermFees(student_id, fee_term): Observable<any> {
    return this.http.get<any>(this.url + '/student_termwise_fee_details/' + student_id + '/' + fee_term + '/' + this.school_id)
  }

  // Employees
  getEmployees(): Observable<any> {
    return this.http.get<any>(this.url + '/employee/' + this.school_id);
  }

  // Student Attendance
  getAttendanceSubjects(day, section_id): Observable<any> {
    return this.http.get<any>(this.url + '/class_timetable_by_day/' + day + '/' + section_id);
  }

  getAttendance(date, section_id): Observable<any> {
    console.log(section_id)
    return this.http.get<any>(this.url + '/attendancechartbydate/' + date + '/' + section_id);
  }

  getRangeAttendance(class_id, section_id, start_date, end_date): Observable<any> {
    console.log(section_id)
    return this.http.get<any>(this.url + '/attendanceByRange/' + start_date + '/' + end_date + '/' + section_id);
  }

  addAttendance(data, date, class_id, section_id, subject_id, unique_id): Observable<any> {
    var test = {
      "students": data,
      "section_id": '',
      "subject_id": subject_id,
      "unique_id": unique_id,
    };
    console.log(unique_id)
    return this.http.post<any>(this.url + '/attendancebulk/' + date + '/' + class_id + '/' + section_id + '/' + this.school_id, test)
  }

  getMonthAttendance(month, section_id): Observable<any> {
    console.log(month)
    return this.http.get<any>(this.url + '/section_monthly_attendence_students_dates/' + month + '/' + section_id)
  }

   // Employee Attendance
   getEmployeeAttendance(category, date): Observable<any> {
    console.log(category)
    return this.http.get<any>(this.url + '/employee_Attendance_by_category/' + category + '/' + date + '/' + this.school_id);
  }

  getEmployeeRangeAttendance(category, start_date, end_date): Observable<any> {
    console.log(category)
    return this.http.get<any>(this.url + '/employee_attendanceByRange/' +  this.school_id + '/' + category + '/' + start_date + '/' + end_date);
  }

  addEmployeeAttendance(data, date): Observable<any> {
    var test = {
      "employees": data,
    };
    console.log(data)
    return this.http.post<any>(this.url + '/employee_attendancebulk/' + date + '/' + this.school_id, test)
  }

  getEmployeeMonthlyAttendance(month, employee_id): Observable<any> {
    return this.http.get<any>(this.url + '/employeeattendancebymonth/' + month + '/' + employee_id)
  }

  // Subjects
  getSubjects(section_id): Observable<any> {
    console.log(section_id)
    return this.http.get<any>(this.url + '/subjects/' + section_id);
  }

  addSubject(data, section_id): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/subjects/' + section_id, data)
  }

  // Chapters
  getChapters(subject_id): Observable<any> {
    return this.http.get<any>(this.url + '/course_works/' + subject_id);
  }

  addChapter(data, subject_id): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/course_works/' + subject_id, data)
  }

  // Topics
  getTopics(chapter_id): Observable<any> {
    return this.http.get<any>(this.url + '/topics/' + chapter_id);
  }

  addTopics(data, chapter_id, subject_id): Observable<any> {
    var test = {
      topic_name: data
    }
    console.log(data)
    return this.http.post<any>(this.url + '/topics/' + chapter_id + '/' + subject_id, test)
  }

  updateStatus(data, chapter_id, topic_id): Observable<any> {
    console.log(data)
    console.log(topic_id)
    var test = {
      topic_status: data
    }
    return this.http.put<any>(this.url + '/topic_status/' + chapter_id + '/' + topic_id, test)
  }

  // Assign Subjects
  getTeachers(section_id): Observable<any> {
    return this.http.get<any>(this.url + '/listsubjectstoteacher_by_sectionId/' + section_id)
  }

  assignTeachers(data, section_id): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/addorupdatesubjectstoteacher/' + this.school_id + '/' + section_id, data)
  }

  // Lesson Planner
  addPlanner(data): Observable<any> {
    console.log(data)
    var test = {
      chapters: data
    }
    return this.http.put<any>(this.url + '/lesson_planner/' + this.school_id, test)
  }

  // Assignments
  getAssignments_byDate(date, section_id): Observable<any> {
    return this.http.get<any>(this.url + '/student_assignment/' + date + '/' + section_id);
  }

  getAssignments(lession_id): Observable<any> {
    return this.http.get<any>(this.url + '/assignments/' + lession_id);
  }

  addAssignment(data, section_id): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/assignments/' + section_id, data)
  }

  // Assignment Marks
  getAssignment_marks(section_id, subject_id, lession_id, assignment_id): Observable<any> {
    return this.http.get<any>(this.url + '/assignment_marksbulk_eval/' + section_id + '/' + subject_id + '/' + lession_id + '/' + assignment_id)
  }

  addAssignment_marks(data, section_id, subject_id, lession_id, assignment_id): Observable<any> {
    console.log(data) 
    var test = {
      "students": data,
    };
    return this.http.post<any>(this.url + '/assignment_marksbulk_eval/' + section_id + '/' + subject_id + '/' + lession_id + '/' + assignment_id, test)
  }

  // Class Tests
  getClassTests_byDate(section_id, subject_id): Observable<any> {
    return this.http.get<any>(this.url + '/classTests/' + section_id + '/' + subject_id);
  }

  getClassTests(lession_id): Observable<any> {
    return this.http.get<any>(this.url + '/assignments/' + lession_id);
  }

  addClassTest(data, section_id, subject_id): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/classTests/' + section_id + '/' + subject_id, data);
  }

  // ClassTest Marks
  getClassTest_marks(section_id, subject_id, classTest_id): Observable<any> {
    return this.http.get<any>(this.url + '/classTests_marksbulk_eval/' + section_id + '/' + subject_id + '/' + classTest_id)
  }

  addClassTest_marks(data, section_id, subject_id, classTest_id): Observable<any> {
    console.log(data) 
    var test = {
      "students": data,
    };
    return this.http.post<any>(this.url + '/classTests_marksbulk_eval/' + section_id + '/' + subject_id + '/' + classTest_id, test)
  }

  // Reports
  getAssignmentreports(subject_id, section_id): Observable<any> {
    return this.http.get<any>(this.url + '/all_assignment_marks_by_subject_id/' + subject_id + '/' + section_id)
  }

  getClasstestsreports(section_id): Observable<any> {
    return this.http.get<any>(this.url + '/all_classTests_marks_by_section_id/' + section_id)
  }

  // Project Works
  getProjectworks_byDate(section_id, subject_id): Observable<any> {
    return this.http.get<any>(this.url + '/projectworks/' + section_id + '/' + subject_id + '/' + this.school_id);
  }

  getProjectworks(lession_id): Observable<any> {
    return this.http.get<any>(this.url + '/projectworks/' + lession_id);
  }

  assignProjectwork(data, section_id, subject_id): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/projectworks/' + section_id + '/' + subject_id + '/' + this.school_id, data);
  }

  // Projectwork Marks
  getProjectwork_marks(projectwork_id): Observable<any> {
    console.log(projectwork_id)
    return this.http.get<any>(this.url + '/projectworks_marksbulk_eval/' + projectwork_id)
  }

  addProjectwork_marks(data, section_id, subject_id, projectwork_id): Observable<any> {
    console.log(data) 
    var test = {
      "students": data,
    };
    return this.http.post<any>(this.url + '/projectworks_marksbulk_eval/' + section_id + '/' + subject_id + '/' + projectwork_id, test)
  }

  getProjectworkreports(subject_id, section_id): Observable<any> {
    return this.http.get<any>(this.url + '/all_assignment_marks_by_subject_id/' + subject_id + '/' + section_id)
  }

  // Quiz
  getQuestions(lession_id, subject_id): Observable<any> {
    return this.http.get<any>(this.url + '/questions/' + lession_id + '/' + subject_id);
  }

  addQuestions(data, lession_id, subject_id): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/questions/' + lession_id + '/' + subject_id, data);
  }

  // Examination Schedules
  getClass_Examschedules(class_id): Observable<any> {
    return this.http.get<any>(this.url + '/class_exam_schedule/' + class_id)
  }

  addExam_schedules(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/exam_schedule/' + this.school_id, data)
  }

  // Exam Papers
  getExam_papers(selected_schedule, selected_section): Observable<any> {
    return this.http.get<any>(this.url + '/exams/' + selected_schedule + '/' + selected_section);
  }

  addExam_papers(data, selected_section, selected_schedule, selected_subject, examination_pattern_id): Observable<any> {
    console.log(data);
    var test = {
      "exams": data,
    };
    return this.http.post<any>(this.url + '/exams/' + selected_section + '/' + selected_schedule + '/' + selected_subject + '/' + examination_pattern_id + '/' + this.school_id, test)
  }

  editExam_papers(data, selected_exam_id): Observable<any> {
    console.log(data);
    var test = {
      "exams": data,
    };
    return this.http.put<any>(this.url + '/exams/' + selected_exam_id, test)
  }
  
  // Evaluations
  getEvaluations(selected_schedule, selected_section): Observable<any> {
    return this.http.get<any>(this.url + '/assessment_marks_by_section_id/' + selected_schedule + '/' + selected_section);
  }

  getSubjectEvaluations(selected_schedule, selected_section, selected_subject): Observable<any> {
    return this.http.get<any>(this.url + '/assessment_marks_by_section_id/' + selected_schedule + '/' + selected_section + '/' + selected_subject);
  }

  getcum_Evaluations(selected_section): Observable<any> {
    return this.http.get<any>(this.url + '/all_assessment_marks_by_section_id/' + selected_section);
  }

  getExamSchedule(selected_schedule, selected_section, selected_subject): Observable<any> {
    return this.http.get<any>(this.url + '/exams/' + selected_schedule + '/' + selected_section + '/' + selected_subject);
  }

  addEvaluations(data, selected_schedule, selected_section, selected_subject): Observable<any> {
    console.log(data);
    var test = {
      "studentsMarks": data,
    };
    return this.http.post<any>(this.url + '/assessment_marksbulk_eval/' + selected_schedule + '/' + selected_section + '/' + selected_subject, test)
  }

  editEvaluations(data, selected_subject): Observable<any> {
    console.log(data);
    return this.http.put<any>(this.url + '/assessment_edit_eval/' + selected_subject + '/' + this.school_id, data)
  }

  getEvaluationChart(selected_section): Observable<any> {
    return this.http.get<any>(this.url + '/all_assessment_marks_by_section_id_student_id/' + selected_section)
  }

  getSubjectChart(selected_section, selected_schedule): Observable<any> {
    console.log(selected_schedule)
    console.log(selected_section)
    return this.http.get<any>(this.url + '/all_assessment_marks_by_section_id_subject_id/' + selected_section + '/' + selected_schedule)
  }

  // Timetable
  getTimetable(selected_section): Observable<any> {
    return this.http.get<any>(this.url + '/class_timetable_by_week/' + selected_section);
  }

  addTimetable(data, selected_section): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/class_timetable/' + selected_section, data)
  }

  //deleteSchedule

  deleteSchedule(data, selected_section): Observable<any> {
    console.log(data)
    return this.http.put<any>(this.url + '/delete_timetable/' +  data,'')  
  }

  getSubject_teachers(subject_id): Observable<any> {
    return this.http.get<any>(this.url + '/listsubjectstoteacher_by_subjectId/' + subject_id)
  }

  // School Events
  getEvents(): Observable<any> {
    return this.http.get<any>(this.url + '/schoolevents/' + this.school_id);
  }

  addEvents(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/schoolevents/' + this.school_id, data)
  }

  // School Fee
  getFeeTerms(): Observable<any> {
    return this.http.get<any>(this.url + '/fee_term/' + this.school_id);
  }

  addFeeTerms(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/fee_term/' + this.school_id, data)
  }

  getFeeTypes(): Observable<any> {
    return this.http.get<any>(this.url + '/fee_types/' + this.school_id);
  }

  addFeeTypes(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/fee_types/' + this.school_id, data)
  }

  getFeeMaster(): Observable<any> {
    return this.http.get<any>(this.url + '/fee_master/' + this.school_id);
  }

  addFeeMaster(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/fee_master/' + this.school_id, data)
  }

  getCollectedFee(selected_student): Observable<any> {
    return this.http.get<any>(this.url + '/fee_collection/' + selected_student);
  }

  addCollectedFee(data, selected_student): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/fee_collection/' + selected_student, data)
  }

  getStudent_term_type_fee(selected_student, fee_term, fee_type, class_id): Observable<any> {
    return this.http.get<any>(this.url + '/student_term-typewise_fee_details/' + selected_student + '/' + fee_term + '/' + fee_type + '/' + class_id);
  }

  getStudent_fee(selected_student, class_id): Observable<any> {
    return this.http.get<any>(this.url + '/student_termwise_fee_details/' + selected_student + '/' + class_id + '/' + this.school_id);
  }

  getStudent_TermFee(selected_student, fee_term_id, class_id): Observable<any> {
    return this.http.get<any>(this.url + '/student_term_fee_details/' + selected_student + '/' + fee_term_id + '/' + class_id + '/' + this.school_id);
  }

  getClass_fee(selected_section, fee_type, fee_term): Observable<any> {
    return this.http.get<any>(this.url + '/section_student_fee_paid_details/' + selected_section + '/' + fee_type + '/' + fee_term);
  }

  getDay_fee(select_date): Observable<any> {
    return this.http.get<any>(this.url + '/fee_by_Date/' + select_date + '/' + this.school_id);
  }

  getMonth_fee(select_month): Observable<any> {
    return this.http.get<any>(this.url + '/fee_by_Month/' + select_month + '/' + this.school_id);
  }

}
