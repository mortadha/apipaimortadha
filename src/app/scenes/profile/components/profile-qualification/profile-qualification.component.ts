import { Component, OnInit, Input, OnDestroy } from '@angular/core';

// Services
import { FreelancePrivateDTO, FreelanceStatusEnum } from '@neadz/dtos';
import { FormGroup, FormControl } from '@angular/forms';
import { FreelanceService, ProfileService, NotificationService, NotificationType } from '@app/core/services';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-profile-qualification',
  templateUrl: './profile-qualification.component.html',
  styleUrls: ['./profile-qualification.component.scss']
})
export class ProfileQualificationComponent implements OnInit, OnDestroy {
  freelance: FreelancePrivateDTO;
  freelanceStatusEnum = FreelanceStatusEnum;
  private componentDestroyed = new Subject();
  oldStatus: FreelanceStatusEnum;
  oldGradePerso: number;
  oldGradePro: number;

  constructor(
    private freelanceService: FreelanceService,
    private profileService: ProfileService,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.freelance = <FreelancePrivateDTO>this.profileService.getCurrentFreelance();
    this.oldStatus = this.freelance.status;
    this.oldGradePerso = this.freelance.gradePerso;
    this.oldGradePro = this.freelance.gradePro;
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

  submit() {
    this.freelanceService.update(this.freelance)
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((result: FreelancePrivateDTO) => {
        this.oldStatus = this.freelance.status;
        this.oldGradePerso = this.freelance.gradePerso;
        this.oldGradePro = this.freelance.gradePro;
        this.profileService.setCurrentFreelance(result);
        this.notification.show({
          title: 'Qualification mise à jour',
          message: 'Le process de qualification a bien été mis à jour',
          type: NotificationType.success
        });
      }, (error) => {
        this.notification.show({
          title: 'Qualification mise à jour',
          message: error,
          type: NotificationType.error
        });
      });
  }
}

