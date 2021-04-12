import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentfeeComponent } from './studentfee/studentfee.component';
import { CollectfeeComponent } from './collectfee/collectfee.component';
import { FeetypeComponent } from './feetype/feetype.component';
import { ClassFeeComponent } from './class-fee/class-fee.component';
import { FeeStructureComponent } from './fee-structure/fee-structure.component';

const routes: Routes = [
  {path:'',redirectTo:'studentfee',pathMatch:'full'},
  {path:"studentfee",component:StudentfeeComponent},
  {path:"collectfee/:student_id",component:CollectfeeComponent},
  {path:"classfee",component:ClassFeeComponent},
  {path:"feetype",component:FeetypeComponent},
  {path:"feestructure",component:FeeStructureComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeeRoutingModule { }
