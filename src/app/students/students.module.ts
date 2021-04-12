import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchModuleModule } from '../search-module/search-module.module';
import { TeacherSearchModule } from '../teacher-search/teacher-search.module';
import { MatDialogModule } from '@angular/material/dialog';
import { PipesModule } from '../_pipes/_pipes.module';

import { DirectivesModule } from '../_directives/_directives.module';
import { StudentsRoutingModule } from './students-routing.module';
import { InformationComponent } from './information/information.component';
import { AdmissionComponent } from './admission/admission.component';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';

@NgModule({
  declarations: [InformationComponent, AdmissionComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TeacherSearchModule,
    SearchModuleModule,
    MatDialogModule,
    MatDatepickerModule, MatInputModule, MatNativeDateModule,
    DirectivesModule,
    PipesModule
  ],
  entryComponents: [AdmissionComponent],
  exports: [
    AdmissionComponent,
  ]
})
export class StudentsModule { }
