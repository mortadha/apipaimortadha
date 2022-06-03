import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FreelanceComponent } from './freelances/scene/freelance.component';
import { CompanyListingComponent } from './companies/scenes/list/company-listing.component';
import { CompanyProfileComponent } from './companies/scenes/detail/company-profile.component';
import { ProfileComponent } from '../profile/scene/profile.component';
import { NeedDetailsComponent } from '../company/needs/scenes/detail/need-details.component';
import { DashboardComponent } from '../dashboard/scene/dashboard.component';
import { AgentResolver } from './agent.resolver';
import { NeedsComponent } from './needs/scene/needs.component';
import { MissionsComponent } from './missions/scene/missions.component';
import { MissionDetailComponent } from './missions/components/mission-detail/mission-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'freelances',
    component: FreelanceComponent
  },
  {
    path: 'freelances/profile/:id',
    component: ProfileComponent,
    resolve: { message: AgentResolver },
  },
  {
    path: 'entreprises',
    component: CompanyListingComponent
  },
  {
    path: 'entreprises/profile/:id',
    component: CompanyProfileComponent
  },
  {
    path: 'besoins/:id',
    component: NeedDetailsComponent
  },
  {
    path: 'besoins',
    component: NeedsComponent,
    children: [
      { path: '', component: NeedsComponent, outlet: 'tabs', pathMatch: 'full' },
      { path: '**', component: NeedsComponent, outlet: 'tabs', pathMatch: 'full' },
    ]
  },
  {
    path: 'missions',
    component: MissionsComponent
  },
  {
    path: 'cra/:id',
    component: MissionDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    AgentResolver
  ]
})
export class AgentRoutingModule {}
