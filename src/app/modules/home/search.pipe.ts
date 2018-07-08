import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from './../../core/models';

@Pipe({
  name: 'search'
})

export class SearchPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();

    return items.filter( ad => {
      let results = ad.title.toLowerCase().includes(searchText);
      if (!results) {
        results = ad.category.toLowerCase().includes(searchText);
      }
      return results;
    });
  }
}
