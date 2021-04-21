import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import {
  bloodGroupOptions,
  employeeTypeOptions,
  genderOptions,
  maritalOptions,
  titleOptions,
} from "src/app/constants/pro-school.constant";

@Component({
  selector: "pro-school-employee-admission",
  templateUrl: "./employee-admission.component.html",
  styleUrls: ["./employee-admission.component.css"],
})
export class EmployeeAdmissionComponent implements OnInit {
  @Input() employeeForm: FormGroup;
  @Input() employee: any;
  @Output() employeeDetailsSubmitted = new EventEmitter();
  constructor() {}
  titleOptions = titleOptions;
  genderOptions = genderOptions;
  bloodGroupOptions = bloodGroupOptions;
  maritalOptions = maritalOptions;
  employeeTypeOptions = employeeTypeOptions;
  ngOnInit() {}
  submitEmployeeAdmissionForm() {
    this.showValidationMsg(this.employeeForm);
    if (this.employeeForm.valid) {
      this.employeeDetailsSubmitted.emit({
        form: this.employeeForm,
        type: "student",
      });
    }
  }
  close() {
    this.employeeDetailsSubmitted.emit("close");
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
}
