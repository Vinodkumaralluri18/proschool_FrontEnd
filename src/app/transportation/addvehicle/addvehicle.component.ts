import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransportationService } from '../../_services/transportation.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-addvehicle',
  templateUrl: './addvehicle.component.html',
  styleUrls: ['./addvehicle.component.css']
})
export class AddvehicleComponent implements OnInit {

  constructor(private service: TransportationService, private fb: FormBuilder, public dialog: MatDialog) { }

  vehicle_finance: boolean = false;
  vehicle_insurance: boolean = false;
  alert_message: string;

  addvehicleForm: FormGroup = this.fb.group({
    vehicle_name: ['', Validators.required],
    vehicle_number: ['', Validators.required],
    chassis_number: ['', Validators.required],
    engine_number: ['', Validators.required],
    vehicle_type: ['', Validators.required],
    finance_company_name: ['', Validators.required],
    finance_amount: ['', Validators.required],
    finance_from: ['', Validators.required],
    finance_to: ['', Validators.required],
    finance_emi: ['', Validators.required],
    finance_date: ['', Validators.required],
    insurance_number: ['', Validators.required],
    insurance_company_name: ['', Validators.required],
    valid_from: ['', Validators.required],
    valid_to: ['', Validators.required],
    insurance_amount: ['', Validators.required],
    engine_oil: ['', Validators.required],   
    maintenance_reminder: ['', Validators.required],
  });

  ngOnInit() {
  }

  getFinanceForm(select) {
    console.log(select)
    if(select == 'yes') {
      this.vehicle_finance = true;
    } else if(select == 'no') {
      this.vehicle_finance = false;
    }
  }

  getInsuranceForm(select) {
    if(select == 'yes') {
      this.vehicle_insurance = true;
    } else if(select == 'no') {
      this.vehicle_insurance = false;
    }
  }

  
  addVehicle(){    
    console.log(this.addvehicleForm.value)
    this.service.addVehicle(this.addvehicleForm.value)
      .subscribe(
        res => { 
          if(res == true) {
            this.alert_message = "Vehicle Added Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Vehicle Not added";
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
