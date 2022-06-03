import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { siretValidator, nameValidator, zipcodeValidator } from '@app/shared/validator';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// DTO
import { FreelancePrivateDTO } from '@neadz/dtos';

// Services
import { NotificationService, NotificationType } from '@app/core/services/notification.service';
import { UserService, FreelanceService, ProfileService } from '@app/core/services/';

// Components
@Component({
  selector: 'app-freelance-pro',
  templateUrl: './freelance-pro.component.html',
  styleUrls: ['./freelance-pro.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class FreelanceProComponent implements OnInit, OnDestroy {
  freelance: FreelancePrivateDTO;
  private componentDestroyed = new Subject();
  public zipcode: number;
  constructor(
    private notification: NotificationService,
    private profileService: ProfileService,
    private freelanceService: FreelanceService,
    private userService: UserService
  ) {
    this.freelance = <FreelancePrivateDTO>this.userService.getFreelance();
    if (this.freelance.legal.zipcode) {
      this.zipcode = parseInt(this.freelance.legal.zipcode, 10);
    }
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  checkInput() {
    if (siretValidator(Number(this.freelance.legal.siret))) {
      this.notification.show({
        title: 'Siret',
        message: 'Le numéro siret n\'est pas valable',
        type: NotificationType.error
      });
      return false;
    } else if (nameValidator(this.freelance.legal.companyName)) {
      this.notification.show({
        title: 'Nom d\'entreprise',
        message: 'Le nom d\'entreprise n\'est pas valable',
        type: NotificationType.error
      });
    } else if (zipcodeValidator(this.zipcode)) {
      this.notification.show({
        title: 'Code postal',
        message: 'Le code postal n\'est pas valide',
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
      this.freelance.legal.zipcode = this.zipcode.toString();
      this.freelanceService.update(this.freelance)
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((result: FreelancePrivateDTO) => {
        this.profileService.setCurrentFreelance(result);
        this.notification.show({
          title: 'Experience',
          message: 'Les coordonnées professionelles ont bien été mises à jour',
          type: NotificationType.success
        });
      }, (error) => {
        this.notification.show({
          title: 'Experience',
          message: error,
          type: NotificationType.error
        });
      });
    }
  }
}
