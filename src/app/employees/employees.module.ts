import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchModuleModule } from '../search-module/search-module.module';
import { MatDialogModule } from '@angular/material/dialog';
import { PipesModule } from '../_pipes/_pipes.module';

import { DirectivesModule } from '../_directives/_directives.module';
import { EmployeesRoutingModule } from './employees-routing.module';
import { InformationComponent } from './information/information.component';
import { AdmissionComponent } from './admission/admission.component';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';

@NgModule({
  declarations: [InformationComponent, AdmissionComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SearchModuleModule,
    MatDialogModule,
    MatDatepickerModule, MatInputModule, MatNativeDateModule,
    DirectivesModule,
    PipesModule
  ],
  entryComponents: [AdmissionComponent],
  exports: [AdmissionComponent]
})
export class EmployeesModule { }
