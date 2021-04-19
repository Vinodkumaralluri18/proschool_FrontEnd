import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-student-details",
  templateUrl: "./student-details.component.html",
  styleUrls: ["./student-details.component.css"],
})
export class StudentDetailsComponent implements OnInit {
  @Input() studentForm: FormGroup;
  @Input() student: any;
  @Output() studentDetailsSubmitted = new EventEmitter();
  constructor() {}
  ngOnInit() {}
  isDOBValid: boolean = true;
  isDOfAdmissionValid: boolean = true;

  bloodGroupOptions = [
    { value: "", viewValue: "--Select--" },
    { value: "O+", viewValue: "O+" },
    { value: "O-", viewValue: "O-" },
    { value: "A+", viewValue: "A+" },
    { value: "A-", viewValue: "A-" },
    { value: "B+", viewValue: "B+" },
    { value: "B-", viewValue: "B-" },
    { value: "AB+", viewValue: "AB+" },
    { value: "AB-", viewValue: "AB-" },
  ];

  categoriesOptions = [
    { value: "", viewValue: "--Select--" },
    { value: "OC", viewValue: "OC" },
    { value: "OBC", viewValue: "OBC" },
    { value: "BC-A", viewValue: "BC-A" },
    { value: "BC-B", viewValue: "BC-B" },
    { value: "BC-C", viewValue: "BC-C" },
    { value: "BC-D", viewValue: "BC-D" },
    { value: "Minority", viewValue: "Minority" },
  ];

  genderOptions = [
    { value: "", viewValue: "--Select--" },
    { value: "Male", viewValue: "Male" },
    { value: "Female", viewValue: "Female" },
  ];
  validateDate(date, dateName) {
    var input = date;
    var re = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    // var is_date_valid = re.test(date);
    // var is_date_valid = true;
    console.log(date);
    var dateArray = date.split("/");

    if (dateArray.length > 1) {
      console.log("Hello-1");
      if (
        parseInt(dateArray[0]) > 31 ||
        parseInt(dateArray[0]) < 1 ||
        (parseInt(dateArray[1]) === 2 && parseInt(dateArray[0]) > 29) ||
        parseInt(dateArray[1]) > 12 ||
        parseInt(dateArray[1]) < 1
      ) {
        var is_date_valid = false;
      } else {
        var is_date_valid = true;
      }
    } else {
      console.log("Hello-2");
      var is_date_valid = false;
    }

    console.log(is_date_valid);

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
    return this.addSlash(e, "dob");
  }
  addSlashToAdmDate(e) {
    return this.addSlash(e, "admission_date");
  }
  dateValidRegEx ='/[^a-zA-Z, ]/'
  addSlash(e, key) {
    if (e.keyCode != 8) {
      if (this.student[key].length == 2) {
        this.student[key] = this.student[key] + "/";
      } else if (this.student[key].length == 5) {
        this.student[key] = this.student[key] + "/";
      } else {
        return true;
      }
    }

    return true;
  }
  // validDob(key) {
  //   if (!this.student[key].match(this.dateValidRegEx)) {
  //     // isDOfAdmissionValid, isDOBValid
  //     this.isDOBValid = key === "dob" ? false : true;
  //     this.isDOfAdmissionValid = key === "admission_date" ? false : true;
  //   } else if (this.student[key].match(this.dateValidRegEx)) {
  //     // isDOfAdmissionValid, isDOBValid
  //     this.isDOBValid = key === "dob" ? true : false;
  //     this.isDOfAdmissionValid = key === "admission_date" ? true : false;
  //   }
  // }
  studentdetails: boolean = true;
  parentdetails: boolean = true;
  get_studentForm(select) {
    this.showValidationMsg(this.studentForm);
    if (this.studentForm.valid && this.isDOBValid && this.isDOfAdmissionValid) {
      this.studentDetailsSubmitted.emit({
        form: this.studentForm,
        type: "student",
      });
    }
  }
  close() {
    this.studentDetailsSubmitted.emit("close");
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
  is_step_one_valid: boolean = true;
  stepOneVerification() {
    this.validateDate(this.student.dob, "dob");
    this.validateDate(this.student.admission_date, "dateOfAdmission");
  }
}
