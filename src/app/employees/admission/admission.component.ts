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

  joined_on = new FormControl(new Date);
  date_of_birth = new FormControl(new Date);

  showTitleList: boolean = false;
  showGenderList: boolean = false;
  showBloodGroupList: boolean = false;
  showMaritalStatusList: boolean = false;
  showJobCategoryList: boolean = false;

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
      debugger;
      this.employee = data.employee;
      this.employeeImage = this.employee.employeeImage
      this.employeeImagee = this.url + '/image/' + this.employee.employeeImage["filename"]
      console.log(this.employeeImagee)
     // this.url + '/image/' + this.school_details.SchoolImage[0].filename;
      console.log(this.employee)
    }
  }

  employeeadmissionForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    employee_code: ['', Validators.required],
    dob: ['', Validators.required],
    blood_group: ['', Validators.required],
    first_name: ['', Validators.required],
    designation: ['', Validators.required],
    gender: ['', Validators.required],
    marital_status: ['', Validators.required],
    last_name: ['', Validators.required],
    //bus_route_id: ['', Validators.required],
    email: ['', Validators.required],
    experience: ['', Validators.required],
    basic_pay: ['', Validators.required],
    phone: ['', Validators.required],
    joined_on: ['', Validators.required],
    salary_band: ['', Validators.required],
    perm_address: ['', Validators.required],
    cur_address: ['', Validators.required],
    state: ['', Validators.required],
    aadhar_no: ['', Validators.required],
    qualification: ['', Validators.required],
    country: ['', Validators.required],
    pan_no: ['', Validators.required],
    job_category: ['', Validators.required],
    postal_code: ['', Validators.required],
    passport_no: ['', Validators.required],
    spoken_languages: ['', Validators.required],
    employeeImage: ['', Validators.required],
  });

  ngOnInit() {
    if(this.dialog_type === 'edit') {
      this.employeeadmissionForm.patchValue({
        title: this.employee.title,
        employee_code: this.employee.employee_code,
        dob: this.employee.dob,
        blood_group: this.employee.blood_group,
        first_name: this.employee.first_name,
        designation: this.employee.designation,
        gender: this.employee.gender,
        marital_status: this.employee.marital_status,
        last_name: this.employee.last_name,
        //bus_route_id: ['', Validators.required],
        email: this.employee.email,
        experience: this.employee.experience,
        basic_pay: this.employee.basic_pay,
        phone: this.employee.phone,
        joined_on: this.employee.joined_on,
        salary_band: this.employee.salary_band,
        perm_address: this.employee.permanent_address[0].perm_address,
        cur_address: this.employee.current_address[0].cur_address,
        state: this.employee.state,
        aadhar_no: this.employee.aadhar_no,
        qualification: this.employee.qualification,
        country: this.employee.country,
        pan_no: this.employee.pan_no,
        job_category: this.employee.job_category,
        postal_code: this.employee.postal_code,
        passport_no: this.employee.passport_no,
        spoken_languages: this.employee.spoken_languages,
        employeeImage : this.employee.employeephoto
      })
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

  is_step_one_valid: boolean = true;
  is_step_two_valid: boolean = true;

  get_employeeForm(select) {
    if(select === 'singleemployeedetails') {
      console.log('Hello-2')
      // this.stepTwoVerification();
      if (this.is_step_two_valid) {
        this.singleemployeedetails = true;
        this.employeeaddress = false;
      } else {
        return true;
      }
    } else if(select === 'employeeaddress') {
      console.log('Hello-1')
      this.stepOneVerification();
      if (this.is_step_one_valid) {
        this.singleemployeedetails = false;
        this.employeeaddress = true;
      } else {
        return true;
      }
    }
  }

  employeeProfPic(fileImg: any){
    this.profilepic = fileImg[0];
  }

  employeeDocuments(fileDocs: any){
    this.documents = fileDocs;
  }

  submitEmployee() {
    this.employeeadmissionForm.value.employee_id = this.employee.employee_id;
    if (this.dialog_type == 'add') {
      this.service.addEmployeeadmission(this.employeeadmissionForm.value)
      .subscribe(
        res => {
          console.log(res)
          if (res.data == true) {
            this.dialogRef.close();
            this.alert_message = "Employee Added Successfully";
            this.openAlert(this.alert_message);
            this.onSubmitPic(res.id);
            // this.onSubmitDoc(res.id);
          } else {
            this.alert_message = "Employee Not Added";
            this.openAlert(this.alert_message)
          }
        }
      )
    } else if (this.dialog_type == 'edit') {
      this.service.editEmployee(this.employeeadmissionForm.value, this.employee.employee_id)
        .subscribe(
          res => { 
            if(res == true) {
              this.dialogRef.close();
              this.alert_message = "Employee Edited Successfully";
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

  is_title_valid: boolean = true;
  is_employee_code_valid: boolean = true;
  is_dob_valid: boolean = true;
  is_first_name_valid: boolean = true;
  is_gender_valid: boolean = true;
  is_marital_status_valid: boolean = true;
  is_last_name_valid: boolean = true;
  is_phone_valid: boolean = true;
  is_joined_on_valid: boolean = true;
  is_perm_address_valid: boolean = true;
  is_cur_address_valid: boolean = true;
  is_aadhar_no_valid: boolean = true;
  is_job_category_valid: boolean = true;

  validateDate(date, dateName) {
    var input = date;
    var re = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    // var is_date_valid = re.test(date);
    var is_date_valid = true;
    var dateArray = date.split("-");

    if(date.length > 1){
      is_date_valid = true;
    }else{
      is_date_valid = false;
    }

    if (is_date_valid) {
      console.log(dateArray[0]);
      console.log(dateArray[1]);
      console.log(dateArray[2]);
      if (parseInt(dateArray[2]) > 31 || parseInt(dateArray[2]) < 1 || (parseInt(dateArray[1]) === 2
        && parseInt(dateArray[2]) > 29) || parseInt(dateArray[1]) > 12 || parseInt(dateArray[1]) < 1) {
        is_date_valid = false;
      } else {
        is_date_valid = true;
      }
      console.log(is_date_valid)
    }

    switch (dateName) {
      case "dob":
        this.is_dob_valid = is_date_valid;
        console.log(this.is_dob_valid)
        break;

      case "joined_on":
        this.is_joined_on_valid = is_date_valid;
        console.log(this.is_joined_on_valid)
        break;

      default:
        break;
    }
  }

  addSlashToDOB(e) {
    if (e.keyCode != 8) {
      if (this.employeeadmissionForm.value.dob.length == 2) {
        this.employeeadmissionForm.value.dob = this.employeeadmissionForm.value.dob + "/";
      } else if (this.employeeadmissionForm.value.dob.length == 5) {
        this.employeeadmissionForm.value.dob = this.employeeadmissionForm.value.dob + "/";
      } else {
        return true;
      }
    }
    return true;
  }

  addSlashToDOfjoined(e) {
    if (e.keyCode != 8) {
      if (this.employeeadmissionForm.value.joined_on.length == 2) {
        this.employeeadmissionForm.value.joined_on = this.employeeadmissionForm.value.joined_on + "/";
      } else if (this.employeeadmissionForm.value.joined_on.length == 5) {
        this.employeeadmissionForm.value.joined_on = this.employeeadmissionForm.value.joined_on + "/";
      } else {
        return true;
      }
    }
    return true;
  }

  isMobileValid(person) {
    var re = /^[6789]\d{9}$/;
    switch (person) {
      case "employee":
        this.is_phone_valid = re.test(this.employeeadmissionForm.value.phone);
        break;

      default:
        break;
    }
  }

  validateText(textString, stringName) {
    var re = /^([a-zA-Z]+\s)*[a-zA-Z]+$/i;
    switch (stringName) {

      case "first_name":
        this.is_first_name_valid = re.test(textString.replace(/\s/g, ''));
        break;

      case "last_name":
        this.is_last_name_valid = re.test(textString.replace(/\s/g, ''));
        break;

      case "cur_address":
        this.is_cur_address_valid = re.test(textString.replace(/\s/g, ''));
        break;

      case "perm_address":
        this.is_perm_address_valid = re.test(textString.replace(/\s/g, ''));
        break;

      default:
        // code...
        break;
    }
  }

  validateDropdown(dropDownName) {
    switch (dropDownName) {

      case "title":
        this.is_title_valid = this.employeeadmissionForm.value.title == '' ? false : true;
        break;

      case "gender":
        this.is_gender_valid = this.employeeadmissionForm.value.gender == '' ? false : true;
        break;

      case "marital_status":
        this.is_marital_status_valid = this.employeeadmissionForm.value.marital_status == '' ? false : true;
        break;

      case "job_category":
        this.is_job_category_valid = this.employeeadmissionForm.value.job_category == '' ? false : true;
        break;

      default:
        break;
    }
  }

  stepOneVerification() {

    this.is_employee_code_valid = this.employeeadmissionForm.value.employee_code == '' ? false : true;
    // this.is_aadhar_no_valid = this.employeeadmissionForm.value.aadhar_no == '' ? false : true;

    this.validateText(this.employeeadmissionForm.value.first_name, 'first_name');
    this.validateText(this.employeeadmissionForm.value.last_name, 'last_name');

    this.validateDropdown('title');
    this.validateDropdown('gender');
    this.validateDropdown('marital_status');
    this.validateDropdown('job_category');

    this.validateDate(this.employeeadmissionForm.value.dob, 'dob');
    this.validateDate(this.employeeadmissionForm.value.joined_on, 'joined_on');

    this.isMobileValid('employee');

    if (this.is_employee_code_valid && this.is_first_name_valid && this.is_last_name_valid && this.is_gender_valid && this.is_marital_status_valid 
      && this.is_phone_valid && this.is_dob_valid && this.is_joined_on_valid && this.is_job_category_valid) {
      this.is_step_one_valid = true;
    } else {
      this.is_step_one_valid = false;
    }
  }

  stepTwoVerification() {
    this.validateText(this.employeeadmissionForm.value.cur_address, 'cur_address');
    this.validateText(this.employeeadmissionForm.value.perm_address, 'perm_address');
    // if () {
    //   this.is_step_two_valid = true;
    // } else {
    //   this.is_step_two_valid = true;
    // }
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
