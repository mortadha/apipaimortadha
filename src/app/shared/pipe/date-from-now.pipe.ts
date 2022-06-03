import { Pipe, PipeTransform } from '@angular/core';
import * as _moment from 'moment';
const moment = _moment;

@Pipe({name: 'dateFromNow'})
export class DateFromNow implements PipeTransform {
  transform(value) {
    return moment(value).fromNow();
  }
}
