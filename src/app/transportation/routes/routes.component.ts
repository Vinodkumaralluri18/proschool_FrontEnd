import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { EditrouteComponent } from '../editroute/editroute.component';
import { TransportationService } from '../../_services/transportation.service';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {
  config: any;
  collection = { count: '', routes: [] };

  constructor(private service: TransportationService, private fb: FormBuilder, public dialog: MatDialog) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
   }

  ngOnInit() {
    this.getRoute();
    this.getVehicles();
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  routeForm: FormGroup = this.fb.group({
    route_title: ['', Validators.required],
    vehicle_number: ['', Validators.required],
  });

  //routes = [];
  vehicles = [];
  selected_route;
  dialog_type: string;
  alert_message: string;

  getRoute() {
    this.service.getRoute()
      .subscribe(
        res => { this.collection.routes = res.routes, console.log(res) }
      )
  }

  getVehicles() {
    this.service.getVehicles()
      .subscribe(
        res => { this.vehicles = res.vehicles, console.log(res)}
      )
  }

  addRoute() {
    this.service.addRoute(this.routeForm.value)
      .subscribe(
        res => {
          if (res == true) {
            this.collection.routes.push({
              route_title: this.routeForm.value.route_title,
              vehicle_number: this.routeForm.value.vehicle_number,
            })
            this.alert_message = "Route Added Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Route Not added";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  deleteRoute(bus_route_id) {
    this.service.deleteRoute(bus_route_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.collection.routes = this.collection.routes.filter(res => res.bus_route_id !== bus_route_id)
            this.alert_message = "Route Deleted Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Route Not Deleted";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  editRoute(i) {
    this.selected_route = this.collection.routes[i];
    this.dialog_type = 'route';
    this.openDialog(this.selected_route, this.dialog_type)
  }

  openDialog(selected_route, dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';

    dialogConfig.data = {
      route: selected_route,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(EditrouteComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data)
        this.collection.routes.filter(res => res.bus_route_id == data.bus_route_id)[0].route_title = data.route_title;
        this.collection.routes.filter(res => res.bus_route_id == data.bus_route_id)[0].vehicle_number = data.vehicle_number;
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
