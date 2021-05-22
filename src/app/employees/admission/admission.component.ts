import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EmployeesService } from '../../_services/employees.service';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { FormControl } from '@angular/forms';
import { appConfig } from 'src/app/app.config';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css']
})
export class AdmissionComponent implements OnInit {

  alert_message: string;
  dialog_type: string;

  //employeedetails: boolean = true;
  singleemployeedetails: boolean = true;
  employeeaddress: boolean = false;
  profilepic;
  documents;
  alphaNumericPattern = "^[a-zA-Z0-9]*$";
  numericPattern = "^[0-9]*$";
  alphaPattern = "^[a-zA-Z]*$";
  emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
  joined_on = new FormControl(new Date);
  date_of_birth = new FormControl(new Date);
  title: string = 'Add Employee';

  employee: any = {}
  employeeImagee;
	private url = appConfig.apiUrl;
  employeeImage: any;
  constructor(
    private fb: FormBuilder,
    private service: EmployeesService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AdmissionComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.dialog_type = data.dialog_type;
    if(this.dialog_type === 'edit') {
      this.employee = data.employee;
      this.employeeImage = this.employee.employeeImage
      this.employeeImagee = this.url + '/image/' + this.employee.employeeImage["filename"]
      console.log(this.employeeImagee)
     // this.url + '/image/' + this.school_details.SchoolImage[0].filename;
      console.log(this.employee)
    }
  }

  employeeadmissionForm: FormGroup = this.fb.group({
    admissionForm: this.fb.group({
      title: ["", Validators.required],
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      phone: ["", [Validators.required, Validators.pattern("[0-9]\\d{9}")]],
      employee_code: ["", Validators.required],
      designation: [""],
      email: [""],
      joined_on: ["", Validators.required],
      dob: ["", Validators.required],
      gender: ["", Validators.required],
      blood_group: [""],
      marital_status: ["", Validators.required],
      job_category: ["", Validators.required],
      passport_no: ["", Validators.pattern(this.alphaNumericPattern)],
      aadhar_no: ["", Validators.pattern(this.numericPattern)],
      pan_no: ["", Validators.pattern(this.alphaNumericPattern)],
      // not used
      experience: [""],
      basic_pay: [""],
      salary_band: [""],
      spoken_languages: [""],
    }),
    //bus_route_id: ['', Validators.required],
    // address form
    addressForm: this.fb.group({
      state: [""],
      country: [""],
      postal_code: [""],
      qualification: [""],
      perm_address: [""],
      cur_address: [""],
      employeeImage: [""],
    }),
  });

  ngOnInit() {
    if (this.dialog_type === "edit") {
      this.title = 'Edit Employee';
      this.employeeadmissionForm.controls.admissionForm.patchValue({
        title: this.employee.title,
        first_name: this.employee.first_name,
        last_name: this.employee.last_name,
        phone: this.employee.phone,
        employee_code: this.employee.employee_code,
        designation: this.employee.designation,
        email: this.employee.email,
        joined_on: this.employee.joined_on,
        dob: this.employee.dob,
        gender: this.employee.gender,
        blood_group: this.employee.blood_group,
        marital_status: this.employee.marital_status,
        job_category: this.employee.job_category,
        passport_no: this.employee.passport_no,
        aadhar_no: this.employee.aadhar_no,
        pan_no: this.employee.pan_no,
        // not used
        //bus_route_id: ['', Validators.required],
        experience: this.employee.experience,
        basic_pay: this.employee.basic_pay,
        salary_band: this.employee.salary_band,
        spoken_languages: this.employee.spoken_languages,
        //
      });
      this.employeeadmissionForm.controls.addressForm.patchValue({
        state: this.employee.state,
        country: this.employee.country,
        postal_code: this.employee.postal_code,
        qualification: this.employee.qualification,
        perm_address: this.employee.permanent_address[0].perm_address,
        cur_address: this.employee.current_address[0].cur_address,
        employeeImage: this.employee.employeephoto,
      });
    }
  }

  addressFormSubmitted(event) {
    if (event.type === "close") {
      return this.close();
    } else if (event.type === "prev") {
      this.setTabDetails(true, false);
    } else if (event.type === "next") {
      if (!this.employeeadmissionForm.controls.admissionForm.valid) {
        return this.showValidationMsg(
          this.employeeadmissionForm.controls.admissionForm as FormGroup
        );
      }
      this.setTabDetails(false, true);
    } else if (event.type === "save") {
      this.submitEmployee()
    }
  }

  onFileSelect(event) {
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    this.employeeadmissionForm.get('employeeImage').setValue(file);
    console.log(file);
  }

  close() {
    this.dialogRef.close();
  }


  setTabDetails(personal, address) {
    // this.stepTwoVerification();
    if(address && !this.employeeadmissionForm.controls.admissionForm.valid) {
      this.showValidationMsg(
        this.employeeadmissionForm.controls.admissionForm as FormGroup
      );
      return;
    }
    this.singleemployeedetails = personal;
    this.employeeaddress = address;
  }
  showValidationMsg(formGroup: FormGroup) {
    for (const key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        const control: FormControl = <FormControl>formGroup.controls[key];
        if (Object.keys(control).includes("controls")) {
          const formGroupChild: FormGroup = <FormGroup>formGroup.controls[key];
          this.showValidationMsg(formGroupChild);
        }
        control.markAsTouched();
      }
    }
  }
  employeeProfPic(fileImg: any){
    this.profilepic = fileImg;
  }

  employeeDocuments(fileDocs: any){
    this.documents = fileDocs;
  }

  submitEmployee() {
    this.employeeadmissionForm.value.employee_id = this.employee.employee_id;
    const employeeDetails = {...this.employeeadmissionForm.controls.admissionForm.value, ...this.employeeadmissionForm.controls.addressForm.value}
    if (this.dialog_type == 'add') {
      this.service.addEmployeeadmission(employeeDetails)
      .subscribe(
        res => {
          console.log(res)
          if (res.data == true) {
            this.dialogRef.close();
            this.alert_message = "Employee Added Successfully";
            this.openAlert(this.alert_message);
              this.onSubmitPic(this.employee.employee_id);
              // this.onSubmitDoc(res.id);
          } else {
            this.alert_message = "Employee Not Added";
            this.openAlert(this.alert_message)
          }
        }
      )
    } else if (this.dialog_type == 'edit') {
      this.service.editEmployee(employeeDetails, this.employee.employee_id)
        .subscribe(
          res => { 
            if(res == true) {
              this.dialogRef.close();
              this.alert_message = "Employee Edited Successfully";
              this.onSubmitPic(this.employee.employee_id);
              this.openAlert(this.alert_message)
            } else {
              this.alert_message = "Employee Not Edited";
              this.openAlert(this.alert_message)
            }
          }
        )
    }
  }

  onSubmitPic(employee_id) {
    const formData = new FormData();
    formData.append('files', this.profilepic);
    this.service.addProfileImage(formData, employee_id)
    .subscribe(
      res => { 
        if(res === true) {
          // this.alert_message = "Student Documents Not Uploaded";
          this.alert_message = "Profile Pic Uploaded";
          this.openAlert(this.alert_message)
        } else {
          this.alert_message = "Profile Pic Not Uploaded";
          this.openAlert(this.alert_message)
        }
      }
    )
  }

  onSubmitDoc(employee_id) {
    const formData1 = new FormData();
    formData1.append('files', this.documents);
    this.service.addDocuments(formData1, employee_id)
    .subscribe(
      res => { 
        if(res === true) {
          this.alert_message = "Employee Documents Uploaded";
          this.openAlert(this.alert_message)
        } else {
          this.alert_message = "Employee Documents Not Uploaded";
          this.openAlert(this.alert_message)
        }
      }
    )
  }

  openAlert(message) {
    const alertConfig = new MatDialogConfig();

    alertConfig.autoFocus = true;
    alertConfig.width = '40%';

    alertConfig.data = {
      message: message,
    };

    const alertRef = this.dialog.open(AlertComponent, alertConfig);

    alertRef.afterClosed().subscribe();
  }

}
