import { Component, OnInit } from '@angular/core';
import { ClasessService } from '../../_services/clasess.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { EditclassComponent } from '../editclass/editclass.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.css']
})
export class AddSectionComponent implements OnInit {

  constructor(private service: ClasessService, public dialog: MatDialog) { }

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  user: User;

  ngOnInit() {
    this.getClasses();
    this.getEmployees();
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  pageChange(x) {
    this.pageNo = x;
    this.page_start = (x - 1) * 10;
  } 

  nextPage() {
    if(this.pageNo < this.pages) {
      this.pageNo++;
      this.page_start = (this.pageNo - 1) * 10;
    } else {
      return;
    }
  } 

  previousPage() {
    if(this.pageNo > 1) {
      this.pageNo--;
      this.page_start = this.page_start - 10;
    } else {
      return;
    }
  } 

  classes = [];
  sections = [];
  all_sections = [];
  teachers = [];
  selected_class: any = {class_id: '', name: ''};
  selected_section: any = {section_id: '', name: ''};
  alert_message: string;
  dialog_type: string;
  submit_type: string;
  status = 'active';
  data;

  getClasses() {
    this.service.getClasses()
      .subscribe(
        res => { this.classes = res.school_classes.filter(res => res.status === 1), 
          this.selected_class = res.school_classes[0];
          this.getSections()
          console.log(res) 
        }
      )
  }

  getEmployees() {
    this.service.getEmployees()
      .subscribe(
        res => { this.teachers = res.employee.filter(res => res.job_category === "teaching"), console.log(res) }
      )
  }

  getSections() {
    this.service.getSections(this.selected_class.class_id)
      .subscribe(
        res => { this.all_sections = res.class_sections, 
          this.getSectionsByStatus(), 
          console.log(this.all_sections) 
        }
      )
  }

  getSectionsByStatus() {
    if(this.status === 'active') {
      this.sections = this.all_sections.filter(data => data.status == 1)
      console.log(this.sections)
    } else if(this.status === 'inactive') {
      this.sections = this.all_sections.filter(data => data.status == 0)
      console.log(this.sections)
    } 
    this.pages = Math.ceil(this.sections.length / 10);
  }

  restoreSection(section_id) {
    this.service.restoreSection(this.data, section_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.status = 'active';
            this.sections.filter(data => data.section_id === section_id)[0].status = 1;
            this.getSectionsByStatus();
            this.alert_message = "Section Restored Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Section Not Restored";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  deleteSection(section_id) {
    this.service.deleteSection(this.data, section_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.sections.filter(res => res.section_id === section_id)[0].status = 0;
            this.alert_message = "Section Deleted Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Section Not Deleted";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  addSection() {
    this.selected_section = {class_id: this.selected_class.class_id};
    this.dialog_type = 'section';
    this.submit_type = 'add';
    this.openDialog(this.dialog_type, this.submit_type)
  }

  editSection(j) {
    this.selected_section = this.sections[j];
    this.dialog_type = 'section';
    this.submit_type = 'edit';
    this.openDialog(this.dialog_type, this.submit_type)
  }

  openDialog(dialog_type, submit_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      selected_class: this.selected_class,
      selected_section: this.selected_section, 
      teachers: this.teachers,
      dialog_type: dialog_type,
      submit_type: submit_type,
    };

    const dialogRef = this.dialog.open(EditclassComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        this.getSections();  
        console.log(this.sections)
      }
    );

  }

  openAlert(alert_message) {
    const alertConfig = new MatDialogConfig();

    alertConfig.autoFocus = true;
    alertConfig.width = '40%';

    alertConfig.data = {
      message: alert_message,
    };

    const alertRef = this.dialog.open(AlertComponent, alertConfig);

    alertRef.afterClosed().subscribe()
  }

}
