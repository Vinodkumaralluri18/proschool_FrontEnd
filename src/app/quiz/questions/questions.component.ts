import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  p: Number = 1;
  count: Number = 5;
  constructor(private service: ServicesService) { }

  ngOnInit() {
  }

  questions = [];

  selected_class:string;
  selected_section:string;
  selected_subject:string;
  selected_chapter:string;

  receiveClass($event) {
    this.selected_class = $event
    console.log(this.selected_class)
  }

  receiveSection($event) {
    this.selected_section = $event
    console.log(this.selected_section)
  }

  receiveSubject($event) {
    this.selected_subject = $event
    console.log(this.selected_subject)
  }

  receiveChapter($event) {
    this.selected_chapter = $event
    console.log(this.selected_chapter)
    this.getQuestions();
  }
  
  getQuestions() {
    if(this.selected_subject == undefined || this.selected_subject == '') {
      alert("Please Select the Subject and the Chapter")
    } else {
      this.service.getQuestions(this.selected_chapter, this.selected_subject)
      .subscribe(
        res => { this.questions = res.questions, console.log(res) }
      )
    }
  }

}
