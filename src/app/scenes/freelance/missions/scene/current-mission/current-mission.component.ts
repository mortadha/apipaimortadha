import { Component, OnInit } from '@angular/core';
import { MissionDTO } from '@neadz/dtos';
import { UserService } from '@app/core/services/user.service';
import { StrongBoxService } from '@app/core/services/strongbox.service';
import { MissionsService, Missions, NotificationService } from '@app/core/services';
import { Subject } from 'rxjs';
import { takeUntil, flatMap } from 'rxjs/operators';

enum MissionTabs {
  cra = 1,
  documents = 2,
}

@Component({
  selector: 'app-current-mission',
  templateUrl: './current-mission.component.html',
  styleUrls: ['./current-mission.component.scss'],
})
export class CurrentMissionComponent implements OnInit {
  missionTabs = MissionTabs;
  activeTab = MissionTabs.cra;

  private currentMission: MissionDTO;
  private componentDestroyed = new Subject();

  constructor(public userService: UserService,
    public missionService: MissionsService,
    public strongBoxService: StrongBoxService,
    public notification: NotificationService) {}

  switchTab(tab: MissionTabs) {
    if (this.activeTab !== tab) {
      this.activeTab = tab;
    }
  }

  ngOnInit() {
    const freelanceId = this.userService.getFreelance().id;
    this.missionService.getCurrentMission(freelanceId)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe(((result: Missions) => {
      if (result.total > 0) {
        this.currentMission = result.data[0];
      }
    }));
  }

  allDocument() {
    this.activeTab = 2;
  }
}
