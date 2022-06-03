import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, MissionsService, NotificationType, NotificationService } from '@app/core/services';
import { FreelanceNeedDTO, FreelanceNeedStatus, CompanyNeedStatus } from '@neadz/dtos';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Router } from '@angular/router';
import {
  MissionDetailsModalComponent, MissionsFreelanceData
} from '@app/scenes/freelance/missions/modal/mission-details-modal/mission-details-modal.component';
import { modalFactory } from 'src/app/shared/modal/modal.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-opportunities',
  templateUrl: './opportunities.component.html',
  styleUrls: ['./opportunities.component.scss']
})
export class OpportunitiesComponent implements OnInit, OnDestroy {
  private componentDestroyed = new Subject();
  public needsProposal: FreelanceNeedDTO[] = [];

  constructor(
    private userService: UserService,
    private missionService: MissionsService,
    private notification: NotificationService,
    private router: Router,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    const freelance = this.userService.getFreelance();
    this.missionService.getNeeds(freelance.id)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((result: FreelanceNeedDTO[]) => {
      this.needsProposal = result;
    }, (error) => {
      this.notification.show({
        title: 'Récupération des données',
        message: error,
        type: NotificationType.error
      });
    });
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  /**
   * Freelance Need Class Color
   * @return {String}
   */
  freelanceNeedColor(freelanceNeed: FreelanceNeedDTO): String {
    let res = 'alert-green';
    switch (freelanceNeed.freelanceStatus) {
      case FreelanceNeedStatus.NEW:
        res = 'alert-grey';
        break;

      case FreelanceNeedStatus.INTERESTED:
        res = 'alert-green';
        break;

      case FreelanceNeedStatus.NOT_INTERESTED:
        res = 'alert-red';
        break;

      case FreelanceNeedStatus.MEETING_PLANNED:
        res = 'alert-green';
        break;

      case FreelanceNeedStatus.MEETING_REALISED:
        res = 'alert-orange';
        break;

      case FreelanceNeedStatus.ACCEPTED:
        res = 'alert-green';
        break;

      case FreelanceNeedStatus.REFUSED:
        res = 'alert-red';
        break;

      default:
        break;
    }
    return res;
  }

  /**
   * Company Need Class Color
   * @return {String}
   */
  companyNeedColor(freelanceNeed: FreelanceNeedDTO): String {
    let res = 'alert-green';
    switch (freelanceNeed.companyStatus) {
      case CompanyNeedStatus.NEW:
        res = 'alert-grey';
        break;

      case CompanyNeedStatus.INTERESTED:
        res = 'alert-green';
        break;

      case CompanyNeedStatus.NOT_INTERESTED:
        res = 'alert-red';
        break;

      case CompanyNeedStatus.MEETING_PLANNED:
        res = 'alert-green';
        break;

      case CompanyNeedStatus.MEETING_REALISED:
        res = 'alert-orange';
        break;

      case CompanyNeedStatus.ACCEPTED:
        res = 'alert-green';
        break;

      case CompanyNeedStatus.REFUSED:
        res = 'alert-red';
        break;
    }
    return res;
  }

  getPercentageNeed(need: FreelanceNeedDTO) {
    if (need.freelanceStatus === FreelanceNeedStatus.NEW) {
      return 0;
    } else if (need.companyStatus === CompanyNeedStatus.NEW) {
      return 20;
    } else if (need.companyStatus === CompanyNeedStatus.INTERESTED || need.companyStatus === CompanyNeedStatus.NOT_INTERESTED) {
      return 40;
    } else if (need.companyStatus === CompanyNeedStatus.MEETING_PLANNED || need.freelanceStatus === FreelanceNeedStatus.MEETING_PLANNED) {
      return 60;
    } else if (need.companyStatus === CompanyNeedStatus.MEETING_REALISED || need.freelanceStatus === FreelanceNeedStatus.MEETING_REALISED) {
      return 70;
    } else if (need.companyStatus === CompanyNeedStatus.ACCEPTED && need.freelanceStatus === FreelanceNeedStatus.ACCEPTED) {
      return 90;
    } else if (need.companyStatus === CompanyNeedStatus.ACCEPTED || need.freelanceStatus === FreelanceNeedStatus.ACCEPTED) {
      return 80;
    } else if (need.companyStatus === CompanyNeedStatus.VALIDATED || need.freelanceStatus === FreelanceNeedStatus.VALIDATED) {
      return 100;
    }
  }

  getStatusNeed(need: FreelanceNeedDTO) {
    if (need.freelanceStatus === FreelanceNeedStatus.NEW && need.companyStatus === CompanyNeedStatus.NEW) {
      return {
        class : 'alert-orange', // the class it will apply on the status, always 'alert-color'
        message : '<i class="fas fa-hourglass-start"></i> Nous attendons votre réponse' // the message of the status
      };
    } else if (need.freelanceStatus === FreelanceNeedStatus.INTERESTED && need.companyStatus === CompanyNeedStatus.NEW) {
      return {
        class : 'alert-orange',
        message : '<i class="fas fa-hourglass-half"></i> Nous attendons la réponse de l\'entreprise'
      };
    } else if (need.freelanceStatus === FreelanceNeedStatus.NEW && need.companyStatus === CompanyNeedStatus.INTERESTED) {
      return {
        class : 'alert-green',
        message : '<i class="fas fa-building"></i> L\'entreprise est intéressé par votre profil'
      };
    } else if (need.freelanceStatus === FreelanceNeedStatus.INTERESTED && need.companyStatus === CompanyNeedStatus.INTERESTED) {
      return {
        class : 'alert-orange',
        message : '<i class="fas fa-calendar"></i> Planification en cours'
      };
    } else if (need.freelanceStatus === FreelanceNeedStatus.NOT_INTERESTED || need.freelanceStatus === FreelanceNeedStatus.REFUSED) {
      return {
        class : 'alert-red',
        message : '<i class="fas fa-times-circle"></i> Projet refusé'
      };
    } else if (need.companyStatus === CompanyNeedStatus.NOT_INTERESTED || need.companyStatus === CompanyNeedStatus.REFUSED) {
      return {
        class : 'alert-red',
        message : '<i class="fas fa-times-circle"></i> Projet annulé par l\'entreprise'
      };
    } else if (need.freelanceStatus === FreelanceNeedStatus.MEETING_PLANNED) {
      return {
        class : 'alert-red',
        message : '<i class="fas fa-calendar"></i> Entretien planifié'
      };
    } else if (need.freelanceStatus === FreelanceNeedStatus.MEETING_REALISED) {
      return {
        class : 'alert-green',
        message : '<i class="fas fa-calendar"></i> Nous attendons votre réponse'
      };
    } else if (need.companyStatus === CompanyNeedStatus.MEETING_REALISED) {
      return {
        class : 'alert-green',
        message : '<i class="fas fa-hourglass-half"></i> Nous attendons la réponse de l\'entreprise'
      };
    } else if (need.freelanceStatus === FreelanceNeedStatus.ACCEPTED && need.companyStatus === CompanyNeedStatus.ACCEPTED) {
      return {
        class : 'alert-orange',
        message : '<i class="fas fa-hourglass-half"></i> Finalisation du process en cours'
      };
    }
  }

  redirectToAllOpportunities() {
    this.router.navigateByUrl(`/freelance/opportunites`);
  }

  showMissionDetails(freelanceNeed: FreelanceNeedDTO) {
    const freelanceAnswer = new FreelanceNeedDTO();
    freelanceAnswer.freelanceId = this.userService.getFreelance().id;
    freelanceAnswer.needId = freelanceNeed.need.id;
    freelanceAnswer.freelanceStatus = freelanceNeed.freelanceStatus;
    const data: MissionsFreelanceData = {
      companyId: freelanceNeed.need.companyId,
      freelanceNeed: freelanceAnswer,
      need: freelanceNeed.need
    };
    const modal = modalFactory<MissionDetailsModalComponent>(this.dialog);
    modal.open(data, MissionDetailsModalComponent, (result: FreelanceNeedDTO) => {
      if (result) {
        freelanceNeed.freelanceStatus = result.freelanceStatus;
      }
    });
  }

}
