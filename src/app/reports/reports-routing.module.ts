import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignmentreportsComponent } from './assignmentreports/assignmentreports.component';
import { EvaluationReportsComponent } from './evaluation-reports/evaluation-reports.component';
import { SubjectReportsComponent } from './subject-reports/subject-reports.component';
import { StudentfeeReportsComponent } from './studentfee-reports/studentfee-reports.component';
import { ClassfeeReportsComponent } from './classfee-reports/classfee-reports.component';
import { FeeReportsbyDayComponent } from './fee-reportsby-day/fee-reportsby-day.component';
import { FeeReportsbyMonthComponent } from './fee-reportsby-month/fee-reportsby-month.component';

const routes: Routes = [
  {path:'',redirectTo:'assignmentreports',pathMatch:'full'},
  {path:"assignmentreports",component:AssignmentreportsComponent},
  {path:"evaluationreports",component:EvaluationReportsComponent},
  {path:"subjectreports",component:SubjectReportsComponent},
  {path:"studentfee",component:StudentfeeReportsComponent},
  {path:"classfee",component:ClassfeeReportsComponent},
  {path:"reportsbyday",component:FeeReportsbyDayComponent},
  {path:"reportsbymonth",component:FeeReportsbyMonthComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
