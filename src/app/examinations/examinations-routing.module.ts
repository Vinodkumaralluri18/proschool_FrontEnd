import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulesComponent } from './schedules/schedules.component';
import { ExamPapersComponent } from './exam-papers/exam-papers.component';
import { AddPapersComponent } from './add-papers/add-papers.component';

const routes: Routes = [
  {path:'',redirectTo:'schedules',pathMatch:'full'},
  {path:"schedules",component:SchedulesComponent},
  {path:"listPapers",component:ExamPapersComponent},
  {path:"addPapers",component:AddPapersComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExaminationsRoutingModule { }
