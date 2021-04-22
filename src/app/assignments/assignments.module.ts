import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchModuleModule } from '../search-module/search-module.module';
import { TeacherSearchModule } from '../teacher-search/teacher-search.module';
import { MatDialogModule } from '@angular/material/dialog';
import { PipesModule } from '../_pipes/_pipes.module';

import { AssignmentsRoutingModule } from './assignments-routing.module';
import { AssignmentsByDateComponent } from './assignments-by-date/assignments-by-date.component';
import { AssignAssignmentsComponent } from './assign-assignments/assign-assignments.component';
import { AssignmentsAddMarksComponent } from './assignments-add-marks/assignments-add-marks.component';

@NgModule({
  declarations: [AssignmentsByDateComponent, AssignAssignmentsComponent, AssignmentsAddMarksComponent],
  imports: [
    CommonModule,
    AssignmentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SearchModuleModule,
    TeacherSearchModule,
    PipesModule,
    MatDialogModule
  ]
})
export class AssignmentsModule { }
