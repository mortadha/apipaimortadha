import { Component, OnInit, Input } from '@angular/core';
import { NeedDTO, DurationTypeEnum, CompanyNeedStatus, FreelanceNeedStatus, NeedAvailabilityTypeEnum } from '@neadz/dtos';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'app-company-need-card',
  templateUrl: './company-need-card.component.html',
  styleUrls: ['./company-need-card.component.scss']
})
export class CompanyNeedCardComponent implements OnInit {
  @Input() need: NeedDTO;
  @Input() companyId: String;
  durationTimeText: String;
  createdDate = null;
  notificationText: String;
  notificationColor: String;
  notificationIcon: String;
  private newFreelances = 0;
  private waitingFreelances = 0;
  private rdvFreelances = 0;
  private meetingRealised = 0;
  private meetingPlanned = 0;
  private finaliseFreelances = 0;
  private validateFreelance = 0;
  availibilityType = NeedAvailabilityTypeEnum;

  constructor() {
    moment.locale('fr');
  }

  ngOnInit() {
    this.presentDurationTime();
    for (const freelance of this.need.freelanceNeeds) {
      if (freelance.companyStatus === CompanyNeedStatus.INTERESTED && freelance.freelanceStatus === FreelanceNeedStatus.INTERESTED) {
        this.rdvFreelances++;
      } else if (freelance.companyStatus === CompanyNeedStatus.NEW && freelance.freelanceStatus !== FreelanceNeedStatus.NEW) {
        this.newFreelances++;
      } else if (freelance.freelanceStatus === FreelanceNeedStatus.NEW) {
        this.waitingFreelances++;
      } else if (freelance.companyStatus === CompanyNeedStatus.MEETING_PLANNED) {
        this.meetingPlanned++;
      } else if (freelance.companyStatus === CompanyNeedStatus.MEETING_REALISED) {
        this.meetingRealised++;
      } else if (freelance.companyStatus === CompanyNeedStatus.ACCEPTED && freelance.freelanceStatus === FreelanceNeedStatus.ACCEPTED) {
        this.validateFreelance++;
      } else if (freelance.companyStatus === CompanyNeedStatus.ACCEPTED && freelance.freelanceStatus !== FreelanceNeedStatus.REFUSED) {
        this.finaliseFreelances++;
      }
    }
    this.initNotification();
    if (this.need.jobTitle.length > 45) {
      this.need.jobTitle = this.need.jobTitle.substring(0, 45);
      this.need.jobTitle += '...';
    }
  }

  /**
   * Retrieve right notification to show
   */
  initNotification() {
    if (this.validateFreelance > 0) {
      this.notificationText = 'Proposition commerciale à venir';
      this.notificationColor = 'alert-orange';
      this.notificationIcon = 'fa-file-signature';
    } else if (this.finaliseFreelances > 0) {
      this.notificationText = 'En attente de retour du freelance';
      this.notificationColor = 'alert-orange';
      this.notificationIcon = 'fa-user';
    } else if (this.meetingRealised > 0) {
      this.notificationText = 'Nous attendons votre retour';
      this.notificationColor = 'alert-red';
      this.notificationIcon = 'fa-hourglass-end';
    } else if (this.meetingRealised > 0) {
      this.notificationText = 'Nous attendons votre retour';
      this.notificationColor = 'alert-red';
      this.notificationIcon = 'fa-hourglass-end';
    } else if (this.meetingPlanned > 0) {
      this.notificationText = 'Entretien plannifié';
      this.notificationColor = 'alert-green';
      this.notificationIcon = 'fa-calendar';
    } else if (this.rdvFreelances > 0) {
      this.notificationText = 'Plannification en cours';
      this.notificationColor = 'alert-orange';
      this.notificationIcon = 'fa-calendar';
    } else if (this.newFreelances > 0) {
      this.notificationText = `Vous avez ${this.newFreelances} proposition${this.newFreelances > 1 ? 's' : ''}`;
      this.notificationColor = 'alert-green';
      this.notificationIcon = 'fa-bolt';
    } else if (this.waitingFreelances > 0) {
      this.notificationText = `Profil${this.waitingFreelances > 1 ? 's' : ''} en cours de validation`;
      this.notificationColor = 'alert-grey';
      this.notificationIcon = 'fa-user-check';
    } else {
      this.notificationText = 'Neadz traite votre demande';
      this.notificationColor = 'alert-grey';
      this.notificationIcon = 'fa-search';
    }
  }

  /**
   * Present Duration Time Text
   * Format text
   */
  presentDurationTime() {
    let time = '';
    switch (this.need.durationType) {
      case DurationTypeEnum.Week:
      time = 'semaines';
      break;

      case DurationTypeEnum.Month:
      time = 'mois';
      break;

      case DurationTypeEnum.Year:
      time = 'années';
      break;
    }
    this.durationTimeText = `${this.need.durationLast} ${time}`;
  }
}
