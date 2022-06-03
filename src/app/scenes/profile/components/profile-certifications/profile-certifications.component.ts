import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuthDTO, FreelancePublicDTO, ExperienceDTO, FreelancePrivateDTO, CertificationDTO } from '@neadz/dtos';
import { MatDialog } from '@angular/material/dialog';
import { modalFactory } from 'src/app/shared/modal/modal.component';
import { ProfileService } from '@app/core/services/profile.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
  ProfileEditCertificationModalComponent,
  ProfileEditCertificationData
} from '../../modal/profile-edit-certification-modal/profile-edit-certification-modal.component';

@Component({
  selector: 'app-profile-certifications',
  templateUrl: './profile-certifications.component.html',
  styleUrls: ['./profile-certifications.component.scss']
})
export class ProfileCertificationsComponent implements OnInit, OnDestroy {
  @Input() user: AuthDTO;
  freelance: FreelancePublicDTO;
  @Input() displaySeparator = false;
  private componentDestroyed = new Subject();

  constructor(public dialog: MatDialog, private profileService: ProfileService) {}

  ngOnInit() {
    this.freelance = this.profileService.getCurrentFreelance();
    if (!this.freelance.certifications) {
      this.freelance.certifications = [];
    }
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

  /**
   * Callback Add a new certification
   */
  addNewCertification() {
    const modal = modalFactory<ProfileEditCertificationModalComponent>(this.dialog);
    const certification = new CertificationDTO();
    const data: ProfileEditCertificationData = {
      isNew: true,
      certification: certification
    };
    modal.open<ProfileEditCertificationData>(data, ProfileEditCertificationModalComponent, (result: ExperienceDTO) => {
      if (result !== undefined) {
        this.freelance.certifications.push(result);
        this.profileService.setCurrentFreelance(this.freelance);
      }
    });
  }
}
