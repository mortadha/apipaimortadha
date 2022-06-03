import { Component, Input, OnDestroy, OnChanges, Output, OnInit } from '@angular/core';
import {
  AuthDTO,
  AccountType,
  FreelancePrivateDTO,
  MediaDTO,
  FreelanceAvailabilityTypeEnum,
  FreelanceStatusEnum,
  FreelanceRemoteEnum
} from '@neadz/dtos';
import { UserService, FreelanceService, MediaService, ProfileService } from '@app/core/services/';
import { MatDialog } from '@angular/material/dialog';
import { modalFactory } from 'src/app/shared/modal/modal.component';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Router } from '@angular/router';

// Components
import { MainProfileInfosModalComponent } from '../../modal/main-profile-infos-modal/main-profile-infos-modal.component';
import { MainProfileDataModalComponent } from '../../modal/main-profile-data-modal/main-profile-data-modal.component';
import { MainProfileProDataModalComponent } from '../../modal/main-profile-pro-data-modal/main-profile-pro-data-modal.component';
import { MainProfilePdfModalComponent, MainProfilePdfModalData } from '../../modal/main-profile-pdf-modal/main-profile-pdf-modal.component';
import { CropImageModalComponent } from '../../../../shared/modal/crop-image-modal/crop-image-modal.component';

import { NotificationService, NotificationType } from '@app/core/services/notification.service';
import { EventEmitter } from '@angular/core';
import { ProfileDescriptionModalComponent } from '../../modal/profile-description-modal/profile-description-modal.component';
import { ProfileTechModalComponent } from '../../modal/profile-tech-modal/profile-tech-modal.component';


enum TabsEnum {
  main = 0,
  experience = 1
}
@Component({
  selector: 'app-main-profile-infos',
  templateUrl: './main-profile-infos.component.html',
  styleUrls: ['./main-profile-infos.component.scss'],
})
export class MainProfileInfosComponent implements OnInit, OnDestroy, OnChanges {
  freelance: FreelancePrivateDTO;
  @Output() tabChanged: EventEmitter<TabsEnum> = new EventEmitter;
  user: AuthDTO;
  accountType = AccountType;
  statusEnum = FreelanceStatusEnum;
  activeTab = TabsEnum.main;
  tabsType = TabsEnum;
  remoteEnum = FreelanceRemoteEnum;
  private componentDestroyed = new Subject();
  availibilityType = FreelanceAvailabilityTypeEnum;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private profileService: ProfileService,
    private freelanceService: FreelanceService,
    private mediaService: MediaService,
    private router: Router,
    private notification: NotificationService
  ) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.freelance = this.profileService.getCurrentFreelance() as FreelancePrivateDTO;
    this.profileService.listen()
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((res: FreelancePrivateDTO) => {
        this.freelance = res;
      });
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  ngOnChanges() {
  }

  clickOnProfileCompletion() {
    if (this.user.type === this.accountType.Agent) {
      this.confirmFreelance();
    }
  }

  freelanceExperienceLevel(): string {
    let xpYearName = this.freelance.experienceLevel === 1 ? 'an' : 'ans';
    if (this.freelance.experienceLevel === 10) {
      xpYearName = `${xpYearName}+`;
    }
    return `${this.freelance.experienceLevel} ${xpYearName}`;
  }

  checkActivation() {
    if (this.freelance.availabilityType === -1) {
      this.notification.show({
        title: 'Activation',
        message: 'La disponibilité est mal renseignée',
        type: NotificationType.error
      });
      return false;
    } else if (!this.freelance.tjm) {
      this.notification.show({
        title: 'Activation',
        message: 'Le TJM n\'est pas renseigné',
        type: NotificationType.error
      });
      return false;
    } else if (!this.freelance.experienceLevel) {
      this.notification.show({
        title: 'Activation',
        message: 'L\'expérience est mal renseignée',
        type: NotificationType.error
      });
      return false;
    } else {
      return true;
    }
  }

  downloadPdf() {
    if (this.user.type === this.accountType.Agent) {
      const modal = modalFactory<MainProfilePdfModalComponent>(this.dialog);
      modal.open<MainProfilePdfModalData>({ tjm: this.freelance.tjm }, MainProfilePdfModalComponent, (result) => {
        if (result !== false) {
          this.freelanceService.downloadPdf(
            this.freelance.id,
            this.user.token,
            this.freelanceTrigram(),
            result
          );
        }
      });
    } else {
      this.freelanceService.downloadPdf(
        this.freelance.id,
        this.user.token,
        this.freelanceTrigram(),
      );
    }
  }

  freelanceTrigram(): string {
    return this.freelance.account.firstName.slice(0, 1) +
      '' +
      this.freelance.account.lastName.slice(0, 2).toUpperCase() +
      '_' +
      this.correctHead(this.freelance.headline);
  }

  correctHead(headline: string) {
    return ((headline !== null) ? (headline.replace(/[!-/:-@[-_{-~]/g, '')) : (''));
  }

  cropImageModal($event) {
    const modal = modalFactory<CropImageModalComponent>(this.dialog);
    modal.open({}, CropImageModalComponent, (result) => {
      if (result) {
        this.fileUploaded(result);
      }
    });
  }

  fileUploaded(file) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    this.mediaService.upload(formData).subscribe(
      data => {
        this.freelance.account.profilePicture = new MediaDTO();
        this.freelance.account.profilePicture.url = data['url'];
        this.freelance.account.profilePicture.id = data['id'];

        this.freelanceService
          .update(this.freelance)
          .pipe(takeUntil(this.componentDestroyed))
          .subscribe(
            (result: FreelancePrivateDTO) => {
              this.freelance = result;
              this.profileService.setCurrentFreelance(result);
            }, (error) => {
              this.notification.show({
                title: 'Mise à jour',
                message: error,
                type: NotificationType.error
              });
            }
          );
      },
      error => console.error(error)
    );
  }

  /**
   * Tell if user has a profile picture
   */
  hasProfilePicture(): boolean {
    return this.freelance &&
      this.freelance.account &&
      this.freelance.account.profilePicture &&
      this.freelance.account.profilePicture.url &&
      this.freelance.account.profilePicture.url.length > 0;
  }

  /**
   * Open modal to update freelance informations
   */
  updateInfos() {
    const modal = modalFactory<MainProfileInfosModalComponent>(this.dialog);
    modal.open({}, MainProfileInfosModalComponent, () => {
      this.freelance = <FreelancePrivateDTO>this.profileService.getCurrentFreelance();
    });
  }

  /**
   * Set freelance profile to confirmed
   */
  confirmFreelance() {
    this.freelance.status = this.statusEnum.Confirmed;
    this.freelanceService.update(this.freelance)
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((result: FreelancePrivateDTO) => {
        this.router.navigateByUrl('/agent/freelances');
      }, (error) => {
        this.notification.show({
          title: 'Activation du freelance',
          message: error,
          type: NotificationType.error
        });
      });
  }

  /**
* Called when user wants to change a tab
* @param {NeedTab} tab
*/
  selectTab(tab: TabsEnum) {
    if (tab !== this.activeTab) {
      this.activeTab = tab;
      this.tabChanged.emit(this.activeTab);
    }
  }

  /**
 * Open modal to update freelance informations
 */
  updateBio() {
    const modal = modalFactory<ProfileDescriptionModalComponent>(this.dialog);
    modal.open({}, ProfileDescriptionModalComponent, () => {
      this.freelance = <FreelancePrivateDTO>this.profileService.getCurrentFreelance();
    });
  }

  updateTechs() {
    const modal = modalFactory<ProfileTechModalComponent>(this.dialog);
    modal.open({}, ProfileTechModalComponent, () => {
      this.freelance = <FreelancePrivateDTO>this.profileService.getCurrentFreelance();
    });
  }

  showDetails() {
    const modal = modalFactory<MainProfileDataModalComponent>(this.dialog);
    modal.open({}, MainProfileDataModalComponent, () => {
      this.freelance = <FreelancePrivateDTO>this.profileService.getCurrentFreelance();
    });
  }
}
