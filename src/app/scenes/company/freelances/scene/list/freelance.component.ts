import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MissionsTabs} from '@app/scenes/agent/missions/scene/missions.component';

// Services
import { FreelanceService, UserService, CompanyService } from '@app/core/services/';
import { FreelancePublicDTO, AccountType, MissionDTO, FreelanceStatusEnum } from '@neadz/dtos';

@Component({
  selector: 'app-freelance',
  templateUrl: './freelance.component.html',
  styleUrls: ['./freelance.component.scss']
})
export class FreelanceComponent implements OnInit, OnDestroy {
  accountType = AccountType;
  params = {};
  freelances: FreelancePublicDTO[] = [];
  missions: MissionDTO[] = [];
  previousText = '';
  total: number;
  isLoading = false;
  activeTab = MissionsTabs.inProgress;
  tabsType = MissionsTabs;
  public stats = [];
  paramsMission = {};

  @ViewChild('picker') picker;
  private componetDestroyed = new Subject();

  constructor(public dialog: MatDialog,
              private freelanceService: FreelanceService,
              private companyService: CompanyService,
              private userService: UserService) {
    this.params = {
      'order': 'lastnameASC',
      'status': FreelanceStatusEnum.Confirmed
    };
  }

  ngOnInit() {
    this.paramsMission = { status: this.activeTab };
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
    const company = this.userService.getCompany();
    this.companyService.getMissions(company.id, this.paramsMission)
    .pipe(takeUntil(this.componetDestroyed))
    .subscribe((res) => {
      this.missions = res.data;
      this.total = res.total;

      this.stats = [
        { title: 'Total', value: res.total },
      ];
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
        this.freelances = [...this.freelances, ...res];
      });
    }
  }

  /**
   * Called when user wants to change a tab
   * @param {MissionsTabs} tab
   */
  selectTab(tab: MissionsTabs) {
    if (tab !== this.activeTab) {
      this.activeTab = tab;
      this.paramsMission['status'] = this.activeTab;
      this.fetchInformation();
    }
  }

  /**
   * Perform search on freelance db by name, firstname, skills
   */
  searchFreelance($event) {
    const text = $event.target.value;
    if (text.length === 0) {
      delete this.paramsMission['keywords'];
      this.previousText = '';
      this.fetchInformation();
      return ;
    }
    // Limiter, call api after 2 characters
    if (Math.abs(text.length - this.previousText.length) >= 2) {
      this.paramsMission['keywords'] = text;
      this.previousText = text;
      this.fetchInformation();
    }
  }
}
