import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { EditvehicleComponent } from '../editvehicle/editvehicle.component';
import { TransportationService } from '../../_services/transportation.service';
import { User } from '../../_models/user';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  config: any;
  collection = { count: '', vehicles: [] };

  constructor(private service: TransportationService, public dialog: MatDialog) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
   }

  user: User;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getVehicles();
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  //vehicles = [];
  selected_vehicle;
  dialog_type: string;
  alert_message: string;
  
  getVehicles(){
    this.service.getVehicles()
      .subscribe(
        res => { this.collection.vehicles = res.vehicles, console.log(res) }
      )
  }

  deleteVehicle(vehicle_id) {
    this.service.deleteVehicle(vehicle_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.collection.vehicles = this.collection.vehicles.filter(res => res.vehicle_id !== vehicle_id)
            this.alert_message = "Vehicle Deleted Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Vehicle Not Deleted";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  editVehicle(i) {
    this.selected_vehicle = this.collection.vehicles[i];
    this.dialog_type = 'vehicle';
    this.openDialog(this.selected_vehicle, this.dialog_type)
  }

  openDialog(selected_vehicle, dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';

    dialogConfig.data = {
      vehicle: selected_vehicle,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(EditvehicleComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data)
        this.collection.vehicles.filter(res => res.vehicle_id == data.vehicle_id)[0].vehicle_name = data.vehicle_name;
        this.collection.vehicles.filter(res => res.vehicle_id == data.vehicle_id)[0].vehicle_number = data.vehicle_number;
        this.collection.vehicles.filter(res => res.vehicle_id == data.vehicle_id)[0].chassis_number = data.chassis_number;
        this.collection.vehicles.filter(res => res.vehicle_id == data.vehicle_id)[0].engine_number = data.engine_number;
        this.collection.vehicles.filter(res => res.vehicle_id == data.vehicle_id)[0].vehicle_type = data.vehicle_type;
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
