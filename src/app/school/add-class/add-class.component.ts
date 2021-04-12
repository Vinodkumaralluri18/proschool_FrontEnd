import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClasessService } from '../../_services/clasess.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { EditclassComponent } from '../editclass/editclass.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {

  constructor(private service: ClasessService, private fb: FormBuilder, public dialog: MatDialog) {}

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  user: User;
  classes = [];
  all_classes = [];
  selected_class = '';
  alert_message: string;
  dialog_type: string;
  submit_type: string;
  showStatusList: boolean = false;
  status = 'active';
  data;

  ngOnInit() {
    this.getClasses();
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

  classForm: FormGroup = this.fb.group({
    class_id: '',
    name: ['', Validators.required],
    status: 'active'
  });

  sectionForm: FormGroup = this.fb.group({
    section_id: '',
    selected_class: ['', Validators.required],
    name: ['', Validators.required],
    teacher_name: [''],
  });

  getClasses() {
    this.service.getClasses()
      .subscribe(
        res => { this.classes = this.all_classes = res.school_classes, 
          this.getClassesByStatus(), 
          this.selected_class = res.school_classes[0].class_id;
          console.log(res) }
      )
  }

  getClassesByStatus() {
    if(this.status === 'active') {
      this.classes = this.all_classes.filter(data => data.status === 1)
    } else if(this.status === 'inactive') {
      this.classes = this.all_classes.filter(data => data.status === 0)
    } 
    this.pageNo = 1;
    this.page_start = 0;
    this.pages = Math.ceil(this.classes.length / 10);
    console.log(this.classes)
  }

  restoreClass(class_id) {
    this.service.restoreClass(this.data, class_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.status = 'active';
            this.classes.filter(data => data.class_id === class_id)[0].status = 1;
            this.getClassesByStatus();
            this.alert_message = "Class Restored Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Class Not Restored";
            this.openAlert(this.alert_message)
          }
        }
      )
  }
  
  addClass() {
    this.selected_class = '';
    this.dialog_type = 'class';
    this.submit_type = 'add';
    this.openDialog(this.dialog_type, this.submit_type)
  }

  deleteClasses(class_id){
    this.service.deleteClass(this.data, class_id)
    .subscribe(
      res => { 
        if(res == true) {
          this.classes.filter(res => res.class_id === class_id)[0].status = 0;
          this.status = 'active';
          this.getClassesByStatus();
          this.alert_message = "Class Deleted Successfully";
          this.openAlert(this.alert_message)
        } else {
          this.alert_message = "Class Not Deleted";
          this.openAlert(this.alert_message)
        }
      }
    )
  }

  editClass(i) {
    this.selected_class = this.classes[i];
    this.dialog_type = 'class';
    this.submit_type = 'edit';
    this.openDialog(this.dialog_type, this.submit_type)
  }

  openDialog(dialog_type, submit_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      selected_class: this.selected_class,
      dialog_type: dialog_type,
      submit_type: submit_type,
    };

    const dialogRef = this.dialog.open(EditclassComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        this.getClasses();      
        console.log("Dialog output:", data)
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
