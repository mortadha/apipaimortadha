import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NeedsListingComponent } from './needs/scenes/list/needs-listing.component';
import { FreelanceComponent } from './freelances/scene/list/freelance.component';
import { MissionFreelanceComponent } from './freelances/scene/detail/mission-freelance.component';
import { NeedDetailsComponent } from './needs/scenes/detail/need-details.component';
import { ProfileComponent } from '../profile/scene/profile.component';
import { SignatureComponent } from '../cra/signature/signature.component';
import { DashboardComponent } from '../dashboard/scene/dashboard.component';
import { CompanyResolver } from './company.resolver';
import { CompanyDocumentsListingComponent } from './documents/scene/company-documents-listing.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'besoins',
    component: NeedsListingComponent
  },
  {
    path: 'besoins/:id',
    component: NeedDetailsComponent
  },
  {
    path: 'besoins/profile/:id',
    component: ProfileComponent,
    resolve: { message: CompanyResolver },

  },
  {
    path: 'freelances',
    component: FreelanceComponent
  },
  {
    path: 'freelances/profile/:id',
    component: MissionFreelanceComponent
  },
  {
    path: 'freelances/profile/signature/:id',
    component: SignatureComponent
  },
  {
    path: 'documents',
    component: CompanyDocumentsListingComponent,
  },
  {
    path: '',
    redirectTo: 'besoins',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CompanyResolver
  ]
})
export class CompanyRoutingModule {}
