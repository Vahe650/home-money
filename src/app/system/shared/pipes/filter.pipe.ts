import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
  name: 'wfmFilter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any, value: string, field: string): any {
    if (items.length === 0 || !value) {
      return items;
    }

    return items.filter((item) => {
      return item[field].toString().toLowerCase().indexOf(value.toString().toLowerCase()) !== -1;
    });
  }

}
