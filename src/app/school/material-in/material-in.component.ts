import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../_services/store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { EditstoreComponent } from '../editstore/editstore.component';

@Component({
  selector: 'app-material-in',
  templateUrl: './material-in.component.html',
  styleUrls: ['./material-in.component.css']
})
export class MaterialInComponent implements OnInit {

  constructor(private service: StoreService, private fb: FormBuilder, public dialog: MatDialog) {}

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  ngOnInit() {
    this.getVendors();
    this.getMaterials();
    this.getMaterialsIn();
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

  vendors = [];
  materials = [];
  materialsIn = [];
  selected_materialIn;
  dialog_type: string;
  alert_message: string;
  submit_type: string;

  materialInForm: FormGroup = this.fb.group({
    vendor: ['', Validators.required],
    material: ['', Validators.required],
    price: ['', Validators.required],
    purchased_date: ['', Validators.required],
    no_of_units: ['', Validators.required],
    payment_duedate: ['', Validators.required],
  });

  getMaterialsIn() {
    this.service.getMaterialsIn()
      .subscribe(
        res => { this.materialsIn = res.material_in, 
          this.pageNo = 1,
          this.page_start = 0,
          this.pages = Math.ceil(this.materialsIn.length / 10),
          console.log(res) 
        }
      )
  }

  getVendors() {
    this.service.getVendors()
      .subscribe(
        res => { this.vendors = res.vendor, console.log(res) }
      )
  }

  getMaterials() {
    this.service.getMaterials()
      .subscribe(
        res => { this.materials = res.material, console.log(res) }
      )
  }

  addMaterialsIn() {
    this.selected_materialIn = '';
    this.dialog_type = 'material-in';
    this.submit_type = 'add';
    this.openDialog(this.dialog_type, this.submit_type)
  }

  deleteMaterialIn(material_in_id) {
    this.service.deleteMaterialsIn(material_in_id, this.materialsIn.filter(data => data.material_in_id === material_in_id)[0])
      .subscribe(
        res => { 
          if(res == true) {
            this.materialsIn = this.materialsIn.filter(res => res.material_in_id !== material_in_id)
            this.alert_message = "Material-In Deleted Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Material-In Deleted Successfully";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  editMaterialIn(i) {
    this.selected_materialIn = this.materialsIn[i];
    this.dialog_type = 'material-in';
    this.submit_type = 'edit';
    this.openDialog(this.dialog_type, this.submit_type)
  }

  openDialog(dialog_type, submit_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      selected_materialIn: this.selected_materialIn,
      dialog_type: dialog_type,
      submit_type: submit_type,
    };

    const dialogRef = this.dialog.open(EditstoreComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if(data) {
          this.getMaterialsIn();
          // this.collection.materialsIn.filter( res => res.material_in_id == data.material_in_id)[0].vendor_name = data.vendor_name,
          // this.collection.materialsIn.filter( res => res.material_in_id == data.material_in_id)[0].material = this.materials.filter(res => res.material_id === data.material)[0].material,
          // this.collection.materialsIn.filter( res => res.material_in_id == data.material_in_id)[0].price = data.price,
          // this.collection.materialsIn.filter( res => res.material_in_id == data.material_in_id)[0].purchased_date = data.purchased_date,
          // this.collection.materialsIn.filter( res => res.material_in_id == data.material_in_id)[0].no_of_units = data.no_of_units,
          // this.collection.materialsIn.filter( res => res.material_in_id == data.material_in_id)[0].payment_duedate = data.payment_duedate,
          console.log("Dialog output:", data)
        }
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
