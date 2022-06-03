import { Component, OnInit } from '@angular/core';
import {
  DurationTypeEnum,
  FreelancePrivateDTO,
  AccountDTO,
  AuthDTO,
  FreelanceSourceEnum,
  FreelanceStatusEnum
} from '@neadz/dtos';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, mergeMap } from 'rxjs/operators';
import { ValidateMailCustom, ValidatePasswordCustom } from '@app/shared/validator';
import { FormGroup, Validators, FormControl } from '@angular/forms';

// Services
import { BoardingFreelanceService } from '../../../freelance/service/boarding.freelance.service';
import { FreelanceService, NotificationService, NotificationType, UserService} from '@app/core/services/';

@Component({
  selector: 'app-freelance-contact',
  templateUrl: './freelance-contact.component.html',
  styleUrls: ['./freelance-contact.component.scss']
})
export class FreelanceContactComponent implements OnInit {
  private componentDestroyed = new Subject();
  link: string;
  freelance: FreelancePrivateDTO;
  needAvailabilityType = 1;
  durationType = DurationTypeEnum;
  submitted = false;
  form: FormGroup;

  constructor(
    private boardingService: BoardingFreelanceService,
    private router: Router,
    private freelanceService: FreelanceService,
    private notification: NotificationService,
    private userService: UserService) {}

    ngOnInit() {
      this.freelance = this.boardingService.getCurrentBoardingFreelance();
      this.link = this.boardingService.getLink();
      if (!this.freelance.account) {
        this.freelance.account = new AccountDTO;
      }

    this.form = new FormGroup({
      'email': new FormControl(this.freelance.account.email, [
        Validators.required,
        ValidateMailCustom,
        Validators.pattern(/^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,8}$/)
      ]),
      'firstName': new FormControl(this.freelance.account.firstName, [
        Validators.required,
      ]),
      'lastName': new FormControl(this.freelance.account.lastName, [
        Validators.required,
      ]),
      'phone': new FormControl(this.freelance.account.phone, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ]),
      'password': new FormControl(this.freelance.account.password, [
        ValidatePasswordCustom,
        Validators.required,
      ]),
      'passwordConfirm': new FormControl(this.freelance.account.password, [
        Validators.required,
      ])
    });

  }
  get emailForm () { return this.form.get('email'); }
  get firstNameForm () { return this.form.get('firstName'); }
  get lastNameForm () { return this.form.get('lastName'); }
  get phoneForm () { return this.form.get('phone'); }
  get passwordForm () { return this.form.get('password'); }
  get passwordConfirmForm () { return this.form.get('passwordConfirm'); }

   checkInput() {
    if (this.emailForm.errors ||
      this.firstNameForm.errors ||
      this.lastNameForm.errors ||
      this.phoneForm.errors ||
      this.passwordForm.errors ||
      this.passwordConfirmForm.errors ||
      this.passwordForm.value !== this.passwordConfirmForm.value
    ) {
      return false;
    } else {
      return true;
    }
   }

  previous() {
    this.router.navigate([this.link, {outlets: {etape: '2'}}]);
  }

  next() {
    this.submitted = true;
    if (this.checkInput()) {
      this.freelance.account.firstName = this.firstNameForm.value;
      this.freelance.account.lastName = this.lastNameForm.value;
      this.freelance.account.phone = this.phoneForm.value;
      this.freelance.account.password = this.passwordForm.value;
      this.freelance.account.cguValidated = true;
      this.freelance.status = FreelanceStatusEnum.Registered;
      this.freelance.source = FreelanceSourceEnum.Boarding;

      // Checking if the user already filled this page to know if we need to create or update the freelance
      if (!this.freelance.id) {
        this.freelance.account.email = this.emailForm.value;
        this.freelanceService.create(this.freelance, this.boardingService.getAgentToken())
        .pipe(mergeMap((res: FreelancePrivateDTO) => {
          this.freelance.id = res.id;
          return this.userService.login(this.freelance.account.email, this.freelance.account.password);
        }))
        .pipe(takeUntil(this.componentDestroyed))
        .subscribe((_: AuthDTO) => {
          this.router.navigate(['/boarding/freelance', { outlets: { etape: '4' } }]);
        }, (error) => {
            this.notification.show({
              title: 'Create Freelance',
              message: error,
              type: NotificationType.error
            });
        });
      } else {
        this.freelance.account.email = this.emailForm.value;
        this.freelanceService.update(this.freelance)
        .pipe(takeUntil(this.componentDestroyed))
        .subscribe((res: FreelancePrivateDTO) => {
          this.router.navigate(['/boarding/freelance', { outlets: { etape: '4' } }]);
        }, (error) => {
          this.notification.show({
            title: 'Freelance',
            message: error,
            type: NotificationType.error
          });
        });
      }
    }
  }
}
