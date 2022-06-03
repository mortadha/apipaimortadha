import { NgModule } from '@angular/core';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// Components
import { NeedsComponent } from './scene/needs.component';
import { NeedComponent } from './component/need/need.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    MyDateRangePickerModule,
    NgbModule.forRoot(),
    InfiniteScrollModule
  ],
  declarations: [
    NeedsComponent,
    NeedComponent
  ],
})
export class NeedsModule { }
