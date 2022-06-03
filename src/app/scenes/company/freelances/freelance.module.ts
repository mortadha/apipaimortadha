import { NgModule } from '@angular/core';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CraModule } from '@app/scenes/cra/cra.module';

// Components
import { FreelanceComponent } from './scene/list/freelance.component';
import { FreelanceCardComponent } from './components/freelance-card/freelance-card.component';
import { MissionFreelanceComponent } from './scene/detail/mission-freelance.component';

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
  declarations: [FreelanceComponent, FreelanceCardComponent, MissionFreelanceComponent],
  entryComponents: []
})
export class FreelanceModule {}
