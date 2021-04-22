import { Component, OnInit, Inject } from '@angular/core';
import { ExpensesService } from '../../_services/expenses.service';
import { EmployeesService } from '../../_services/employees.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-editexpenses',
  templateUrl: './editexpenses.component.html',
  styleUrls: ['./editexpenses.component.css']
})
export class EditexpensesComponent implements OnInit {

  employees = [];
  all_employees = [];

  claims = {
    claim_id: '',
    employee_type: '',
    employee_id: '',
    first_name: '',
    amount: '',
    date: '',
    category: '',
    claim_status: '',
    approved_date: '',
  }
  dialog_type: string;

  claimForm: FormGroup = this.fb.group({
    claim_id: '',
    employee_type:  ['', Validators.required],
    employee_id:  ['', Validators.required],
    amount: ['', Validators.required],
    date: ['', Validators.required],
    category: ['', Validators.required],
    claim_status: '',
    approved_date: '',
  });
  alert_message: string;
  user: User;

  constructor(
    private service: ExpensesService,
    private employeeservice: EmployeesService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<EditexpensesComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.claims = data.selected_claim;
    this.dialog_type = data.dialog_type;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user.role)
    this.getEmployees();

    this.claimForm.patchValue({
      claim_id: this.claims.claim_id,
      employee_type: this.claims.employee_type,
      employee_id: this.claims.employee_id,
      amount: this.claims.amount,
      date: this.claims.date,
      category: this.claims.category,
      claim_status: this.claims.claim_status,
      approved_date: this.claims.approved_date,
    });

  }

  getEmployees() {
    this.employeeservice.getEmployees()
      .subscribe(
        res => { this.all_employees = res.employee, this.get_selectedemployees(), console.log(res) }
      )
  }

  get_selectedemployees() {  
    if(this.claimForm.value.employee_type === "teaching") {
      this.employees = this.all_employees.filter(emp => emp.job_category === "teaching")
    } else if(this.claimForm.value.employee_type === "non-teaching") {
      this.employees = this.all_employees.filter(emp => emp.job_category === "non-teaching")
    } else if(this.claimForm.value.employee_type === "administrative") {
      this.employees = this.all_employees.filter(emp => emp.job_category === "administrative")
    } else {
      this.employees = this.all_employees
    }
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    if(this.claimForm.value.employee_type === undefined || this.claimForm.value.employee_type === '' ||
      this.claimForm.value.employee_id === undefined || this.claimForm.value.employee_id === '' || 
      this.claimForm.value.amount === undefined || this.claimForm.value.amount === '' ||
      this.claimForm.value.category === undefined || this.claimForm.value.category === '' ||
      this.claimForm.value.date === undefined || this.claimForm.value.date === '') {
        this.alert_message = "Please Enter All Details";
        this.openAlert(this.alert_message)
    } else {
      if(this.dialog_type === 'add') {
        this.service.addClaims(this.claimForm.value)
        .subscribe(
          res => { 
            if(res == true) {
              this.dialogRef.close(this.claimForm.value);
              this.alert_message = "Claim Added Successfully";
              this.openAlert(this.alert_message)
            } else {
              this.alert_message = "Claim Not Added";
              this.openAlert(this.alert_message)
            }
          }
        )
      } else {
        this.service.editClaims(this.claimForm.value, this.claims.claim_id)
        .subscribe(
          res => { 
            if(res == true) {
              this.dialogRef.close(this.claimForm.value);
              this.alert_message = "Claim Edited Successfully";
              this.openAlert(this.alert_message)
            } else {
              this.alert_message = "Claim Not Edited";
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
