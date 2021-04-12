import { Component, OnInit, Inject } from '@angular/core';
import { ServicesService } from '../../services.service';
import { TasksService } from '../../_services/tasks.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-addtasks',
  templateUrl: './addtasks.component.html',
  styleUrls: ['./addtasks.component.css']
})
export class AddtasksComponent implements OnInit {

  constructor(
    private service: ServicesService,
    private taskservice: TasksService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AddtasksComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.tasks = data.selected_task;
    this.dialog_type = data.dialog_type;
  }

  user;
  tasks = {
    task_id: '',
    task: '',
    department: '',
    priority: '',
    assigned_to: '',
    employee_id: '',
    posted_by: '',
    assigned_on: '',
    due_date: '',
  };
  dialog_type: string;
  alert_message: string;

  employees = [];
  all_employees = [];

  tasksForm: FormGroup = this.fb.group({
    task_id: ['', Validators.required],
    task: ['', Validators.required],
    department: ['', Validators.required],
    priority: ['', Validators.required],
    assigned_to: ['', Validators.required],
    employee_id: '',
    employee_name: '',
    posted_by: ['', Validators.required],
    due_date: ['', Validators.required],
  });

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getEmployees();
    if(this.dialog_type === 'edit') {
      this.tasksForm.patchValue({
        task_id: this.tasks.task_id,
        task: this.tasks.task,
        department: this.tasks.department,
        priority: this.tasks.priority,
        assigned_to: this.tasks.assigned_to,
        employee_id: this.tasks.employee_id,
        posted_by: this.tasks.posted_by,
        assigned_on: this.tasks.assigned_on,
        due_date: this.tasks.due_date,
      })
    }
  }

  getEmployees() {
    this.service.getEmployees()
      .subscribe(
        res => { this.employees = this.all_employees = res.employee, console.log(res) }
      )
  }

  get_employees() {
    console.log(this.tasksForm.value.department)
    this.employees = this.all_employees.filter(emp => emp.job_category === this.tasksForm.value.department);
    console.log(this.employees)
  }

  close() {
    this.dialogRef.close();
  }

  submitTask() {
    if (this.user.role === 'admin') {
      this.tasksForm.value.posted_by = 'admin';
    } else if (this.user.role === 'teacher') {
      this.tasksForm.value.posted_by = this.user.employee_id;
    // } else if (this.user.role === 'admin') {
    //   this.tasksForm.value.posted_by = JSON.parse(localStorage.getItem('currentUser')).uniqueId;
    }
    if(this.tasksForm.value.task === undefined || this.tasksForm.value.task === '' ||
      this.tasksForm.value.department === undefined || this.tasksForm.value.department === '' || 
      this.tasksForm.value.priority === undefined || this.tasksForm.value.priority === '' ||
      this.tasksForm.value.assigned_to === undefined || this.tasksForm.value.assigned_to === '' ||
      this.tasksForm.value.due_date === undefined || this.tasksForm.value.due_date === '') {
        this.alert_message = "Please Enter All Details";
        this.openAlert(this.alert_message)
    } else {
      if (this.dialog_type == 'add') {
        this.taskservice.addTasks(this.tasksForm.value)
          .subscribe(
            res => {
              if (res == true) {
                this.tasksForm.value.employee_name = this.employees.filter(data => data.employee_id === this.tasksForm.value.assigned_to)[0].first_name;
                this.dialogRef.close(this.tasksForm.value);
                this.alert_message = "Task Added Successfully";
                this.openAlert(this.alert_message)
              } else {
                this.alert_message = "Task Not Added";
                this.openAlert(this.alert_message)
              }
              this.tasksForm.reset()
            }
          )
      } else if (this.dialog_type == 'edit') {
        this.tasksForm.value.task_id = this.tasks.task_id;
        this.taskservice.editTask(this.tasksForm.value, this.tasks.task_id)
          .subscribe(
            res => {
              if (res == true) {
                this.tasksForm.value.employee_name = this.employees.filter(data => data.employee_id === this.tasksForm.value.assigned_to)[0].first_name;
                this.dialogRef.close(this.tasksForm.value);
                this.alert_message = "Task Edited Successfully";
                this.openAlert(this.alert_message)
              } else {
                this.alert_message = "Task Not Edited";
                this.openAlert(this.alert_message)
              }
            }
          )
      }
    }
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
