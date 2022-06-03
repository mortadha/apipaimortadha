import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { CompanyRoutingModule } from './company-routing.module';
import { NeedsModule } from './needs/needs.module';
import { FreelanceModule } from './freelances/freelance.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardModule } from '@app/scenes/dashboard/dashboard.module';
import { DocumentModule } from './documents/document.module';

@NgModule({
  imports: [
    SharedModule,
    CompanyRoutingModule,
    DashboardModule,
    ReactiveFormsModule,
    NeedsModule,
    FreelanceModule,
    DocumentModule
  ],
  declarations: [],
  providers: [],
})
export class CompanyModule {}
