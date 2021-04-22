import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeacherService } from '../../_services/teacher.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-teacher-subject',
  templateUrl: './teacher-subject.component.html',
  styleUrls: ['./teacher-subject.component.css']
})
export class TeacherSubjectComponent implements OnInit {

  constructor(private service: TeacherService, private fb: FormBuilder) { }

  @Output() classEvent = new EventEmitter<string>();
  @Output() sectionEvent = new EventEmitter<string>();
  @Output() subjectEvent = new EventEmitter<string>();

  employee_id = JSON.parse(localStorage.getItem('currentUser')).employee_id;

  selected_class:any = {class_id: '', name: ''};
  selected_section:any = {section_id: '', name: ''};
  selected_subject:any = {subject_id: '', name: ''};
  
  showClassList: boolean = false;
  showSectionList: boolean = false;
  showSubjectList: boolean = false;

  classForm: FormGroup = this.fb.group({
    selected_class: [''],
    selected_section: [''],
    selected_subject: [''],
  });

  classes = [];
  all_sections = [];
  class_sections = [];
  subjects = [];

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
          console.log(res) }
      )
  }

  getTeacherSections() {
    this.classEvent.emit(this.classForm.value.selected_class)
    this.service.getTeacherSections(this.employee_id, this.selected_class.class_id)
      .subscribe(
        res => { 
          this.class_sections = res.class_sections, 
          this.selected_section = this.class_sections[0], 
          this.getTeacherSubjects(),
          console.log(res) 
        }
      )
  }
  
  getTeacherSubjects() {
    this.service.getTeacherSubjects(this.employee_id, this.selected_section.section_id)
      .subscribe(
        res => { 
          this.subjects = res.subjects, 
          this.selected_subject = this.subjects[0],
          this.get_sub(),
          console.log(res) 
        }
      )
  }

  get_sub() {
    this.classEvent.emit(this.selected_class.class_id);
    this.sectionEvent.emit(this.selected_section.section_id);
    this.subjectEvent.emit(this.selected_subject.subject_id);
  }

}
