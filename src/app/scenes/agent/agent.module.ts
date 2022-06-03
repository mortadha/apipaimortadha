import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { AgentRoutingModule } from './agent-routing.module';
import { FreelanceModule } from './freelances/freelance.module';
import { CompanyModule } from './companies/company.module';
import { ProfileModule } from '../profile/profile.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { NeedsModule } from './needs/needs.module';
import { ProfileAgentModule } from './profile-agent/profile-agent.module';
import { MissionsModule } from './missions/missions.module';

@NgModule({
  imports: [
    SharedModule,
    AgentRoutingModule,
    DashboardModule,
    FreelanceModule,
    CompanyModule,
    ProfileModule,
    NeedsModule,
    ProfileAgentModule,
    MissionsModule
  ],
  declarations: [],
  providers: [],
})
export class AgentModule {}
