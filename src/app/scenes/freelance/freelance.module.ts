import { NgModule } from '@angular/core';

import { FreelanceRoutingModule } from './freelance-routing.module';
import { MissionsModule } from './missions/missions.module';
import { ProfileModule } from '@app/scenes/profile/profile.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { EntrepriseModule } from './entreprise/entreprise.module';
import { DocumentsModule } from './documents/documents.module';

@NgModule({
  imports: [
    ProfileModule,
    EntrepriseModule,
    FreelanceRoutingModule,
    DashboardModule,
    MissionsModule,
    DocumentsModule,
  ],
  declarations: [],
  providers: [],
})
export class FreelanceModule {}
