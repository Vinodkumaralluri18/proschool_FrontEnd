import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../_directives/_directives.module';

import { SearchModuleRoutingModule } from './search-module-routing.module';
import { ClassComponent } from './class/class.component';
import { SubjectComponent } from './subject/subject.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ChapterComponent } from './chapters/chapters.component';

@NgModule({
  declarations: [ClassComponent, SubjectComponent, ScheduleComponent, ChapterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SearchModuleRoutingModule,
    DirectivesModule
  ],
  exports: [
    ClassComponent,
    SubjectComponent,
    ScheduleComponent,
    ChapterComponent
  ]
})
export class SearchModuleModule { }
