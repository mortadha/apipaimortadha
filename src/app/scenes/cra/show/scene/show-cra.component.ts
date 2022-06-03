import { Component, OnInit, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import * as publicHoliday from 'moment-ferie-fr';
import {
  CraDayDTO,
  MissionDTO,
  CraDTO,
  CraType,
  CraDayType,
} from '@neadz/dtos';
import { ShowCraInteractor } from './show-cra.interactor';
import { FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { NotificationService, NotificationType, UserService } from '@app/core/services';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { modalFactory } from '@app/shared/modal/modal.component';
import { ConfirmMonthModalComponent, ConfirmMonthModalData } from '../modal/confirm-month-modal/confirm-month-modal.component';
import { Router } from '@angular/router';
import { RefuseCraModalComponent } from '../components/refuse-cra-modal/refuse-cra-modal.component';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MMMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

interface CraMonth {
  title: Date;
  value: number;
}

@Component({
  selector: 'app-show-cra',
  templateUrl: './show-cra.component.html',
  styleUrls: ['./show-cra.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class ShowCraComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() mission: MissionDTO;

  public days = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'];
  public calendarRows = [0, 1, 2, 3, 4, 5, 6];
  public currMonthNums: CraDayDTO[] = [];

  public firstDay: Date;
  public lastDay: Date;

  public popoverTop = 0;
  public popoverLeft = 0;

  public showConfirmPopover = false;
  public showPopover = false;

  public craType = CraType;
  public craDayType = CraDayType;
  public currMonth = new FormControl(moment());
  public currCra: CraDTO;
  public craMonths: CraMonth[];

  private componentDestroyed = new Subject();

  select: boolean;
  currDate = new Date();
  refuseDescription: string;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public userService: UserService,
    public interactor: ShowCraInteractor,
    private notification: NotificationService,
  ) {
  }

  ngOnInit() {
    this.interactor.loadInformation(this.mission);
    this.currCra = this.interactor.currentCra;
    this.currMonthNums = this.interactor.currentCra.craDays;
    this.reorderCraDays();
    this.currMonth.setValue(moment(this.interactor.currentCra.date));
    this.craMonths = this.interactor.currentMission.cras.map((cra: CraDTO, index: number) => {
      return {
        title: cra.date,
        value: index,
      };
    });
    this.select = this.allDaySelect();
  }

  reorderCraDays() {
    const monthNums = this.currMonthNums;

    const daysLastMonth = monthNums.filter((value) => {
      return value.day > 20 && value.status === CraDayType.disabled;
    });

    daysLastMonth.sort((a, b) => a.day - b.day);

    const daysCurrentMonth = monthNums.filter((value) => {
      return value.status !== CraDayType.disabled;
    });

    daysCurrentMonth.sort((a, b) => a.day - b.day);

    const daysNextMonth = monthNums.filter((value) => {
      return value.day < 10 && value.status === CraDayType.disabled;
    });

    daysNextMonth.sort((a, b) => a.day - b.day);

    this.currMonthNums = [...daysLastMonth, ...daysCurrentMonth, ...daysNextMonth];
  }

  ngAfterViewInit() {
    if (this.currCra.refuseDescription && this.currCra.status === this.craType.refusedByCompany &&
      this.userService.isFreelance() === true) {
      setTimeout(() => {
        this.refuseReasonModal();
      }, 0);
    }
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  /**
   * Should activate dragging
   *
   * If dragging is enabled or not
   * @return true|false
   */
  shouldActivateDragging(): boolean {
    return this.currCra &&
      this.userService.isFreelance() === true &&
      this.currCra.status === CraType.notConfirmed || this.currCra.status === this.craType.refusedByCompany;
  }

  onClick(event: Event, currDay: CraDayDTO) {
    event.preventDefault();
    event.stopPropagation();
    if (this.userService.isFreelance() === true && currDay.status !== this.craDayType.refusedByCompany &&
      (this.currCra.status === this.craType.notConfirmed || this.currCra.status === this.craType.refusedByCompany)) {
      if (currDay.status === this.craDayType.enabled) {
        currDay.status = this.craDayType.confirmedByFreelance;
      } else if (currDay.status === this.craDayType.confirmedByFreelance && currDay.halfDay !== true) {
        currDay.halfDay = true;
      } else if (currDay.halfDay === true) {
        currDay.halfDay = false;
      }
      this.validateDays(true);
    }  else if (this.currCra.status === this.craType.refusedByCompany && this.userService.isFreelance() === true) {
      this.currMonthNums.forEach(day => {
        if (day.status === this.craDayType.refusedByCompany) {
          day.status = this.craDayType.confirmedByFreelance;
        }
      });
    }
  }

  /**
   * Validate working days as a freelance
   * @param {boolean} didValidate If user did validate the selected working days
   */
  validateDays(didValidate: boolean) {
    let statusType = CraDayType.enabled;
    // this.currCra.status = this.craType.notConfirmed;
    if (didValidate === true) {
      statusType = CraDayType.confirmedByFreelance;
    }
    this.currMonthNums.forEach(model => {
      if (model.status === CraDayType.notConfirmed) {
        model.status = statusType;
      }
    });
    if (didValidate === true) {
      const updatedCra = this.currMonthNums.filter((days) => days.status !== CraDayType.disabled);
      this.interactor
        .updateCra(updatedCra)
        .pipe(takeUntil(this.componentDestroyed))
        .subscribe((result: CraDTO) => {
          this.currCra = result;
          this.currMonthNums = result.craDays;
        }, (error) => {
          this.notification.show({
            title: 'Validation',
            message: error,
            type: NotificationType.error
          });
        });
    }
    this.select = this.allDaySelect();
  }

  /**
   * Validate working month as a freelance
   */
  validateMonth() {
    const modal = modalFactory<ConfirmMonthModalComponent>(this.dialog);
    const data: ConfirmMonthModalData = {
      date: this.currMonth.value
    };
    modal.open<ConfirmMonthModalData>(data, ConfirmMonthModalComponent, (didValidate: boolean) => {
      if (didValidate === true) {
        this.currMonthNums.forEach(model => {
          if (model.status === CraDayType.confirmedByFreelance || model.status === CraDayType.refusedByCompany) {
            model.status = CraDayType.locked;
          }
        });
        const updatedCra = this.currMonthNums.filter((days) => days.status !== CraDayType.disabled);
        this.interactor
          .validateCra(updatedCra)
          .pipe(takeUntil(this.componentDestroyed))
          .subscribe((result: CraDTO) => {
            this.currCra = result;
            this.currMonthNums = result.craDays;
          }, (error) => {
            this.notification.show({
              title: 'Refus du CRA',
              message: error,
              type: NotificationType.error
            });
          });
      }
    });
  }

  /**
   * Accept Cra freelance
   */
  acceptCra() {
    this.currMonthNums.forEach(model => {
      if (model.status === CraDayType.locked) {
        model.status = CraDayType.confirmedByCompany;
      }
    });
    const updatedCra = this.currMonthNums.filter((days) => days.status !== CraDayType.disabled);
    this.interactor
      .acceptCraFreelance(updatedCra)
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((result: CraDTO) => {
        this.currCra = result;
        this.currMonthNums = result.craDays;
        this.signCra();
      }, (error) => {
        this.notification.show({
          title: 'Acceptation du CRA',
          message: error,
          type: NotificationType.error
        });
      });
  }

  /**
   * Refuse Cra freelance
   */
  refuseCra() {
    this.interactor
      .refuseCraFreelance(this.currCra.id, this.refuseDescription)
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((result: CraDTO) => {
        this.currMonthNums = result.craDays;
        this.currCra = result;
      }, (error) => {
        this.notification.show({
          title: 'Refus du CRA',
          message: error,
          type: NotificationType.error
        });
      });
  }

  /**
   * Sign Cra of Freelance
   */
  signCra() {
    if (this.userService.isFreelance() === true) {
      this.router.navigateByUrl(`freelance/missions/signature/${this.currCra.id}`);
    } else if (this.userService.isClient() === true) {
      this.router.navigateByUrl(`entreprise/freelances/profile/signature/${this.currCra.id}`);
    }
  }

  onMonthChange(indexMonth) {
    this.interactor.switchMonthCra(indexMonth);
    this.currCra = this.interactor.currentCra;
    this.currMonthNums = this.interactor.currentCra.craDays;
    this.currMonth.setValue(moment(this.interactor.currentCra.date));
    this.select = this.allDaySelect();
    if (this.currCra.status === this.craType.refusedByCompany && this.userService.isFreelance() === true) {
      this.refuseReasonModal();
    }
  }

  switchAllDays(event) {
    let days;

    if (event.target.checked === true) {
      for (let i = 0; i < this.currMonthNums.length; i++) {
        days = publicHoliday(`
        ${this.currMonthNums[i].day}-
        ${this.currMonth.value._d.getMonth() + 1}-
        ${this.currMonth.value._d.getFullYear()}`,
          'DD-MM-YYYY');
        if ((this.currMonthNums[i].status === this.craDayType.enabled || this.currMonthNums[i].status === this.craDayType.refusedByCompany)
        && days.isFerie() === false && days.isWeekEnd() === false) {
          this.currMonthNums[i].status = this.craDayType.confirmedByFreelance;
        }
      }
    } else {
      this.currMonthNums.forEach(model => {
        if (model.status === CraDayType.confirmedByFreelance || model.status === this.craDayType.refusedByCompany) {
          model.status = CraDayType.enabled;
          model.halfDay = false;
        }
      });
    }
    this.validateDays(true);
  }

  suppOneDay(event: Event, selectedDay: CraDayDTO) {
    event.preventDefault();
    event.stopPropagation();
    selectedDay.status = this.craDayType.enabled;
    if (selectedDay.halfDay === true) {
      selectedDay.halfDay = false;
    }
    this.validateDays(true);
  }

  allDaySelect(): boolean {
    let days;

    for (let i = 0; i < this.currMonthNums.length; i++) {
      days = publicHoliday(`
      ${this.currMonthNums[i].day}-
      ${this.currMonth.value._d.getMonth() + 1}-
      ${this.currMonth.value._d.getFullYear()}`,
        'DD-MM-YYYY');
      if (this.currMonthNums[i].status === this.craDayType.enabled && days.isFerie() === false && days.isWeekEnd() === false) {
        return false;
      }
    }
    return true;
  }

  refuseModal() {
    const modal = modalFactory<RefuseCraModalComponent>(this.dialog);
    const data = {
      refuseDescription: '',
      month: (this.currCra.date + '').slice(5, 7),
      year: (this.currCra.date + '').slice(0, 4),
      disabled: false,
    };
    modal.open(data, RefuseCraModalComponent, (refuseDescription) => {
      if (refuseDescription !== null) {
        this.refuseDescription = refuseDescription;
        this.currCra.status = this.craType.refusedByCompany;
        this.refuseCra();
      }
    });
  }

  refuseReasonModal() {
    const data = {
      refuseDescription: this.currCra.refuseDescription,
      month: (this.currCra.date + '').slice(5, 7),
      year: (this.currCra.date + '').slice(0, 4),
      disabled: true,
    };
    const modal = modalFactory<RefuseCraModalComponent>(this.dialog);
    modal.open(data, RefuseCraModalComponent, () => {
    });
  }

  /**
   * Color of Status Flag Cra
   */
  statusColor() {
    let color = '';
    switch (this.currCra.status) {
      case CraType.notConfirmed:
        color = 'alert-info';
        break;

      case CraType.refusedByCompany:
        color = 'alert-danger';
        break;

      case CraType.confirmedByFreelance:
        color = 'alert-warning';
        break;

      case CraType.confirmedByCompany:
        color = 'alert-primary';
        break;

      case CraType.signedByCompany:
        color = 'alert-valid';
        break;

      case CraType.signedByFreelance:
        color = 'alert-success';
        break;
    }
    return color;
  }
}
