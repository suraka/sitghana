import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'million'
})
export class MillionPipe extends DecimalPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return super.transform(((value || 0) / 1000000), '1.2-2');
  }

}
