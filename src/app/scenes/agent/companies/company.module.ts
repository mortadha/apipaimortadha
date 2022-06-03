import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { NeedsModule } from '@app/scenes/company/needs/needs.module';
import { MatSelectModule } from '@angular/material/select';

// Components
import { CompanyListingComponent } from './scenes/list/company-listing.component';
import { CompanyProfileComponent } from './scenes/detail/company-profile.component';
import { CompanyCardComponent } from './components/company-card/company-card.component';
import { AssignFreelanceModalComponent } from './modal/assign-freelance-modal/assign-freelance-modal.component';
import { CompanyContractsComponent } from './components/company-contracts/company-contracts.component';
import { CompanyBillsComponent } from './components/company-bills/company-bills.component';
import { AssignFreelanceRowComponent } from './components/assign-freelance-row/assign-freelance-row.component';
import { CreateCompanyModalComponent } from './modal/create-company-modal/create-company-modal.component';
import { CreateContactModalComponent } from '@app/shared/modal/create-contact-modal/create-contact-modal.component';
import { AssignFreelanceListComponent } from './components/assign-freelance-list/assign-freelance-list.component';
import { ConfirmAssignFreelanceComponent } from './components/confirm-assign-freelance/confirm-assign-freelance.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    MatSelectModule,
    SharedModule,
    RouterModule,
    NeedsModule,
    NgbModule.forRoot(),
    InfiniteScrollModule
  ],
  entryComponents: [
    CreateCompanyModalComponent,
    AssignFreelanceModalComponent,
    CreateContactModalComponent
  ],
  declarations: [
    AssignFreelanceListComponent,
    CreateCompanyModalComponent,
    CompanyListingComponent,
    CompanyCardComponent,
    CompanyProfileComponent,
    AssignFreelanceModalComponent,
    CompanyContractsComponent,
    CompanyBillsComponent,
    AssignFreelanceRowComponent,
    ConfirmAssignFreelanceComponent
  ]
})
export class CompanyModule { }
