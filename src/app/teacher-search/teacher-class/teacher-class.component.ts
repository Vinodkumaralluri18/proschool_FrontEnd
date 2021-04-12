import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TeacherService } from '../../_services/teacher.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-teacher-class',
  templateUrl: './teacher-class.component.html',
  styleUrls: ['./teacher-class.component.css']
})
export class TeacherClassComponent implements OnInit {

  constructor(private service: TeacherService, private fb: FormBuilder) { }

  @Output() classEvent = new EventEmitter<string>();
  @Output() sectionEvent = new EventEmitter<string>();
  @Output() subjectEvent = new EventEmitter<string>();

  employee_id = JSON.parse(localStorage.getItem('currentUser')).employee_id;

  selected_class:any = {class_id: '', name: ''};
  selected_section:any;

  showClassList: boolean = false;
  showSectionList: boolean = false;

  classes = [];
  class_sections = [];
  selected_subject;

  ngOnInit() {
    this.getTeacherClasses();
  }

  getTeacherClasses() {
    this.service.getTeacherClasses(this.employee_id)
      .subscribe(
        res => { 
          this.classes = res.school_classes, 
          this.selected_class = this.classes[0], 
          this.getTeacherSections(),
          console.log(res)
        }
      )
  }

  getTeacherSections() {
    this.classEvent.emit(this.selected_class.class_id)
    this.service.getTeacherSections(this.employee_id, this.selected_class.class_id)
      .subscribe(
        res => { 
          if(res.class_sections !== []) {
            this.selected_section = res.class_sections[0]; 
          }
          this.class_sections = res.class_sections, 
          this.get_clsec(),
          console.log(res)
        }
      )
  }

  receiveSubject($event) {
    this.selected_subject = $event
    console.log(this.selected_subject)
  }

  get_clsec() {
    this.classEvent.emit(this.selected_class.class_id);
    this.sectionEvent.emit(this.selected_section.section_id);
    this.subjectEvent.emit(this.selected_subject);
  }

}
