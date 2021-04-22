import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  private start_no: number;
  private end_no: number;

  transform(items: any[], pageNo: number): any {
    if (!items) return [];
    if (!pageNo) return items;

    this.end_no = (pageNo * 10);
    this.start_no = (this.end_no - 10);

    return items.slice(this.start_no, this.end_no)
  }

}
