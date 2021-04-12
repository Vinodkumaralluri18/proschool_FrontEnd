import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchModuleModule } from '../search-module/search-module.module';
import { TeacherSearchModule } from '../teacher-search/teacher-search.module';
import { MatDialogModule } from '@angular/material/dialog';
import { PipesModule } from '../_pipes/_pipes.module';

import { ClasstestsRoutingModule } from './classtests-routing.module';
import { CTbyDateComponent } from './ctby-date/ctby-date.component';
import { CTAssignComponent } from './ctassign/ctassign.component';
import { CTaddmarksComponent } from './ctaddmarks/ctaddmarks.component';

@NgModule({
  declarations: [CTAssignComponent, CTbyDateComponent, CTaddmarksComponent],
  imports: [
    CommonModule,
    ClasstestsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SearchModuleModule,
    TeacherSearchModule,
    PipesModule,
    MatDialogModule
  ]
})
export class ClasstestsModule { }
