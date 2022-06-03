import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompanyService, MissionsService, UserService } from '@app/core/services';
import { CompanyPrivateDTO, MissionDTO, CompanyPublicDTO } from '@neadz/dtos';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-company-documents-listing',
  templateUrl: './company-documents-listing.component.html',
  styleUrls: ['./company-documents-listing.component.scss']
})
export class CompanyDocumentsListingComponent implements OnInit, OnDestroy {
  company: CompanyPublicDTO;
  missions: MissionDTO[];
  componentDestroy = new Subject;
  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private missionsService: MissionsService
  ) {

  }

  ngOnInit() {
    this.company = this.userService.getCompany();
    this.missionsService.getMissionCompany(this.company.id)
      .pipe(takeUntil(this.componentDestroy))
      .subscribe((missions: { data: MissionDTO[], total: number }) => {
        this.missions = missions.data;
      });
  }

  ngOnDestroy() {
    this.componentDestroy.next();
    this.componentDestroy.unsubscribe();
  }

  hasPictureFreelance(mission: MissionDTO) {
    return mission.freelance.account.profilePicture &&
      mission.freelance.account.profilePicture.url &&
      mission.freelance.account.profilePicture.url.length > 0;
  }
}
