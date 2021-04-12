import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { appConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private user_id;

  constructor(private http: HttpClient) {}

  private url = appConfig.apiUrl;
  private school_id = appConfig.school_id;
  private role = appConfig.role;
  private token = appConfig.token;

  private employee_id = appConfig.employee_id;
  empty_data;

  // School Timings
  getTasks(): Observable<any> {
    return this.http.get<any>(this.url + '/tasks/' + this.school_id);
  }

  addTasks(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/tasks/' + this.school_id, data)
  }

  updateStatus(status, task_id): Observable<any> {
    console.log(this.role)
    if(this.role === 'admin') {
      this.empty_data = {'updated_by': this.role, 'role': this.role}
    } else {
      this.empty_data = {'updated_by': this.employee_id, 'role': this.role}
    }
    return this.http.put<any>(this.url + '/update_task/' + status + '/' + task_id + '/' + this.school_id, this.empty_data)
  }

  editTask(data, task_id): Observable<any> {
    return this.http.put<any>(this.url + '/edit_task/' + task_id, data)
  }

  deleteTask(task_id): Observable<any> {
    return this.http.put<any>(this.url + '/delete_task/' + task_id, this.empty_data)
  }
  
}
