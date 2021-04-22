import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { appConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class AssignsubjectsService {

  constructor(private http: HttpClient) { }

  private url = appConfig.apiUrl;
  private school_id = appConfig.school_id;
  private role = appConfig.role;
  private token = appConfig.token;
  empty_data;

  // Employees
  getEmployees(): Observable<any> {
    return this.http.get<any>(this.url + '/employee/' + this.school_id);
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

    // Assign Subjects
    getTeachers(section_id): Observable<any> {
      return this.http.get<any>(this.url + '/listsubjectstoteacher_by_sectionId/' + section_id)
    }
  
    assignTeachers(data, section_id): Observable<any> {
      console.log(data)
      return this.http.post<any>(this.url + '/addorupdatesubjectstoteacher/' + this.school_id + section_id, data)
    }

    deleteAssignsubject(section_id): Observable<any> {
      return this.http.delete<any>(this.url + '/delete_subject_teacher/' + section_id)
    }
}
