import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../../services.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { from } from 'rxjs';

@Component({
  selector: 'app-editschoolprofile',
  templateUrl: './editschoolprofile.component.html',
  styleUrls: ['./editschoolprofile.component.css']
})
export class EditschoolprofileComponent implements OnInit {

  about: boolean = false;
  chairman_note: boolean = false;

  school_id;
  dialog_type: string;
  alert_message: string;

  schooldetails: any;
  managementdetails: any;
  contactdetails: any;

  schoolprofile: any;

  schooldetailsForm: FormGroup = this.fb.group({
    name: '',
    medium: '',
    timings: '',
    class_from: '',
    affiliation: '',
    extra_curricular_activites: '',
  })

  managementdetailsForm: FormGroup = this.fb.group({
    founder: '',
    chairman: '',
    principal: '',
    vice_principal: '',
    coordinator: '',
    est_on: '',
  })

  contactdetailsForm: FormGroup = this.fb.group({
    address: '',
    phone: ['',[Validators.pattern('[6-9]\\d{9}')]],
    alternate_phone: ['',[Validators.pattern('[6-9]\\d{9}')]],
    email: '',
    website: '',
  })

  constructor(
    private service: ServicesService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<EditschoolprofileComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.schoolprofile = data.schoolprofile;
    this.dialog_type = data.dialog_type;
  }

  ngOnInit() {
    console.log(this.dialog_type)
    if(this.dialog_type === 'schoolDetails') {
      this.schooldetailsForm.patchValue({
        name: this.schoolprofile.name,
        medium: this.schoolprofile.medium,
        timings: this.schoolprofile.timings,
        class_from: this.schoolprofile.class_from,
        affiliation: this.schoolprofile.affiliation,
        extra_curricular_activites: this.schoolprofile.extra_curricular_activites,
      })
    } else if(this.dialog_type === 'managementDetails') {
      this.managementdetailsForm.patchValue({
        founder: this.schoolprofile.founder,
        chairman: this.schoolprofile.chairman,
        principal: this.schoolprofile.principal,
        vice_principal: this.schoolprofile.vice_principal,
        coordinator: this.schoolprofile.coordinator,
        est_on: this.schoolprofile.est_on,
      })
    } else if(this.dialog_type === 'contactDetails') {
      this.contactdetailsForm.patchValue({
        address: this.schoolprofile.address,
        phone: this.schoolprofile.phone,
        alternate_phone: this.schoolprofile.alternate_phone,
        email: this.schoolprofile.email,
        website: this.schoolprofile.website,
      })
    }
  }

  schoolSubmit() {
    this.service.editSchoolDetails(this.schooldetailsForm.value, this.schoolprofile.school_id)
      .subscribe(
        res => {
          if (res == true) {
            this.dialogRef.close(this.schooldetailsForm.value);
            this.alert_message = "School Details Edited Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "School Details Not Edited";
            this.openAlert(this.alert_message)
          }
        }
      )
  }
  
  
  managementSubmit() {
    this.service.editSchool_managementDetails(this.managementdetailsForm.value, this.schoolprofile.school_id)
      .subscribe(
        res => {
          if (res == true) {
            this.dialogRef.close(this.managementdetailsForm.value);
            this.alert_message = "School Management Details Edited Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "School Management Details Not Edited";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  contactSubmit() {
    this.service.editSchool_contactDetails(this.contactdetailsForm.value, this.schoolprofile.school_id)
      .subscribe(
        res => {
          if (res == true) {
            this.dialogRef.close(this.contactdetailsForm.value);
            this.alert_message = "School Contact Details Edited Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "School Contact Details Not Edited";
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

  close() {
    this.dialogRef.close();
  }

}
