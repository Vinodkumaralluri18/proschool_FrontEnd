import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addquestions',
  templateUrl: './addquestions.component.html',
  styleUrls: ['./addquestions.component.css']
})
export class AddquestionsComponent implements OnInit {

  constructor(private service: ServicesService, private fb: FormBuilder) { }

  ngOnInit() {
  }

  topics = [];

  selected_class:string;
  selected_section:string;
  selected_subject:string;
  selected_chapter:string;

  questionForm: FormGroup = this.fb.group({
    question: ['', Validators.required],
    option_1: ['', Validators.required],
    option_2: ['', Validators.required],
    option_3: ['', Validators.required],
    option_4: ['', Validators.required],
    topic: ['', Validators.required],
    answer: ['', Validators.required],
  });

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
    this.getTopics();
  }
  
  getTopics() {
    if(this.selected_subject == undefined || this.selected_subject == '') {
      alert("Please Select the Subject and the Chapter")
    } else {
      this.service.getTopics(this.selected_chapter)
      .subscribe(
        res => { this.topics = res.topics, console.log(res) }
      )
    }
  }

  addQuestions() {
    if(this.selected_chapter == undefined || this.selected_chapter == ''){
      alert('Please Select the Subject and the Chapter')
    } else {
      console.log(this.selected_chapter);
      this.service.addQuestions(this.questionForm.value, this.selected_chapter, this.selected_subject)
      .subscribe(
        res => { console.log(res) }
      )
    }  
  }

}
