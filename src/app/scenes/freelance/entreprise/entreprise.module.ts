import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';

// Components
import { FreelanceEntrepriseComponent } from './scene/freelance-entreprise.component';
import { RouterModule } from '@angular/router';
import { FreelanceProComponent } from './components/freelance-pro/freelance-pro.component';
import { FreelancePersoComponent } from './components/freelance-perso/freelance-perso.component';
import { FreelanceLegalComponent } from './components/freelance-legal/freelance-legal.component';
import { FreelanceBankComponent } from './components/freelance-bank/freelance-bank.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EntrepriseRoutingModule } from './entreprise-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FreelanceBankService } from '@app/core/services/freelanceBank.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    NgbModule.forRoot(),
    MatTabsModule,
    EntrepriseRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    FreelanceEntrepriseComponent,
    FreelanceProComponent,
    FreelancePersoComponent,
    FreelanceLegalComponent,
    FreelanceBankComponent
  ],
  providers: [
    FreelanceBankService,
  ]
})
export class EntrepriseModule { }
