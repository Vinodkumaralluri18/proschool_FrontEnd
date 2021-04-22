import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { appConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {

  constructor(private http: HttpClient) { }

  private url = appConfig.apiUrl;
  private school_id = appConfig.school_id;
  private role = appConfig.role;
  private token = appConfig.token;
  empty_data = {};

  // Examination Pattern
  addExamination_Pattern(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/examination_pattern/' + this.school_id, data)
  }

  getExamination_Pattern(class_id): Observable<any> {
    return this.http.get<any>(this.url + '/class_examination_pattern/' + class_id)
  }

  editExamination_Pattern(data, examination_pattern_id): Observable<any> {
    console.log(data)
    return this.http.put<any>(this.url + '/edit_examination_pattern/' + examination_pattern_id, data)
  }

  deleteExamination_Pattern(examination_pattern_id, unique_code, class_id, examination_title): Observable<any> {
    var data = {
      unique_code: unique_code,
      class_id: class_id,
      examination_title: examination_title,
    }
    return this.http.put<any>(this.url + '/delete_examination_pattern/' + examination_pattern_id, data)
  }

  // Assessment Patterns
  addAssessment_Pattern(data, examination_pattern_id): Observable<any> {
    var test = {
      'assessments': data,
    }
    return this.http.put<any>(this.url + '/assessment_pattern/' + examination_pattern_id, test)
  }

  addPattern(data, examination_pattern_id): Observable<any> {
    return this.http.put<any>(this.url + '/add_assessment_pattern/' + examination_pattern_id, data)
  }

  getAssessment_Pattern(examination_pattern_id): Observable<any> {
    return this.http.get<any>(this.url + '/assessment_pattern/' + examination_pattern_id)
  }

  deleteAssessment_Pattern(examination_pattern_id, totalMarks, no_of_assessments, assessment): Observable<any> {
    var test = {
      'assessment': assessment,
      'totalMarks': totalMarks,
      'no_of_assessments': no_of_assessments,
    }
    return this.http.put<any>(this.url + '/delete_assessment_pattern/' + examination_pattern_id, test)
  }

  // Assessment Patterns
  getExaminations(): Observable<any> {
    return this.http.get<any>(this.url + '/all_examination_pattern/' + this.school_id)
  }

  // Inner Assessment Patterns
  getinner_assessments(selected_schedule): Observable<any> {
    return this.http.get<any>(this.url + '/assessments/' + selected_schedule + '/' + this.school_id)
  }

  // Examination Schedules
  getExam_schedules(): Observable<any> {
    return this.http.get<any>(this.url + '/exam_schedule/' + this.school_id)
  }

  addExam_schedules(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/exam_schedule/' + this.school_id, data)
  }

  editExam_schedules(data, exam_sch_id): Observable<any> {
    console.log(data)
    return this.http.put<any>(this.url + '/edit_examschedule/' + exam_sch_id, data)
  }

  deleteExam_schedules(exam_sch_id): Observable<any> {
    return this.http.put<any>(this.url + '/delete_examschedule/' + exam_sch_id, this.empty_data)
  }

  // Exam Papers
  getExam_papers(selected_schedule, selected_section): Observable<any> {
    return this.http.get<any>(this.url + '/exams/' + selected_schedule + '/' + selected_section);
  }

  getExamPapers(selected_schedule, selected_section, selected_subject): Observable<any> {
    return this.http.get<any>(this.url + '/exams/' + selected_schedule + '/' + selected_section + '/' + selected_subject);
  }

  addExam_papers(data, selected_section, selected_schedule, selected_subject): Observable<any> {
    console.log(data);
    var test = {
      "exams": data,
    };
    return this.http.post<any>(this.url + '/exams/' + selected_section + '/' + selected_schedule + '/' + selected_subject + '/' + this.school_id, test)
  }

}
