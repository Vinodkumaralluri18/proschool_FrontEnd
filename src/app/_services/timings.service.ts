import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { appConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class TimingsService {

  constructor(private http: HttpClient) { }

  private url = appConfig.apiUrl;
  private school_id = appConfig.school_id;
  private role = appConfig.role;
  private token = appConfig.token;
  
  empty_data;

  // School Timings
  getTimings(): Observable<any> {
    return this.http.get<any>(this.url + '/session_timings/' + this.school_id);
  }

  getTimingsBySection(section_id): Observable<any> {
    return this.http.get<any>(this.url + '/session_timingsBy_section/' + section_id)
  }

  addTimings(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/session_timings/' + this.school_id, data)
  }

  editTimings(data, session_id): Observable<any> {
    return this.http.put<any>(this.url + '/edit_session/' + session_id, data)
  }
  
  deleteTimings(session_id): Observable<any> {
    return this.http.put<any>(this.url + '/delete_session/' + session_id, this.empty_data)
  }

}
