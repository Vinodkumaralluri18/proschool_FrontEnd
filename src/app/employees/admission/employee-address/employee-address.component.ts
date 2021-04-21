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
  @Output() employeeDetailsSubmitted = new EventEmitter();
  constructor() {}

  ngOnInit() {}
}
