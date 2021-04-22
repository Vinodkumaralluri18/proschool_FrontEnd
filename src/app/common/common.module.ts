import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CommonInputComponent } from "./common-input/common-input.component";
import { PrintErrorComponent } from "./print-error/print-error.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [CommonInputComponent, PrintErrorComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [CommonInputComponent, PrintErrorComponent],
})
export class ProSchoolCommonModule {}
