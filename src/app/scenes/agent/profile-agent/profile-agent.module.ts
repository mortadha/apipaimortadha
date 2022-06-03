import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { NeedsModule } from '@app/scenes/company/needs/needs.module';
import { MatSelectModule } from '@angular/material/select';

// Components
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AgentProfileModalComponent } from './modal/agent-profile.component';


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
    AgentProfileModalComponent
  ],
  declarations: [
    AgentProfileModalComponent
  ]
})
export class ProfileAgentModule { }
