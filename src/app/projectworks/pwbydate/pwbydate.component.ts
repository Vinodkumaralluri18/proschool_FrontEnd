import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../../_services/assignments.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { PwassignComponent } from '../pwassign/pwassign.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-pwbydate',
  templateUrl: './pwbydate.component.html',
  styleUrls: ['./pwbydate.component.css']
})
export class PwbydateComponent implements OnInit {

  constructor(private service: AssignmentsService, public dialog: MatDialog) {}

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;
    
  user: User;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
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

  projectworks = [];
  all_projectworks = [];

  selected_class:string;
  selected_section:string;
  selected_subject:string;
  selected_projectwork;
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
    this.getProjectworks_byDate();
  }

  getProjectworks_byDate() {
    console.log(this.selected_subject);
    if(this.selected_subject == undefined || this.selected_subject == '') {
      this.alert_message = "Please Select Class, Section and Subject";
      this.openAlert(this.alert_message, false)
    } else {
      this.service.getProjectworks(this.selected_section, this.selected_subject)
      .subscribe(
        res => { this.all_projectworks = this.projectworks = res.projectworks, 
          this.pageNo = 1;
          this.page_start = 0;
          this.pages = Math.ceil(this.projectworks.length / 10);
          console.log(res) 
        }
      )
    }
  }

  deleteConfirmation(projectwork_id) {
    this.selected_projectwork = projectwork_id;  
    this.openAlert("Are you sure to delete the Projectwork", true)
  }

  deleteprojectwork() {
    this.service.deleteProjectwork(this.selected_projectwork)
      .subscribe(
        res => { 
          if(res == true) {
            this.projectworks = this.projectworks.filter(res => res.projectwork_id !== this.selected_projectwork)
            this.alert_message = "Projectwork Deleted Successfully";
            this.openAlert(this.alert_message, false)
          } else {
            this.alert_message = "Projectwork Not Deleted";
            this.openAlert(this.alert_message, false)
          }
        }
      )
  }

  addprojectwork() {
    if(this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class, Section and Subject";
      this.openAlert(this.alert_message, false)
    } else {
      this.selected_projectwork = {
        projectwork_id: '',
        section_id: '',
        subject_id: '',
        project_work: '',
        due_date: '',
        assign_date: '',
        maxMarks: '',
        description: '',
      };
      this.dialog_type = 'add';
      this.openDialog(this.selected_projectwork, this.dialog_type)
    }
  }

  editprojectwork(i) {
    this.selected_projectwork = this.projectworks[i];
    this.dialog_type = 'edit';
    this.openDialog(this.selected_projectwork, this.dialog_type)
  }

  openDialog(selected_projectwork, dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      class: this.selected_class,
      section: this.selected_section,
      subject: this.selected_subject,
      projectwork: selected_projectwork,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(PwassignComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data)          
        if (this.dialog_type == 'add') {
          this.getProjectworks_byDate();   
        } else if (this.dialog_type == 'edit') {
          this.getProjectworks_byDate();
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
          this.deleteprojectwork();
        }
      }
    )
  }

}
