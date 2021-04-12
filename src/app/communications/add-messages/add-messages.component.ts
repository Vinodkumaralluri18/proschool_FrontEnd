import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { MessageService } from '../../_services/message.service';
import { ServicesService } from '../../services.service';
import { StudentsService } from '../../_services/students.service';
import { EmployeesService } from '../../_services/employees.service';
import { User } from '../../_models/user';
import { appConfig } from './../../app.config';

@Component({
  selector: 'app-add-messages',
  templateUrl: './add-messages.component.html',
  styleUrls: ['./add-messages.component.css']
})
export class AddMessagesComponent implements OnInit {

  showCategoryList: boolean = false;
  showClassList: boolean = false;
  showSectionList: boolean = false;
  showStudentList: boolean = false;
  showEmployeeTypeList: boolean = false;
  showEmployeeList: boolean = false;

  class: string;
  section: string;
  dialog_type: string;
  alert_message: string;
  private school_id = appConfig.school_id;
  selection_parents = false;
  selection_employees = false;
  all_classes = false;
  all_sections = false;
  all_students = false;
  allEmployeeTypes = false;
  allEmployees = false;
  
  user: User;

  constructor(
    private fb: FormBuilder,
    private service: MessageService, 
    private allservice: ServicesService,
    private studentservice: StudentsService,
    private employeeservice: EmployeesService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AddMessagesComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    
  }

  classes = [];
  sections = [];
  students = [];
  all_employees = [];
  employees = [];

  Selected_Category;
  Selected_class;
  Selected_className;
  Selected_section;
  Selected_sectionName;
  Selected_student;
  Selected_studentName;
  Selected_employeeType;
  Selected_employee;
  Selected_employeeName;

  category;
  receiver;
  receiver_type;

  messageForm: FormGroup = this.fb.group({
    message: ['', Validators.required],
    receiver: ['', Validators.required],
    receiver_type: ['', Validators.required],
    sender: ['', Validators.required],
    sender_type: ['', Validators.required],
    category: ['', Validators.required],
  })

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if(this.user.role === 'teacher') {
      this.getEmployees();
    }
  }

  getCategory() {
    if(this.Selected_Category === 'Parents') {
      this.selection_parents = true;
      this.selection_employees = false;
      this.getClasses();
      this.category = 'parent';
    } else if(this.Selected_Category === 'Employees') {
      this.selection_parents = false;
      this.selection_employees = true;
      this.getEmployees();
      this.category = 'employee';
    }
  }

  getClasses() {
    this.allservice.getClasses()
      .subscribe(
        res => { this.classes = res.school_classes.filter(data => data.status === 1), console.log(res)}
      )
  }

  getSections() {
    if(this.Selected_class === 'all') {
      this.receiver = this.school_id;
      this.receiver_type = 'all_classes';
      this.all_classes = true;
      this.all_sections = false;
      this.all_students = false;
    } else {
      this.all_classes = false;
      this.all_sections = false;
      this.all_students = false;
      this.allservice.getSections(this.Selected_class)
      .subscribe(
        res => { this.sections = res.class_sections, console.log(res)}
      )
    }
  }

  getStudents() {
    if (this.Selected_section == undefined || this.Selected_section == '') {
      this.alert_message = "Please Select Class and Section";
      this.openAlert(this.alert_message)
    } else if(this.Selected_section === 'all') {
      this.receiver = this.Selected_class;
      this.receiver_type = 'all_sections';
      this.all_classes = false;
      this.all_sections = true;
      this.all_students = false;
    } else {
      this.all_classes = false;
      this.all_sections = false;
      this.all_students = false;
      this.studentservice.getStudents(this.Selected_section)
        .subscribe(
          res => { this.students = res.students.filter(data => data.status === 1), console.log(res) }
        )
    }
  }

  getEmployees() {
    this.employeeservice.getEmployees()
      .subscribe(
        res => { this.all_employees = res.employee.filter(data => data.status === 1), console.log(res) }
      )
  }

  get_selectedemployees() {   
    if(this.Selected_employeeType == undefined || this.Selected_employeeType == '') {
      this.alert_message = "Please Select Employee Type";
      this.openAlert(this.alert_message)
    } else if (this.Selected_employeeType === 'all') {
      this.receiver = this.school_id;
      this.receiver_type = 'all_employeetypes';
      this.allEmployeeTypes = true;
    } else {
      this.allEmployeeTypes = false;
      if(this.Selected_employeeType === "teaching") {
        this.employees = this.all_employees.filter(emp => emp.job_category === "teaching")
      } else if(this.Selected_employeeType === "non-teaching") {
        this.employees = this.all_employees.filter(emp => emp.job_category === "non-teaching")
      } else if(this.Selected_employeeType === "administrative") {
        this.employees = this.all_employees.filter(emp => emp.job_category === "administrative")
      } else {
        this.employees = this.all_employees
      }
    }
  }

  getSent_to(select) {
    if(select === 'parents') {
      if(this.Selected_student === 'all') {
        this.receiver = this.Selected_section;
        this.receiver_type = 'all_students';
        this.all_classes = false;
        this.all_sections = false;
        this.all_students = true;
      } else {
        this.receiver = this.Selected_student;
        this.receiver_type = 'student';
        this.all_classes = false;
        this.all_sections = false;
        this.all_students = false;
      }
    } else if(select === 'employees') {
      if(this.Selected_employee === 'all') {
        this.receiver = this.Selected_employeeType;
        this.receiver_type = 'all_employees';
        this.allEmployeeTypes = false;
        this.allEmployees = true;
      } else {
        this.receiver = this.Selected_employee;
        this.receiver_type = 'employee';
        this.allEmployeeTypes = false;
        this.allEmployees = false;
      }
    }
  }

  compose() {
    this.messageForm.value.category = this.category;
    this.messageForm.value.receiver = this.receiver;
    this.messageForm.value.receiver_type = this.receiver_type;
    this.messageForm.value.sender = this.school_id;
    this.messageForm.value.sender_type = 'admin';
    console.log(this.messageForm.value)
    this.service.sendMessage(this.messageForm.value) 
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
    this.dialogRef.close();
  }
  
  close() {
    this.dialogRef.close();
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
