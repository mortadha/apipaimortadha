import { NgModule } from '@angular/core';

import { PageNotFoundComponent } from './page-not-found.component';
import { PageNotFoundRoutingModule } from './page-not-found-routing.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [
    PageNotFoundRoutingModule,
    SharedModule,
  ],
  declarations: [
    PageNotFoundComponent
  ],
  providers: []
})
export class PageNotFoundModule {}
