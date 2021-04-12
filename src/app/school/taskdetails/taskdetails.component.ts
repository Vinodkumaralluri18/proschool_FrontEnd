import { Component, OnInit, Inject } from '@angular/core';
import { ServicesService } from 'src/app/services.service';
import { TasksService } from 'src/app/_services/tasks.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-taskdetails',
  templateUrl: './taskdetails.component.html',
  styleUrls: ['./taskdetails.component.css']
})
export class TaskdetailsComponent implements OnInit {

  constructor(
    private service: ServicesService,
    private taskservice: TasksService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<TaskdetailsComponent>,
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

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
