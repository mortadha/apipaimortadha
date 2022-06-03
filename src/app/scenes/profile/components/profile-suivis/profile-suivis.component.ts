import { Component, OnInit, Input, OnDestroy } from '@angular/core';

// Services
import { AuthDTO, FreelancePublicDTO, EducationDTO, CommentDTO } from '@neadz/dtos';
import { modalFactory } from 'src/app/shared/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

import {
  ProfileEditSuiviModalComponent,
  ProfileEditSuiviData
} from '../../modal/profile-edit-suivi-modal/profile-edit-suvi-modal.component';
import { ProfileService } from '@app/core/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile-suivis',
  templateUrl: './profile-suivis.component.html',
  styleUrls: ['./profile-suivis.component.scss']
})
export class ProfileSuivisComponent implements OnInit, OnDestroy {
  @Input() user: AuthDTO;
  freelance: FreelancePublicDTO;
  private componentDestroyed = new Subject();

  constructor(public dialog: MatDialog, private profileService: ProfileService) {
  }

  ngOnInit() {
    this.freelance = this.profileService.getCurrentFreelance();
    this.profileService.listen()
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((res: FreelancePublicDTO) => {
      this.freelance = res;
    });
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  addNewSuivi() {
    const modal = modalFactory<ProfileEditSuiviModalComponent>(this.dialog);
    const data: ProfileEditSuiviData = {
      isNew: true,
      suivi: new CommentDTO,
      freelance: this.freelance,
    };
    modal.open<ProfileEditSuiviData>(data, ProfileEditSuiviModalComponent, (result: CommentDTO) => {
      if (result !== undefined) {
        this.freelance.comments.push(result);
        this.profileService.setCurrentFreelance(this.freelance);
      }
    });
  }
}
