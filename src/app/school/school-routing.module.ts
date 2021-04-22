import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { AddClassComponent } from './add-class/add-class.component';
import { AddSectionComponent } from './add-section/add-section.component';
import { TimingsComponent } from './timings/timings.component';
import { PatternsComponent } from './patterns/patterns.component';
import { ParentinfoComponent } from './parentinfo/parentinfo.component';
import { EmployeeinfoComponent } from './employeeinfo/employeeinfo.component';
import { TasksComponent } from './tasks/tasks.component';
import { PendingTasksComponent } from './pending-tasks/pending-tasks.component';
import { AddtasksComponent } from './addtasks/addtasks.component';
import { VendorsComponent } from './vendors/vendors.component';
import { MaterialComponent } from './material/material.component';
import { MaterialInComponent } from './material-in/material-in.component';
import { MaterialOutComponent } from './material-out/material-out.component';
import { PaymentsComponent } from './payments/payments.component';
import { AddpaymentsComponent } from './addpayments/addpayments.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { ClaimsComponent } from './claims/claims.component';
import { CommunicationsComponent } from './communications/communications.component';
import { AssessmentPatternComponent } from './assessment-pattern/assessment-pattern.component';
import { ExaminationPatternComponent } from './examination-pattern/examination-pattern.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [
  {path:'',redirectTo:'profile',pathMatch:'full'},
  {path:"profile",component:ProfileComponent},
  {path:"addClass",component:AddClassComponent},
  {path:"addSection",component:AddSectionComponent},
  {path:"timings",component:TimingsComponent},
  {path:"patterns",component:PatternsComponent},
  {path:"messages",component:CommunicationsComponent},
  {path:"parentinfo",component:ParentinfoComponent},
  {path:"employeeinfo",component:EmployeeinfoComponent},
  {path:"completedTasks",component:TasksComponent},
  {path:"pendingTasks",component:PendingTasksComponent},
  {path:"vendors",component:VendorsComponent},
  {path:"materials",component:MaterialComponent},
  {path:"materialIn",component:MaterialInComponent},
  {path:"materialOut",component:MaterialOutComponent},
  {path:"payments",component:PaymentsComponent},
  {path:"addpayments",component:AddpaymentsComponent},
  {path:"expenses",component:ExpensesComponent},
  {path:"claims",component:ClaimsComponent},
  {path:"examinationPattern",component:ExaminationPatternComponent},
  {path:"assessmentPattern",component:AssessmentPatternComponent},
  {path:"notifications",component:NotificationsComponent},
  {path:"tasksdetails",component:TasksComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule { }
