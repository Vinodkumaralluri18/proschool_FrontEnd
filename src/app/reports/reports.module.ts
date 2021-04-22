import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchModuleModule } from '../search-module/search-module.module';
import { TeacherSearchModule } from '../teacher-search/teacher-search.module';
import { ChartsModule } from 'ng2-charts';
import { DirectivesModule } from '../_directives/_directives.module';
import { PipesModule } from '../_pipes/_pipes.module';

import { ReportsRoutingModule } from './reports-routing.module';
import { AssignmentreportsComponent } from './assignmentreports/assignmentreports.component';
import { EvaluationReportsComponent } from './evaluation-reports/evaluation-reports.component';
import { SubjectReportsComponent } from './subject-reports/subject-reports.component';
import { StudentfeeReportsComponent } from './studentfee-reports/studentfee-reports.component';
import { ClassfeeReportsComponent } from './classfee-reports/classfee-reports.component';
import { FeeReportsbyDayComponent } from './fee-reportsby-day/fee-reportsby-day.component';
import { FeeReportsbyMonthComponent } from './fee-reportsby-month/fee-reportsby-month.component';

@NgModule({
  declarations: [AssignmentreportsComponent, EvaluationReportsComponent, SubjectReportsComponent, StudentfeeReportsComponent, ClassfeeReportsComponent, FeeReportsbyDayComponent, FeeReportsbyMonthComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SearchModuleModule,
    TeacherSearchModule,
    PipesModule,
    DirectivesModule,
    ChartsModule
  ]
})
export class ReportsModule { }
