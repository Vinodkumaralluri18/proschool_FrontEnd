import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchModuleModule } from '../search-module/search-module.module';
import { TeacherSearchModule } from '../teacher-search/teacher-search.module';
import { MatDialogModule } from '@angular/material/dialog';
import { PipesModule } from '../_pipes/_pipes.module';
import { DirectivesModule } from '../_directives/_directives.module';

import { FeeRoutingModule } from './fee-routing.module';
import { CollectfeeComponent } from './collectfee/collectfee.component';
import { FeetypeComponent } from './feetype/feetype.component';
import { EditfeeComponent } from './editfee/editfee.component';
import { AddfeeComponent } from './addfee/addfee.component';
import { ClassFeeComponent } from './class-fee/class-fee.component';
import { FeeStructureComponent } from './fee-structure/fee-structure.component';
import { StudentfeeComponent } from './studentfee/studentfee.component';
import { ListPaymentsComponent } from './list-payments/list-payments.component';

@NgModule({
  declarations: [CollectfeeComponent, FeetypeComponent, EditfeeComponent, AddfeeComponent, ClassFeeComponent, FeeStructureComponent, StudentfeeComponent, ListPaymentsComponent],
  imports: [
    CommonModule,
    FeeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SearchModuleModule,
    TeacherSearchModule,
    PipesModule,
    MatDialogModule,
    DirectivesModule
  ],
  entryComponents: [EditfeeComponent, AddfeeComponent, ListPaymentsComponent]
})
export class FeeModule { }
