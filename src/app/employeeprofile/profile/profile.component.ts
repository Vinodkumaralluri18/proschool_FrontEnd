import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeesService } from '../../_services/employees.service';
import { ServicesService } from '../../services.service';
import { AdmissionComponent } from '../../employees/admission/admission.component';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { appConfig } from '../../app.config';
import { User } from '../../_models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public service: EmployeesService, public dialog: MatDialog, private route: ActivatedRoute, private services: ServicesService) { }

  user: User;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getEmployeeDetails();
  }

  fileData: File = null;
  profileImage:any = null;

  private url = appConfig.apiUrl;
  alert_message;

  edit_content = false;

  profInfoPannel: boolean = true;
  addrPannel: boolean = false;

  employee_id = this.route.snapshot.paramMap.get('id');
  employee_details: any = {
    employee_id: '',
    first_name:'',
    employeeImage:{
      filename: '',
      originalname: '',
      imagePath: '',
      mimetype: '',
    },
  };  

  getEmployeeDetails() {
    this.service.getEmployeeDetails(this.employee_id)
      .subscribe(
        res => { this.employee_details = res.employee[0], this.getEmployeeImage(), console.log(this.employee_details) }
      )
  }

  getEmployeeImage() {
    this.service.profileImage = this.url + '/image/' + this.employee_details.employeeImage.filename;
  }

  profile_info(pannel) {
    if(pannel == "profile") {
      this.profInfoPannel = true;
      this.addrPannel = false;
    } else if(pannel == "empaddress") {
      this.addrPannel = true;
      this.profInfoPannel = false;
    }
  }

  employeProfPic(fileImg: any){
    this.fileData = fileImg[0];
    this.onSubmitImg();
  }

  onSubmitImg() {
    const formData = new FormData();
    formData.append('files', this.fileData);

    this.service.addProfileImage(formData, this.employee_id)
    .subscribe(
      res => { 
        if(res == true) {
          this.getEmployeeDetails();
          this.alert_message = "Profile Image Uploaded Successfully";
          this.getEmployeeDetails();
          this.openAlert(this.alert_message)
        } else {
          this.alert_message = "Profile Image Not Uploaded";
          this.openAlert(this.alert_message)
        }
      }
    )
  }

  editEmployee() {
    this.openDialog(this.employee_details, 'edit')
  }

  openDialog(selected_employee, dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';

    dialogConfig.data = {
      employee: selected_employee,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(AdmissionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(        
      data => {
        console.log("Dialog output:", data)
        this.getEmployeeDetails();
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