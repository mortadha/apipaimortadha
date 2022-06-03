import { Component, OnInit, Input } from '@angular/core';
import { AuthDTO, EducationDTO, FreelancePublicDTO, AccountType, EducationWithCompletion } from '@neadz/dtos';
import {
  ProfileEditSchoolModalComponent,
  ProfileEditSchoolData
} from '../../modal/profile-edit-school-modal/profile-edit-school-modal.component';
import { modalFactory } from 'src/app/shared/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ProfileService } from '@app/core/services';

@Component({
  selector: 'app-profile-school',
  templateUrl: './profile-school.component.html',
  styleUrls: ['./profile-school.component.scss']
})
export class ProfileSchoolComponent implements OnInit {
  @Input() user: AuthDTO;
  @Input() education: EducationDTO;
  freelance: FreelancePublicDTO;
  accountType = AccountType;

  constructor(public dialog: MatDialog, private profileService: ProfileService) {}

  ngOnInit() {
    this.freelance = this.profileService.getCurrentFreelance();
  }

  /**
   * Callback Update an existing school
   */
  updateSchool() {
    const modal = modalFactory<ProfileEditSchoolModalComponent>(this.dialog);
    const education = this.education;
    const data: ProfileEditSchoolData = {
      isNew: false,
      education: education
    };
    modal.open(data, ProfileEditSchoolModalComponent, (ed: EducationDTO | EducationWithCompletion) => {
      if (ed !== undefined && ed['id']) {
        this.education = ed as EducationDTO;
        } else if (ed !== undefined && ed['completion'] !== undefined) {
          this.profileService.getCurrentFreelance().completion = ed['completion'];
        }
    });
  }
}
