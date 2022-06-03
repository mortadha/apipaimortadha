import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// DTOS
import { AuthDTO, AccountType, FreelancePrivateDTO, FreelanceStatusEnum} from '@neadz/dtos';

// Services
import { UserService, ProfileService, FreelanceService, NotificationType, NotificationService } from '@app/core/services/';

import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  DoubleConfirmValidationModalData,
  DoubleConfirmValidationModalComponent
} from '@app/shared/modal/double-confirm-validation-modal/double-confirm-validation-modal.component';
import { modalFactory } from '@app/shared/modal/modal.component';
import { MatDialog } from '@angular/material';

enum TabsEnum {
  main = 0,
  experience = 1
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit, OnDestroy {
  user: AuthDTO;
  freelance: FreelancePrivateDTO;
  freelancePrivate: FreelancePrivateDTO;
  accountType = AccountType;
  activeTab = TabsEnum.main;
  tabsType = TabsEnum;
  private componentDestroyed = new Subject();
  public statusEnum = FreelanceStatusEnum;

  constructor(private userService: UserService,
              private profileService: ProfileService,
              private activatedRoute: ActivatedRoute,
              private freelanceService: FreelanceService,
              private notification: NotificationService,
              private router: Router,
              private dialog: MatDialog) {
      this.user = this.userService.getCurrentUser();
      this.freelance = new FreelancePrivateDTO();
      this.freelance.skills = [];
      this.freelance.experiences = [];
      this.freelance.educations = [];
    }

  ngOnInit() {
    if (this.user.type === this.accountType.Freelance) {
      this.freelance = this.userService.getFreelance();
    } else {
      this.freelance = this.activatedRoute.snapshot.data.message;
    }
    this.profileService.setCurrentFreelance(this.freelance);
    this.profileService.listen()
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((freelance: FreelancePrivateDTO) => {
      this.userService.setFreelance(freelance);
    });
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  tabChanged($event) {
    this.activeTab = $event;
  }

}
