import { Component, OnInit } from '@angular/core';
import { BoardingClientService } from '../../service/boarding.client.service';
import { NeedDTO, DurationTypeEnum } from '@neadz/dtos';
import { Router } from '@angular/router';

import * as _moment from 'moment';
import { FormGroup, Validators, FormControl } from '@angular/forms';
const moment = _moment;

@Component({
  selector: 'app-need-info',
  templateUrl: './need-info.component.html',
  styleUrls: ['./need-info.component.scss']
})
export class NeedInfoClientComponent implements OnInit {
  link: string;
  need: NeedDTO;
  needAvailabilityType = 1;
  availibilityDateMonth: number;
  availibilityDateYear: number;
  durationType = DurationTypeEnum;
  submitted = false;
  form: FormGroup;

  constructor(
    private boardingService: BoardingClientService,
    private router: Router) {}

  ngOnInit() {
    let date: Date;
    this.link = this.boardingService.getLink();
    this.need = this.boardingService.getCurrentNeed();
    if (!this.need.availabilityType) {
      this.need.availabilityType = 1;
    } else {
      this.needAvailabilityType = this.need.availabilityType;
    }
    if (this.need.renewable === undefined) {
      this.need.renewable = true;
    }
    if (!this.need.durationType && this.need.durationType !== 0) {
      this.need.durationType = DurationTypeEnum.Month;
    }
    if (this.need.availabilityDate) {
      date = new Date(this.need.availabilityDate);
    } else {
      date = new Date();
    }
    this.availibilityDateMonth = date.getMonth() + 1;
    this.availibilityDateYear = date.getFullYear();

    this.form = new FormGroup({
      'durationLast': new FormControl(this.need.durationLast, [
        Validators.required,
        Validators.min(-1)
      ]),
      'durationType':  new FormControl(this.need.durationType, [
        Validators.required,
      ]),
    });
  }
  get durationLastForm () { return this.form.get('durationLast'); }
  get durationTypeForm () { return this.form.get('durationType'); }


  /**
   * When user change type of availibility
   */
  availabilityTypeChanged() {
    this.need.availabilityType = this.needAvailabilityType;
  }

  /**
   * When user change besoin duration
   */
  durationTypeChanged() {
    this.need.durationType = parseInt(`${this.need.durationType}`, 10);
  }

  /**
   * When user change availibility date
   */
  availibilityDateChanged() {
    this.need.availabilityDate = moment(this.availibilityDateMonth + '-' + this.availibilityDateYear, 'MM-YYYY').toDate();
  }

  checkInput() {
    if (this.durationLastForm.errors || this.durationTypeForm.errors) {
      return false;
    } else {
      return true;
    }
   }

   next() {
     this.submitted = true;
     if (this.checkInput()) {
       this.need.durationLast = this.form.value.durationLast;
       this.need.durationType = this.form.value.durationType;
       this.need.availabilityDate = new Date(this.availibilityDateYear, this.availibilityDateMonth - 1, 1 );
       this.router.navigate([this.link, { outlets: { etape: '3' } }]);
      }
    }

}
