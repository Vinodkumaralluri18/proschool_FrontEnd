import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TimetableService } from '../../_services/timetable.service';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { AddNoticeComponent } from '../add-notice/add-notice.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-noticeboard',
  templateUrl: './noticeboard.component.html',
  styleUrls: ['./noticeboard.component.css']
})
export class NoticeboardComponent implements OnInit {
  @ViewChild('closebutton',{static: false}) closebutton;

  constructor(public service: TimetableService, public dialog: MatDialog) { }

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  dialog_type: string;
  alert_message: string;
  user: User;
  searchText = '';
  selected_notice: any;
  notices = [];

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getNotice();
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

  getNotice() {
    this.service.getNotice()
    .subscribe(
      res => { 
        this.notices = res.noticeboard, 
        this.pageNo = 1,
        this.page_start = 0,
        this.pages = Math.ceil(this.notices.length / 10),
        console.log(res) }
    )
  }

  addNotice() {
    this.selected_notice = '';
    this.dialog_type = 'add';
    this.openDialog(this.selected_notice, this.dialog_type)
  }

  actions(i) {
    this.selected_notice = this.notices[i];
    this.dialog_type = 'action';
    this.openDialog(this.selected_notice, this.dialog_type)
  }

  viewNotice(i = 0) {
    this.selected_notice = this.notices[i];
    this.dialog_type = 'view';
    this.openDialog(this.selected_notice, this.dialog_type)
    this.closebutton.nativeElement.click();
  }

  editNotice(i = 0) {
    this.selected_notice = this.notices[i];
    this.dialog_type = 'edit';
    this.openDialog(this.selected_notice, this.dialog_type)
    this.closebutton.nativeElement.click();
  }

  deleteNotice(announcement_id = 0) {

    this.closebutton.nativeElement.click();
    this.service.deleteNotice(announcement_id)
    .subscribe(
      res => { 
        if(res == true) {
          this.alert_message = "Notice Deleted Successfully";
          this.openAlert(this.alert_message)
          this.getNotice();
        } else {
          this.alert_message = "Notice Not Deleted";
          this.openAlert(this.alert_message)
        }
      }
    )
  }

  openDialog(selected_notice, dialog_type): void {

    let dialogConfig = new MatDialogConfig();

   dialogConfig = {
        autoFocus:true,
        width: '60vw',
        maxHeight: '100vh',
      };
    

    dialogConfig.data = {
      selected_notice: selected_notice,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(AddNoticeComponent, dialogConfig);
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      data => {
        this.getNotice();
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