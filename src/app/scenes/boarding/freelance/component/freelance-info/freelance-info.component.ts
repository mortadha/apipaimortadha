// todo: Need some information from back that required a changing of the DTO
import { Component, OnInit } from '@angular/core';
import { BoardingFreelanceService } from '../../../freelance/service/boarding.freelance.service';
import {
  FreelancePrivateDTO,
  FreelanceAvailabilityTypeEnum,
  FreelanceMobilityEnum,
  FreelanceRemoteEnum } from '@neadz/dtos';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-need-freelance',
  templateUrl: './freelance-info.component.html',
  styleUrls: ['./freelance-info.component.scss']
})
export class FreelanceInfoComponent implements OnInit {
  public freelanceAvailabilityTypeEnum = FreelanceAvailabilityTypeEnum;
  public freelanceMobilityEnum = FreelanceMobilityEnum;
  public freelanceRemoteEnum = FreelanceRemoteEnum;
  link: string;
  freelance: FreelancePrivateDTO;
  submitted = false;
  availibilityDateMonth: number;
  availibilityDateYear: number;
  form: FormGroup;

  constructor(
    private boardingService: BoardingFreelanceService,
    private router: Router) {}

  ngOnInit() {
    this.link = this.boardingService.getLink();
    this.freelance = this.boardingService.getCurrentBoardingFreelance();
    if (this.freelance.mobility === undefined) {
      this.freelance.mobility = FreelanceMobilityEnum.All;
    }
    if (this.freelance.availabilityType === undefined) {
      this.freelance.availabilityType = this.freelanceAvailabilityTypeEnum.StartFrom;
    }
    if (this.freelance.workingRemotely === undefined) {
      this.freelance.workingRemotely = this.freelanceRemoteEnum.RemoteNone;
    }
    if (this.freelance.missionDuration === undefined) {
      this.freelance.missionDuration = 4;
    }
    let date: Date;
    if (this.freelance.availabilityDate) {
      date = new Date(this.freelance.availabilityDate);
    } else {
      date = new Date();
    }
    this.availibilityDateMonth = date.getMonth() + 1;
    this.availibilityDateYear = date.getFullYear();

    this.form = new FormGroup({
      'availabilityType': new FormControl(this.freelance.availabilityType, [
        Validators.required,
        Validators.min(-1)
      ]),
      'availabilityDateMonth': new FormControl(this.availibilityDateMonth, [
        Validators.required,
      ]),
      'availabilityDateYear': new FormControl(this.availibilityDateYear, [
        Validators.required,
      ]),
      'remote': new FormControl(this.freelance.workingRemotely),
    });
  }

  get availabilityTypeForm () { return this.form.get('availabilityType'); }
  get availabilityDateMonthForm () { return this.form.get('availabilityDateMonth'); }
  get availabilityDateYearForm () { return this.form.get('availabilityDateYear'); }
  get remoteForm () { return this.form.get('remote'); }

  checkInput() {
    if (this.availabilityTypeForm.value === FreelanceAvailabilityTypeEnum.Unknown ||
      !this.freelance.missionDuration ||
      this.remoteForm.errors) {
      return false;
    } else {
      return true;
    }
  }

  previous() {
    this.router.navigate([this.link, {outlets: {etape: '1'}}]);
  }

  next() {
    this.freelance.availabilityType = parseInt(this.form.value.availabilityType, 10);
    if (this.freelance.availabilityType === FreelanceAvailabilityTypeEnum.StartFrom) {
      this.freelance.availabilityDate = new Date(this.availabilityDateYearForm.value, this.availabilityDateMonthForm.value, 1);
    }
    this.submitted = true;
    if (this.checkInput()) {
      if (this.remoteForm.value) {
        this.freelance.workingRemotely = this.remoteForm.value;
      }
      this.router.navigate([this.link, { outlets: { etape: '3' } }]);
    }
  }
}
