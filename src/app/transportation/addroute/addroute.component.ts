import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransportationService } from '../../_services/transportation.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-addroute',
  templateUrl: './addroute.component.html',
  styleUrls: ['./addroute.component.css']
})
export class AddrouteComponent implements OnInit {

  constructor(private service: TransportationService, private fb: FormBuilder, public dialog: MatDialog) { }

  user: User;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getRoute();
    this.getStations();
  }

  routes = [];
  busroutes = [];
  stations =[];
  alert_message: string;

  addBusrouteForm: FormGroup = this.fb.group({
    bus_route_id: ['', Validators.required],
    station_id: ['', Validators.required],
    pickup_time: ['', Validators.required],
    drop_time: ['', Validators.required],
  });

  getRoute() {
    this.service.getRoute()
      .subscribe(
        res => { this.routes = res.routes, console.log(res) }
      )
  }

  getBusroute() {
    this.busroutes = this.routes.filter( data => data.bus_route_id === this.addBusrouteForm.value.bus_route_id)[0].route_stations
  }

  getStations(){
    this.service.getStations()
      .subscribe(
        res => { this.stations = res.stations, console.log(res) }
      )
  }
  
  addBusroute(){    
    this.service.addBusroute(this.addBusrouteForm.value)
      .subscribe(
        res => {
          if (res == true) {
            this.busroutes.push({
              station_id: this.addBusrouteForm.value.station_id,
              pickup_time: this.addBusrouteForm.value.pickup_time,
              drop_time: this.addBusrouteForm.value.drop_time,
            })
            this.alert_message = "BusRoute Added Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "BusRoute Not added";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  deleteBusroute(bus_route_id) {
    this.service.deleteRoute(bus_route_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.routes = this.routes.filter(res => res.bus_route_id !== bus_route_id)
            this.alert_message = "Route Deleted Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Route Not Deleted";
            this.openAlert(this.alert_message)
          }
        }
      )
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
