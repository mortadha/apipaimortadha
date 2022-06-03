import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Services
import { UserService } from '@app/core/services/user.service';
import { ExperienceDTO, FreelancePublicDTO, AuthDTO, AccountType, ExperienceWithCompletion } from '@neadz/dtos';
import { ProfileEditExperienceData,
  ProfileEditExperienceModalComponent } from '../../modal/profile-edit-experience-modal/profile-edit-experience-modal.component';
import { MatDialog } from '@angular/material';
import { modalFactory } from 'src/app/shared/modal/modal.component';
import { ProfileService } from '@app/core/services';

@Component({
  selector: 'app-profile-experience',
  templateUrl: './profile-experience.component.html',
  styleUrls: ['./profile-experience.component.scss']
})
export class ProfileExperienceComponent implements OnInit {
  @Input() experience: ExperienceDTO;
  freelance: FreelancePublicDTO;
  accountType = AccountType;
  user: AuthDTO;

  constructor(private userService: UserService, public dialog: MatDialog, public profileService: ProfileService) {}

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.freelance = this.profileService.getCurrentFreelance();
  }

  /**
   * Callback Update an existing experience
   */
  updateExperience() {
    const modal = modalFactory<ProfileEditExperienceModalComponent>(this.dialog);
    const experience = new ExperienceDTO();
    experience.techs = [];
    const data: ProfileEditExperienceData = {
      isNew: false,
      experience: this.experience
    };
    modal.open<ProfileEditExperienceData>(data, ProfileEditExperienceModalComponent, (exp: ExperienceDTO | ExperienceWithCompletion) => {
      if (exp !== undefined && exp['id']) {
      this.experience = exp as ExperienceDTO;
      } else if (exp !== undefined && exp['completion'] !== undefined) {
        this.profileService.getCurrentFreelance().completion = exp['completion'];
      }
    });
  }
}
