import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { EmployeesModule } from '../employees/employees.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DirectivesModule } from '../_directives/_directives.module';

import { EmployeeprofileRoutingModule } from './employeeprofile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AcademicsComponent } from './academics/academics.component';
import { AssessmentComponent } from './assessment/assessment.component';

@NgModule({
  declarations: [ProfileComponent, AttendanceComponent, AcademicsComponent, AssessmentComponent],
  imports: [
    CommonModule,
    EmployeeprofileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    EmployeesModule,
    MatDialogModule,
    DirectivesModule
  ]
})
export class EmployeeprofileModule { }
