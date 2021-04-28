import { Component, Input } from "@angular/core";

@Component({
  selector: "app-print-error",
  templateUrl: "./print-error.component.html",
  styleUrls: ["./print-error.component.css"],
})
export class PrintErrorComponent {
  @Input("control")
  control: any;
  @Input("fieldName")
  fieldName: string = 'Input';
  @Input("customError")
  customError: boolean = false;
  constructor() {}
}
