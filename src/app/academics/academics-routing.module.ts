import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubjectsComponent } from './subjects/subjects.component';
import { ChaptersComponent } from './chapters/chapters.component';
import { AssignsubjectsComponent } from './assignsubjects/assignsubjects.component';
import { TopicsComponent } from './topics/topics.component';
import { LessonplannerComponent } from './lessonplanner/lessonplanner.component';
import { VirtualboardComponent } from './virtualboard/virtualboard.component';
// import { LessontrackerComponent } from './lessontracker/lessontracker.component';

const routes: Routes = [
  {path:'',redirectTo:'subjects',pathMatch:'full'},
  {path:"subjects",component:SubjectsComponent},
  {path:"chapters",component:ChaptersComponent},
  {path:"assignsubjects",component:AssignsubjectsComponent},
  {path:"topics",component:TopicsComponent},
  {path:"planner",component:LessonplannerComponent},
  {path:"virtualClass",component:VirtualboardComponent},
  // {path:"tracker",component:LessontrackerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademicsRoutingModule { }
