import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from '../profile/scene/profile.component';
// import { BillsListingComponent } from './bills/scene/bills-listing.component';
import { DashboardComponent } from '../dashboard/scene/dashboard.component';
import { FreelanceEntrepriseComponent } from './entreprise/scene/freelance-entreprise.component';
import { FreelancePersoComponent } from './entreprise/components/freelance-perso/freelance-perso.component';
import { FreelanceProComponent } from './entreprise/components/freelance-pro/freelance-pro.component';
import { PropositionMissionsComponent } from './missions/scene/proposition-missions/proposition-missions.component';
import { CurrentMissionComponent } from './missions/scene/current-mission/current-mission.component';
import { DocumentsListingComponent } from './documents/scene/documents-listing.component';
import { SignatureComponent } from '../cra/signature/signature.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'opportunites',
    component: PropositionMissionsComponent,
  },
  {
    path: 'missions',
    component: CurrentMissionComponent,
  },
  {
    path: 'missions/signature/:id',
    component: SignatureComponent
  },
  {
    path: 'documents',
    component: DocumentsListingComponent
  },
  // {
  //   path: 'entreprise',
  //   component: FreelanceEntrepriseComponent,
  //   children: [
  //     { path: 'perso', component: FreelancePersoComponent, outlet: 'tabs' },
  //     { path: 'pro', component: FreelanceProComponent, outlet: 'tabs' }
  //   ]
  // },
  {
    // path: 'entreprise',
    loadChildren: './entreprise/entreprise.module#EntrepriseModule'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreelanceRoutingModule {}
