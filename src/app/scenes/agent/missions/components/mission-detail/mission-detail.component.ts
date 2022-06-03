import { Component, OnInit } from '@angular/core';
import { MissionDTO } from '@neadz/dtos';
import { UserService } from '@app/core/services/user.service';
import { StrongBoxService } from '@app/core/services/strongbox.service';
import { MissionsService } from '@app/core/services';
import { Subject } from 'rxjs';
import { takeUntil, map, flatMap } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';

enum MissionTabs {
  cra = 1,
  documents = 2,
}

@Component({
  selector: 'app-mission-detail',
  templateUrl: './mission-detail.component.html',
  styleUrls: ['./mission-detail.component.scss'],
})
export class MissionDetailComponent implements OnInit {
  missionTabs = MissionTabs;
  activeTab = MissionTabs.cra;

  public currentMission: MissionDTO;
  private componentDestroyed = new Subject();

  constructor(public userService: UserService,
    public missionService: MissionsService,
    public strongBoxService: StrongBoxService,
    public activatedRoute: ActivatedRoute) {}

  switchTab(tab: MissionTabs) {
    if (this.activeTab !== tab) {
      this.activeTab = tab;
    }
  }

  ngOnInit() {
    this.activatedRoute.params
    .pipe(map((params: Params) => params['id']))
    .pipe(flatMap((missionId: string) => this.missionService.getMission(missionId)))
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((result: MissionDTO) => {
      if (result) {
        this.currentMission = result;
      }
    });
  }

  allDocument() {
    this.activeTab = 2;
  }
}
