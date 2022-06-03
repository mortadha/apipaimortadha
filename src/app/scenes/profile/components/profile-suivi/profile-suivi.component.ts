import { Component, OnInit, Input } from '@angular/core';

// Services
import { AuthDTO, FreelancePublicDTO, CommentDTO } from '@neadz/dtos';
import { modalFactory } from 'src/app/shared/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

import {
  ProfileEditSuiviModalComponent,
  ProfileEditSuiviData
} from '../../modal/profile-edit-suivi-modal/profile-edit-suvi-modal.component';
import { ProfileService } from '@app/core/services';

@Component({
  selector: 'app-profile-suivi',
  templateUrl: './profile-suivi.component.html',
  styleUrls: ['./profile-suivi.component.scss']
})
export class ProfileSuiviComponent implements OnInit {
  @Input() user: AuthDTO;
  freelance: FreelancePublicDTO;
  @Input() comment: CommentDTO;

  constructor(private profileService: ProfileService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.freelance = this.profileService.getCurrentFreelance();
  }

  updateSuivi() {
    const modal = modalFactory<ProfileEditSuiviModalComponent>(this.dialog);
    const data: ProfileEditSuiviData = {
      isNew: false,
      suivi: this.comment,
      freelance: this.freelance
    };
    modal.open<ProfileEditSuiviData>(data, ProfileEditSuiviModalComponent, (result: CommentDTO) => {
      if (result !== undefined) {
        this.freelance.comments.push(result);
      }
    });
  }

  hasProfilePicture(): boolean {
    return this.comment.agent &&
      this.comment.agent.profilePicture &&
      this.comment.agent.profilePicture.url &&
      this.comment.agent.profilePicture.url.length > 0;
  }
}
