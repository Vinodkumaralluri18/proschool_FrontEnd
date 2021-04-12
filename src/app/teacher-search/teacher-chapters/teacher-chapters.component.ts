import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeacherService } from '../../_services/teacher.service';
import { AcademicsService } from '../../_services/academics.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-teacher-chapter',
  templateUrl: './teacher-chapters.component.html',
  styleUrls: ['./teacher-chapters.component.css']
})
export class TeacherChaptersComponent implements OnInit {

  constructor(private service: TeacherService, private academics: AcademicsService, private fb: FormBuilder) { }

  @Output() classEvent = new EventEmitter<string>();
  @Output() sectionEvent = new EventEmitter<string>();
  @Output() subjectEvent = new EventEmitter<string>();
  @Output() chapterEvent = new EventEmitter<string>();

  showClassList: boolean = false;
  showSectionList: boolean = false;
  showSubjectList: boolean = false;
  showChapterList: boolean = false;

  employee_id = JSON.parse(localStorage.getItem('currentUser')).employee_id;

  selected_class:any = {class_id: '', name: ''};
  selected_section:any = {section_id: '', name: ''};
  selected_subject:any = {subject_id: '', name: ''};
  selected_chapter:any = {lession_id: '', title: ''};

  classes = [];
  all_sections = [];
  class_sections = [];
  subjects = [];
  chapters = [];

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
    this.classEvent.emit(this.selected_class)
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
          this.getChapters(),
          console.log(res) 
        }
      )
  }

  getChapters() {
    this.academics.getChapters(this.selected_subject.subject_id)
      .subscribe(
        res => { 
          this.chapters = res.chapters, 
          this.selected_chapter = this.chapters[0],
          this.get_sub(),
          console.log(res) 
        }
      )
  }

  get_sub() {
    this.classEvent.emit(this.selected_class.class_id);
    this.sectionEvent.emit(this.selected_section.section_id);
    this.subjectEvent.emit(this.selected_subject.subject_id);
    this.chapterEvent.emit(this.selected_chapter.lession_id);
  }

}
