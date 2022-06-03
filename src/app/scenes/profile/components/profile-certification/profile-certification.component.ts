import { Component, OnInit, Input } from '@angular/core';

// Services
import { UserService } from '@app/core/services/user.service';
import { ExperienceDTO, FreelancePublicDTO, AuthDTO, AccountType, CertificationDTO} from '@neadz/dtos';
import { MatDialog } from '@angular/material';
import { modalFactory } from 'src/app/shared/modal/modal.component';
import { ProfileService } from '@app/core/services';
import {
  ProfileEditCertificationData, ProfileEditCertificationModalComponent
} from '../../modal/profile-edit-certification-modal/profile-edit-certification-modal.component';

@Component({
  selector: 'app-profile-certification',
  templateUrl: './profile-certification.component.html',
  styleUrls: ['./profile-certification.component.scss']
})
export class ProfileCertificationComponent implements OnInit {
  user: AuthDTO;
  accountType = AccountType;
  @Input() certification: CertificationDTO;
  freelance: FreelancePublicDTO;

  constructor(private userService: UserService, private profileService: ProfileService, public dialog: MatDialog) {}

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.freelance = this.profileService.getCurrentFreelance();
  }

  /**
   * Callback Update an existing experience
   */
  updateCertification() {
    const modal = modalFactory<ProfileEditCertificationModalComponent>(this.dialog);
    const experience = new ExperienceDTO();
    experience.techs = [];
    const data: ProfileEditCertificationData = {
      isNew: false,
      certification: this.certification
    };
    modal.open<ProfileEditCertificationData>(data, ProfileEditCertificationModalComponent, (res: CertificationDTO) => {
      if (res !== undefined) {
        this.certification = res;
      }
    });
  }
}
