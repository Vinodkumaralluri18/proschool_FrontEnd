import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../_services/store.service';
import { EmployeesService } from '../../_services/employees.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { EditstoreComponent } from '../editstore/editstore.component';

@Component({
  selector: 'app-material-out',
  templateUrl: './material-out.component.html',
  styleUrls: ['./material-out.component.css']
})
export class MaterialOutComponent implements OnInit {

  constructor(private service: StoreService, private employeeservice: EmployeesService, private fb: FormBuilder, public dialog: MatDialog) {}

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;
  
  ngOnInit() {    
    this.getMaterialsOut();
    this.getEmployees();
    this.getMaterials();
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

  employees = [];
  all_employees = [];
  materials = [];
  materialsOut = [];
  selected_materialOut;
  dialog_type: string;
  alert_message: string;
  submit_type: string;

  materialOutForm: FormGroup = this.fb.group({
    material: ['', Validators.required],
    employee_type: ['', Validators.required],
    receiver: ['', Validators.required],
    received_date: ['', Validators.required],
    no_of_units: ['', Validators.required],
  });

  getMaterialsOut() {
    this.service.getMaterialsOut()
      .subscribe(
        res => { this.materialsOut = res.material_out, 
          this.pageNo = 1,
          this.page_start = 0,
          this.pages = Math.ceil(this.materialsOut.length / 10),
          console.log(res) 
        }
      )
  }

  getEmployees() {
    this.employeeservice.getEmployees()
      .subscribe(
        res => { this.all_employees = res.employee, console.log(res) }
      )
  }

  get_selectedemployees() {   
    if(this.materialOutForm.value.employee_type === "teaching") {
      this.employees = this.all_employees.filter(emp => emp.job_category === "teaching")
    } else if(this.materialOutForm.value.employee_type === "non-teaching") {
      this.employees = this.all_employees.filter(emp => emp.job_category === "non-teaching")
    } else if(this.materialOutForm.value.employee_type === "administrative") {
      this.employees = this.all_employees.filter(emp => emp.job_category === "administrative")
    } else {
      this.employees = this.all_employees
    }
  }

  getMaterials() {
    this.service.getMaterials()
      .subscribe(
        res => { this.materials = res.material, console.log(res) }
      )
  }

  addMaterialsOut() {
    this.selected_materialOut = '';
    this.dialog_type = 'material-out';
    this.submit_type = 'add';
    this.openDialog(this.dialog_type, this.submit_type)
  }

  deleteConfirmation(material_id) {
    this.selected_materialOut = material_id;  
    this.openAlert("Are you sure to delete the Material-Out", true)
  }

  deleteMaterialOut() {
    this.service.deleteMaterialsOut(this.selected_materialOut, this.materialsOut.filter(data => data.material_out_id === this.selected_materialOut)[0])
      .subscribe(
        res => { 
          if(res == true) {
            this.materialsOut = this.materialsOut.filter(res => res.material_out_id !== this.selected_materialOut)
            this.alert_message = "Material-Out Deleted Successfully";
            this.openAlert(this.alert_message, false)
          } else {
            this.alert_message = "Material-Out Not Deleted";
            this.openAlert(this.alert_message, false)
          }
        }
      )
  }

  editMaterialOut(i) {
    this.selected_materialOut = this.materialsOut[i];
    this.dialog_type = 'material-out';
    this.submit_type = 'edit';
    this.openDialog(this.dialog_type, this.submit_type)
  }

  openDialog(dialog_type, submit_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      selected_materialOut: this.selected_materialOut,
      dialog_type: dialog_type,
      submit_type: submit_type,
    };

    const dialogRef = this.dialog.open(EditstoreComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if(data) {
          this.getMaterialsOut();
          // this.collection.materialsOut.filter( res => res.material_out_id == data.material_out_id)[0].material = this.materials.filter(res => res.material_id === data.material)[0].material,
          // this.collection.materialsOut.filter( res => res.material_out_id == data.material_out_id)[0].received_date = data.received_date,
          // this.collection.materialsOut.filter( res => res.material_out_id == data.material_out_id)[0].no_of_units = data.no_of_units,
          console.log("Dialog output:", data)
        }
      }
    );

  }

  openAlert(alert_message, status) {
    const alertConfig = new MatDialogConfig();

    alertConfig.autoFocus = true;
    alertConfig.width = '60%';

    alertConfig.data = {
      message: alert_message,
      confirm_status: status,
    };

    const alertRef = this.dialog.open(AlertComponent, alertConfig);

    alertRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data)
        if(data === true) {
          this.deleteMaterialOut();
        }
      }
    )
  }

}
