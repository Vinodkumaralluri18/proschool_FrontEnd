import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../_services/message.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { AddMessagesComponent } from './../add-messages/add-messages.component';
import { User } from '../../_models/user';
import { appConfig } from './../../app.config';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private service: MessageService, public dialog: MatDialog) { }

  user: User;
  chats:any = [];
  private school_id = appConfig.school_id;
  employee_id;
  student_id;
  sent_to;
  reply;
  confirm_msg;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if (this.user.role === 'parent') {
      console.log(this.user.users[0].section_id)
      this.student_id = this.user.users[0].student_id;
      this.sent_to = this.user.users[0].student_id;
      this.getChatMessages();
    } else if (this.user.role === 'teacher') {
      this.employee_id = this.user.employee_id;
      this.sent_to = this.user.employee_id;
      this.getChatMessages();
    } else {
      this.sent_to = 'SCH-1';
      this.getChatMessages();
    }
    this.getRealTimeMessages()
  }

  selected_class: string;
  selected_section: string;
  dialog_type: string;
  alert_message: string;
  selectedChat:any = {};
  lastMessage:any;
  isInbox: boolean = true;

  getChatMessages() {
    this.service.getChatMessages(this.sent_to)
      .subscribe(
        res => { 
          this.chats = res.chats, 
          this.selectedChat = res.chats[0], 
          console.log(res) 
        }
      )
  }

	getRealTimeMessages() {
		this.service.getRealTimeMessages()
			.subscribe(data => {
        this.chats.filter(chat => chat.chat_id === data.chat_id)[0].messages.push(data);
        if(this.chats.chat_id !== this.selectedChat.chat_id) {
          this.chats.filter(chat => chat.chat_id === data.chat_id)[0].unread++;
        }
        console.log(data)
			})
	}

  addMessage() {
    this.openDialog()
  }

  sendReply() {
    var selectedMessage = this.selectedChat.messages[0];
    if(selectedMessage.sender === this.school_id) {
      var receiver_type = selectedMessage.receiver_type
    } else {
      var receiver_type = selectedMessage.sender_type
    }
    var reply_model = {
      chat_id: this.selectedChat.chat_id,
      sender: this.school_id,
      sender_type: 'admin',
      receiver: this.selectedChat.members.filter(data => data !== this.school_id)[0],
      receiver_type: receiver_type,
      message: this.reply,
      status: 'SENT',
      timestamp: new Date().getTime(),
    }
    this.service.sendReply(reply_model, this.selectedChat.chat_id) 
      .subscribe(
        res => { 
          if(res == true) {
            this.alert_message = "Message Sent Successfully";
            this.openAlert(this.alert_message)
            this.selectedChat.messages.push(reply_model)
            this.reply = '';
          } else {
            this.alert_message = "Message Not Sent Successfully";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  messageStatus(chat_id) {
    this.service.messageStatus(chat_id, {chat_id: chat_id, member_id: this.school_id, member_type: this.user.role} ) 
    .subscribe(
      res => { 
        if(res == true) {
          this.chats.filter(data => data.chat_id === chat_id)[0].unread = 0;
        } else {
          this.alert_message = "Unable to read Messages";
          this.openAlert(this.alert_message)
        }
      }
    )
  }

  openDialog(): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {

    };

    const dialogRef = this.dialog.open(AddMessagesComponent, dialogConfig);

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
