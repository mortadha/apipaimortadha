import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardingClientComponent } from './client/scene/boarding-client.component';
import { BoardingFreelanceComponent } from './freelance/scene/boarding-freelance.component';
import { SelectDomainClientComponent } from './client/components/select-domain/select-domain.component';
import { SelectDomainFreelanceComponent } from './freelance/component/select-domain/select-domain.component';
import { NeedProfileClientComponent } from './client/components/need-profile/need-profile.component';
import { FreelanceProfileComponent } from './freelance/component/freelance-profile/freelance-profile.component';
import { NeedInfoClientComponent } from './client/components/need-info/need-info.component';
import { FreelanceInfoComponent } from './freelance/component/freelance-info/freelance-info.component';
import { FreelanceContactComponent } from './freelance/component/freelance-contact/freelance-contact.component';
import { FreelanceCvComponent } from './freelance/component/freelance-cv/freelance-cv.component';
import { FreelanceFinalComponent } from './freelance/component/freelance-final/freelance-final.component';
import { NeedDescriptionComponent } from './client/components/need-description/need-description.component';
import { NeedConsortComponent } from './client/components/need-consort/need-consort.component';
import { NeedClientInfoComponent } from './client/components/need-client/need-client.component';
import { NeedFinalComponent } from './client/components/need-final/need-final.component';
import { ConsortFinalComponent } from './client/components/consort-final/consort-final.component';
import { NeedClientConsortComponent } from './client/components/need-client-consort/need-client-consort.component';
import { BoardingComponent } from './scene/boarding.component';

const routes: Routes = [
  {
    path: '',
    component: BoardingComponent
  },
  {
    path: 'entreprise',
    component: BoardingClientComponent,
    children: [
      { path: '', component: SelectDomainClientComponent, outlet: 'etape', pathMatch: 'full', data: { animation: '1' } },
      { path: '1', component: NeedProfileClientComponent, outlet: 'etape', data: { animation: '2' }},
      { path: '2', component: NeedInfoClientComponent, outlet: 'etape', data: { animation: '3' }},
      { path: '3', component: NeedDescriptionComponent, outlet: 'etape', data: { animation: '4' }},
      { path: '4', component: NeedClientInfoComponent, outlet: 'etape', data: { animation: '5' }},
      { path: '5', component: NeedFinalComponent, outlet: 'etape', data: { animation: '6' }},
    ],
  },
  {
    path: 'consort',
    component: BoardingClientComponent,
    data: { isConsort: true },
    children: [
      { path: '', component: SelectDomainClientComponent, outlet: 'etape', pathMatch: 'full', data: { animation: '1' } },
      { path: '1', component: NeedProfileClientComponent, outlet: 'etape', data: { animation: '2' }},
      { path: '2', component: NeedInfoClientComponent, outlet: 'etape', data: { animation: '3' }},
      { path: '3', component: NeedDescriptionComponent, outlet: 'etape', data: { animation: '4' }},
      { path: '4', component: NeedConsortComponent, outlet: 'etape', data: { animation: '5' }},
      { path: '5', component: NeedClientConsortComponent, outlet: 'etape', data: { animation: '6' }},
      { path: '6', component: ConsortFinalComponent, outlet: 'etape', data: { animation: '7' }},
    ],
  },
  {
    path: 'freelance',
    component: BoardingFreelanceComponent,
    children: [
      { path: '', component: SelectDomainFreelanceComponent, outlet: 'etape', pathMatch: 'full', data: { animation: '1' } },
      { path: '1', component: FreelanceProfileComponent, outlet: 'etape', data: { animation: '2' }},
      { path: '2', component: FreelanceInfoComponent, outlet: 'etape', data: { animation: '3' }},
      { path: '3', component: FreelanceContactComponent, outlet: 'etape', data: { animation: '4' }},
      { path: '4', component: FreelanceCvComponent, outlet: 'etape', data: { animation: '5' }},
      { path: '5', component: FreelanceFinalComponent, outlet: 'etape', data: { animation: '6' }},
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardingRoutingModule {}
