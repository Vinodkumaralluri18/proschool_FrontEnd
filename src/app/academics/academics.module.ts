import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchModuleModule } from '../search-module/search-module.module';
import { TeacherSearchModule } from '../teacher-search/teacher-search.module';
import { MatDialogModule } from '@angular/material/dialog';
import { PipesModule } from '../_pipes/_pipes.module';
import { NgWhiteboardModule } from 'ng-whiteboard';

import { AcademicsRoutingModule } from './academics-routing.module';
import { SubjectsComponent } from './subjects/subjects.component';
import { ChaptersComponent } from './chapters/chapters.component';
import { AssignsubjectsComponent } from './assignsubjects/assignsubjects.component';
import { AddchapterComponent } from './addchapter/addchapter.component';
import { TopicsComponent } from './topics/topics.component';
import { LessonplannerComponent } from './lessonplanner/lessonplanner.component';
import { LessontrackerComponent } from './lessontracker/lessontracker.component';
import { AddeditsubjectsComponent } from './addeditsubjects/addeditsubjects.component';
import { EdittopicComponent } from './edittopic/edittopic.component';
import { EditassignsubjectsComponent } from './editassignsubjects/editassignsubjects.component';
import { VirtualboardComponent } from './virtualboard/virtualboard.component';

@NgModule({
  declarations: [
    SubjectsComponent, 
    ChaptersComponent, 
    AssignsubjectsComponent, 
    AddchapterComponent, TopicsComponent, LessonplannerComponent, LessontrackerComponent, AddeditsubjectsComponent, EdittopicComponent, EditassignsubjectsComponent, VirtualboardComponent
  ],
  imports: [
    CommonModule,
    AcademicsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SearchModuleModule,
    TeacherSearchModule,
    PipesModule,
    MatDialogModule,
    NgWhiteboardModule,
    
  ],
  entryComponents: [AddeditsubjectsComponent, EdittopicComponent, AddchapterComponent]
})
export class AcademicsModule { }
