import { Component, OnInit } from '@angular/core';
import { NeedService, MissionsService, Missions } from '@app/core/services';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FreelanceNeedDTO, MissionDTO } from '@neadz/dtos/dist';

@Component({
  selector: 'app-current-freelances',
  templateUrl: './current-freelances.component.html',
  styleUrls: ['./current-freelances.component.scss']
})
export class CurrentFreelancesComponent implements OnInit {
  private componentDestroy = new Subject();
  params = {};
  missions: MissionDTO[];
  total: Number;


  constructor(
    private missionService: MissionsService,
  ) { }

  ngOnInit() {
    this.fetchNeeds();
  }

  fetchNeeds() {
    // todo : this will not work since I need a new route
    this.missionService.getAllMissions()
    .pipe(takeUntil(this.componentDestroy))
    .subscribe((result) => {
      this.missions = result.data;
      this.total = result.total;
    });
  }
}
