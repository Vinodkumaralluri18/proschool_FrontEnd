import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from '../../_services/message.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { AddMessagesComponent } from './../add-messages/add-messages.component';
import { User } from '../../_models/user';
import { appConfig } from './../../app.config';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeesService } from 'src/app/_services/employees.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private service: MessageService, private employeesService: EmployeesService, public dialog: MatDialog,
    private fb: FormBuilder,
    ) { }

  user: User;
  chats:any = [];
  wholeChat:any;
  private school_id = appConfig.school_id;
  employee_id;
  student_id;
  sent_to;
  reply;
  confirm_msg;
  public selectedTab: string = 'employee';
  public employees = [];

  replyForm: FormGroup = this.fb.group({
    message: ['', Validators.required]
  })
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
    }
    else if (this.user.role === 'admin') {
      this.employee_id = this.user.uniqueId;
      this.sent_to = this.user.uniqueId;
      this.getChatMessages();
    } else {
      this.sent_to = 'SCH-1';
      this.getChatMessages();
    }
    this.getRealTimeMessages();
  }
  selected_class: string;
  selected_section: string;
  dialog_type: string;
  alert_message: string;
  selectedChat:any = {};
  lastMessage:any;
  isInbox: boolean = true;

  changeTab(tab: string) {
    this.selectedTab = tab;
    if(this.selectedTab === 'parent') {
      this.chats = this.wholeChat['parents'];
      this.selectedChat = this.chats[0];
    } else if(this.selectedTab === 'employee') {
      this.chats = this.wholeChat['employees'];
      this.selectedChat = this.chats[0];
    }
  }

  triggerReply(event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
      this.sendReply()
    }
  }

  getChatMessages() {
    this.service.getChatMessages(this.sent_to)
      .subscribe(
        res => {
          this.wholeChat = res;
          this.chats = res.employees, 
          this.getEmployeeName(this.chats);
          this.getParentName(res.parents);
          this.selectedChat = res.employees[0], 
          console.log(res) 
          console.log(this.selectedChat)
        }
      )
  }

  getEmployeeNameBasedOnId(employee: string[]) {
    let [employeeFiltered] = employee.filter(v => v !== this.sent_to); 
    // if(this.selectedTab === 'parent') {
    //   console.log(`parent ${employeeFiltered} ${} ${this.parentDetails[employeeFiltered].first_name} ${this.parentDetails[employeeFiltered].last_name}`);
    // }
    if(employeeFiltered && this.employeeDetails[employeeFiltered] || this.parentDetails[employeeFiltered]) {
      // return `${this.employeeDetails[employeeFiltered].first_name} ${this.employeeDetails[employeeFiltered].last_name}`
      return this.selectedTab !== 'parent' ?  
        `${this.employeeDetails[employeeFiltered].first_name} ${this.employeeDetails[employeeFiltered].last_name}` : 
        `${this.parentDetails[employeeFiltered].first_name} ${this.parentDetails[employeeFiltered].last_name}`
    } else {
      return `${employeeFiltered}`
    }
  }

  employeeDetails = {};
  getEmployeeName(chats) {
    let employeeList=[];
    for(let chat of chats) {
      employeeList = employeeList.concat(chat.members);
    }
    (employeeList as any) = new Set(employeeList)
    employeeList.forEach(v => this.employees.push(v));
    console.log({employees: this.employees});
    for(let employee of this.employees) {
      this.employeesService.getEmployeeDetails(employee).subscribe(res => {
        if(res && res.employee && res.employee.length) {
          this.employeeDetails[employee] = res.employee[0];
        }
      });
      console.log({employeeDetails :this.employeeDetails});
    }
  }
  parents: any = [];
  parentDetails: any = {};
  getParentName(chats) {
    let parentList=[];
    for(let chat of chats) {
      parentList = parentList.concat(chat.members);
    }
    (parentList as any) = new Set(parentList)
    parentList.forEach(v => this.parents.push(v));
    for(let parent of this.parents) {
      this.service.getStudenDetails(parent).subscribe(res => {
        if(res && res.students && res.students.length) {
          this.parentDetails[parent] = res.students[0];
        }
      });
      console.log({parentDetails :this.parentDetails});
    }
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
    this.showValidationMsg(this.replyForm);
    if(!this.replyForm.valid) {
      this.alert_message = "Enter correct Message !!";
      this.openAlert(this.alert_message)
      return ;
    }
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
      message: this.replyForm.get('message').value,
      status: 'SENT',
      timestamp: new Date().getTime(),
    }
    this.service.sendReply(reply_model, this.selectedChat.chat_id) 
      .subscribe(
        res => { 
          this.replyForm.get('message').setValue('');
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

  showValidationMsg(formGroup: FormGroup) {
    for (const key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        const control: FormControl = <FormControl>formGroup.controls[key];
        if (Object.keys(control).includes("controls")) {
          const formGroupChild: FormGroup = <FormGroup>formGroup.controls[key];
          this.showValidationMsg(formGroupChild);
        }
        control.markAsTouched();
      }
    }
  }

  messageStatus(chat) {
    const {result, message} = this.findUnreadMessage(chat);
    if(result) {
      this.service.messageStatus({chat_id: chat.chat_id, receiver: message.receiver , receiver_type: message.receiver_type} ) 
      .subscribe(
        res => { 
          if(res == true) {
            this.chats.filter(data => data.chat_id === chat.chat_id)[0].unread = 0;
          } else {
            this.alert_message = "Unable to read Messages";
            this.openAlert(this.alert_message)
          }
        }
      )
    }
  }

  findUnreadMessage(chat) {
    for(let message of chat.messages) {
      if(message.receiver === this.sent_to && message.status !== 'READ') {
        return {result: true, message};
      }
    }
    return {result: false};
  }
  openDialog(): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {

    };

    const dialogRef = this.dialog.open(AddMessagesComponent, dialogConfig);

    dialogRef.afterClosed().subscribe( () => {
      this.getChatMessages();
    });

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
