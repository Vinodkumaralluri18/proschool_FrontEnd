import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './search.pipe';
import { PaginationPipe } from './pagination.pipe';
import { NoticePipe } from './notice.pipe';

@NgModule({
  declarations: [SearchPipe, PaginationPipe, NoticePipe],
  imports: [
    CommonModule
  ],
  exports: [
    SearchPipe,
    PaginationPipe,
    NoticePipe
  ]
})
export class PipesModule { }
