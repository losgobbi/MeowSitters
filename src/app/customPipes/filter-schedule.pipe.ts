import { Pipe, PipeTransform } from '@angular/core';
import { Schedule } from '../models/Schedule';

@Pipe({
  name: 'filterSchedule'
})
export class FilterSchedulePipe implements PipeTransform {
  transform(array: Array<Schedule>, filterValue: number): Array<Schedule> {
    if (!array)
      return undefined;

    return array.filter(schedule => schedule.status == filterValue)
  }
}
