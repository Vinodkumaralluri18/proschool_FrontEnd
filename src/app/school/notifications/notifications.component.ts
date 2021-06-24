import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../_services/header.service';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { User, UserRole } from '../../_models/user';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  user: User;
  notifications = [];
  all_notifications = [];
  showStatusList = false;
  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  status = 'all';

  constructor(private service: HeaderService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getNotifications();
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

  getNotifications() {
    if(this.user.role ===  UserRole.ADMIN) {
      this.service.getAdminNotifications()
      .subscribe(
        res => { this.notifications = this.all_notifications = res.notifications, 
          console.log(res) 
        }
      )
    } else if(this.user.role ===  UserRole.EMPLOYEE) {
      this.service.getNotifications()
      .subscribe(
        res => { this.notifications = this.all_notifications = res.notifications, 
          console.log(res) 
        }
      )
    }
  }

  getNotificationByStatus() {
    if(this.status === 'read') {
      this.notifications = this.all_notifications.filter(data => data.status === 'read')
    } else if(this.status === 'unread') {
      this.notifications = this.all_notifications.filter(data => data.status === 'unread')
    } else if(this.status === 'all') {
      this.notifications = this.all_notifications
    }
  }

}