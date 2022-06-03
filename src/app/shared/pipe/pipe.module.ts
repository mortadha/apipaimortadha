import { NgModule } from '@angular/core';
import { DateFromNow } from './date-from-now.pipe';
import { Truncate } from './truncate.pipe';

@NgModule({
    imports: [],
    declarations: [DateFromNow, Truncate],
    exports: [DateFromNow, Truncate],
})

export class PipeModule {

  static forRoot() {
     return {
         ngModule: PipeModule,
         providers: [],
     };
  }
}
