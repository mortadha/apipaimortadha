import { NgModule } from '@angular/core';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CraModule } from '@app/scenes/cra/cra.module';

// Components
import { CompanyDocumentsListingComponent } from './scene/company-documents-listing.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    MyDateRangePickerModule,
    NgbModule.forRoot(),
    CraModule,
    FormsModule,
    InfiniteScrollModule,
    ReactiveFormsModule
  ],
  declarations: [
    CompanyDocumentsListingComponent,
  ],
  entryComponents: []
})
export class DocumentModule {}
