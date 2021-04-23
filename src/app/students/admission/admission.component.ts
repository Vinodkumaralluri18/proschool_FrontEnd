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
  alphaNumericPattern = "^[a-zA-Z0-9]*$";
  numericPattern = "^[0-9]*$";
  alphaPattern = "^[a-zA-Z]*$";
  emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
  classes = [];
  sections = [];
  alert_message: string;
  dialog_type: string;
  studentphoto: File;

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
  title: string = 'Add Student';
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
    // studentForm
    studentForm : this.fb.group({
      admission_no: ['', [Validators.required, Validators.pattern(this.alphaNumericPattern)]],
      roll_no: ['', [Validators.required, Validators.pattern(this.numericPattern)]],
      first_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      last_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      category: ['', Validators.required],
      nationality: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]\\d{9}')]],
      aadhar_no: ['', [Validators.required, Validators.pattern(this.numericPattern)]],
      blood_group: [''],
      admission_date: ['', Validators.required],
    }),
    // parentGroup
    fatherForm:this.fb.group({
      father_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      father_contact: ['', Validators.required],
      father_email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      father_occupation: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    }),
    motherForm:this.fb.group({
      mother_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      mother_contact: ['', Validators.required],
      mother_email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      mother_occupation: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    }),
    gaurdianForm:this.fb.group({
      gaurdian_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      gaurdian_contact: ['', Validators.required],
      gaurdian_email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      gaurdian_occupation: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      gaurdian_relation: [''],
    }),
    // address
    cur_address: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    perm_address: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    // not sure where these are used
    class_id: ['', Validators.required],
    bus_route_id: ['', Validators.required],
    section_id: ['', Validators.required],
    email: ['', Validators.required],
    //exceluploadfile: ['', Validators.required],
    file: [''],
    //parent_account_new: ['', Validators.required],
    //parent_account_create: ['', Validators.required],
    //docupload: ['', Validators.required]
  });

  ngOnInit() {
    this.getClasses();
    if (this.dialog_type === 'edit') {
      this.title = 'Edit Student';
      this.patchData()
    }
  }

  patchData() {
  
    this.studentadmissionForm.controls.studentForm.patchValue({
      admission_no: this.student.admission_no,
      roll_no:this.student.roll_no,
      first_name:this.student.first_name,
      last_name:this.student.last_name,
      gender:this.student.gender,
      dob:this.student.dob,
      class_id: this.student.school_classes[0].class_id,
      bus_route_id: this.student.bus_route_id,
      section_id: this.student.sections[0].section_id,
      category:this.student.category,
      nationality:this.student.nationality,
      phone:this.student.phone,
      aadhar_no:this.student.aadhar_no,
      blood_group:this.student.blood_group,
      admission_date:this.student.admission_date
    });
    this.studentadmissionForm.controls.fatherForm.patchValue({
      father_name: this.student.parents[0].parent_name,
      father_contact:this.student.parents[0].parent_contact,
      father_email:this.student.parents[0].parent_email,
      father_occupation:this.student.parents[0].occupation,
    });
    this.studentadmissionForm.controls.motherForm.patchValue({
      mother_name:this.student.parents[1].parent_name,
      mother_contact:this.student.parents[1].parent_contact,
      mother_email:this.student.parents[1].parent_email,
      mother_occupation:this.student.parents[1].occupation,
    });
    this.studentadmissionForm.controls.gaurdianForm.patchValue({
      gaurdian_name:this.student.parents[2].parent_name,
      gaurdian_contact:this.student.parents[2].parent_contact,
      gaurdian_email:this.student.parents[2].parent_email,
      gaurdian_occupation:this.student.parents[2].occupation,
      gaurdian_relation:this.student.parents[2].parent_relation,
    });
    console.log({studentadmissionForm: this.studentadmissionForm})
    console.log({parentForm: this.studentadmissionForm})
  }

  formSubmitted(event) {
    if(event === 'close') {
      return this.close()
    }
    this.parentdetails = true;
    this.studentdetails = false;
    this.address = false;
    if(event && event.type === 'student')
      this.setTabDetails(false, true, false);
    if(event === 'student')
      this.setTabDetails(true, false, false);
    else if(event && event.type === 'parent')
      this.setTabDetails(false, false, true);
  }

  setTabDetails(student, parent, address, tab = false) {
    if (parent && !this.studentadmissionForm.controls.studentForm.valid) {
      this.showValidationMsg(
        this.studentadmissionForm.controls.studentForm as FormGroup
      );
      return;
    }
    if (address) {
      if(!this.studentadmissionForm.controls.studentForm.valid) {
        this.showValidationMsg(
          this.studentadmissionForm.controls.studentForm as FormGroup
        );
      }
      let formList = [
        this.studentadmissionForm.controls.fatherForm,
        this.studentadmissionForm.controls.motherForm,
        this.studentadmissionForm.controls.gaurdianForm,
      ];
      let inValidForm = [];
      for (let form of formList) {
        if (form.valid) {
          this.studentdetails = student;
          this.parentdetails = parent;
          this.address = address;
          return;
        } else {
          inValidForm.push(form);
        }
      }
      if(inValidForm.length) return this.showValidationMsg(inValidForm[0]);
    }
    this.studentdetails = student;
    this.parentdetails = parent;
    this.address = address;
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
  formStudentDetails() {
    let {bus_route_id, cur_address, file, perm_address, student_id, email} = this.studentadmissionForm.value, class_id = this.class, section_id = this.section;
    let studentFormValue = {bus_route_id, class_id, cur_address, file, perm_address, section_id, student_id, email};
    let studentValue = {...this.studentadmissionForm.value.fatherForm, ...this.studentadmissionForm.value.motherForm, ...this.studentadmissionForm.value.gaurdianForm, ...this.studentadmissionForm.value.studentForm, ...studentFormValue};
    console.log({studentValue});
    return studentValue;
  }

  submitStudent() {
    this.studentadmissionForm.value.student_id = this.student.student_id;
    let studentValue = this.formStudentDetails();
    // checking if all forms are valid before api call
    if (
      this.studentadmissionForm.controls.studentForm &&
      (this.studentadmissionForm.controls.fatherForm.valid ||
        this.studentadmissionForm.controls.motherForm.valid ||
        this.studentadmissionForm.controls.gaurdianForm.valid)
    ) {
      if (this.dialog_type == "add") {
        this.studentservice
          .addStudentadmission(this.section, studentValue)
          .subscribe((res) => {
            if (res.status == "true") {
              this.dialogRef.close();
              this.alert_message = "Student Added Successfully";
              this.openAlert(this.alert_message);
              this.onSubmitPic(res.id);
              // this.onSubmitDoc(res.id);
            } else {
              this.alert_message = "Student Not Added";
              this.openAlert(this.alert_message);
            }
          });
      } else if (this.dialog_type == "edit") {
        this.studentservice
          .editStudent(this.studentadmissionForm.value.student_id, studentValue)
          .subscribe((res) => {
            if (res == true) {
              this.dialogRef.close();
              this.alert_message = "Student Edited Successfully";
              this.openAlert(this.alert_message);
              this.onSubmitPic(this.studentadmissionForm.value.student_id);
              // this.onSubmitDoc(this.studentadmissionForm.value.student_id);
            } else {
              this.alert_message = "Student Not Edited";
              this.openAlert(this.alert_message);
            }
          });
      }
    } else {
      this.alert_message = "Please Input all Mandatory Fields!!";
      this.openAlert(this.alert_message);
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

  is_current_address_valid: boolean = true;
  is_perm_address_valid: boolean = true;

  is_step_three_valid: boolean = true;

  stepThreeVerification() {
    this.is_current_address_valid =  this.student.current_address[0].cur_address == '' ? false : true
    //  this.validateText(this.student.current_address[0].cur_address, 'current-address');
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

// patchData() {
    //   this.studentadmissionForm.patchValue({
    //     admission_no: this.student.admission_no,
    //     first_name: this.student.first_name,
    //     category: this.student.category,
    //     blood_group: this.student.blood_group,
    //     roll_no: this.student.roll_no,
    //     last_name: this.student.last_name,
    //     nationality: this.student.nationality,
    //     admission_date: this.student.admission_date,
    //     class_id: this.student.school_classes[0].class_id,
    //     gender: this.student.gender,
    //     phone: this.student.phone,
    //     bus_route_id: this.student.bus_route_id,
    //     section_id: this.student.sections[0].section_id,
    //     dob: this.student.dob,
    //     aadhar_no: this.student.aadhar_no,
    //     email: this.student.email,
    //     //exceluploadfile: ['', Validators.required],
    //     father_name: this.student.father_name,
    //     mother_name: this.student.parents[1].parent_name,
    //     gaurdian_name: this.student.parents[2].parent_name,
    //     gaurdian_relation: this.student.parents[2].parent_relation,
    //     father_contact: this.student.parents[0].parent_contact,
    //     mother_contact: this.student.parents[1].parent_contact,
    //     gaurdian_contact: this.student.parents[2].parent_contact,
    //     father_email: this.student.parents[0].parent_email,
    //     mother_email: this.student.parents[1].parent_email,
    //     gaurdian_email: this.student.parents[2].parent_email,
    //     father_occupation: this.student.parents[0].occupation,
    //     mother_occupation: this.student.parents[1].occupation,
    //     gaurdian_occupation: this.student.parents[2].occupation,
    //     cur_address: this.student.cur_address,
    //     perm_address: this.student.perm_address,
    //     file: [''],
    //     //parent_account_new: ['', Validators.required],
    //     //parent_account_create: ['', Validators.required],
    //     //docupload: ['', Validators.required]
    //   });