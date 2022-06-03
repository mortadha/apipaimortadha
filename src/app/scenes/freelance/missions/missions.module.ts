import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NeedsModule } from '@app/scenes/company/needs/needs.module';
import { CraModule } from '@app/scenes/cra/cra.module';

// Pages
import { CurrentMissionComponent } from './scene/current-mission/current-mission.component';

// Components
import { PropositionMissionsComponent } from './scene/proposition-missions/proposition-missions.component';
import { FreelanceMissionComponent } from './components/freelance-mission/freelance-mission.component';
import { MissionDetailsModalComponent } from './modal/mission-details-modal/mission-details-modal.component';

@NgModule({
  imports: [
    NgbModule.forRoot(),
    ReactiveFormsModule,
    SharedModule,
    CraModule,
    NeedsModule
  ],
  declarations: [
    CurrentMissionComponent,
    FreelanceMissionComponent,
    MissionDetailsModalComponent,
    PropositionMissionsComponent,
  ],
  providers: [],
  entryComponents: [
    MissionDetailsModalComponent
  ]
})
export class MissionsModule {}
