import { Component, OnInit, Input } from '@angular/core';

// Services
import { UserService } from '@app/core/services/user.service';
import { ExperienceDTO, FreelancePublicDTO, AuthDTO, AccountType, LanguageDTO, LanguageLevelEnum} from '@neadz/dtos';
import { MatDialog } from '@angular/material';
import { modalFactory } from 'src/app/shared/modal/modal.component';
import {
  ProfileEditLanguageData,
  ProfileEditLanguageModalComponent
} from '../../modal/profile-edit-language-modal/profile-edit-language-modal.component';
import { ProfileService } from '@app/core/services';

@Component({
  selector: 'app-profile-language',
  templateUrl: './profile-language.component.html',
  styleUrls: ['./profile-language.component.scss']
})
export class ProfileLanguageComponent implements OnInit {
  user: AuthDTO;
  accountType = AccountType;
  @Input() language: LanguageDTO;
  freelance: FreelancePublicDTO;
  languageLevelEnum = LanguageLevelEnum;

  constructor(private userService: UserService, private profileService: ProfileService, public dialog: MatDialog) {}

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.freelance = this.profileService.getCurrentFreelance();
  }

  /**
   * Callback Update an existing experience
   */
  updateLanguage() {
    const modal = modalFactory<ProfileEditLanguageModalComponent>(this.dialog);
    const experience = new ExperienceDTO();
    experience.techs = [];
    const data: ProfileEditLanguageData = {
      isNew: false,
      language: this.language
    };
    modal.open<ProfileEditLanguageData>(data, ProfileEditLanguageModalComponent, (res: ExperienceDTO) => {
      if (res !== undefined) {
        this.language = res;
      }
    });
  }
}
