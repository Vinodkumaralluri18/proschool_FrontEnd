import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { EditstationComponent } from '../editstation/editstation.component';
import { TransportationService } from '../../_services/transportation.service';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {
  config: any;
  collection = { count: '', stations: [] };

  constructor(private service: TransportationService, private fb: FormBuilder, public dialog: MatDialog) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
   }

  ngOnInit() {
    this.getStations();
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  //stations = [];
  selected_station;
  dialog_type: string;
  alert_message: string;

  stationsForm: FormGroup = this.fb.group({
    station_name: ['', Validators.required],
    station_code: ['', Validators.required],
    station_geo_location: ['', Validators.required],
  });

  getStations() {
    this.service.getStations()
      .subscribe(
        res => { this.collection.stations = res.stations, console.log(res) }
      )
  }

  addStation() {
    this.service.addStation(this.stationsForm.value)
      .subscribe(
        res => {
          if (res == true) {
            this.getStations();
            // this.collection.stations.push({
            //   station_name: this.stationsForm.value.station_name,
            //   station_code: this.stationsForm.value.station_code,
            //   station_geo_location: this.stationsForm.value.station_geo_location,
            // })
            this.alert_message = "Station Added Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Station Not added";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  deleteStation(station_id) {
    this.service.deleteStation(station_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.collection.stations = this.collection.stations.filter(res => res.station_id !== station_id)
            this.alert_message = "Station Deleted Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Station Not Deleted";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  editStation(i) {
    this.selected_station = this.collection.stations[i];
    this.dialog_type = 'station';
    this.openDialog(this.selected_station, this.dialog_type)
  }

  openDialog(selected_station, dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      station: selected_station,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(EditstationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data)
        this.getStations();
        // this.collection.stations.filter(res => res.station_id == data.station_id)[0].station_name = data.station_name;
        // this.collection.stations.filter(res => res.station_id == data.station_id)[0].station_code = data.station_code;
        // this.collection.stations.filter(res => res.station_id == data.station_id)[0].station_geo_location = data.station_geo_location;
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
