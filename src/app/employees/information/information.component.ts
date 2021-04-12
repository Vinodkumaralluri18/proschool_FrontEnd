import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../_services/employees.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AdmissionComponent } from '../admission/admission.component';
import { AlertComponent } from '../../_alert/alert/alert.component';

import { User } from '../../_models/user';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  constructor(private service: EmployeesService, public dialog: MatDialog) {}

  user: User;
  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  alert_message: string;
  employee_type: any;
  fileData: File = null;
  status = 'active';

  all_employees = [];
  select_employees = [];
  employees = [];
  showStatusList: boolean = false;
  showEmployeeTypeList : boolean = false;
  employee_types = [{ 'name': 'All', 'value': 'all' }, 
    { 'name': 'Teaching', 'value': 'teaching' }, 
    { 'name': 'Non-Teaching', 'value': 'non-teaching' }, 
    { 'name': 'Administrative', 'value': 'administrative' }]

  selected_employee;
  dialog_type;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getEmployees();
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

  getEmployees() {
    this.service.getEmployees()
      .subscribe(
        res => { this.all_employees = this.employees = res.employee, 
          this.pages = Math.ceil(this.employees.length / 10),
          console.log(res) 
        }
      )
  }

  get_selectedemployees() {   
    if(this.employee_type.value == undefined || this.employee_type.value == '') {
      this.alert_message = "Please Select Employee Type";
      this.openAlert(this.alert_message, false)
    } else {
      console.log(this.employee_type.value)
      if(this.employee_type.value === "teaching") {
        this.select_employees = this.all_employees.filter(emp => emp.job_category === "teaching")
      } else if(this.employee_type.value === "non-teaching") {
        this.select_employees = this.all_employees.filter(emp => emp.job_category === "non-teaching")
      } else if(this.employee_type.value === "administrative") {
        this.select_employees = this.all_employees.filter(emp => emp.job_category === "administrative")
      } else {
        this.select_employees = this.all_employees
      }
      this.getEmployeesByStatus();
    }
  }

  getEmployeesByStatus() {
    if(this.status === 'active') {
      this.employees = this.select_employees.filter(data => data.status === 1)
    } else if(this.status === 'inactive') {
      this.employees = this.select_employees.filter(data => data.status === 0)
    }   
    this.pageNo = 1,
    this.page_start = 0,
    this.pages = Math.ceil(this.employees.length / 10)
  }

  deleteConfirmation(employee_id) {
    this.selected_employee = employee_id;  
    this.openAlert("Are you sure to delete the Employee", true)
  }

  deleteEmployee() {
    this.service.deleteEmployee(this.selected_employee)
      .subscribe(
        res => { 
          if(res == true) {
            this.employees.filter(res => res.employee_id === this.selected_employee)[0].status = 0;
            this.employees = this.employees.filter(res => res.employee_id !== this.selected_employee)
            this.alert_message = "Employee Deleted Successfully";
            this.openAlert(this.alert_message, false)
          } else {
            this.alert_message = "Employee Not Deleted Successfully";
            this.openAlert(this.alert_message, false)
          }
        }
      )
  }

  restoreEmployee(employee_id) {
    this.service.restoreEmployee(employee_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.employees.filter(data => data.employee_id === employee_id)[0].status = 1;
            this.status = 'activated';
            this.getEmployeesByStatus();
            this.alert_message = "Employee Restored Successfully";
            this.openAlert(this.alert_message, false)
          } else {
            this.alert_message = "Employee Not Restored";
            this.openAlert(this.alert_message, false)
          }
        }
      )
  }

  employeesUpload(files: any){
    this.fileData = files[0];
    this.onSubmitFile();
  }

  onSubmitFile() {
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.service.bulkEmployeesUpload(formData)
    .subscribe(
      res => { 
        console.log(res)
        if(res === true) {
          this.getEmployees();
          this.alert_message = "Bulk Employees Uploaded Successfully";
          this.openAlert(this.alert_message, false)
        } else if(res.data === "Employees are already Added") {
          this.alert_message = "Employees are already Added";
          this.openAlert(this.alert_message, false)
        } else {
          this.alert_message = "Bulk Employees Not Uploaded";
          this.openAlert(this.alert_message, false)
        }
      }
    )
  }

  addEmployee() {
    this.selected_employee = {
      name: '',
      textbook: '',
      author: '',
      publisher: '',
    };
    this.dialog_type = 'add';
    this.openDialog(this.selected_employee, this.dialog_type)
  }

  editEmployee(employee_id) {
    this.selected_employee = this.employees.filter(data => data.employee_id === employee_id)[0];
    this.dialog_type = 'edit';
    this.openDialog(this.selected_employee, this.dialog_type)
  }

  openDialog(selected_employee, dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';

    dialogConfig.data = {
      employee: selected_employee,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(AdmissionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(        
      data => {
        this.getEmployees();
        this.get_selectedemployees();
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
          this.deleteEmployee();
        }
      }
    )
  }

}
