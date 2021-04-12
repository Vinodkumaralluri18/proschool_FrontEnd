import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ServicesService } from '../../services.service';
import { StudentsService } from '../../_services/students.service';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { FormControl } from '@angular/forms';
import { appConfig } from 'src/app/app.config';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css']
})
export class AdmissionComponent implements OnInit {
  unamePattern = '^[a-zA-Z ]*$'; 
  emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
  classes = [];
  sections = [];
  alert_message: string;
  dialog_type: string;
  studentphoto: File;

  date_of_birth = new FormControl(new Date);
  date_of_admission = new FormControl(new Date);

  selectedGender: any;
  showGenderList: boolean = false;

  studentImagee;
  private url = appConfig.apiUrl;

  class: string;
  section: string;
  student: any = {
    student_id: '',
    admission_no: '',
    first_name: '',
    category: '',
    blood_group: '',
    roll_no: '',
    last_name: '',
    nationality: '',
    admission_date: '',
    class_id: '',
    gender: '',
    phone: '',
    bus_route_id: '',
    section_id: '',
    dob: '',
    aadhar_no: '',
    email: '',
    father_name: '',
    mother_name: '',
    gaurdian_name: '',
    gaurdian_relation: '',
    father_contact: '',
    mother_contact: '',
    gaurdian_contact: '',
    father_email: '',
    mother_email: '',
    gaurdian_email: '',
    father_occupation: '',
    mother_occupation: '',
    gaurdian_occupation: '',
    current_address: [{ "cur_address": "" }],
    permanent_address: [{ "perm_address": "" }],
    parents: [{
      "parent_name": "",
      "parent_contact": '',
      "parent_email": "",
      "parent_relation": "",
      "parent_address": "",
      "occupation": ""
    },
    {
      "parent_name": "",
      "parent_contact": '',
      "parent_email": "",
      "parent_relation": "",
      "parent_address": "",
      "occupation": ""
    },
    {
      "parent_name": "",
      "parent_contact": '',
      "parent_email": "",
      "parent_relation": "",
      "parent_address": "",
      "occupation": ""
    }],
    school_classes: [],
    sections: [],
  }
  profilepic;
  documents;

  studentdetails: boolean = true;
  parentdetails: boolean = false;
  address: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: ServicesService,
    private studentservice: StudentsService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AdmissionComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.class = data.class;
    this.section = data.section;
    this.dialog_type = data.dialog_type;
    if (this.dialog_type === 'edit') {
      this.student = data.student;
     // this.employee = data.employee;
      this.studentImagee = this.student.studentImagee
      this.studentImagee = this.url + '/image/' + this.student.studentImage["filename"]
      console.log(this.studentImagee)
      console.log(this.student)
    }
  }

  studentadmissionForm: FormGroup = this.fb.group({
    admission_no: ['', Validators.required],
    first_name: ['', Validators.required],
    category: ['', Validators.required],
    blood_group: ['', Validators.required],
    roll_no: ['', Validators.required],
    last_name: ['', Validators.required],
    nationality: ['', Validators.required],
    admission_date: ['', Validators.required],
    class_id: ['', Validators.required],
    gender: ['', Validators.required],
    phone: ['', Validators.required],
    bus_route_id: ['', Validators.required],
    section_id: ['', Validators.required],
    dob: ['', Validators.required],
    aadhar_no: ['', Validators.required],
    email: ['', Validators.required],
    //exceluploadfile: ['', Validators.required],
    father_name: ['', Validators.required],
    mother_name: ['', Validators.required],
    gaurdian_name: ['', Validators.required],
    gaurdian_relation: ['', Validators.required],
    father_contact: ['', Validators.required],
    mother_contact: ['', Validators.required],
    gaurdian_contact: ['', Validators.required],
    father_email: ['', Validators.required, Validators.pattern(this.emailPattern)],
    mother_email: ['', Validators.required],
    gaurdian_email: ['', Validators.required],
    father_occupation: ['', Validators.required],
    mother_occupation: ['', Validators.required],
    gaurdian_occupation: ['', Validators.required],
    cur_address: ['', Validators.required],
    perm_address: ['', Validators.required],
    file: [''],
    //parent_account_new: ['', Validators.required],
    //parent_account_create: ['', Validators.required],
    //docupload: ['', Validators.required]
  });

  ngOnInit() {
    this.getClasses();
    if (this.dialog_type === 'edit') {
      this.patchData()
    }
  }

  patchData() {
    this.studentadmissionForm.patchValue({
      admission_no: this.student.admission_no,
      first_name: this.student.first_name,
      category: this.student.category,
      blood_group: this.student.blood_group,
      roll_no: this.student.roll_no,
      last_name: this.student.last_name,
      nationality: this.student.nationality,
      admission_date: this.student.admission_date,
      class_id: this.student.school_classes[0].class_id,
      gender: this.student.gender,
      phone: this.student.phone,
      bus_route_id: this.student.bus_route_id,
      section_id: this.student.sections[0].section_id,
      dob: this.student.dob,
      aadhar_no: this.student.aadhar_no,
      email: this.student.email,
      //exceluploadfile: ['', Validators.required],
      father_name: this.student.father_name,
      mother_name: this.student.parents[1].parent_name,
      gaurdian_name: this.student.parents[2].parent_name,
      gaurdian_relation: this.student.parents[2].parent_relation,
      father_contact: this.student.parents[0].parent_contact,
      mother_contact: this.student.parents[1].parent_contact,
      gaurdian_contact: this.student.parents[2].parent_contact,
      father_email: this.student.parents[0].parent_email,
      mother_email: this.student.parents[1].parent_email,
      gaurdian_email: this.student.parents[2].parent_email,
      father_occupation: this.student.parents[0].occupation,
      mother_occupation: this.student.parents[1].occupation,
      gaurdian_occupation: this.student.parents[2].occupation,
      cur_address: this.student.cur_address,
      perm_address: this.student.perm_address,
      file: [''],
      //parent_account_new: ['', Validators.required],
      //parent_account_create: ['', Validators.required],
      //docupload: ['', Validators.required]
    });
  }

  get_studentForm(select) {

    if (select === 'studentdetails') {
      this.studentdetails = true;
      this.parentdetails = false;
      this.address = false;
    }
    else if (select === 'parentdetails') {
      if (this.studentdetails) {
        this.studentadmissionForm.value.class_id = this.class;
        this.studentadmissionForm.value.section_id = this.section;
        this.stepOneVerification();
        if (this.is_step_one_valid) {
          this.studentdetails = false;
          this.parentdetails = true;
          this.address = false;
        } else {
          return true;
        }
      } else if (this.address) {
        this.stepThreeVerification();
        if (this.is_step_three_valid) {
          this.studentdetails = false;
          this.parentdetails = true;
          this.address = false;
        } else {
          return true;
        }
      }
    }
    else if (select === 'address') {
      if (this.parentdetails) {
        this.studentadmissionForm.value.class_id = this.class;
        this.studentadmissionForm.value.section_id = this.section;
       // this.stepOneVerification();
        this.stepTwoVerification();
        if (this.is_step_one_valid && this.is_father_name_valid) {
          this.studentdetails = false;
          this.parentdetails = false;
          this.address = true;
        } else {
          return true;
        }
      } else {
        this.studentdetails = false;
        this.parentdetails = false;
        this.address = true;
      }
    }
  }

  fileProgress(event) {
    this.studentphoto = <File>event.target.files[0];
    this.studentadmissionForm.patchValue({ file: this.studentphoto });
  }

  close() {
    // this.patchData();
    this.dialogRef.close();
  }

  studentProfPic(fileImg: any) {
    this.profilepic = fileImg[0];
  }

  studentDocuments(fileDocs: any) {
    this.documents = fileDocs;
  }

  submitStudent() {
    this.studentadmissionForm.value.student_id = this.student.student_id;
    if (this.dialog_type == 'add') {
      this.studentservice.addStudentadmission(this.section, this.studentadmissionForm.value)
        .subscribe(
          res => {
            if (res.status == 'true') {
              this.dialogRef.close();
              this.alert_message = "Student Added Successfully";
              this.openAlert(this.alert_message)
              this.onSubmitPic(res.id);
              // this.onSubmitDoc(res.id);
            } else {
              this.alert_message = "Student Not Added";
              this.openAlert(this.alert_message)
            }
          }
        )
    } else if (this.dialog_type == 'edit') {
      this.studentservice.editStudent(this.studentadmissionForm.value.student_id, this.studentadmissionForm.value)
        .subscribe(
          res => {
            if (res == true) {
              this.dialogRef.close();
              this.alert_message = "Student Edited Successfully";
              this.openAlert(this.alert_message)
              this.onSubmitPic(this.studentadmissionForm.value.student_id);
              // this.onSubmitDoc(this.studentadmissionForm.value.student_id);
            } else {
              this.alert_message = "Student Not Edited";
              this.openAlert(this.alert_message)
            }
          }
        )
    }
  }

  onSubmitPic(student_id) {
    const formData = new FormData();
    formData.append('files', this.profilepic);
    this.studentservice.addProfileImage(formData, student_id)
      .subscribe(
        res => {
          if (res === true) {
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

  onSubmitDoc(student_id) {
    const formData1 = new FormData();
    formData1.append('files', this.documents);
    this.studentservice.addDocuments(formData1, student_id)
      .subscribe(
        res => {
          if (res === true) {
            this.alert_message = "Student Documents Uploaded";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Student Documents Not Uploaded";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  getClasses() {
    this.service.getClasses()
      .subscribe(
        res => { this.classes = res.school_classes, console.log(res) }
      )
  }
  selectedClass: any;
  showClassList: boolean = false;

  selectedSection: any;
  showSectionList: boolean = false;

  selectedCategory: any
  showCategoryList: boolean = false;

  selectedBloodGroup: any;
  showBloodGroupList: boolean = false;

  selectedBusRoute: any;
  showBusRouteList: boolean = false;


  classListbtnClicked() {
    this.showClassList = true;
  }

  sectionChange() {
    if (this.selectedClass.class_id == undefined || this.selectedClass.class_id == '') {
      this.alert_message = "Please Select Class";
      this.openAlert(this.alert_message)
    } else {
      this.service.getSections(this.selectedClass.class_id)
        .subscribe(
          res => { this.sections = res.class_sections, console.log(this.sections) }
        )
    }

  }

  isDOBValid: boolean = true;
  isDOfAdmissionValid: boolean = true;

  validateDate(date, dateName) {
    var input = date;
    var re = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    // var is_date_valid = re.test(date);
    // var is_date_valid = true;
    console.log(date)
    var dateArray = date.split("/");

    if (dateArray.length > 1) {
      console.log('Hello-1')
      if (parseInt(dateArray[0]) > 31 || parseInt(dateArray[0]) < 1 || (parseInt(dateArray[1]) === 2
        && parseInt(dateArray[0]) > 29) || parseInt(dateArray[1]) > 12 || parseInt(dateArray[1]) < 1) {
        var is_date_valid = false;
      } else {
        var is_date_valid = true;
      }
    } else {
      console.log('Hello-2')
      var is_date_valid = false;
    }

    console.log(is_date_valid)

    switch (dateName) {
      case "dob":
        this.isDOBValid = is_date_valid;
        break;

      case "dateOfAdmission":
        this.isDOfAdmissionValid = is_date_valid;
        break;

      default:
        // code...
        break;
    }
  }

  addSlashToDOB(e) {
    if (e.keyCode != 8) {
      if (this.student.dob.length == 2) {
        this.student.dob = this.student.dob + "/";
      } else if (this.student.dob.length == 5) {
        this.student.dob = this.student.dob + "/";
      } else {
        return true;
      }
    }
    return true;
  }

  addSlashToDOfAdmission(e) {
    if (e.keyCode != 8) {
      if (this.student.admission_date.length == 2) {
        this.student.admission_date = this.student.admission_date + "/";
      } else if (this.student.admission_date.length == 5) {
        this.student.admission_date = this.student.admission_date + "/";
      } else {
        return true;
      }
    }
    return true;
  }

  is_student_mobile_valid: boolean = true;
  is_father_mobile_valid: boolean = true;
  is_mother_mobile_valid: boolean = true;
  is_guardian_mobile_valid: boolean = true;

  isMobileValid(person) {
    var re = /^[6789]\d{9}$/;
    switch (person) {
      case "student":
        this.is_student_mobile_valid = re.test(this.student.phone);
        break;
      case "father":
        this.is_father_mobile_valid = re.test(this.student.parents[1].parent_contact);
        break;
      case "mother":
        this.is_mother_mobile_valid = re.test(this.student.parents[0].parent_contact);
        break;
      case "guardian":
        this.is_guardian_mobile_valid = re.test(this.student.parents[2].parent_contact);
        break;

      default:
        // code...
        break;
    }
  }

  validFirstName: boolean = true;
  validLastName: boolean = true;
  validNationality: boolean = true;

  is_father_name_valid: boolean = true;
  is_mother_name_valid: boolean = true;
  is_guardian_name_valid: boolean = true;
  is_father_occ_valid: boolean = true;
  is_mother_occ_valid: boolean = true;
  is_guardian_occ_valid: boolean = true;
  is_guardian_relation_valid: boolean = true;
  is_current_address_valid: boolean = true;
  is_perm_address_valid: boolean = true;

  validateText(textString, stringName) {
    debugger;
    var re = /^([a-zA-Z]+\s)*[a-zA-Z]+$/i;
    switch (stringName) {
      case "first-name":
        this.validFirstName = re.test(textString.replace(/\s/g, ''));
        break;

      case "last-name":
        this.validLastName = re.test(textString.replace(/\s/g, ''));
        break;

      case "nationality":
        this.validNationality = re.test(textString.replace(/\s/g, ''));
        break;

      case "father-name":
        this.is_father_name_valid = re.test(textString.replace(/\s/g, ''));
        break;

      case "mother-name":
        this.is_mother_name_valid = re.test(textString.replace(/\s/g, ''));
        break;

      case "guardian-name":
        this.is_guardian_name_valid = re.test(textString.replace(/\s/g, ''));
        break;

      case "father-occ":
        this.is_father_occ_valid = re.test(textString.replace(/\s/g, ''));
        break;

      case "mother-occ":
        this.is_mother_occ_valid = re.test(textString.replace(/\s/g, ''));
        break;

      case "guardian-occ":
        this.is_guardian_occ_valid = re.test(textString.replace(/\s/g, ''));
        break;

      case "guardian-relation":
        this.is_guardian_relation_valid = re.test(textString.replace(/\s/g, ''));
        break;

      case "current-address":
        this.is_current_address_valid = re.test(textString.replace(/\s/g, ''));
        alert(this.is_current_address_valid)
        break;

      case "perm-address":
        this.is_perm_address_valid = re.test(textString.replace(/\s/g, ''));
        break;

      default:
        // code...
        break;
    }
  }

  isValidClassDD: boolean = true;
  isValidSectionDD: boolean = true;
  isValidGenderDD: boolean = true;
  isValidCategoryDD: boolean = true;
  isValidBloodDD: boolean = true;
  isValidBusRouteDD: boolean = true;

  validateDropdown(dropDownName) {
    switch (dropDownName) {
      // case "class-dd":
      //   this.isValidClassDD = !this.selectedClass  ? false : true;
      //   break;

      // case "section-dd":
      //   this.isValidSectionDD = !this.selectedSection  ? false : true;
      //   break;

      // case "gender-dd":
      //   this.isValidGenderDD = !this.selectedGender ? false : true;
      //   break;

      // case "category-dd":
      //   this.isValidCategoryDD = !this.selectedCategory ? false : true;
      //   break;

      // case "blood-dd":
      //   this.isValidBloodDD = !this.selectedBloodGroup ? false : true;
      //   break;

      case "gender-dd":
        this.isValidGenderDD = (this.studentadmissionForm.value.gender == '' || this.studentadmissionForm.value.gender == undefined) ? false : true;
        break;

      case "category-dd":
        this.isValidCategoryDD = (this.studentadmissionForm.value.category == '' || this.studentadmissionForm.value.category == undefined) ? false : true;
        break;

      case "blood-dd":
        this.isValidBloodDD = this.selectedBloodGroup == '' ? false : true;
        break;

      // case "bus-route-dd":
      //   this.isValidBusRouteDD = !this.selectedBusRoute ? false : true;
      //   break;

      default:
        // code...
        break;
    }
  }

  // is_student_email_valid:boolean = true;
  is_father_email_valid: boolean = true;
  is_mother_email_valid: boolean = true;
  is_guardian_email_valid: boolean = true;

  verifyEmailId(emailId, emailName) {
    var re = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    switch (emailName) {
      // case "student-email":
      //   this.is_student_email_valid = re.test(emailId);
      //   break;

      case "father-email":
        this.is_father_email_valid = re.test(emailId);
        break;

      case "mother-email":
        this.is_mother_email_valid = re.test(emailId);
        break;

      case "guardian-email":
        this.is_guardian_email_valid = re.test(emailId);
        break;

      default:
        // code...
        break;
    }
  }

  is_admission_no_valid: boolean = true;
  is_roll_no_valid: boolean = true;
  is_adhar_no_valid: boolean = true;

  is_step_one_valid: boolean = true;

  stepOneVerification() {

    this.is_admission_no_valid = this.student.admission_no == '' ? false : true;
    this.is_roll_no_valid = this.student.roll_no == '' ? false : true;
    this.is_adhar_no_valid = this.student.aadhar_no == '' ? false : true;

    this.validateText(this.student.first_name, 'first-name');
    this.validateText(this.student.last_name, 'last-name');
    this.validateText(this.student.nationality, 'nationality');

    // this.validateDropdown('class-dd');
    // this.validateDropdown('section-dd');
    this.validateDropdown('gender-dd');
    this.validateDropdown('category-dd');

    this.validateDate(this.student.dob, 'dob');
    this.validateDate(this.student.admission_date, 'dateOfAdmission');

    this.isMobileValid('student');

    // if (this.student.email !== '') {
    //   this.verifyEmailId(this.student.email, 'student-email');
    // }

    if (this.is_admission_no_valid && this.is_roll_no_valid && this.is_adhar_no_valid
      && this.validFirstName && this.validLastName && this.validNationality
      && this.isValidGenderDD && this.isValidCategoryDD && this.isDOBValid && this.isDOfAdmissionValid && this.is_student_mobile_valid) {
      this.is_step_one_valid = true;
    } else {
      this.is_step_one_valid = false;
    }
  }

  

  is_step_two_valid: boolean = true;

  stepTwoVerification() {
    this.is_father_name_valid = this.student.father_name == '' ? false : true;
    this.validateText(this.student.father_name, 'father-name');
   // this.validateText(this.student.parents[1].occupation, 'father-occ');
   // this.isMobileValid('father');


    // this.student.parents[0].parent_name !== '' ? this.validateText(this.student.parents[0].parent_name, 'mother-name') : true;
    // this.student.parents[2].parent_name !== '' ? this.validateText(this.student.parents[2].parent_name, 'guardian-name') : true;
    // this.student.parents[0].occupation !== '' ? this.validateText(this.student.parents[0].occupation, 'mother-occ') : true;
    // this.student.parents[2].occupation !== '' ? this.validateText(this.student.parents[2].occupation, 'guardian-occ') : true;
    // this.student.parents[2].parent_relation !== '' ? this.validateText(this.student.parents[2].parent_relation, 'guardian-relation') : true;

    // this.student.parents[0].parent_contact !== '' ? this.isMobileValid('mother') : true;
    // this.student.parents[2].parent_contact !== '' ? this.isMobileValid('guardian') : true;

    // if (this.student.parents[1].parent_email !== '') {
    //   this.verifyEmailId(this.student.parents[1].parent_email, 'father-email');
    // }

    // if (this.student.parents[0].parent_email !== '') {
    //   this.verifyEmailId(this.student.parents[0].parent_email, 'mother-email');
    // }

    // if (this.student.parents[2].parent_email !== '') {
    //   this.verifyEmailId(this.student.parents[2].parent_email, 'guardian-email');
    // }

    if (this.is_father_name_valid) {
      this.is_step_two_valid = true;
    }
    this.is_step_two_valid = false;
  }

  is_step_three_valid: boolean = true;

  stepThreeVerification() {
    this.is_current_address_valid =  this.student.current_address[0].cur_address == '' ? false : true
     this.validateText(this.student.current_address[0].cur_address, 'current-address');
    // this.student.permanent_address[0].perm_address !== '' ? this.validateText(this.student.permanent_address[0].perm_address, 'perm-address') : true;
     
    if (this.is_current_address_valid) {
       this.is_step_three_valid = true;
     }
    this.is_step_three_valid = false;
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