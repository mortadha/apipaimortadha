import { NgModule } from '@angular/core';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// Components
import { FreelanceComponent } from './scene/freelance.component';
import { FreelanceCardComponent } from './components/freelance-card/freelance-card.component';
import { CreateFreelanceModalComponent } from './modal/create-freelance-modal/create-freelance-modal.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    MyDateRangePickerModule,
    NgbModule.forRoot(),
    InfiniteScrollModule
  ],
  declarations: [FreelanceComponent, FreelanceCardComponent, CreateFreelanceModalComponent],
  entryComponents: [
    CreateFreelanceModalComponent
  ]
})
export class FreelanceModule { }
