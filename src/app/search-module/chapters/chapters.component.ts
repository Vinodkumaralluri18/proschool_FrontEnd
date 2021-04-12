import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServicesService } from '../../services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})
export class ChapterComponent implements OnInit {

  constructor(private service: ServicesService, private fb: FormBuilder) { }

  @Output() classEvent = new EventEmitter<string>();
  @Output() sectionEvent = new EventEmitter<string>();
  @Output() subjectEvent = new EventEmitter<string>();
  @Output() chapterEvent = new EventEmitter<string>();

  showClassList: boolean = false;
  showSectionList: boolean = false;
  showSubjectList: boolean = false;
  showChapterList: boolean = false;

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
    this.getClasses();
  }

  getClasses() {
    this.service.getClasses()
      .subscribe(
        res => { this.classes = res.school_classes.filter(data => data.status === 1);
          if(this.classes.length > 0) {
            this.selected_class = this.classes[0];
          } else {
            this.selected_class.class_id = 'No Classes';
          }
          this.getSections(),
          console.log(res)
        }
      )
  }

  getSections() {
    this.classEvent.emit(this.selected_class.class_id)
    this.service.getSections(this.selected_class.class_id)
      .subscribe(
        res => { this.class_sections = res.class_sections;
          if(this.class_sections.length > 0) {
            this.selected_section = this.class_sections[0];
          } else {
            this.selected_section.section_id = 'No Sections';
          }
          this.getSubjects(),
          console.log(res)
        }
      )
  }
  
  getSubjects() {
    this.service.getSubjects(this.selected_section.section_id)
      .subscribe(
        res => { this.subjects = res.subjects;
          if(this.subjects.length > 0) {
            this.selected_subject = this.subjects[0];
          } else {
            this.selected_subject.subject_id = 'No Subjects';
          }
          this.getChapters(),
          console.log(res) 
        }
      )
  }

  getChapters() {
    this.service.getChapters(this.selected_subject.subject_id)
      .subscribe(
        res => { this.chapters = res.chapters;
          if(this.chapters.length > 0) {
            this.selected_chapter = this.chapters[0];
          } else {
            this.selected_chapter.lession_id = 'No Chapters';
          }
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
