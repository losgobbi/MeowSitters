import { Pipe, PipeTransform } from '@angular/core';
import { Cat } from '../models/Cat';

@Pipe({
  name: 'catsSplitComma'
})
export class CatsSplitCommaPipe implements PipeTransform {
  transform(array: Array<Cat>): string {
    var format : Array<string> = [];
    array.forEach(element => format.push(element.name));
    return format.join(',');
  }
}
