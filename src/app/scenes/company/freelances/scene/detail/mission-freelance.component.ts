import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, map, flatMap } from 'rxjs/operators';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import {
  CraDTO,
  BillDTO,
  CraType,
  MissionDTO,
} from '@neadz/dtos';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService, FreelanceService, MissionsService, Missions } from '@app/core/services/';

enum missionTabs {
  cra = 1,
  documents = 2
}

@Component({
  selector: 'app-mission-freelance',
  templateUrl: './mission-freelance.component.html',
  styleUrls: ['./mission-freelance.component.scss'],
})
export class MissionFreelanceComponent implements OnInit, OnDestroy {
  currCra: CraDTO;
  bills: BillDTO[] = [];
  currMonth = new FormControl(moment());
  craType = CraType;
  freelanceTabs = missionTabs;
  activeTab = missionTabs.cra;
  private componentDestroyed = new Subject();
  public currentMission: MissionDTO;

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    public missionService: MissionsService,
    public userService: UserService,
    public freelanceService: FreelanceService,
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(map((params: Params) => params['id']))
      .pipe(flatMap((freelanceId: string) => this.missionService.getCurrentMission(freelanceId)))
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((result: Missions) => {
        if (result.total > 0) {
          this.currentMission = result.data[0];
        }
      });
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  /**
   * Switch Tabs
   * when user is selecting his working days
   */
  switchTab(tab: missionTabs) {
    if (this.activeTab !== tab) {
      this.activeTab = tab;
    }
  }

  /**
   * Bills
   * Not used for now
   */
  loadBills() {
    this.missionService
      .getBills()
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((res: BillDTO[]) => {
        this.bills = res;
      });
  }

  downloadPdf(idBill: string, title: string) {
    this.freelanceService.downloadBillPdf(
      `pdf/bill/${idBill}`,
      this.userService.getCurrentUser().token,
      title
    );
  }

  /**
  * Tell if Freelance has a profile picture
  */
  hasPicture(): boolean {
    return this.currentMission &&
      this.currentMission.freelance.account.profilePicture &&
      this.currentMission.freelance.account.profilePicture.url &&
      this.currentMission.freelance.account.profilePicture.url.length > 0;
  }

  allDocument() {
    this.activeTab = 2;
  }
}
