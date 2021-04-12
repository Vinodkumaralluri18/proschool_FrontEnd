import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionsComponent } from './questions/questions.component';
import { AddquestionsComponent } from './addquestions/addquestions.component';

const routes: Routes = [
  {path:'',redirectTo:'questions',pathMatch:'full'},
  {path:"questions",component:QuestionsComponent},
  {path:"addquestions",component:AddquestionsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
