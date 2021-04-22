import { Component, OnInit } from '@angular/core';
import { AcademicsService } from '../../_services/academics.service';
import { TeacherService } from '../../_services/teacher.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { AddeditsubjectsComponent } from '../addeditsubjects/addeditsubjects.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  constructor(private service: AcademicsService, private teacherService: TeacherService, public dialog: MatDialog) {}

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  user: User;
  employee_id;
  fileData: File = null;
  confirm_msg;

  ngOnInit() { 
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if(this.user.role === 'parent') {
      console.log(this.user.users[0].section_id)
      this.selected_section = this.user.users[0].section_id;
      this.getSubjects();
    } else if(this.user.role === 'teacher') {
      this.employee_id = this.user.employee_id;
    }
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

  subjects = [];

  selected_class: string;
  selected_section: string;
  selected_subject;
  dialog_type: string;
  alert_message: string;
  delete_subject;

  receiveClass($event) {
    this.selected_class = $event
    console.log(this.selected_class)
  }

  receiveSection($event) {
    this.selected_section = $event
    console.log(this.selected_section)
    this.getSubjects();
  }

  getSubjects() {
    if (this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class and Section";
      this.openAlert(this.alert_message, false)
    } else {
      if(this.user.role === 'admin' || this.user.role === 'parent') {
        this.service.getSubjects(this.selected_section)
        .subscribe(
          res => { 
            this.subjects = res.subjects, 
            this.pageNo = 1,
            this.page_start = 0,
            this.pages = Math.ceil(this.subjects.length / 10), 
            console.log(res) 
          }
        )
      } else if(this.user.role === 'teacher') {
        this.teacherService.getTeacherSubjects(this.employee_id, this.selected_section)
        .subscribe(
          res => { 
            this.subjects = res.subjects, 
            this.pageNo = 1,
            this.page_start = 0,
            this.pages = Math.ceil(this.subjects.length / 10), 
            console.log(res) 
          }
        )
      }
    }
  }

  deleteConfirmation(subject_id) {
    this.delete_subject = subject_id;
    this.confirm_msg = "Are you sure to delete the Subject";
    this.openAlert(this.confirm_msg, true)
  }

  deleteSubject(subject_id) {
    if(this.confirm_msg == true) {
      this.service.deleteSubject(subject_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.subjects = this.subjects.filter(res => res.subject_id !== subject_id)
            this.alert_message = "Subject Deleted Successfully";
            this.openAlert(this.alert_message, false)
          } else {
            this.alert_message = "Subject Not Deleted Successfully";
            this.openAlert(this.alert_message, false)
          }
        }
      )
    }
  }

  openAlert(message, confirm_status) {
    const alertConfig = new MatDialogConfig();

    alertConfig.autoFocus = true;
    alertConfig.width = '40%';

    alertConfig.data = {
      message: message,
      confirm_status: confirm_status,
    };

    const alertRef = this.dialog.open(AlertComponent, alertConfig);

    alertRef.afterClosed().subscribe(        
      data => {
        console.log("Dialog output:", data)
        if(data === true) {
          this.confirm_msg = true;
          this.deleteSubject(this.delete_subject);
        }
      }
    );    
  }

  subjectsUpload(files: any){
    this.fileData = files[0];
    this.onSubmitFile();
  }

  onSubmitFile() {
    const formData = new FormData();
    formData.append('file', this.fileData);
    if (this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class and Section";
      this.openAlert(this.alert_message, false)
    } else {
      this.service.bulkSubjectsUpload(formData, this.selected_section)
      .subscribe(
        res => { 
          console.log(res)
          if(res === true) {
            this.getSubjects();
            this.alert_message = "Bulk Subjects Uploaded Successfully";
            this.openAlert(this.alert_message, false)
          } else if(res.data === "Subjects are already Added") {
            this.alert_message = "Subjects are already Added";
            this.openAlert(this.alert_message, false)
          } else {
            this.alert_message = "Bulk Subjects Not Uploaded";
            this.openAlert(this.alert_message, false)
          }
        }
      )
    }
  }

  addsubject() {
    if (this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class and Section";
      this.openAlert(this.alert_message, false)
    } else { 
      this.selected_subject = {
        name: '',
        textbook: '',
        author: '',
        publisher: '',
      };
      this.dialog_type = 'add';
      this.openDialog(this.selected_subject, this.dialog_type)
    }
  }

  editsubject(i) {
    console.log(i)
    this.selected_subject = this.subjects[i];
    this.dialog_type = 'edit';
    this.openDialog(this.selected_subject, this.dialog_type)
  }

  openDialog(selected_subject, dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      class: this.selected_class,
      section: this.selected_section,
      subject: selected_subject,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(AddeditsubjectsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(        
      data => {
        console.log("Dialog output:", data)
        if (this.dialog_type == 'add') {
          this.getSubjects();
          // this.collection.subjects.push(data);
        } else if (this.dialog_type == 'edit') {
          console.log('Hello')
          this.getSubjects();
          // this.collection.subjects.filter(res => res.subject_id == data.subject_id)[0].name = data.name;
          // this.collection.subjects.filter(res => res.subject_id == data.subject_id)[0].textbook = data.textbook;
          // this.collection.subjects.filter(res => res.subject_id == data.subject_id)[0].author = data.author;
          // this.collection.subjects.filter(res => res.subject_id == data.subject_id)[0].publisher = data.publisher;
        }
      }
    );    

  }
}
