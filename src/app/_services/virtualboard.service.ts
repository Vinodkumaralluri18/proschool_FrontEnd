import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { appConfig } from '../app.config';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class VirtualboardService {

  private url = 'http://localhost:4005';
  private socket;  
  private startClass_socket;

  constructor() { 
    this.socket = io(this.url);
    this.startClass_socket = io(this.url + '/' + 'start_class')
  }

  startClass() {
    var data = {school_id: 'SCH-1', section_id: 'SCH-1-CL-1-SEC-1', subject_id: 'SCH-1-CL-1-SEC-1-SUB-1', topic_id: 'SCH-1-CL-1-SEC-1-SUB-1-TOP-1'}
    this.startClass_socket.emit('start_class', data)
  }

  sendDrawing(data) {
    console.log(data)
    this.socket.emit('drawing', data);
  }

  getDrawing = () => {
    return Observable.create((observer) => {
      this.socket.on('drawing', (data) => {
          observer.next(data);
      });
    });
  }

}
