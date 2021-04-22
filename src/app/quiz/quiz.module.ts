import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchModuleModule } from '../search-module/search-module.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuestionsComponent } from './questions/questions.component';
import { AddquestionsComponent } from './addquestions/addquestions.component';

@NgModule({
  declarations: [QuestionsComponent, AddquestionsComponent],
  imports: [
    CommonModule,
    QuizRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SearchModuleModule
  ]
})
export class QuizModule { }
