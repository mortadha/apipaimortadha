import { Component, OnInit, OnDestroy } from '@angular/core';
import { MissionsService } from '@app/core/services';
import { MissionDTO } from '@neadz/dtos';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss']
})
export class AllProjectsComponent implements OnInit, OnDestroy {
  public missions = [];
  public total = 0;
  private componentDestroyed = new Subject();

  constructor(private missionService: MissionsService) { }

  ngOnInit() {
    this.missionService
    .getAll({skip: 0, take: 3})
    .subscribe((res: {total: number, data: MissionDTO[] }) => {
      this.missions = res.data;
      this.total = res.total;
    });
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }
}
