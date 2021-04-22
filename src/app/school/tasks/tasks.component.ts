import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../_services/tasks.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor(private taskservice: TasksService, private fb: FormBuilder, public dialog: MatDialog) {}

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;
  
  user: User;
  alert_message: string;
  arr = [1, 2, 3, 4, 5];

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user.role)
    this.getTasks();
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

  tasks = [];
  all_tasks = [];

  getTasks() {
    this.taskservice.getTasks()
      .subscribe(
        res => { this.all_tasks = res.tasks, this.get_Tasks(), console.log(res) }
      )
  }

  get_Tasks() {
    if(this.user.role === 'admin') {
      this.tasks = this.all_tasks.filter(task => task.task_status === 'completed');
    } else if(this.user.role === 'teacher') {
      this.tasks = this.all_tasks.filter(task => task.employee_id === this.user.employee_id && task.task_status === 'completed');
    }
    this.pageNo = 1;
    this.page_start = 0;
    this.pages = Math.ceil(this.tasks.length / 10);
  }

  deleteTask(task_id) {
    this.taskservice.deleteTask(task_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.tasks = this.tasks.filter(res => res.task_id !== task_id);
            this.all_tasks = this.all_tasks.filter(res => res.task_id !== task_id)
            this.alert_message = "Task Deleted Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Task Not Deleted";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  update_status(status, i) {    
    if(status == "pending") {     
      this.tasks[i].task_status = "completed";
    } else {
      this.tasks[i].task_status = "pending";
    }
    this.taskservice.updateStatus(this.tasks[i].task_status, this.tasks[i].task_id)
    .subscribe(
      res => { 
        if(res == true) {
          this.alert_message = "Task Updated Successfully";
          this.openAlert(this.alert_message)
        } else {
          this.alert_message = "Task Not Updated";
          this.openAlert(this.alert_message)
        }
      }
    )
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
