import { Component, OnInit, Input, OnDestroy } from '@angular/core';

// Services
import { AuthDTO, FreelancePublicDTO, EducationDTO, EducationWithCompletion, FreelancePrivateDTO } from '@neadz/dtos';
import { modalFactory } from 'src/app/shared/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import {
  ProfileEditSchoolModalComponent,
  ProfileEditSchoolData
} from '../../modal/profile-edit-school-modal/profile-edit-school-modal.component';
import { ProfileService } from '@app/core/services/profile.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-profile-schools',
  templateUrl: './profile-schools.component.html',
  styleUrls: ['./profile-schools.component.scss']
})
export class ProfileSchoolsComponent implements OnInit, OnDestroy {
  @Input() user: AuthDTO;
  freelance: FreelancePublicDTO;
  private componentDestroyed = new Subject();

  constructor(public dialog: MatDialog, private profileService: ProfileService) {
  }

  ngOnInit() {
    this.freelance = this.profileService.getCurrentFreelance();
    if (!this.freelance.educations) {
      this.freelance.educations = [];
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
   * Callback Add New School
   */
  addNewSchool() {
    const modal = modalFactory<ProfileEditSchoolModalComponent>(this.dialog);
    const education = new EducationDTO();
    const data: ProfileEditSchoolData = {
      isNew: true,
      education: education
    };
    modal.open<ProfileEditSchoolData>(data, ProfileEditSchoolModalComponent, (result: EducationWithCompletion) => {
      if (result !== undefined) {
        this.profileService.getCurrentFreelance().completion = result.completion;
        this.profileService.getCurrentFreelance().educations = result.educations;
      }
    });
  }
}
