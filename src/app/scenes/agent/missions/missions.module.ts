import { NgModule } from '@angular/core';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// Components
import { MissionsComponent } from './scene/missions.component';
import { MissionDetailComponent } from './components/mission-detail/mission-detail.component';
import { MissionComponent } from './components/mission/mission.component';
import { CraModule } from '@app/scenes/cra/cra.module';


@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    MyDateRangePickerModule,
    NgbModule.forRoot(),
    InfiniteScrollModule,
    CraModule
  ],
  declarations: [
    MissionsComponent,
    MissionComponent,
    MissionDetailComponent,
  ],
  entryComponents: []
})
export class MissionsModule { }
