import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { StudentsModule } from '../students/students.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DirectivesModule } from '../_directives/_directives.module';

import { StudentprofileRoutingModule } from './studentprofile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AcademicsComponent } from './academics/academics.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { FeesComponent } from './fees/fees.component';

@NgModule({
  declarations: [ProfileComponent, AttendanceComponent, AcademicsComponent, AssessmentComponent, FeesComponent],
  imports: [
    CommonModule,
    StudentprofileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    StudentsModule,
    MatDialogModule,
    DirectivesModule
  ],
  entryComponents: [],
})
export class StudentprofileModule { }
