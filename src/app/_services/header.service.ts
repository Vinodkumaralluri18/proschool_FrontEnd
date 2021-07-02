import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, empty } from 'rxjs';
import { appConfig } from '../app.config';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private url = appConfig.apiUrl;
  private school_id = appConfig.school_id;
  private role = appConfig.role;
  private employee_id = appConfig.employee_id;
  private token = appConfig.token;

  // private socket_url = 'http://localhost:4005';
  private socket_url = 'https://api.proschool.in';
  private notification_socket;
  private message_socket;
  private chat_socket;
  private socket;

  private empty_data = {};

  constructor(private http: HttpClient) {
    this.socket = io(this.socket_url);
    this.notification_socket = io(this.socket_url + '/' + 'notifications')
    this.message_socket = io(this.socket_url + '/' + 'messages')
    // this.chat_socket = io(this.socket_url + '/' + 'chat')
  }

  // getChat = () => {
  //   console.log(this.employee_id)
  //   return Observable.create((observer) => {
  //     this.chat_socket.on(this.employee_id, (data) => {
  //       console.log(data)
  //       observer.next(data);
  //       this.chat_socket.on('disconnected', function() {
  //         this.chat_socket.disconnect();
  //       })
  //     });
  //   });
  // }

  getNotifications(): Observable<any> {
    return this.http.get<any>(this.url + '/employee_notifications/' + this.employee_id);
  }

  getAdminNotifications(): Observable<any> {
    return this.http.get<any>(this.url + '/admin_notifications/' + this.school_id);
  }

  notificationStatus(notification_id): Observable<any> {
    return this.http.put<any>(this.url + '/notification_status/' + notification_id, this.empty_data);
  }

  getRealTimeNotifications = () => {
    return Observable.create((observer) => {
      if(this.role === 'admin') {
        this.notification_socket.on(this.school_id, (data) => {
          observer.next(data);
          this.notification_socket.on('disconnected', function() {
            this.notification_socket.disconnect();
          })
        });
      } else if(this.role === 'teacher') {
        this.notification_socket.on(this.employee_id, (data) => {
          console.log(data)
          observer.next(data);
          this.notification_socket.on('disconnected', function() {
            this.notification_socket.disconnect();
          })
        });
      }
    });
  }

  getRealTimeMessages = () => {
    return Observable.create((observer) => {
      if(this.role === 'admin') {
        this.message_socket.on(this.school_id, (data) => {
          observer.next(data);
          this.message_socket.on('disconnected', function() {
            this.message_socket.disconnect();
          })
        });
      } else if(this.role === 'teacher') {
        this.message_socket.on(this.employee_id, (data) => {
          console.log(data)
          observer.next(data);
          this.message_socket.on('disconnected', function() {
            this.message_socket.disconnect();
          })
        });
      }
    });
  }

  getAllEmployeeMessages = () => {
    return Observable.create((observer) => {
      if(this.role === 'teacher') {
        this.message_socket.on(this.school_id + '-Employees', (data) => {
          console.log(data)
          observer.next(data);
          this.message_socket.on('disconnected', function() {
            this.message_socket.disconnect();
          })
        });
      }
    });
  }

  getAllTeacherMessages = () => {
    return Observable.create((observer) => {
      if(this.role === 'teacher') {
        this.message_socket.on(this.school_id + '-teacher', (data) => {
          console.log(data)
          observer.next(data);
          this.message_socket.on('disconnected', function() {
            this.message_socket.disconnect();
          })
        });
      }
    });
  }

  getTaskDetails(task_id): Observable<any> {
    return this.http.get<any>(this.url + '/task_details/' + task_id);
  }

}
