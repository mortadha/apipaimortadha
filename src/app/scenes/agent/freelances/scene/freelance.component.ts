import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { modalFactory } from '@app/shared/modal/modal.component';
import { CreateFreelanceModalComponent } from '../modal/create-freelance-modal/create-freelance-modal.component';

// Services
import { FreelanceService, UserService } from '@app/core/services/';
import {
  FreelancePublicDTO,
  AuthDTO,
  AccountType,
  StatisticsDTO,
  FreelanceStatusEnum
} from '@neadz/dtos';

const now = new Date();

enum FreelanceTabs {
  valide = FreelanceStatusEnum.Confirmed,
  qualifie = FreelanceStatusEnum.Qualified,
  boarding = FreelanceStatusEnum.Registered,
  refuse = FreelanceStatusEnum.Refused
}

@Component({
  selector: 'app-freelance',
  templateUrl: './freelance.component.html',
  styleUrls: ['./freelance.component.scss']
})
export class FreelanceComponent implements OnInit, OnDestroy {
  model: NgbDateStruct;
  user: AuthDTO;
  accountType = AccountType;
  date: { year: number, month: number };
  activeTab = FreelanceTabs.valide;
  tabsType = FreelanceTabs;
  total: number;
  isLoading = false;
  params = {};
  freelances: FreelancePublicDTO[] = [];
  stats = [];
  previousText = '';
  search = '';

  @ViewChild('picker') picker;
  private componetDestroyed = new Subject();

  constructor(public dialog: MatDialog,
              private freelanceService: FreelanceService,
              private userService: UserService,
              private router: Router) {
    this.user = this.userService.getCurrentUser();
    this.params = {
      'order': 'lastnameASC',
      'status': this.activeTab
    };
  }

  ngOnInit() {
    this.fetchInformation();
  }

  ngOnDestroy() {
    this.componetDestroyed.next();
    this.componetDestroyed.unsubscribe();
  }

  /**
   * Fetch Freelance Information
   */
  fetchInformation() {
    this.freelanceService.getStats()
    .pipe(takeUntil(this.componetDestroyed))
    .subscribe((res: StatisticsDTO<number>) => {
      this.stats = [
        { title: 'Validés', value: res.confirmed},
        { title: 'Qualifiés', value: res.qualified},
        { title: 'Inscrits', value: res.registered}];
    });
    this.freelanceService.getAll(this.params)
    .pipe(takeUntil(this.componetDestroyed))
    .subscribe((res) => {
      this.total = res.total;
      this.freelances = res.data;
    });
  }

  /**
   * On Scroll
   */
  onScroll() {
    if (this.freelances.length !== this.total && this.isLoading === false) {
      this.isLoading = true;
      this.freelanceService.getAllNext(this.params)
      .pipe(takeUntil(this.componetDestroyed))
      .subscribe((res) => {
        this.isLoading = false;
         this.freelances = [...this.freelances,
          ...res];
      });
    }
  }

  // reOpenCalendar() {
  //   const self = this;
  //      setTimeout(
  //          () => {
  //              self.picker.open();
  //          },
  //          50
  //      );
  // }
  /**
   * Date Picker Changed events
   */
  // onDateRangeChanged(event: IMyDateRangeModel) {
  //   $('.currmonth.range').each(function(index) {
  //     if (index === 0) {
  //       $(this).addClass('active');
  //     }
  //   });

  //   this.startDateStr = event.formatted.split(' - ')[0];
  //   this.endDateStr = event.formatted.split(' - ')[1];
  // }

  // toggleDatePicker() {
  //   $('.selbtngroup').click();
  // }

  /**
   * Called when user selected a date
   * @param {FreelanceTab} tab
   */
  // selectToday() {
  //   this.model = {
  //     year: now.getFullYear(),
  //     month: now.getMonth() + 1,
  //     day: now.getDate()
  //   };
  // }

  /**
   * Called when user wants to change a tab
   * @param {FreelanceTab} tab
   */
  selectTab(tab: FreelanceTabs) {
    if (tab !== this.activeTab) {
      this.activeTab = tab;
      this.params['status'] = this.activeTab;
      this.fetchInformation();
    }
  }

  /**
   * Perform search on freelance db by name, firstname, skills
   */
  searchFreelance($event) {
    const text = $event.target.value;
    if (text.length === 0) {
      delete this.params['keywords'];
      this.previousText = '';
      this.fetchInformation();
      return ;
    }
    // Limiter, call api after 2 characters
    if (Math.abs(text.length - this.previousText.length) >= 1) {
      this.params['keywords'] = text;
      this.previousText = text;
      this.fetchInformation();
    }
  }

  /**
   * Callback create a new freelance
   */
  createNewFreelance() {
    const modal = modalFactory<CreateFreelanceModalComponent>(this.dialog);
    modal.open({}, CreateFreelanceModalComponent, (result: FreelancePublicDTO) => {
      if (result) {
        this.router.navigateByUrl(`/agent/freelances/profile/${result.id}`);
      }
    });
  }
}
