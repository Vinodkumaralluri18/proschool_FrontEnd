import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AcademicsComponent } from './academics/academics.component';
import { AssessmentComponent } from './assessment/assessment.component';

const routes: Routes = [
  {path:'',redirectTo:'profile/:id',pathMatch:'full'},
  {path:"profile/:id",component:ProfileComponent},
  {path:"attendance/:id",component:AttendanceComponent},
  {path:"academics/:id",component:AcademicsComponent},
  {path:"assessment/:id",component:AssessmentComponent},
  // {path:"fees/:id/:sec_id",component:FeesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeprofileRoutingModule { }
