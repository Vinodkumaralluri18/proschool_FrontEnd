import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ServicesService } from '../../services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  constructor(private service: ServicesService, private fb: FormBuilder) { }

  @Output() classEvent = new EventEmitter<string>();
  @Output() sectionEvent = new EventEmitter<string>();
  @Output() subjectEvent = new EventEmitter<string>();

  selected_class:any = {class_id: '', name: ''};
  selected_section:any = {section_id: '', name: ''};

  showClassList: boolean = false;
  showSectionList: boolean = false;

  classes = [];
  class_sections = [];
  selected_subject;

  ngOnInit() {
    this.getClasses();
  }

  getClasses() {
    this.service.getClasses()
      .subscribe(
        res => { this.classes = res.school_classes.filter(data => data.status === 1), 
          this.selected_class = this.classes[0];
          if(this.classes.length > 0) {
            this.selected_class = this.classes[0];
          } else {
            this.selected_class = {class_id: '', name: ''};
          }
          this.getSections(),
          console.log(res)
        }
      )
  }

  getSections() {
    this.service.getSections(this.selected_class.class_id)
      .subscribe(
        res => { this.class_sections = res.class_sections.filter(data => data.status === 1);
          if(this.class_sections.length > 0) {
            this.selected_section = this.class_sections[0];
          } else {
            this.selected_section = {section_id: '', name: ''};
          }
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
