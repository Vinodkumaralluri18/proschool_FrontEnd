import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchModuleModule } from '../search-module/search-module.module';
import { TeacherSearchModule } from '../teacher-search/teacher-search.module';
import { PipesModule } from '../_pipes/_pipes.module';
import { DirectivesModule } from '../_directives/_directives.module';

import { EvaluationsRoutingModule } from './evaluations-routing.module';
import { MarksListComponent } from './marks-list/marks-list.component';
import { CumulativeMarksComponent } from './cumulative-marks/cumulative-marks.component';
import { AddMarksComponent } from './add-marks/add-marks.component';
import { SubjectMarksComponent } from './subject-marks/subject-marks.component';

@NgModule({
  declarations: [MarksListComponent, CumulativeMarksComponent, AddMarksComponent, SubjectMarksComponent],
  imports: [
    CommonModule,
    EvaluationsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    SearchModuleModule,
    TeacherSearchModule,
    DirectivesModule
  ]
})
export class EvaluationsModule { }
