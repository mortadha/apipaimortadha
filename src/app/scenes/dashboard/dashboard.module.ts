import { NgModule } from '@angular/core';

import { DashboardComponent } from './scene/dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { AllNeedsComponent } from './components/agent/all-needs/all-needs.component';
import { CurrentNeedsComponent } from './components/agent/current-needs/current-needs.component';
import { InfoProfileComponent } from './components/freelance/info-profile/info-profile.component';
import { InfoEntrepriseComponent } from './components/freelance/info-entreprise/info-entreprise.component';
import { AllCandidatsComponent } from './components/agent/all-candidats/all-candidats.component';
import { OpportunitiesComponent } from './components/freelance/opportunities/opportunities.component';
import { ProjetsComponent } from './components/freelance/projets/projets.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrentFreelancesComponent } from './components/agent/current-freelances/current-frelances.component';
import { AllProjectsComponent } from './components/agent/all-projects/all-projects.component';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    DashboardComponent,
    AllNeedsComponent,
    CurrentNeedsComponent,
    OpportunitiesComponent,
    CurrentFreelancesComponent,
    ProjetsComponent,
    AllCandidatsComponent,
    InfoProfileComponent,
    InfoEntrepriseComponent,
    AllProjectsComponent
  ],
  providers: []
})
export class DashboardModule {}
