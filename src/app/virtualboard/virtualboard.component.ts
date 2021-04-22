import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { VirtualboardService } from '../_services/virtualboard.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-virtualboard',
  templateUrl: './virtualboard.component.html',
  styleUrls: ['./virtualboard.component.css']
})
export class VirtualboardComponent implements OnInit {

  constructor(private service: VirtualboardService) { }

  user: User;

  @ViewChild('whiteboard', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;  

  private context: CanvasRenderingContext2D;

  public current = {
    color: 'black',
    x: parseInt(''),
    y: parseInt(''),
  };
  public drawing = false;

  public drawing_data;

  public width = window.innerWidth;
  public height = window.innerHeight;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if (this.user.role === 'teacher') {
      this.startClass();
    }
    this.getDrawing();
    console.log(this.width)
    this.context = this.canvas.nativeElement.getContext('2d');
    this.canvas.nativeElement.setAttribute('width', this.width.toString())
    this.canvas.nativeElement.setAttribute('height', this.height.toString())
    console.log(this.canvas.nativeElement.width)
  }

  startClass() {
    this.service.startClass()
  }

  drawLine(x0, y0, x1, y1, color, emit){
    this.context.beginPath();
    this.context.moveTo(x0, y0);
    this.context.lineTo(x1, y1);
    this.context.strokeStyle = color;
    this.context.lineWidth = 2;
    this.context.stroke();
    this.context.closePath();

    if (!emit) { return; }
    var w = this.width;
    var h = this.height;

    // this.drawing_data = {
    //   x0: x0 / w,
    //   y0: y0 / h,
    //   x1: x1 / w,
    //   y1: y1 / h,
    //   color: color
    // }
    this.drawing_data = {
      x0: x0,
      y0: y0,
      x1: x1,
      y1: y1,
      color: color
    }
    this.sendDrawing();
  }

  mousedown(e: MouseEvent) {
    this.drawing = true;
    console.log(e)
    this.current.x = e.clientX;
    this.current.y = e.clientY;
  }

  mouseup(e) {
    if (!this.drawing) { return; }
    this.drawing = false;
    this.drawLine(this.current.x, this.current.y, e.clientX, e.clientY, this.current.color, true);
  }

  mousemove(e) {
    console.log(e)
    if (!this.drawing) { return; }
    this.drawLine(this.current.x, this.current.y, e.clientX, e.clientY, this.current.color, true);
    this.current.x = e.clientX;
    this.current.y = e.clientY;
  }

  throttle(callback, delay) {
    var previousCall = new Date().getTime();
    return function() {
      var time = new Date().getTime();

      if ((time - previousCall) >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  }

  onResize(e) {
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
  }

  sendDrawing() {
    this.service.sendDrawing(this.drawing_data);
    this.drawing_data = '';
  }

  getDrawing() {
    var w = this.width;
    var h = this.height;
    this.service.getDrawing()
      .subscribe(data => {
        // this.drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color, true);
        this.drawLine(data.x0, data.y0, data.x1, data.y1, data.color, true);
      })
  }

  // onDrawingEvent(data){
  //   var w = canvas.width;
  //   var h = canvas.height;
  //   drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
  // }

}
