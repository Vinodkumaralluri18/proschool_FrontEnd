import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformationComponent } from './information/information.component';
import { AdmissionComponent } from './admission/admission.component';

const routes: Routes = [
  {path:'',redirectTo:'information',pathMatch:'full'},
  {path:"information",component:InformationComponent},
  {path:"admission",component:AdmissionComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
