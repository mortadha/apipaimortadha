import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { MatDialog } from '@angular/material/dialog';

import { MatSelect } from '@angular/material/select';
import {
  FreelancePublicDTO,
  NeedDTO,
  AccountType,
  FreelanceNeedDTO,
  FreelanceNeedStatus,
  CompanyNeedStatus,
  AuthDTO,
} from '@neadz/dtos';

import { modalFactory } from '@app/shared/modal/modal.component';

// Services
import { CompanyService, UserService, MissionsService, FreelanceService } from '@app/core/services/';
import { NotificationService, NotificationType } from '@app/core/services/notification.service';
import { DoubleConfirmValidationModalComponent,
  DoubleConfirmValidationModalData } from '@app/shared/modal/double-confirm-validation-modal/double-confirm-validation-modal.component';

import {
  ConfirmNotInterestedCompanyModalComponent
} from '../../modal/confirm-not-interested-company-modal/confirm-not-interested-company-modal.component';

import {
  ConfirmNotInterestedFreelanceModalComponent
} from '../../modal/confirm-not-interested-freelance-modal/confirm-not-interested-freelance-modal.component';

import {
  ConfirmValidateNeedModalComponent,
  ConfirmValidateData
} from '../../modal/confirm-validate-need-modal/confirm-validate-need-modal.component';

@Component({
  selector: 'app-freelance-proposal-card',
  templateUrl: './freelance-proposal-card.component.html',
  styleUrls: ['./freelance-proposal-card.component.scss'],
})

export class FreelanceProposalCardComponent implements OnInit, OnDestroy {
  @ViewChild(MatSelect) statusSelector: MatSelect;
  @Input() freelanceNeed: FreelanceNeedDTO;
  @Input() need: NeedDTO;
  @Input() companyId: string;
  freelance: FreelancePublicDTO;
  isDropdownOpen = false;
  private componentDestroyed = new Subject();
  user: AuthDTO;
  freelanceStatus = FreelanceNeedStatus;
  companyStatus = CompanyNeedStatus;
  accountType = AccountType;

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private missionsService: MissionsService,
    private freelanceService: FreelanceService,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.freelance = this.freelanceNeed.freelance;
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  /**
   * Freelance Need Status sentence
   * @return {String}
   */
  freelanceNeedStatus(): String {
    let res = '';
    switch (this.freelanceNeed.freelanceStatus) {
      case FreelanceNeedStatus.NEW:
        res = 'Aucune réponse pour le moment';
        break;

      case FreelanceNeedStatus.INTERESTED:
        res = 'Le freelance est intéressé';
        break;

      case FreelanceNeedStatus.NOT_INTERESTED:
        res = 'Le freelance n\'est pas intéressé';
        break;

      case FreelanceNeedStatus.MEETING_PLANNED:
        res = 'Rendez-vous plannifié';
        break;

      case FreelanceNeedStatus.MEETING_REALISED:
        res = 'Rendez-vous réalisé';
        break;

      case FreelanceNeedStatus.ACCEPTED:
        res = 'Le freelance aimerait démarrer';
        break;

      case FreelanceNeedStatus.REFUSED:
        res = 'Le freelance ne veut plus continuer';
        break;

      case FreelanceNeedStatus.VALIDATED:
        res = 'Le freelance va démarrer';
    }
    return res;
  }

  /**
   * Redirect Link depending on profil
   */
  redirectLink(): String {
    const type = this.userService.getCurrentUser().type;
    if (type === AccountType.Agent) {
      return `/agent/freelances/profile/${this.freelance.id}`;
    } else if (type === AccountType.Company && this.isFreelancePreview() === false) {
      return `/entreprise/besoins/profile/${this.freelanceNeed.id}`;
    }
    return '';
  }

  /**
   * Open dropdown to set need status
   */
  openDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.statusSelector.open();
  }

  /**
   * Tell if freelance is just a preview
   */
  isFreelancePreview(): boolean {
    return (this.freelanceNeed.freelanceStatus === FreelanceNeedStatus.NEW && this.user.type === AccountType.Company);
  }

  /**
   * Company Need Status sentence
   * @return {String}
   */
  companyNeedStatus(): String {
    let res = '';
    switch (this.freelanceNeed.companyStatus) {
      case CompanyNeedStatus.NEW:
        res = 'Aucune réponse pour le moment';
        break;

      case CompanyNeedStatus.INTERESTED:
        res = 'L\'entreprise est intéressé';
        break;

      case CompanyNeedStatus.NOT_INTERESTED:
        res = 'L\'entreprise n\'est pas intéressé';
        break;

      case CompanyNeedStatus.MEETING_PLANNED:
        res = 'Rendez-vous plannifié';
        break;

      case CompanyNeedStatus.MEETING_REALISED:
        res = 'Rendez-vous réalisé';
        break;

      case CompanyNeedStatus.ACCEPTED:
        res = 'L\'entreprise aimerait démarrer';
        break;

      case CompanyNeedStatus.REFUSED:
        res = 'L\'entreprise ne veut plus continuer';
        break;

      case CompanyNeedStatus.VALIDATED:
        res = 'L\'entreprise va commencer avec le freelance';
        break;
    }
    return res;
  }

  /**
   * Freelance Need Class Color
   * @return {String}
   */
  freelanceNeedColor(): String {
    let res = 'alert-green';
    switch (this.freelanceNeed.freelanceStatus) {
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
  companyNeedColor(): String {
    let res = 'alert-green';
    switch (this.freelanceNeed.companyStatus) {
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

  /**
   * If we should show actions buttons
   * to company
   */
   shouldShowActionsButtons(): boolean {
    if (
      this.freelanceNeed.freelanceStatus !== FreelanceNeedStatus.NOT_INTERESTED &&
      this.freelanceNeed.companyStatus === CompanyNeedStatus.NEW) {
      return true;
    }
    if (
      this.freelanceNeed.freelanceStatus !== FreelanceNeedStatus.REFUSED &&
      this.freelanceNeed.companyStatus === CompanyNeedStatus.MEETING_REALISED) {
      return true;
    }
    return false;
   }

  /**
   * Tell if current user is a company
   * @return {boolean}
   */
  isCompany(): boolean {
    return this.userService.getCurrentUser().type === AccountType.Company;
  }

  /**
   * Tell if current user is an agent
   * @return {boolean}
   */
  isAgent(): boolean {
    return this.userService.getCurrentUser().type === AccountType.Agent;
  }

  interest() {
    const myPromise: Observable<string> = new Observable((observer) => {
      this.updateStatus('company', CompanyNeedStatus.INTERESTED);
      observer.next('test');
      observer.complete();
    });

    const data: DoubleConfirmValidationModalData<string> = {
      titreConfirmation: 'Confirmation',
      textConfirmation: 'Vous êtes intéressé par ce profil ?',
      titreSuccess: 'Neadz traite votre demande',
      textSuccess:
      'Nous vous remercions de l’intérêt porté à ce profil ! ' +
      'Nos équipes se rapprochent de vous dans les plus brefs délais afin d’organiser une réunion technique.',
      buttonConfirm: 'Je confirme',
      buttonCancel: 'Annuler',
      call: myPromise,
    };
    const modal = modalFactory<DoubleConfirmValidationModalComponent<string>>(this.dialog);
    modal.open<DoubleConfirmValidationModalData<string>>(data, DoubleConfirmValidationModalComponent, (result: Boolean) => {});
  }

  interestFreelance() {
    const myPromise: Observable<string> = new Observable((observer) => {
      this.updateStatus('freelance', FreelanceNeedStatus.INTERESTED);
      observer.next('test');
      observer.complete();
    });

    const data: DoubleConfirmValidationModalData<string> = {
      titreConfirmation: 'Confirmation',
      textConfirmation: 'Ce projet m\'intéresse',
      titreSuccess: 'Nous traitons votre demande',
      textSuccess: 'Nous ne manquerons pas de revenir vers vous dans les plus brefs délais ',
      buttonConfirm: 'Je confirme',
      buttonCancel: 'Annuler',
      call: myPromise,
    };
    const modal = modalFactory<DoubleConfirmValidationModalComponent<string>>(this.dialog);
    modal.open<DoubleConfirmValidationModalData<string>>(data, DoubleConfirmValidationModalComponent, (result: Boolean) => {});
  }

  notInterest() {
    const modal = modalFactory<ConfirmNotInterestedCompanyModalComponent>(this.dialog);
    modal.open({}, ConfirmNotInterestedCompanyModalComponent, (result) => {
      if (result) {
        this.freelanceNeed.companyReason = result;
        this.updateStatus('company', CompanyNeedStatus.NOT_INTERESTED);
      }
    });
  }

  notInterestFreelance() {
    const modal = modalFactory<ConfirmNotInterestedFreelanceModalComponent>(this.dialog);
    modal.open({}, ConfirmNotInterestedFreelanceModalComponent, (result) => {
      if (result) {
        this.freelanceNeed.freelanceReason = result;
        this.updateStatus('freelance', FreelanceNeedStatus.NOT_INTERESTED);
      }
    });
  }

  confirm() {
    const myPromise: Observable<string> = new Observable((observer) => {
      this.updateStatus('company', CompanyNeedStatus.ACCEPTED);
      observer.next('');
      observer.complete();
    });

    const data: DoubleConfirmValidationModalData<string> = {
      titreConfirmation: 'Confirmation',
      textConfirmation: 'Vous êtes intéressé par ce profil ?',
      titreSuccess: 'Neadz traite votre demande',
      textSuccess: 'Félicitations ! Il semble que vous ayez trouvé le profil qui vous convienne.' +
      ' Nos équipes se rapprochent de vous dans les plus brefs délais afin de finaliser le processus de sélection.',
      buttonConfirm: 'Je confirme',
      buttonCancel: 'Annuler',
      call: myPromise,
    };
    const modal = modalFactory<DoubleConfirmValidationModalComponent<string>>(this.dialog);
    modal.open<DoubleConfirmValidationModalData<string>>(data, DoubleConfirmValidationModalComponent, (result: Boolean) => {});
  }

  confirmFreelance() {
    const myPromise: Observable<string> = new Observable((observer) => {
      this.updateStatus('freelance', FreelanceNeedStatus.ACCEPTED);
      observer.next('');
      observer.complete();
    });

    const data: DoubleConfirmValidationModalData<string> = {
      titreConfirmation: 'Confirmation',
      textConfirmation: 'Vous êtes intéressé par ce projet ?',
      titreSuccess: 'Nous traitons votre demande',
      textSuccess: 'Nous ne manquerons pas de revenir vers vous dans les plus brefs délais',
      buttonConfirm: 'Je confirme',
      buttonCancel: 'Annuler',
      call: myPromise,
    };
    const modal = modalFactory<DoubleConfirmValidationModalComponent<string>>(this.dialog);
    modal.open<DoubleConfirmValidationModalData<string>>(data, DoubleConfirmValidationModalComponent, (result: Boolean) => {});
  }

  confirmNot() {
    const modal = modalFactory<ConfirmNotInterestedCompanyModalComponent>(this.dialog);
    modal.open({}, ConfirmNotInterestedCompanyModalComponent, (result) => {
      if (result) {
        this.freelanceNeed.companyReason = result;
        this.updateStatus('company', CompanyNeedStatus.REFUSED);
      }
    });
  }

  confirmNotFreelance() {
    const modal = modalFactory<ConfirmNotInterestedFreelanceModalComponent>(this.dialog);
    modal.open({}, ConfirmNotInterestedFreelanceModalComponent, (result) => {
      if (result) {
        this.freelanceNeed.freelanceReason = result;
        this.updateStatus('freelance', FreelanceNeedStatus.REFUSED);
      }
    });
  }

  downloadPdf() {
    this.freelanceService.downloadPdf(
      this.freelanceNeed.id,
      this.user.token,
      this.freelance.account.trigram +
        this.freelance.headline,
      undefined,
      true
    );
  }

  updateStatus(type, status) {
    this.freelanceNeed.needId = this.need.id;
    this.freelanceNeed.freelanceId = this.freelance.id;
    if (type === 'company' || type === 'both') {
      this.freelanceNeed.companyStatus = status;
      this.missionsService.updateStatusNeedCompany(this.companyId, this.freelanceNeed)
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe(
        (result: FreelanceNeedDTO) => {
          this.freelanceNeed = result;
        },
        err => {
          this.notification.show({
            title: 'Mise à jour',
            message: err,
            type: NotificationType.error
          });
        },
      );
    } else if (type === 'freelance') {
      this.freelanceNeed.freelanceStatus = status;
      this.missionsService.updateStatusNeedFreelance(this.companyId, this.freelanceNeed)
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe(
        (result: FreelanceNeedDTO) => {
          this.freelanceNeed = result;
        },
        err => {
          this.notification.show({
            title: 'Mise à jour',
            message: err,
            type: NotificationType.error
          });
        },
      );
    }
  }

  needValidated() {
    this.freelanceNeed.needId = this.need.id;
    this.freelanceNeed.freelanceId = this.freelance.id;
    const modal = modalFactory<ConfirmValidateNeedModalComponent>(this.dialog);
    const data = {
      finalCJM: this.freelance.tjm,
      finalTJM: this.freelanceNeed.tjmProposal,
      startingDate: this.need.availabilityDate.toString()
    };
    modal.open<ConfirmValidateData>(data, ConfirmValidateNeedModalComponent, (result: ConfirmValidateData) => {
      if (result) {
        this.freelanceNeed.companyStatus = CompanyNeedStatus.VALIDATED;
        this.missionsService.confirmStatusNeedFreelance(
          this.companyId,
          this.freelanceNeed,
          result.finalTJM,
          result.finalCJM,
          result.startingDate)
        .pipe(takeUntil(this.componentDestroyed))
        .subscribe(
          (res: FreelanceNeedDTO) => {
            this.freelanceNeed = res;
          },
          err => {
            this.notification.show({
              title: 'Réception des informations',
              message: err,
              type: NotificationType.error
            });
          },
          );
        }
    });
  }
}
