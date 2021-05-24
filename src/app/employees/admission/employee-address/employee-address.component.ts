import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "pro-school-employee-address",
  templateUrl: "./employee-address.component.html",
  styleUrls: ["./employee-address.component.css"],
})
export class EmployeeAddressComponent implements OnInit {
  @Input() employeeAddressForm: FormGroup;
  @Input() employee: any;
  @Input() employeeImage: string;
  @Output() employeeDetailsSubmitted = new EventEmitter();
  @Output() employeeProfPicSubmitted = new EventEmitter();
  constructor() {}
  profilepic;

  ngOnInit() {}
  employeeProfPic(fileImg: any){
    this.profilepic = fileImg[0];
    this.employeeProfPicSubmitted.emit(this.profilepic);
  }
  employeeActionButton(actionType: boolean) {
    if (actionType) {
      return this.employeeDetailsSubmitted.emit({ type: "prev" });
    }
    this.employeeDetailsSubmitted.emit({ type: "save" });
  }
  close() {
    this.employeeDetailsSubmitted.emit({ type: "close" });
  }
}
