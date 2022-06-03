import { Component, OnInit, OnDestroy } from '@angular/core';
import { FreelanceService, MissionsService, UserService, Missions } from '@app/core/services';
import { FreelancePrivateDTO, MissionDTO } from '@neadz/dtos';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-documents-listing',
  templateUrl: './documents-listing.component.html',
  styleUrls: ['./documents-listing.component.scss']
})
export class DocumentsListingComponent implements OnInit, OnDestroy {
  freelance: FreelancePrivateDTO;
  componentDestroy = new Subject;
  missions: MissionDTO[];

  constructor(
    private freelanceService: FreelanceService,
    private missionService: MissionsService,
    private userService: UserService,
  ) {
    const freelanceId = this.userService.getFreelance().id;
    this.missionService.getFreelanceMission(freelanceId)
    .pipe(takeUntil(this.componentDestroy))
    .subscribe(((result: Missions) => {
      this.missions = result.data;
    }));
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.componentDestroy.next();
    this.componentDestroy.unsubscribe();
  }

    hasPictureCompany(mission: MissionDTO) {
    return mission.need.companyLogo &&
      mission.need.companyLogo.url &&
      mission.need.companyLogo.url.length > 0;
  }
}
