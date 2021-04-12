import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransportationService } from '../../_services/transportation.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-editvehicle',
  templateUrl: './editvehicle.component.html',
  styleUrls: ['./editvehicle.component.css']
})
export class EditvehicleComponent implements OnInit {

  vehicle_details: boolean = true;
  finance:boolean = false;
  insurance:boolean = false;
  maintenance:boolean = false;
  alert_message: string;

  vehicle = {
    vehicle_id: '',
    vehicle_name: '',
    vehicle_number: '',
    chassis_number: '',
    engine_number: '',
    vehicle_type: '',
    Finance: [{
      finance_company_name: '',
      finance_amount: '',
      finance_from: '',
      finance_to: '',
      finance_emi: '',
      finance_date: '',
    }],
    Insurance: [{
      insurance_number: '',
      insurance_company_name: '',
      valid_from: '',
      valid_to: '',
      insurance_amount: '',
    }],
    Maintenance: [{
      engine_oil: '',
      maintenance_reminder: '',
    }],
  };
  dialog_type: string;

  constructor(
    private service: TransportationService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<EditvehicleComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.vehicle = data.vehicle;
    this.dialog_type = data.dialog_type;
  }

  vehicleForm: FormGroup = this.fb.group({
    vehicle_id: [this.vehicle.vehicle_id, Validators.required],
    vehicle_name: [this.vehicle.vehicle_name, Validators.required],
    vehicle_number: [this.vehicle.vehicle_number, Validators.required],
    chassis_number: [this.vehicle.chassis_number, Validators.required],
    engine_number: [this.vehicle.engine_number, Validators.required],
    vehicle_type: [this.vehicle.vehicle_type, Validators.required],
    finance_company_name: [this.vehicle.Finance[0].finance_company_name, Validators.required],
    finance_amount: [this.vehicle.Finance[0].finance_amount, Validators.required],
    finance_from:[this.vehicle.Finance[0].finance_from, Validators.required],
    finance_to: [this.vehicle.Finance[0].finance_to, Validators.required],
    finance_emi: [this.vehicle.Finance[0].finance_emi, Validators.required],
    finance_date: [this.vehicle.Finance[0].finance_date, Validators.required],
    insurance_number: [this.vehicle.Insurance[0].insurance_number, Validators.required],
    insurance_company_name: [this.vehicle.Insurance[0].insurance_company_name, Validators.required],
    valid_from: [this.vehicle.Insurance[0].valid_from, Validators.required],
    valid_to: [this.vehicle.Insurance[0].valid_to, Validators.required],
    insurance_amount: [this.vehicle.Insurance[0].insurance_amount, Validators.required],
    engine_oil: [this.vehicle.Maintenance[0].engine_oil, Validators.required],
    maintenance_reminder: [this.vehicle.Maintenance[0].maintenance_reminder, Validators.required],
  });
  
  ngOnInit() {
    console.log(this.vehicle)
    this.vehicleForm.patchValue({
      vehicle_id: this.vehicle.vehicle_id,
      vehicle_name: this.vehicle.vehicle_name,
      vehicle_number: this.vehicle.vehicle_number,
      chassis_number: this.vehicle.chassis_number,
      engine_number: this.vehicle.engine_number,
      vehicle_type: this.vehicle.vehicle_type,
      finance_company_name: this.vehicle.Finance[0].finance_company_name,
      finance_amount: this.vehicle.Finance[0].finance_amount,
      finance_from: this.vehicle.Finance[0].finance_from,
      finance_to: this.vehicle.Finance[0].finance_to,
      finance_emi: this.vehicle.Finance[0].finance_emi,
      finance_date: this.vehicle.Finance[0].finance_date,
      insurance_number: this.vehicle.Insurance[0].insurance_number,
      insurance_company_name: this.vehicle.Insurance[0].insurance_company_name,
      valid_from: this.vehicle.Insurance[0].valid_from,
      valid_to: this.vehicle.Insurance[0].valid_to,
      insurance_amount: this.vehicle.Insurance[0].insurance_amount,
      engine_oil: this.vehicle.Maintenance[0].engine_oil,   
      maintenance_reminder: this.vehicle.Maintenance[0].maintenance_reminder,
    });
  }
  
  getVehicleForm(select) {
    if(select == 'Vehicle') {
      this.vehicle_details = true;
      this.finance = false;
      this.insurance = false;
      this.maintenance = false;
    } else if(select == 'Finance') {
      this.vehicle_details = false;
      this.finance = true;
      this.insurance = false;
      this.maintenance = false;
    } else if(select == 'Insurance') {
      this.vehicle_details = false;
      this.finance = false;
      this.insurance = true;
      this.maintenance = false;
    } else if(select == 'Maintenance') {
      this.vehicle_details = false;
      this.finance = false;
      this.insurance = false;
      this.maintenance = true;
    }
  }

  close() {
    this.dialogRef.close();
  }

  submitVehicle() {
    this.vehicleForm.value.vehicle_id = this.vehicle.vehicle_id;
    this.dialogRef.close(this.vehicleForm.value);
    this.service.editVehicle(this.vehicleForm.value, this.vehicle.vehicle_id)
      .subscribe(
        res => {
          if (res == true) {
            this.dialogRef.close(this.vehicleForm.value);
            this.alert_message = "Vehicle Edited Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Vehicle Not Edited";
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
