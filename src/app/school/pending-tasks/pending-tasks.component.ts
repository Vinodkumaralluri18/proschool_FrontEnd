import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../_services/tasks.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { AddtasksComponent } from '../addtasks/addtasks.component';
import { TaskdetailsComponent} from '../taskdetails/taskdetails.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-pending-tasks',
  templateUrl: './pending-tasks.component.html',
  styleUrls: ['./pending-tasks.component.css']
})
export class PendingTasksComponent implements OnInit {

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  user: User;
  selected_task = {
    task: '',
    employee_id: '',
    employee_name: '',
    school_id: '',
    department: '',
    priority: '',
    assigned_to: '',
    completion_date: '',
    rating: '',
    task_status: '',
    assigned_on: '',
    status: '',
  };
  dialog_type;
  alert_message: string;

  constructor(private taskservice: TasksService, private fb: FormBuilder, public dialog: MatDialog) {}

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
        res => { this.all_tasks = res.tasks, this.get_Tasks(), console.log(res) 
        }
      )
  }

  get_Tasks() {
    if(this.user.role === 'admin') {
      this.tasks = this.all_tasks.filter(task => task.task_status === 'pending');
    } else if(this.user.role === 'teacher') {
      this.tasks = this.all_tasks.filter(task => task.employee_id === this.user.employee_id && task.task_status === 'pending');
    }
    this.pageNo = 1;
    this.page_start = 0;
    this.pages = Math.ceil(this.tasks.length / 10);
  }

  addTask() {
    this.dialog_type = 'add';
    this.openDialog(this.dialog_type)
  }

  deleteConfirmation(task_id) {
    this.selected_task = task_id;  
    this.openAlert("Are you sure to delete the Task", true)
  }

  deleteTask() {
    this.taskservice.deleteTask(this.selected_task)
      .subscribe(
        res => { 
          if(res == true) {
            this.tasks = this.tasks.filter(res => res.task_id !== this.selected_task);
            this.all_tasks = this.all_tasks.filter(res => res.task_id !== this.selected_task)
            this.alert_message = "Task Deleted Successfully";
            this.openAlert(this.alert_message, false)
          } else {
            this.alert_message = "Task Not Deleted";
            this.openAlert(this.alert_message, false)
          }
        }
      )
  }

  editTask(i) {
    this.selected_task = this.tasks[i];
    this.dialog_type = 'edit';
    this.openDialog(this.dialog_type)
  }

  taskDetails(i) {
    this.selected_task = this.tasks[i];
    this.dialog_type = 'list';
    this.openListDialog(this.dialog_type);
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
          this.openAlert(this.alert_message, false)
        } else {
          this.alert_message = "Task Not Updated";
          this.openAlert(this.alert_message, false)
        }
      }
    )
  }

  openDialog(dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      selected_task: this.selected_task,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(AddtasksComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if(data) {
          if(dialog_type === 'edit') {
            this.getTasks();
          } else if(dialog_type === 'add') {
            this.getTasks();
            console.log("Dialog output:", data)
          }
        }
      }
    );
  }

  openListDialog(dialog_type): void {

    let dialogConfig = new MatDialogConfig();

    dialogConfig = {
      autoFocus:true,
      maxWidth: '80vw',
      maxHeight: '100vh',
    };

    dialogConfig.data = {
      selected_task: this.selected_task,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(TaskdetailsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if(data) {
          if(dialog_type === 'list') {
            this.getTasks();
            }
        }
      }
    );
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
          this.deleteTask();
        }
      }
    )
  }

}
