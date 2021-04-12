import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchModuleModule } from '../search-module/search-module.module';
import { TeacherSearchModule } from '../teacher-search/teacher-search.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DirectivesModule } from '../_directives/_directives.module';
import { PipesModule } from '../_pipes/_pipes.module';

import { TimetableRoutingModule } from './timetable-routing.module';
import { ClassWiseComponent } from './class-wise/class-wise.component';
import { EventsComponent } from './events/events.component';
import { NoticeboardComponent } from './noticeboard/noticeboard.component';
import { AddtimetableComponent } from './addtimetable/addtimetable.component';
import { AddNoticeComponent } from './add-notice/add-notice.component';
import { AddeventComponent } from './addevent/addevent.component';

@NgModule({
  declarations: [ClassWiseComponent, EventsComponent, NoticeboardComponent, AddtimetableComponent, AddNoticeComponent, AddeventComponent],
  imports: [
    CommonModule,
    TimetableRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SearchModuleModule,
    TeacherSearchModule,
    MatDialogModule,
    DirectivesModule,
    PipesModule
  ],
  entryComponents: [EventsComponent, AddtimetableComponent, AddNoticeComponent, AddeventComponent]
})
export class TimetableModule { }
