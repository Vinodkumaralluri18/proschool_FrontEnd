import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { appConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class AcademicsService {

  constructor(private http: HttpClient) { }

  private url = appConfig.apiUrl;
  private school_id = appConfig.school_id;
  private role = appConfig.role;
  private token = appConfig.token;
  empty_data;

  // Subjects
  getSubjects(section_id): Observable<any> {
    console.log(section_id)
    return this.http.get<any>(this.url + '/subjects/' + section_id);
  }

  addSubject(data, section_id): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/subjects/' + section_id, data)
  }

  bulkSubjectsUpload(formData, section_id): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post<any>(this.url + '/bulk_upload_subjects/' + section_id, formData, {headers: headers} )
  }

  editSubject(data, subject_id): Observable<any> {
    console.log(data)
    console.log(subject_id)
    return this.http.put<any>(this.url + '/edit_subjects/' + subject_id, data)
  }

  deleteSubject(subject_id): Observable<any> {
    return this.http.put<any>(this.url + '/delete_subjects/' + subject_id, this.empty_data)
  }

  // Chapters
  getChapters(subject_id): Observable<any> {
    return this.http.get<any>(this.url + '/course_works/' + subject_id);
  }

  addChapter(data, subject_id): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/course_works/' + subject_id, data)
  }

  bulkChaptersUpload(formData, subject_id): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post<any>(this.url + '/bulk_upload_chapters/' + subject_id, formData, {headers: headers} )
  }

  editChapter(data, lession_id): Observable<any> {
    return this.http.put<any>(this.url + '/edit_course_work/' + lession_id, data)
  }

  deleteChapter(lession_id): Observable<any> {
    return this.http.put<any>(this.url + '/delete_course_work/' + lession_id, this.empty_data)
  }

  updateChapter(status, lession_id): Observable<any> {
    const data = {
      status: status
    }
    console.log(data)
    return this.http.put<any>(this.url + '/update_course_work/' + lession_id, data)
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

  bulkTopicsUpload(formData, chapter_id, subject_id): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post<any>(this.url + '/bulk_upload_topics/' + chapter_id + '/' + subject_id, formData, {headers: headers} )
  }

  editTopic(data, topic_id): Observable<any> {
    return this.http.put<any>(this.url + '/edit_topic/' + topic_id, data)
  }

  deleteTopic(chapter_id, topic_id, topic_status): Observable<any> {
    this.empty_data = {
      topic_status: topic_status
    }
    return this.http.put<any>(this.url + '/delete_topic/' + chapter_id + '/' + topic_id, this.empty_data)
  }

  updateStatus(data, chapter_id, topic_id): Observable<any> {
    console.log(data)
    console.log(chapter_id)
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

  deleteAssignsubject(teacher_id, subject_id): Observable<any> {
    return this.http.put<any>(this.url + '/delete_subject_teacher/' + teacher_id + '/' + subject_id, this.empty_data)
  }

  // Lesson Planner
  addPlanner(data): Observable<any> {
    console.log(data)
    var test = {
      chapters: data
    }
    return this.http.put<any>(this.url + '/lesson_planner/' + this.school_id, test)
  }

}
