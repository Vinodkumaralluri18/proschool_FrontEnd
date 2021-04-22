import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PwassignComponent } from './pwassign/pwassign.component';
import { PwbydateComponent } from './pwbydate/pwbydate.component';
import { PwaddmarksComponent } from './pwaddmarks/pwaddmarks.component';

const routes: Routes = [
  {path:'',redirectTo:'PWByDate',pathMatch:'full'},
  {path:"PWByDate",component:PwbydateComponent},
  {path:"PWassign",component:PwassignComponent},
  {path:"PWMarks/:data_type/:sec_id/:sub_id/:pw_id",component:PwaddmarksComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectworksRoutingModule { }
