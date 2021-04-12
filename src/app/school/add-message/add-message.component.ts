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

@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.css']
})
export class AddMessageComponent implements OnInit {

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
    private dialogRef: MatDialogRef<AddMessageComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    
  }

  classes = [];
  sections = [];
  students = [];
  all_employees = [];
  employees = [];

  Selected_Category;
  Selected_class;
  Selected_section;
  Selected_student;
  Selected_employeeType;
  Selected_employee;

  messageForm: FormGroup = this.fb.group({
    subject: ['', Validators.required],
    message: ['', Validators.required],
    sent_to: ['', Validators.required],
    receiver: ['', Validators.required],
    sender: ['', Validators.required],
    sender_name: ['', Validators.required],
    role: ['', Validators.required],
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
    } else if(this.Selected_Category === 'Employees') {
      this.selection_parents = false;
      this.selection_employees = true;
      this.getEmployees();
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
      this.messageForm.value.sent_to = 'Parents';
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
      this.messageForm.value.sent_to = this.Selected_class;
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
      this.messageForm.value.sent_to = 'Employees';
      this.allEmployeeTypes = true;
    } else {
      this.allEmployeeTypes = false;
      if(this.Selected_employeeType === "teacher") {
        this.employees = this.all_employees.filter(emp => emp.job_category === "teaching")
      } else if(this.Selected_employeeType === "non-teacher") {
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
        this.all_classes = false;
        this.all_sections = false;
        this.all_students = true;
      } else {
        this.all_classes = false;
        this.all_sections = false;
        this.all_students = false;
      }
    } else if(select === 'employees') {
      if(this.Selected_employee === 'all') {
        this.allEmployeeTypes = false;
        this.allEmployees = true;
      } else {
        this.allEmployeeTypes = false;
        this.allEmployees = false;
      }
    }
  }

  compose() {

    if(this.Selected_Category === 'Parents') {
      if(this.all_classes === true) {
        this.messageForm.value.sent_to = 'Parents';
        this.messageForm.value.receiver = 'All Parents';
      } else if(this.all_sections === true) {
        this.messageForm.value.sent_to = this.Selected_class;
        this.messageForm.value.receiver = this.classes.filter(data => data.class_id === this.Selected_class)[0].name;
      } else if(this.all_students === true) {
        this.messageForm.value.sent_to = this.Selected_section;
        this.messageForm.value.receiver = this.classes.filter(data => data.class_id === this.Selected_class)[0].name + ' ' + this.sections.filter(data => data.section_id === this.Selected_section)[0].name;
      } else {
        this.messageForm.value.sent_to = this.Selected_student;
        this.messageForm.value.receiver = this.students.filter(data => data.student_id === this.Selected_student)[0].first_name + ' ' + this.students.filter(data => data.student_id === this.Selected_student)[0].last_name + ' [ ' + this.classes.filter(data => data.class_id === this.Selected_class)[0].name + ' ' +  this.sections.filter(data => data.section_id === this.Selected_section)[0].name + ' ]';
      }
    } else if(this.Selected_Category === 'Employees') {
      if(this.allEmployeeTypes === true) {
        this.messageForm.value.sent_to = 'Employees';
        this.messageForm.value.receiver = 'All Employees';
      } else if(this.allEmployees === true) {
        this.messageForm.value.sent_to = this.Selected_employeeType;
        if(this.Selected_employeeType === 'teacher') {
          this.messageForm.value.receiver = 'All Teachers'
        } else if(this.Selected_employeeType === 'non-teacher') {
          this.messageForm.value.receiver = 'All Non-Teaching Staff'
        } else if(this.Selected_employeeType === 'administrative') {
          this.messageForm.value.receiver = 'All Administrative Staff'
        } 
      } else if(this.allEmployees === false && this.allEmployeeTypes === false){
        this.messageForm.value.sent_to = this.Selected_employee;
        this.messageForm.value.receiver = this.all_employees.filter(data => data.employee_id === this.Selected_employee)[0].first_name + ' ' + this.all_employees.filter(data => data.employee_id === this.Selected_employee)[0].last_name;
      }
    }

    if(this.user.role === 'parent') {
      console.log(this.user.users[0].section_id)
      this.messageForm.value.sender = this.user.users[0].student_id;
      this.messageForm.value.sender_name = this.user.users[0].first_name + ' ' + this.user.users[0].last_name;
    } else if(this.user.role === 'teacher') {
      if(this.Selected_Category === 'Admin'){
        console.log(this.Selected_Category)
        this.messageForm.value.sent_to = 'admin';
        this.messageForm.value.receiver = 'admin';
      }
      this.messageForm.value.sender = this.user.employee_id;
      this.messageForm.value.sender_name = this.all_employees.filter(data => data.employee_id === this.user.employee_id)[0].first_name + ' ' + this.all_employees.filter(data => data.employee_id === this.user.employee_id)[0].last_name;
    } else {
      this.messageForm.value.sender = 'admin';
      this.messageForm.value.sender_name = 'admin';
    }

    if(this.user.role === 'admin') {
      this.messageForm.value.category = 'admin'
    } else {
      this.messageForm.value.category = this.Selected_Category;
    }

    console.log(this.messageForm.value)
    this.messageForm.value.role = this.user.role;
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
