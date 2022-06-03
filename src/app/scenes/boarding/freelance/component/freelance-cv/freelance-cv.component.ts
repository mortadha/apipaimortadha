import { Component, OnInit } from '@angular/core';
import { FreelancePrivateDTO } from '@neadz/dtos';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, Validators, FormControl } from '@angular/forms';

// Services
import { BoardingFreelanceService } from '../../../freelance/service/boarding.freelance.service';
import { FreelanceService, NotificationService, NotificationType} from '@app/core/services/';
import { _MatButtonToggleGroupMixinBase } from '@angular/material';
@Component({
  selector: 'app-freelance-cv',
  templateUrl: './freelance-cv.component.html',
  styleUrls: ['./freelance-cv.component.scss']
})
export class FreelanceCvComponent implements OnInit {
  link: string;
  freelance: FreelancePrivateDTO;
  submitted = false;
  form: FormGroup;
  private componentDestroyed = new Subject();


  constructor(
    private boardingService: BoardingFreelanceService,
    private router: Router,
    private freelanceService: FreelanceService,
    private notification: NotificationService) {}

  ngOnInit() {
    let linkedin = '';
    this.link = this.boardingService.getLink();
    this.freelance = this.boardingService.getCurrentBoardingFreelance();
    if (this.freelance) {
      if (!this.freelance.linkedin) {
        linkedin = '';
      } else {
        linkedin = this.freelance.linkedin;
      }
    }
    this.form = new FormGroup({
      'linkedin': new FormControl(linkedin, [
        Validators.maxLength(100)
      ]
    )});
  }

  get linkedinForm () {return this.form.get('linkedin'); }

  previous() {
    this.router.navigate([this.link, {outlets: {etape: '3'}}]);
  }


  checkInput() {
    if (this.linkedinForm.errors) {
      return false;
    } else {
      return true;
    }
  }
  next() {
    this.submitted = true;
    if (this.checkInput) {
      // delete the password because it will stock the password in clear in the db
      delete this.freelance.account.password;
      this.freelance.linkedin = this.linkedinForm.value;
      this.freelanceService.update(this.freelance)
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((res: FreelancePrivateDTO) => {
        this.router.navigate(['/boarding/freelance', { outlets: { etape: '5' } }]);
      }, (error) => {
        this.notification.show({
          title: 'Freelance',
          message: error,
          type: NotificationType.error
        });
      });
    }
  }

  skip() {
    this.router.navigate(['/boarding/freelance', { outlets: { etape: '5' } }]);
  }
}
