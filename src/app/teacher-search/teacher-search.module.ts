import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../_directives/_directives.module';

import { TeacherSearchRoutingModule } from './teacher-search-routing.module';
import { TeacherClassComponent } from './teacher-class/teacher-class.component';
import { TeacherSubjectComponent } from './teacher-subject/teacher-subject.component';
import { TeacherChaptersComponent } from './teacher-chapters/teacher-chapters.component';
import { TeacherScheduleComponent } from './teacher-schedule/teacher-schedule.component';


@NgModule({
  declarations: [TeacherClassComponent, TeacherSubjectComponent, TeacherChaptersComponent, TeacherScheduleComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TeacherSearchRoutingModule,
    DirectivesModule
  ],
  exports: [
    TeacherClassComponent,
    TeacherSubjectComponent,
    TeacherScheduleComponent,
    TeacherChaptersComponent
  ]
})
export class TeacherSearchModule { }
