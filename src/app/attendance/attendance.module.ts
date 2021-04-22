import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchModuleModule } from '../search-module/search-module.module';
import { TeacherSearchModule } from '../teacher-search/teacher-search.module';
import { ChartsModule } from 'ng2-charts';
import { PipesModule } from '../_pipes/_pipes.module';
import { DirectivesModule } from '../_directives/_directives.module';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { StudentattendanceComponent } from './studentattendance/studentattendance.component';
import { EmployeeattendanceComponent } from './employeeattendance/employeeattendance.component';
import { ReportsComponent } from './reports/reports.component';
import { EmpReportsComponent } from './emp-reports/emp-reports.component';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';

@NgModule({
  declarations: [StudentattendanceComponent, EmployeeattendanceComponent, ReportsComponent, EmpReportsComponent],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    MatDatepickerModule, MatInputModule, MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    SearchModuleModule,
    TeacherSearchModule,
    PipesModule,
    ChartsModule,
    DirectivesModule
  ]
})
export class AttendanceModule { }
