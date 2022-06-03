import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

// Services
import { NotificationService, NotificationType } from '@app/core/services/notification.service';

import { ProfileEditExperienceModalComponent } from '../profile-edit-experience-modal/profile-edit-experience-modal.component';
import { FreelancePublicDTO, CommentDTO, AccountDTO } from '@neadz/dtos';

import { CommentService } from '../../services/comment.service';
import { UserService } from '@app/core/services';

export interface ProfileEditSuiviData {
  isNew: boolean;
  suivi: CommentDTO;
  freelance: FreelancePublicDTO;
}
@Component({
  selector: 'app-profile-edit-suivi-modal',
  templateUrl: './profile-edit-suivi-modal.component.html',
  styleUrls: ['./profile-edit-suivi-modal.component.scss'],
})

export class ProfileEditSuiviModalComponent implements OnInit, OnDestroy {
  modalTitle = 'Suivis';
  suivi: CommentDTO;
  freelance: FreelancePublicDTO;
  private originalComment: CommentDTO;
  private componentDestroyed = new Subject();

  constructor(public dialogRef: MatDialogRef<ProfileEditExperienceModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ProfileEditSuiviData,
              private notification: NotificationService,
              private commentService: CommentService,
              private userService: UserService ) {
    if (this.data.isNew === true) {
      this.modalTitle = 'Nouveau suivi';
    } else {
      this.modalTitle = 'Editer un suivi';
      this.originalComment = new CommentDTO;
      Object.assign(this.originalComment, this.data.suivi);
    }
    this.freelance = this.data.freelance;

    this.suivi = this.data.suivi;
  }

  ngOnInit() {
  }

  setAgent() {
    const agent = this.userService.getCurrentUser();
    this.suivi.agent = new AccountDTO;
    this.suivi.agent.id = agent.accountId;
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  checkInput() {
    return true;
  }

  /**
   * Callback when user submit the form to create
   * or update a suivi
   *
   */
  submit() {
    if (this.checkInput()) {
      if (this.data.isNew === true) {
        this.createSuivi();
      } else {
        this.updateSuivi();
      }
    }
  }

  /**
   * Create a new suivi
   */
  createSuivi() {
    this.setAgent();
    this.commentService.create(this.freelance.id, this.suivi)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((result: CommentDTO) => {
      this.dialogRef.close(result);
    }, (error) => {
      this.notification.show({
        title: 'Profil mis à jour',
        message: error,
        type: NotificationType.error
      });
    });
  }

  /**
   * Update an existing suivi
   */
  updateSuivi() {
    this.commentService.update(this.suivi)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((result: CommentDTO) => {
      this.dialogRef.close();
    }, (error) => {
      this.notification.show({
        title: 'Profil mis à jour',
        message: error,
        type: NotificationType.error
      });
    });

  }

  /**
   * Callback when user close modal
   */
  close() {
    if (this.data.isNew === false) {
      this.freelance.comments = this.freelance.comments.map((ed) => {
        return (ed.id === this.originalComment.id) ? this.originalComment : ed;
      });
    }
    this.dialogRef.close();
  }

  /**
   * Delete suivi
   */
  deleteSuivi() {
    this.commentService.delete(this.suivi.id)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((result) => {
      this.freelance.comments = this.freelance.comments.filter((ed) => ed.id !== this.suivi.id);
      this.dialogRef.close();
    }, (error) => {
      this.notification.show({
        title: 'Profil mis à jour',
        message: error,
        type: NotificationType.error
      });
    });
  }
}
