import { Pipe, PipeTransform } from '@angular/core';
import * as _moment from 'moment';
const moment = _moment;

@Pipe({name: 'truncate'})
export class Truncate implements PipeTransform {
  transform(value: string, number: number) {
    if (!value) {
      return value;
    }
    if (value.length > number) {
      let result = value.substring(0, number);
      result += '...';
      return result;
    } else {
      return value;
    }
  }
}
