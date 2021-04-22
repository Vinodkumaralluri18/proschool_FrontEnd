import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { appConfig } from '../app.config';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private user_id;
  private socket;
  private chat_socket;
  private url = appConfig.apiUrl;
  private school_id = appConfig.school_id;
  private role = appConfig.role;
  private token = appConfig.token;

  // private chat_url = 'http://localhost:4005';
  private chat_url = 'http://13.126.140.230:4005';
  private employee_id = appConfig.employee_id;
  empty_data = {}

  constructor(private http: HttpClient) {
    this.socket = io(this.chat_url);
    this.chat_socket = io(this.chat_url + '/' + 'chat')
  }

  getInbox(sent_to): Observable<any> {
    return this.http.get<any>(this.url + '/inbox_messages/' + sent_to + '/' + this.role + '/' + this.school_id);
  }

  getOutbox(sent_to): Observable<any> {
    return this.http.get<any>(this.url + '/outbox_messages/' + sent_to + '/' + this.school_id);
  }

  sendMessage(data): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url + '/send_messages/' + this.school_id, data)
  }

  getParentsInbox(sent_to, class_id, section_id): Observable<any> {
    return this.http.get<any>(this.url + '/parentInbox_messages/' + sent_to + '/' + this.role + '/' + class_id + '/' + section_id + '/' + this.school_id);
  }

  messageStatus(chat_id, data): Observable<any> {
    console.log(chat_id)
    return this.http.put<any>(this.url + '/chatmessage_status/' + chat_id, data)
  }

  sendReply(reply_model, chat_id): Observable<any> {
    var data = {
      reply_model: reply_model,
    }
    return this.http.put<any>(this.url + '/reply_messages/' + chat_id, data)
  }

  // Chat Messages
  getChatMessages(sent_to): Observable<any> {
    return this.http.get<any>(this.chat_url + '/getChats/' + this.school_id);
  }

  getRealTimeMessages = () => {
    return Observable.create((observer) => {
      if(this.role === 'admin') {
        this.chat_socket.on(this.school_id, (data) => {
          observer.next(data);
          this.chat_socket.on('disconnected', function() {
            this.message_socket.disconnect();
          })
        });
      } else if(this.role === 'teacher') {
        this.chat_socket.on(this.employee_id, (data) => {
          console.log(data)
          observer.next(data);
          this.chat_socket.on('disconnected', function() {
            this.message_socket.disconnect();
          })
        });
      }
    });
  }

  sendChatMessage(message): Observable<any> {
    return this.chat_socket.emit('send_message', message)
  }

  // messageStatus(data): Observable<any> {
  //   return this.chat_socket.emit('read_messages', data)
  // }

}
