import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransportationService } from '../../_services/transportation.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-editstation',
  templateUrl: './editstation.component.html',
  styleUrls: ['./editstation.component.css']
})
export class EditstationComponent implements OnInit {

  station = {
    station_id: '',
    station_name: '',
    station_code: '',
    station_geo_location: '',
  };
  dialog_type: string;
  alert_message: string;

  constructor(
    private service: TransportationService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<EditstationComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.station = data.station;
    this.dialog_type = data.dialog_type;
  }

  stationsForm: FormGroup = this.fb.group({
    station_id: [''],
    station_name: ['', Validators.required],
    station_code: ['', Validators.required],
    station_geo_location: ['', Validators.required],
  });
  
  ngOnInit() {
    console.log(this.station)
    this.stationsForm.patchValue({
      station_id: this.station.station_id,
      station_name: this.station.station_name,
      station_code: this.station.station_code,
      station_geo_location: this.station.station_geo_location,
    })
  }

  close() {
    this.dialogRef.close();
  }

  submitStation() {
    this.stationsForm.value.station_id = this.station.station_id;
    this.dialogRef.close(this.stationsForm.value);
    this.service.editStation(this.stationsForm.value, this.station.station_id)
      .subscribe(
        res => {
          if (res == true) {
            this.dialogRef.close(this.stationsForm.value);
            this.alert_message = "Station Edited Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Station Not Edited";
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
