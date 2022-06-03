import { Component, OnInit, Input } from '@angular/core';
import { CompanyPublicDTO, NeedStatusEnum, CompanyNeedStatus } from '@neadz/dtos';

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss']
})
export class CompanyCardComponent implements OnInit {
  @Input() company: CompanyPublicDTO;
  activeFreelanceNumber = 0;
  freelancePictures = [];

  constructor() { }

  ngOnInit() {
    for (const need of this.company.needs) {
      if (need.status === NeedStatusEnum.WON && need.enabled === false) {
        for (const freelanceNeed of need.freelanceNeeds) {
          if (freelanceNeed.companyStatus === CompanyNeedStatus.VALIDATED) {
            this.activeFreelanceNumber++;
            if (this.freelancePictures.length < 3 &&
              freelanceNeed.freelance.account.profilePicture != null &&
              freelanceNeed.freelance.account.profilePicture.url ) {
              this.freelancePictures.push(freelanceNeed.freelance.account.profilePicture.url);
            }
          }
        }
      }
    }
  }

  freelanceText(): string {
    let result = '';
    if (this.activeFreelanceNumber === 0) {
      result = 'Aucun Freelance';
    } else if (this.activeFreelanceNumber === 1) {
      result = 'Freelance :';
    } else {
      result = 'Freelances :';
    }
    return result;
  }


  /**
   * Tell if Company has a profile picture
   */
  hasPicture(): boolean {
    return this.company.companyLogo &&
      this.company.companyLogo.url &&
      this.company.companyLogo.url.length > 0;
  }
}
