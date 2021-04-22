import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "pro-school-common-input",
  templateUrl: "./common-input.component.html",
  styleUrls: ["./common-input.component.css"],
})

export class CommonInputComponent {
  @Output() onBlurEvent = new EventEmitter();
  @Input("control") control: FormControl;
  private _form: FormGroup;
  @Input()
  set form(value: FormGroup) {
    console.log({value})
    this._form = value;
  }
  get form(): FormGroup {
    return this._form;
  }
  @Input("fieldName") fieldName: string = "information";
  @Input("maxLength") maxLength: number = 0;
  private _inputType: string;
  @Input("inputType")
  get inputType() {
    return this._inputType;
  }
  set inputType(value: string) {
    this._inputType = value;
  }
  @Input("labelTitle") labelTitle: string = "title";
  @Input("options") options: any[] = [];
  emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
  onBlur(form, control) {
    this.onBlurEvent.emit({form, control});
  }
  constructor() {}
}
