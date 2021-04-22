import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignmentsByDateComponent } from './assignments-by-date/assignments-by-date.component';
import { AssignAssignmentsComponent } from './assign-assignments/assign-assignments.component';
import { AssignmentsAddMarksComponent } from './assignments-add-marks/assignments-add-marks.component';

const routes: Routes = [
  {path:'',redirectTo:'assignmentsByDate',pathMatch:'full'},
  {path:"assignmentsByDate",component:AssignmentsByDateComponent},
  {path:"assignAssignments",component:AssignAssignmentsComponent},
  {path:"assignmentsMarks/:data_type/:sec_id/:sub_id/:les_id/:ass_id",component:AssignmentsAddMarksComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignmentsRoutingModule { }
