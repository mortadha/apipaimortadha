// Modules
import { NgModule } from '@angular/core';
import { BoardingRoutingModule } from './boarding-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { MatAutocompleteModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Services
import { BoardingClientService } from './client/service/boarding.client.service';
import { BoardingFreelanceService } from './freelance/service/boarding.freelance.service';
import { ExperienceService } from '@app/scenes/profile/services/experience.service';

// Components
import { BoardingClientComponent } from './client/scene/boarding-client.component';
import { BoardingFreelanceComponent } from './freelance/scene/boarding-freelance.component';
import { SelectDomainClientComponent } from './client/components/select-domain/select-domain.component';
import { SelectDomainFreelanceComponent } from './freelance/component/select-domain/select-domain.component';
import { NeedInfoClientComponent } from './client/components/need-info/need-info.component';
import { FreelanceInfoComponent } from './freelance/component/freelance-info/freelance-info.component';
import { NeedDescriptionComponent } from './client/components/need-description/need-description.component';
import { NeedProfileClientComponent } from './client/components/need-profile/need-profile.component';
import { FreelanceProfileComponent } from './freelance/component/freelance-profile/freelance-profile.component';
import { FreelanceContactComponent } from './freelance/component/freelance-contact/freelance-contact.component';
import { FreelanceCvComponent } from './freelance/component/freelance-cv/freelance-cv.component';
import { FreelanceFinalComponent } from './freelance/component/freelance-final/freelance-final.component';
import { NeedClientInfoComponent } from './client/components/need-client/need-client.component';
import { NeedFinalComponent } from './client/components/need-final/need-final.component';
import { NeedConsortComponent } from './client/components/need-consort/need-consort.component';
import { ConsortFinalComponent } from './client/components/consort-final/consort-final.component';
import { NeedClientConsortComponent } from './client/components/need-client-consort/need-client-consort.component';
import { BoardingComponent } from './scene/boarding.component';

@NgModule({
  imports: [
    BoardingRoutingModule,
    SharedModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    BoardingClientComponent,
    BoardingFreelanceComponent,
    SelectDomainFreelanceComponent,
    SelectDomainClientComponent,
    NeedProfileClientComponent,
    FreelanceProfileComponent,
    NeedInfoClientComponent,
    FreelanceInfoComponent,
    FreelanceContactComponent,
    FreelanceCvComponent,
    FreelanceFinalComponent,
    NeedClientInfoComponent,
    NeedFinalComponent,
    ConsortFinalComponent,
    NeedConsortComponent,
    NeedDescriptionComponent,
    NeedClientConsortComponent,
    BoardingComponent
  ],
  providers: [BoardingClientService, BoardingFreelanceService, ExperienceService],
})
export class BoardingModule {}
