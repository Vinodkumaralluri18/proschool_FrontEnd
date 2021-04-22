import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { appConfig } from '../app.config';

@Injectable({
  providedIn: 'root' 
})
export class StudentsService {

  constructor(private http: HttpClient) { }

  private url = appConfig.apiUrl;
  private school_id = appConfig.school_id;
  private role = appConfig.role;
  private token = appConfig.token;
  empty_data;

  // Students
  getStudents(section_id): Observable<any> {
    return this.http.get<any>(this.url + '/students/' + section_id);
  }
  
  addStudentadmission(section_id, data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/students/' + section_id, data)
  }

  addProfileImage(formData, student_id): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post<any>(this.url + '/student_photo_edit/' + student_id, formData, {headers: headers} )
  }

  addDocuments(formData, student_id): Observable<any> {
    console.log('Hello-service')
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post<any>(this.url + '/add_student_Document/' + student_id, formData, {headers: headers} )
  }

  bulkStudentsUpload(formData, section_id): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post<any>(this.url + '/bulk_upload_students/' + section_id, formData, {headers: headers} )
  }

  getStudentDetails(student_id): Observable<any> { 
    return this.http.get<any>(this.url + '/student_details/' + student_id)
  }

  addStudProfileImage(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/schools_photo_edit/:school_id', data)
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

  // Sections
  getSections(selected_class): Observable<any> {
    return this.http.get<any>(this.url + '/class_sections/' + selected_class);
  }

  editStudent(student_id, data): Observable<any> {
    return this.http.put<any>(this.url + '/edit_student_details/' + student_id, data)
  }

  deleteStudent(student_id): Observable<any> {
    return this.http.put<any>(this.url + '/delete_student/' + student_id, this.empty_data)
  }

  restoreStudent(student_id): Observable<any> {
    return this.http.put<any>(this.url + '/restore_student/' + student_id, this.empty_data)
  }

}
