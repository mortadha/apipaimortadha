import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


// Components
import { NeedsListingComponent } from './scenes/list/needs-listing.component';
import { CreateNeedModalComponent } from './modal/create-need-modal/create-need-modal.component';
import { NeedDetailsComponent } from './scenes/detail/need-details.component';
import { FreelanceProposalCardComponent } from './components/freelance-proposal-card/freelance-proposal-card.component';
import { CompanyNeedCardComponent } from './components/company-need-card/company-need-card.component';
import { ProfileModule } from '@app/scenes/profile/profile.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ConfirmNotInterestedCompanyModalComponent
} from './modal/confirm-not-interested-company-modal/confirm-not-interested-company-modal.component';
import { ConfirmValidateNeedModalComponent } from './modal/confirm-validate-need-modal/confirm-validate-need-modal.component';
import {
  ConfirmNotInterestedFreelanceModalComponent
} from './modal/confirm-not-interested-freelance-modal/confirm-not-interested-freelance-modal.component';
import { NeedCompanyModalComponent } from './modal/need-company-modal.ts/need-company-modal.component';

@NgModule({
  imports: [
    SharedModule,
    NgbModule.forRoot(),
    RouterModule,
    MatSelectModule,
    MatAutocompleteModule,
    ProfileModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    CreateNeedModalComponent,
    ConfirmNotInterestedCompanyModalComponent,
    ConfirmNotInterestedFreelanceModalComponent,
    ConfirmValidateNeedModalComponent,
    NeedCompanyModalComponent
  ],
  declarations: [
    NeedsListingComponent,
    CreateNeedModalComponent,
    NeedDetailsComponent,
    FreelanceProposalCardComponent,
    CompanyNeedCardComponent,
    NeedCompanyModalComponent,
    ConfirmNotInterestedFreelanceModalComponent,
    ConfirmNotInterestedCompanyModalComponent,
    ConfirmValidateNeedModalComponent
  ]
})
export class NeedsModule { }
