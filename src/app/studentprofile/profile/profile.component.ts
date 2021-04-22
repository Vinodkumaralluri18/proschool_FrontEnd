import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../_services/students.service';
import { ServicesService } from '../../services.service';
import { AdmissionComponent } from '../../students/admission/admission.component';
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

  constructor(private service: StudentsService, public dialog: MatDialog, private route: ActivatedRoute, private services: ServicesService) { }

  user: User;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getStudentDetails();
  }

  edit_content = false;

  fileData: File = null;
  profileImage:any = null;

  private url = appConfig.apiUrl;
  alert_message;
  
  profilePannel: boolean = true;
  pgPannel: boolean = false;
  addrPannel: boolean = false;

  student_id = this.route.snapshot.paramMap.get('id');
  section_id = this.route.snapshot.paramMap.get('sec_id');

  student_details:any = {};  

  
  getStudentDetails() {    
    this.service.getStudentDetails(this.student_id)      
    .subscribe(        
      res => { this.student_details = res.students[0], this.getStudentImage(), console.log(res) 
      }      
    )  
  }

  getStudentImage() {
    this.profileImage = this.url + '/image/' + this.student_details.studentImage.filename;
  }

  profile_info(pannel) {
    if(pannel == "profile") {
      this.profilePannel = true;
      this.pgPannel = false;
      this.addrPannel = false;
    } else if(pannel == "pgdetails") {
      this.pgPannel = true;
      this.profilePannel = false;
      this.addrPannel = false;
    }else {
      this.addrPannel = true;
      this.profilePannel = false;
      this.pgPannel = false;
    }
  }

  studentProfPic(fileImg: any){
    this.fileData = fileImg[0];
    this.onSubmitImg();
  }

  onSubmitImg() {
    const formData = new FormData();
    formData.append('files', this.fileData);

    this.service.addProfileImage(formData, this.student_id)
    .subscribe(
      res => { 
        if(res == true) {
          this.getStudentDetails();
          this.alert_message = "Profile Image Uploaded Successfully";
          this.openAlert(this.alert_message)
        } else {
          this.alert_message = "Profile Image Not Uploaded";
          this.openAlert(this.alert_message)
        }
      }
    )
  }

  editStudent() {
    this.openDialog(this.student_details, 'edit')
  }

  openDialog(selected_student, dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';

    dialogConfig.data = {
      class: this.student_details.class_id,
      section: this.student_details.section_id,
      student: selected_student,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(AdmissionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(        
      data => {
        console.log("Dialog output:", data)
        this.getStudentDetails();
        this.getStudentImage();
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
