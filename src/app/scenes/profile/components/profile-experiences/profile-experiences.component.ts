import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuthDTO, FreelancePublicDTO, ExperienceDTO, ExperienceWithCompletion, FreelancePrivateDTO } from '@neadz/dtos';
import { MatDialog } from '@angular/material/dialog';
import {
         ProfileEditExperienceModalComponent,
         ProfileEditExperienceData
       } from '../../modal/profile-edit-experience-modal/profile-edit-experience-modal.component';
import { modalFactory } from 'src/app/shared/modal/modal.component';
import { ProfileService } from '@app/core/services/profile.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile-experiences',
  templateUrl: './profile-experiences.component.html',
  styleUrls: ['./profile-experiences.component.scss']
})
export class ProfileExperiencesComponent implements OnInit, OnDestroy {
  @Input() user: AuthDTO;
  @Input() displaySeparator = false;
  freelance: FreelancePublicDTO;
  private componentDestroyed = new Subject();

  constructor(public dialog: MatDialog, private profileService: ProfileService) {}

  ngOnInit() {
    this.freelance = this.profileService.getCurrentFreelance();
    if (!this.freelance.experiences) {
      this.freelance.experiences = [];
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
   * Callback Add a new experience
   */
  addNewExperience() {
    const modal = modalFactory<ProfileEditExperienceModalComponent>(this.dialog);
    const experience = new ExperienceDTO();
    experience.techs = [];
    const data: ProfileEditExperienceData = {
      isNew: true,
      experience: experience
    };
    modal.open<ProfileEditExperienceData>(data, ProfileEditExperienceModalComponent, (result: ExperienceWithCompletion) => {
      if (result !== undefined) {
        this.profileService.getCurrentFreelance().completion = result.completion;
        this.profileService.getCurrentFreelance().experiences = result.experiences;
      }
    });
  }
}
