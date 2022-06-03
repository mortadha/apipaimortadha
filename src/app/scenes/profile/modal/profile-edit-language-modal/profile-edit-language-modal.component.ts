import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

// Services
import { ProfileService } from '@app/core/services/profile.service';
import { LanguageService } from '../../services/language.service';
import { NotificationService, NotificationType } from '@app/core/services/notification.service';


import { ProfileEditExperienceModalComponent } from '../profile-edit-experience-modal/profile-edit-experience-modal.component';
import { FreelancePublicDTO, LanguageDTO, LanguageLevelEnum } from '@neadz/dtos';
import { titleValidator } from '@app/shared/validator';
export interface ProfileEditLanguageData {
  isNew: boolean;
  language: LanguageDTO;
}
@Component({
  selector: 'app-profile-edit-language-modal',
  templateUrl: './profile-edit-language-modal.component.html',
  styleUrls: ['./profile-edit-language-modal.component.scss'],
})

export class ProfileEditLanguageModalComponent implements OnInit, OnDestroy {
  modalTitle = 'Modifier une langue';
  language: LanguageDTO;
  freelance: FreelancePublicDTO;
  languageLevelEnum = LanguageLevelEnum;
  private originalLanguage: LanguageDTO;
  private componentDestroyed = new Subject();

  constructor(public dialogRef: MatDialogRef<ProfileEditExperienceModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ProfileEditLanguageData,
              private profileService: ProfileService,
              private notification: NotificationService,
              private languageService: LanguageService) {
    if (this.data.isNew === true) {
      this.modalTitle = 'Ajouter une langue';
    } else {
      this.originalLanguage = new LanguageDTO();
      Object.assign(this.originalLanguage, this.data.language);
    }
    this.language = this.data.language;
    this.freelance = this.profileService.getCurrentFreelance();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  checkInput() {
    if (titleValidator(this.language.name)) {
      this.notification.show({
        title: 'Nom',
        message: 'Le nom de la langue n\'est pas valide',
        type: NotificationType.error
      });
      return false;
    } else if (this.language.level === undefined) {
      this.notification.show({
        title: 'Niveau',
        message: 'Le niveau de la langue n\'est pas valide',
        type: NotificationType.error
      });
      return false;
    } else {
      return true;
    }
  }

  /**
   * Callback when user submit the form to create
   * or update a school
   *
   */
  submit() {
    if (this.checkInput()) {
      if (this.data.isNew === true) {
        this.createLanguage();
      } else {
        this.updateLanguage();
      }
    }
  }

  /**
   * Create a new language
   */
  createLanguage() {
    this.languageService.create(this.freelance.id, this.language)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((result: LanguageDTO) => {
      this.notification.show({
        title: 'Langues',
        message: 'Vos langues ont bien été mises à jour',
        type: NotificationType.success
      });
      this.dialogRef.close(result);
    }, () => {
      this.notification.show({
        title: 'Langues',
        message: 'Un problème est survenu lors de la création de la langue',
        type: NotificationType.error
      });
    });
  }

  /**
   * Update an existing language
   */
  updateLanguage() {
    this.languageService.update(this.language)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((result: LanguageDTO) => {
      this.notification.show({
        title: 'Langue',
        message: 'Vos langues ont bien été mises à jour',
        type: NotificationType.success
      });
      this.dialogRef.close(result);
    });
  }

  /**
   * Callback when user close modal
   */
  close() {
    if (this.data.isNew === false) {
      this.freelance.languages = this.freelance.languages.map((ed) => {
        return (ed.id === this.originalLanguage.id) ? this.originalLanguage : ed;
      });
    }
    this.dialogRef.close();
  }

  /**
   * Delete Language
   */
  deleteLanguage() {
   this.languageService.delete(this.language.id)
   .pipe(takeUntil(this.componentDestroyed)).subscribe(() => {
      this.freelance.languages = this.freelance.languages.filter((ed) => ed.id !== this.language.id);
      this.dialogRef.close();
    }, (error) => {
      this.notification.show({
        title: 'Suppresion de langue',
        message: error,
        type: NotificationType.error
      });
    });
  }
}
