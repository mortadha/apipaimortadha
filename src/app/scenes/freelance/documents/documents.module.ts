import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

// Components
import { DocumentsListingComponent } from './scene/documents-listing.component';
import { DocumentListingMissionComponent } from './components/documents-listing-mission.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    DocumentsListingComponent,
    DocumentListingMissionComponent
  ]
})
export class DocumentsModule { }
