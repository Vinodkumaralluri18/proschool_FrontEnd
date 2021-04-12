import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { appConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class ClasessService {

  constructor(private http:   HttpClient) { }

  private url = appConfig.apiUrl;
  private school_id = appConfig.school_id;
  private role = appConfig.role;
  private token = appConfig.token;
  // Class

  getClasses(): Observable<any> {
    return this.http.get<any>(this.url + '/school_classes/' + this.school_id);
  }

  addClass(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/school_classes/' + this.school_id, data)
  }

  editClass(data, class_id): Observable<any> {
    return this.http.put<any>(this.url + '/edit_classes/' + class_id, data)
  }

  deleteClass(data, class_id): Observable<any> {
    return this.http.put<any>(this.url + '/delete_classes/' + class_id, data)
  }

  restoreClass(data, class_id): Observable<any> {
    return this.http.put<any>(this.url + '/restore_classes/' + class_id, data)
  }

  // Sections

  getSections(selected_class): Observable<any> {
    return this.http.get<any>(this.url + '/class_sections/' + selected_class);
  }

  addSection(data, class_id): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/class_sections/' + class_id, data)
  }

  editSection(data, section_id): Observable<any> {
    console.log(data)
    return this.http.put<any>(this.url + '/edit_sections/' + section_id, data)
  }

  deleteSection(data, section_id): Observable<any> {
    return this.http.put<any>(this.url + '/delete_sections/' + section_id, data)
  }

  restoreSection(data, section_id): Observable<any> {
    return this.http.put<any>(this.url + '/restore_sections/' + section_id, data)
  }

  // Employees
  
  getEmployees(): Observable<any> {
    return this.http.get<any>(this.url + '/employee/' + this.school_id);
  }

}
