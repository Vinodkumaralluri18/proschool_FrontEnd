import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../_services/message.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { AddMessageComponent } from './../add-message/add-message.component';
import { OpenMessageComponent } from './../open-message/open-message.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-communications',
  templateUrl: './communications.component.html',
  styleUrls: ['./communications.component.css']
})
export class CommunicationsComponent implements OnInit {

  constructor(private service: MessageService, public dialog: MatDialog) { }

  user: User;
  messages = [];
  employee_id;
  student_id;
  sent_to;
  title = 'Inbox Messages';
  reply;
  confirm_msg;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if (this.user.role === 'parent') {
      console.log(this.user.users[0].section_id)
      this.student_id = this.user.users[0].student_id;
      this.sent_to = this.user.users[0].student_id;
      this.getParentsInbox();
    } else if (this.user.role === 'teacher') {
      this.employee_id = this.user.employee_id;
      this.sent_to = this.user.employee_id;
      this.getInbox();
    } else {
      this.sent_to = 'admin';
      this.getInbox();
    }
  }

  selected_class: string;
  selected_section: string;
  dialog_type: string;
  alert_message: string;
  selectedMail:any = {};
  isInbox: boolean = true;

  getInbox() {
    this.title = 'Inbox Messages';
    this.service.getInbox(this.sent_to)
      .subscribe(
        res => { this.messages = res.messages, console.log(res), this.selectedMail = this.messages[0] }
      )
  }

  getParentsInbox() {
    this.title = 'Inbox Messages';
    this.service.getParentsInbox(this.sent_to, this.selected_class, this.selected_section)
      .subscribe(
        res => { this.messages = res.messages, console.log(res), this.selectedMail = this.messages[0] }
      )
  }

  getOutbox() {
    this.title = 'Outbox Messages';
    this.service.getOutbox(this.sent_to)
      .subscribe(
        res => { this.messages = res.messages, console.log(res), this.selectedMail = this.messages[0] }
      )
  }

  addMessage() {
    this.openDialog()
  }

  sendReply() {
    this.service.sendReply(this.reply, this.selectedMail.message_id) 
      .subscribe(
        res => { 
          if(res == true) {
            this.alert_message = "Message Sent Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Message Not Sent Successfully";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  openMessage(message_id) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      message: this.messages.filter(data => data.message_id === message_id),
      title: this.title
    };

    const dialogRef = this.dialog.open(OpenMessageComponent, dialogConfig);

    dialogRef.afterClosed().subscribe();
  }

  // messageStatus(message_id) {
  //   if (this.isInbox === true) {
  //     this.service.messageStatus(message_id)
  //       .subscribe(
  //         res => {
  //           if (res === true) {
  //             this.messages.filter(msg => msg.message_id === message_id)[0].message_status = 'read';
  //           }
  //           console.log(res)
  //         }
  //       )
  //   }
  // }

  openDialog(): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {

    };

    const dialogRef = this.dialog.open(AddMessageComponent, dialogConfig);

    dialogRef.afterClosed().subscribe();

  }

  openAlert(message) {
    const alertConfig = new MatDialogConfig();

    alertConfig.autoFocus = true;
    alertConfig.width = '40%';

    alertConfig.data = {
      message: message,
    };

    const alertRef = this.dialog.open(AlertComponent, alertConfig);

    alertRef.afterClosed().subscribe(        
      data => {
        console.log("Dialog output:", data)
        // if(data === true) {
        //   this.confirm_msg = true;
        //   this.deleteSubject(this.delete_subject);
        // }
      }
    );    
  }

}