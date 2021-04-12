import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../_services/store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { EditstoreComponent } from '../editstore/editstore.component';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  constructor(private service: StoreService, private fb: FormBuilder, public dialog: MatDialog) {}
  
  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  ngOnInit() {
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

  materials = [];
  selected_material;
  dialog_type: string;
  submit_type: string;
  alert_message: string;
  data;

  materialForm: FormGroup = this.fb.group({
    material: ['', Validators.required],
    category: ['', Validators.required],
    quantity: 0
  });

  getMaterials() {
    this.service.getMaterials()
      .subscribe(
        res => { this.materials = res.material, 
          this.pageNo = 1,
          this.page_start = 0,
          this.pages = Math.ceil(this.materials.length / 10),
          console.log(res) 
        }
      )
  }

  addMaterials() {
    this.selected_material = '';
    this.dialog_type = 'material';
    this.submit_type = 'add';
    this.openDialog(this.dialog_type, this.submit_type)
  }

  deleteConfirmation(material_id) {
    this.selected_material = material_id;  
    this.openAlert("Are you sure to delete the Material", true)
  }

  deleteMaterial() {
    this.service.deleteMaterials(this.selected_material)
      .subscribe(
        res => { 
          if(res == true) {
            this.materials = this.materials.filter(res => res.material_id !== this.selected_material)
            this.alert_message = "Material Deleted Successfully";
            this.openAlert(this.alert_message, false)
          } else {
            this.alert_message = "Material Not Deleted";
            this.openAlert(this.alert_message, false)
          }
        }
      )
  }

  editMaterial(i) {
    this.selected_material = this.materials[i];
    this.dialog_type = 'material';
    this.submit_type = 'edit';
    this.openDialog(this.dialog_type, this.submit_type)
  }

  openDialog(dialog_type, submit_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      selected_material: this.selected_material,
      dialog_type: dialog_type,
      submit_type: submit_type,
    };

    const dialogRef = this.dialog.open(EditstoreComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if(data) {
          this.getMaterials();
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
          this.deleteMaterial();
        }
      }
    )
  }

}
