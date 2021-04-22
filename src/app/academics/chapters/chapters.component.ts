import { Component, OnInit } from '@angular/core';
import { AcademicsService } from '../../_services/academics.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { AddchapterComponent } from '../addchapter/addchapter.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})
export class ChaptersComponent implements OnInit {

  constructor(private service: AcademicsService, public dialog: MatDialog) {}

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  user: User;
  fileData: File = null;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if (this.user.role === 'parent') {
      console.log(this.user.users[0].section_id)
      this.selected_section = this.user.users[0].section_id;
      this.getSubjects();
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
  chapters = [];

  selected_class: string;
  selected_section: string;
  selected_subject: string;
  selected_chapter;
  dialog_type: string;
  alert_message: string;

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
    this.getChapters();
  }

  getSubjects() {
    if (this.selected_class == undefined || this.selected_class == 'No Sections' || this.selected_section == undefined || this.selected_section == 'No Sections') {
      this.alert_message = "Please Select Class & Section";
      this.openAlert(this.alert_message, false)
    } else if(this.selected_class == 'No Classes' || this.selected_section == 'No Sections') {
      this.chapters = [];
    } else {
      this.service.getSubjects(this.selected_section)
      .subscribe(
        res => { this.subjects = res.subjects, console.log(res) }
      )
    }
  }

  getChapters() {
    console.log(this.selected_class)
    console.log(this.selected_section)
    if(this.selected_class === 'No Classes' || this.selected_section === "No Sections") {
      this.selected_section = '';
      this.selected_subject = '';
      this.chapters = [];
    } else {
      if (this.selected_subject == undefined || this.selected_subject == 'No Subjects') {
        this.alert_message = "Please Select Subject";
        this.openAlert(this.alert_message, false)
      } else if(this.selected_subject == 'No Subjects') {
        this.chapters = [];
      } else {
        this.service.getChapters(this.selected_subject)
          .subscribe(
            res => { 
              this.chapters = res.chapters, 
              this.pageNo = 1,
              this.page_start = 0,
              this.pages = Math.ceil(this.chapters.length / 10),
              console.log(res) 
            }
          )
      }
    }
  }

  deleteConfirmation(lession_id) {
    this.selected_chapter = lession_id;  
    this.openAlert("Are you sure to delete the Chapter", true)
  }

  deleteChapter() {
    this.service.deleteChapter(this.selected_chapter)
      .subscribe(
        res => {
          if (res == true) {
            this.chapters = this.chapters.filter(res => res.lession_id !== this.selected_chapter)
            this.alert_message = "Chapter Deleted Successfully";
            this.openAlert(this.alert_message, false)
          } else {
            this.alert_message = "Chapter Not Deleted";
            this.openAlert(this.alert_message, false)
          }
        }
      )
  }

  updateChapter(status, lession_id, i) { 
    this.service.updateChapter(status, lession_id)
    .subscribe(
      res => {
        if(res == true) {
          this.alert_message = "Chapter Updated Successfully";
          this.openAlert(this.alert_message, false);
          if(status === 'started') {
            this.chapters[i].start_check = true;
            this.chapters[i].start_disable = true;
            this.chapters[i].end_disable = false;
          } else if(status === 'completed') {
            this.chapters[i].end_check = true;
            this.chapters[i].end_disable = true;
          }
        } else {
          this.alert_message = "Chapter Not Updated";
          this.openAlert(this.alert_message, false)
        }
      }
    )
  }

  chaptersUpload(files: any){
    this.fileData = files[0];
    this.onSubmitFile();
  }

  onSubmitFile() {
    const formData = new FormData();
    formData.append('file', this.fileData);
    if (this.selected_subject == undefined || this.selected_subject == '') {
      this.alert_message = "Please Select Subject";
      this.openAlert(this.alert_message, false)
    } else {
      this.service.bulkChaptersUpload(formData, this.selected_subject)
      .subscribe(
        res => { 
          console.log(res)
          if(res === true) {
            this.getChapters();
            this.alert_message = "Bulk Chapters Uploaded Successfully";
            this.openAlert(this.alert_message, false)
          } else if(res.data === "Chapters are already Added") {
            this.alert_message = "Chapters are already Added";
            this.openAlert(this.alert_message, false)
          } else {
            this.alert_message = "Bulk Chapters Not Uploaded";
            this.openAlert(this.alert_message, false)
          }
        }
      )
    }
  }

  addchapter() {
    if (this.selected_subject == undefined || this.selected_subject == '') {
      this.alert_message = "Please Select Class, Section and Subject";
      this.openAlert(this.alert_message, false)
    } else { 
      this.selected_chapter = {
        title: '',
        chapter_code: '',
        description: '',
      };
      this.dialog_type = 'add';
      this.openDialog(this.selected_chapter, this.dialog_type)
    }
  }

  openAlert(alert_message, status) {
    const alertConfig = new MatDialogConfig();

    alertConfig.autoFocus = true;
    alertConfig.width = '40%';

    alertConfig.data = {
      message: alert_message,
      confirm_status: status,
    };

    const alertRef = this.dialog.open(AlertComponent, alertConfig);

    alertRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data)
        if(data === true) {
          this.deleteChapter();
        }
      }
    )
  }

  editchapter(i) {
    this.selected_chapter = this.chapters[i];
    this.dialog_type = 'edit';
    this.openDialog(this.selected_chapter, this.dialog_type)
  }

  openDialog(selected_chapter, dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      class: this.selected_class,
      section: this.selected_section,
      subject: this.selected_subject,
      chapter: selected_chapter,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(AddchapterComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data)
        if (this.dialog_type == 'add') {
          this.getChapters();
        } else if (this.dialog_type == 'edit') {
          this.getChapters();
        }
      }
    );

  }

}
