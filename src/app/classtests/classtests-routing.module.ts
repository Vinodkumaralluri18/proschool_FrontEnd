import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CTbyDateComponent } from './ctby-date/ctby-date.component';
import { CTAssignComponent } from './ctassign/ctassign.component';
import { CTaddmarksComponent } from './ctaddmarks/ctaddmarks.component';

const routes: Routes = [
  {path:'',redirectTo:'CTByDate',pathMatch:'full'},
  {path:"CTByDate",component:CTbyDateComponent},
  {path:"CTassign",component:CTAssignComponent},
  {path:"CTMarks/:data_type/:sec_id/:sub_id/:ct_id",component:CTaddmarksComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClasstestsRoutingModule { }
