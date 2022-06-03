import { NgModule } from '@angular/core';

import { SignatureComponent } from './signature/signature.component';
import { SharedModule } from '@app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowCraComponent } from './show/scene/show-cra.component';
import { ConfirmPopoverComponent } from './show/components/confirm-popover/confirm-popover.component';
import { ConfirmMonthModalComponent } from './show/modal/confirm-month-modal/confirm-month-modal.component';
import { SidebarInfoComponent } from './show/components/sidebar-info/sidebar-info.component';
import { DocumentListComponent } from './show/components/documents-list/document-list.component';
import { CraDetailComponent } from './show/components/cra-detail/cra-detail.component';
import { RouterModule } from '@angular/router';
import { RefuseCraModalComponent } from './show/components/refuse-cra-modal/refuse-cra-modal.component';
import { ModifyDatesMissionModalComponent } from './show/modal/modify-dates-mission-modal/modify-dates-mission-modal.component';

@NgModule({
  imports: [
    SharedModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [
    SidebarInfoComponent,
    SignatureComponent,
    ShowCraComponent,
    ConfirmPopoverComponent,
    ConfirmMonthModalComponent,
    DocumentListComponent,
    CraDetailComponent,
    RefuseCraModalComponent,
    ModifyDatesMissionModalComponent
  ],
  entryComponents: [
    ConfirmMonthModalComponent,
    RefuseCraModalComponent,
    ModifyDatesMissionModalComponent
  ],
  exports: [
    ShowCraComponent,
    SidebarInfoComponent,
    DocumentListComponent,
    CraDetailComponent
  ],
  providers: [],
})
export class CraModule {}
