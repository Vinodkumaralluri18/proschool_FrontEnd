import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-virtualboard',
  templateUrl: './virtualboard.component.html',
  styleUrls: ['./virtualboard.component.css']
})
export class VirtualboardComponent implements OnInit {

  constructor() { }

  public canvas = document.getElementById('#canvas');
  public cnv = document.getElementsByClassName('cnv')
  public ctx = {
    strokeStyle: '',
    fillStyle: '',
    lineWidth: 1,
    lineJoin: 'round',
    lineCap: 'round',
  };
  public height;
  public width;
  public mouse: {
    mouseDown: false,
    pos: {
      initial: {
        x: 0,
        y: 0
      },
      final: {
        x: 0,
        y: 0
      }
    }
  }

  public text = {
    flag: 0,
    color: 'black',
    text: '',
    fontFamily: 'cursive',
    fontSize: 12,
    fontStyle: 'bold'
  }

  public shape = {
    lineWidth: 1,
    fillStyle: 'black',
    strokeStyle: 'black'
  }

  drawings: {
    dataUrl: [],
    raw: []
  }

  public tool = 'pencil';
  public lineWidth = 1;
  public fillStyle = 'black';
  public strokeStyle = 'black';

  ngOnInit() {
    this.makeReady();
    this.setCanvas();
  }

  makeReady() {
    //set canvas context
    this.ctx = document.getElementById('#canvas')[0].getContext('2d');
  }

  setCanvas() {
    this.height = window.innerHeight;
    this.width = window.innerWidth;

    //set canvas size
    this.canvas.setAttribute('height', this.height);
    this.canvas.setAttribute('width', this.width);

  }

  clear() {
    this.ctx[0].getContext('2d').clearRect(0, 0, this.width, this.height);
  }

  undo() {
    if (this.drawings.dataUrl.length > 1) {
        this.clear();
        this.drawings.dataUrl.splice(this.drawings.dataUrl.length - 1, 1);
        var imgData = this.drawings.dataUrl[this.drawings.dataUrl.length - 1]; // last element
        var image = new Image();
        // image.src = imgData.toString();
        // this.ctx.drawImage(image, 0, 0);
    }
  }

  changeTool(tool) {
    this.tool = tool;
  }

  changeColor(color) {
    this.fillStyle = color;
    this.strokeStyle = color;
  }

  changeSize(size) {
    // if (this.tool === 'pencil') {
    //     this.lineWidth = size;
    //     this.ctx.lineWidth = size;
    // } else if (this.tool === 'chalk') {
    //     board.tools.chalk.size = parseInt(board.tools.chalk.defaultSize) + parseInt(size);
    //     board.ctx.lineWidth = board.tools.chalk.size;
    // } else if (board.tool === 'marker') {
    //     board.tools.marker.size = parseInt(board.tools.marker.defaultSize) + parseInt(size);
    //     board.ctx.lineWidth = board.tools.marker.size;
    // } else if (board.tool === 'eraser') {
    //     board.tools.eraser.size = size * 10;
    // } else if (board.tool === 'rectangle' || board.tool === 'line' || board.tool === 'circle' || board.tool === 'ellipse' || board.tool === 'star' || board.tool === 'arrow' || board.tool === 'triangle' || board.tool === 'face' || board.tool === 'moon') {
    //     board.tools.shape.lineWidth = size;
    //     board.ctx.lineWidth = size;
    //     board.lctx.lineWidth = size;
    // }
  }

  clearBoard() {

  }


}
