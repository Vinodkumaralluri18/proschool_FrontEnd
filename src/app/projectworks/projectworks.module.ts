import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchModuleModule } from '../search-module/search-module.module';
import { TeacherSearchModule } from '../teacher-search/teacher-search.module';
import { MatDialogModule } from '@angular/material/dialog';
import { PipesModule } from '../_pipes/_pipes.module';

import { ProjectworksRoutingModule } from './projectworks-routing.module';
import { PwassignComponent } from './pwassign/pwassign.component';
import { PwbydateComponent } from './pwbydate/pwbydate.component';
import { PwaddmarksComponent } from './pwaddmarks/pwaddmarks.component';


@NgModule({
  declarations: [PwassignComponent, PwbydateComponent, PwaddmarksComponent],
  imports: [
    CommonModule,
    ProjectworksRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SearchModuleModule,
    TeacherSearchModule,
    PipesModule,
    MatDialogModule
  ]
})
export class ProjectworksModule { }
