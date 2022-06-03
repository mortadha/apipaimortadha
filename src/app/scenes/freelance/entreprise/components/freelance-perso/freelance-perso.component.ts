
import { emailValidator, nameValidator } from '@app/shared/validator';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FreelancePrivateDTO } from '@neadz/dtos';
import { NotificationService, NotificationType } from '@app/core/services/notification.service';
import { UserService, FreelanceService, ProfileService } from '@app/core/services/';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Components

@Component({
  selector: 'app-freelance-perso',
  templateUrl: './freelance-perso.component.html',
  styleUrls: ['./freelance-perso.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FreelancePersoComponent implements OnInit, OnDestroy {
  private componentDestroyed = new Subject();
  freelance: FreelancePrivateDTO;

  constructor(
    private notification: NotificationService,
    private freelanceService: FreelanceService,
    private profileService: ProfileService,
    private userService: UserService
  ) {
    this.freelance = <FreelancePrivateDTO>this.userService.getFreelance();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  checkInput() {
    if (nameValidator(this.freelance.account.firstName)) {
      this.notification.show({
        title: 'Prénom',
        message: 'Le prénom doit contenir au moins deux caractères',
        type: NotificationType.error
      });
      return false;
    } else if (nameValidator(this.freelance.account.lastName)) {
      this.notification.show({
        title: 'Nom',
        message: 'Le nom doit contenir au moins deux caractères',
        type: NotificationType.error
      });
      return false;
    } else if (emailValidator(this.freelance.account.email, true)) {
      this.notification.show({
        title: 'Email',
        message: 'L\'adresse email n\'est pas valide',
        type: NotificationType.error
      });
      return false;
    } else {
      return true;
    }
  }

    /**
   * Callback to submit changes
   */
  submit() {
    if (this.checkInput()) {
      this.freelanceService.update(this.freelance)
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((result: FreelancePrivateDTO) => {
        this.profileService.setCurrentFreelance(result);
        this.notification.show({
          title: 'Profil mis à jour',
          message: 'Les coordonnées personnelles ont bien été mises à jour',
          type: NotificationType.success
        });
      }, (error) => {
        this.notification.show({
          title: 'Profil mis à jour',
          message: error,
          type: NotificationType.error
        });
      });
    }
  }
}
