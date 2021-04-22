import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentattendanceComponent } from './studentattendance/studentattendance.component';
import { EmployeeattendanceComponent } from './employeeattendance/employeeattendance.component';
import { ReportsComponent } from './reports/reports.component';
import { EmpReportsComponent } from './emp-reports/emp-reports.component';

const routes: Routes = [
  {path:'',redirectTo:'studentattendance',pathMatch:'full'},
  {path:"studentattendance",component:StudentattendanceComponent},
  {path:"employeeattendance",component:EmployeeattendanceComponent},
  {path:"reports",component:ReportsComponent},
  {path:"empreports",component:EmpReportsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
