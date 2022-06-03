import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService, NotificationType, MissionsService} from '@app/core/services';
import { MissionDTO } from '@neadz/dtos';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

export enum MissionsTabs {
  inProgress = 0,
  finished = 1
}

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit, OnDestroy {

private componentDestroyed = new Subject();
public missions: MissionDTO[];
public isLoading = false;
public stats = [];
activeTab = MissionsTabs.inProgress;
tabsType = MissionsTabs;
params = {};
previousText = '';

constructor(
    private notification: NotificationService,
    private missionService: MissionsService) {}


  ngOnInit() {
    this.params = { status: this.activeTab };
    this.fetchMissions();
  }

  fetchMissions() {
    this.params['skip'] = 0;
    this.params['take'] = 20;
    this.missionService.getAll(this.params)
    .subscribe((res: {total: number, data: MissionDTO[] }) => {
      this.missions = res.data;
      this.stats = [
          { title: 'Total', value: res.total },
      ];
    }, (error) => {
      this.notification.show({
        title: 'Réception des informations',
        message: error,
        type: NotificationType.error
      });
    });
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  searchMission($event) {
    const text = $event.target.value;
    if (text.length === 0) {
      delete this.params['keywords'];
      this.previousText = '';
      this.fetchMissions();
    }

    // Limiter, call api after 2 characters
    if (Math.abs(text.length - this.previousText.length) >= 2) {
    // if (Math.abs(text.length - this.previousText.length) >= 1) {
      this.params['keywords'] = text;
      this.previousText = text;
      this.fetchMissions();
    }
  }

  /**
   * Called when user wants to change a tab
   * @param {MissionsTabs} tab
   */
  selectTab(tab: MissionsTabs) {
    if (tab !== this.activeTab) {
      this.activeTab = tab;
      this.params['status'] = this.activeTab;
      this.fetchMissions();
    }
  }
}
