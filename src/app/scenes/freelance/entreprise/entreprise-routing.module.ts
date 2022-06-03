import { NgModule } from '@angular/core';
import { Routes, RouterModule, OutletContext } from '@angular/router';
import { FreelancePersoComponent } from './components/freelance-perso/freelance-perso.component';
import { FreelanceProComponent } from './components/freelance-pro/freelance-pro.component';
import { FreelanceEntrepriseComponent } from './scene/freelance-entreprise.component';
import { FreelanceLegalComponent } from './components/freelance-legal/freelance-legal.component';
import { FreelanceBankComponent } from './components/freelance-bank/freelance-bank.component';

const routes: Routes = [
    {
      path: 'entreprise',
      component: FreelanceEntrepriseComponent,
      children: [
        { path: '', component: FreelancePersoComponent, outlet: 'tabs', pathMatch: 'full' },
        { path: 'perso', component: FreelancePersoComponent, outlet: 'tabs' },
        { path: 'pro', component: FreelanceProComponent, outlet: 'tabs' },
        { path: 'legal', component: FreelanceLegalComponent, outlet: 'tabs' },
        { path: 'bank', component: FreelanceBankComponent, outlet: 'tabs' },
        { path: '**', component: FreelancePersoComponent, outlet: 'tabs', pathMatch: 'full' },
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntrepriseRoutingModule {}
