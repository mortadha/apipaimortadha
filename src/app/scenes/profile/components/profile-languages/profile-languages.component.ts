import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuthDTO, FreelancePublicDTO, ExperienceDTO, FreelancePrivateDTO } from '@neadz/dtos';
import { MatDialog } from '@angular/material/dialog';
import { modalFactory } from 'src/app/shared/modal/modal.component';
import { ProfileService } from '@app/core/services/profile.service';
import {
  ProfileEditLanguageData,
  ProfileEditLanguageModalComponent
} from '../../modal/profile-edit-language-modal/profile-edit-language-modal.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-profile-languages',
  templateUrl: './profile-languages.component.html',
  styleUrls: ['./profile-languages.component.scss']
})
export class ProfileLanguagesComponent implements OnInit, OnDestroy {
  @Input() user: AuthDTO;
  freelance: FreelancePublicDTO;
  @Input() displaySeparator = false;
  private componentDestroyed = new Subject();

  constructor(public dialog: MatDialog, private profileService: ProfileService) {}

  ngOnInit() {
    this.freelance = this.profileService.getCurrentFreelance();
    if (!this.freelance.languages) {
      this.freelance.languages = [];
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
   * Callback Add a new language
   */
  addNewLanguage() {
    const modal = modalFactory<ProfileEditLanguageModalComponent>(this.dialog);
    const language = new ExperienceDTO();
    const data: ProfileEditLanguageData = {
      isNew: true,
      language: language
    };
    modal.open<ProfileEditLanguageData>(data, ProfileEditLanguageModalComponent, (result: ExperienceDTO) => {
      if (result !== undefined) {
        this.freelance.languages.push(result);
        this.profileService.setCurrentFreelance(this.freelance);
      }
    });
  }
}
