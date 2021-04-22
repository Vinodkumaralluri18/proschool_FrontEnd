import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-parent-details",
  templateUrl: "./parent-details.component.html",
  styleUrls: ["./parent-details.component.css"],
})
export class ParentDetailsComponent {
  private _fatherForm: FormGroup;
  private _motherForm: FormGroup;
  private _gaurdianForm: FormGroup;
  @Input("fatherForm")
  get fatherForm(): FormGroup {
    return this._fatherForm;
  }
  set fatherForm(form) {
    this._fatherForm = form;
    this._fatherForm.markAsUntouched();
  }
  @Input("motherForm")
  get motherForm(): FormGroup {
    return this._motherForm;
  }
  set motherForm(form) {
    this._motherForm = form;
    this._motherForm.markAsUntouched();
  }
  @Input("gaurdianForm")
  get gaurdianForm(): FormGroup {
    return this._gaurdianForm;
  }
  set gaurdianForm(form) {
    this._gaurdianForm = form;
    this._gaurdianForm.markAsUntouched();
  }
  @Input() student: any;
  @Output() parentDetailsSubmitted = new EventEmitter();
  constructor() {}
  get_parentForm(isPrevious: boolean = false) {
    let formList = [this.fatherForm, this.motherForm, this.gaurdianForm];
    if (isPrevious) {
      return this.parentDetailsSubmitted.emit("student");
    }
      let inValidForm = [];
      for(let form of formList) {
      if (form.valid) {
        return this.emitOutput();
      } else {
        inValidForm.push(form);
      }
    }
    if(inValidForm.length) return this.showValidationMsg(inValidForm[0]);
  }
  emitOutput() {
    if (this.fatherForm.valid || this.motherForm.valid || this.gaurdianForm.valid) {
      this.parentDetailsSubmitted.emit({
        form: this.fatherForm,
        type: "parent",
      });
    }
  }
  close() {
    this.parentDetailsSubmitted.emit("close");
  }
  onBlur({form, controlKey}) {
    if(form && controlKey)
      form.controlKey.markAsTouched();
  }
  showValidationMsg(formGroup) {
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
  parentKey = [
    "father_name",
    "father_contact",
    "father_email",
    "father_occupation",
  ];
  parent1Key = [
    "mother_name",
    "mother_contact",
    "mother_email",
    "mother_occupation",
  ];
  isFatherValid = true;
  isMotherValid = true;

}
// showValidationMsg(formGroup: FormGroup) {
//   (this.isFatherValid = true), (this.isMotherValid = true);
//   for (const key in formGroup.controls) {
//     if (this.parentKey.indexOf(key) > -1 && !formGroup.controls[key].valid) {
//       this.isFatherValid = false;
//     }
//     if (this.parent1Key.indexOf(key) > -1 && !formGroup.controls[key].valid) {
//       this.isMotherValid = false;
//     }
//   }
//   if (this.isFatherValid || this.isMotherValid) {
//     this.parentForm.clearAsyncValidators();
//     this.parentForm.clearValidators();
//     this.markForm(formGroup, false);
//     // should update just the control and not everything
//     return this.parentForm.updateValueAndValidity();
//   }
//   this.parentForm.markAllAsTouched();
// }
// markForm(formGroup: FormGroup, touched: boolean) {
//   for (const key in formGroup.controls) {
//     if (formGroup.controls.hasOwnProperty(key)) {
//       const control: FormControl = <FormControl>formGroup.controls[key];
//       if (Object.keys(control).includes("controls")) {
//         const formGroupChild: FormGroup = <FormGroup>formGroup.controls[key];
//         this.showValidationMsg(formGroupChild);
//       }
//       touched ? control.markAsTouched() : control.markAsUntouched();
//     }
//   }
// }