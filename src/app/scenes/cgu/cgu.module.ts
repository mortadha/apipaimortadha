import { NgModule } from '@angular/core';

import { CguComponent } from './cgu.component';
import { CguRoutingModule } from './cgu-routing.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [
    CguRoutingModule,
    SharedModule
  ],
  declarations: [
    CguComponent
  ],
  providers: []
})
export class CguModule {}
