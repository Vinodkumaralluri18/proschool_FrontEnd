import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagesComponent } from './messages/messages.component';
import { EmployeeMessagesComponent } from './employee-messages/employee-messages.component';

const routes: Routes = [
  {path:'',redirectTo:'messages',pathMatch:'full'},
  {path:"messages",component: MessagesComponent},
  {path:"employeeMessages",component: EmployeeMessagesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunicationsRoutingModule { }
