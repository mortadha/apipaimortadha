import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { UserService, MissionsService } from '@app/core/services';
import { FreelanceNeedDTO } from '@neadz/dtos';
import { NotificationService, NotificationType } from '@app/core/services/notification.service';

@Component({
  selector: 'app-proposition-missions',
  templateUrl: './proposition-missions.component.html',
  styleUrls: ['./proposition-missions.component.scss']
})
export class PropositionMissionsComponent implements OnInit, OnDestroy {
  private componentDestroyed = new Subject();
  needsProposal: FreelanceNeedDTO[] = [];
  requestEnd = false;

  constructor(
    private userService: UserService,
    private missionService: MissionsService,
    private notification: NotificationService) {
  }

  ngOnInit() {
    const freelance = this.userService.getFreelance();
    this.missionService.getNeeds(freelance.id)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((result: FreelanceNeedDTO[]) => {
      this.requestEnd = true;
      this.needsProposal = result;
    }, (error) => {
      this.notification.show({
        title: 'Récupération des données',
        message: error,
        type: NotificationType.error
      });
    });
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }
}
