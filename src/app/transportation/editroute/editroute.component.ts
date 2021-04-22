import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransportationService } from '../../_services/transportation.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-editroute',
  templateUrl: './editroute.component.html',
  styleUrls: ['./editroute.component.css']
})
export class EditrouteComponent implements OnInit {

  route = {
    bus_route_id: '',
    route_title: '',
    vehicle_number: '',
  }
  dialog_type: string;
  alert_message: string;
  vehicles = [];

  constructor(
    private service: TransportationService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<EditrouteComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.route = data.route;
    this.dialog_type = data.dialog_type;
  }

  ngOnInit() {
    this.getVehicles();
  }

  routeForm: FormGroup = this.fb.group({
    bus_route_id: '',
    route_title: ['', Validators.required],
    vehicle_number: ['', Validators.required],
  });

  getVehicles() {
    this.service.getVehicles()
      .subscribe(
        res => { this.vehicles = res.vehicles, console.log(res)}
      )
  }

  close() {
    this.dialogRef.close();
  }

  submitRoute() {
    this.routeForm.value.bus_route_id = this.route.bus_route_id;
    this.dialogRef.close(this.routeForm.value);
    this.service.editRoute(this.routeForm.value, this.route.bus_route_id)
      .subscribe(
        res => {
          if (res == true) {
            this.dialogRef.close(this.routeForm.value);
            this.alert_message = "Bus Route Edited Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Bus Route Not Edited";
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
