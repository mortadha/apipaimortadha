// Modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { IonRangeSliderModule } from 'ng-ion-range-slider';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatAutocompleteModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { NgxSpinnerModule } from 'ngx-spinner';

// Components
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StatsCounterComponent } from './components/stats-counter/stats-counter.component';
import { RangeSliderComponent } from './components/range-slider/range-slider.component';
import { NeedCardComponent } from './components/need-card/need-card.component';
import { ClosedNeedCardComponent } from './components/closed-need-card/closed-need-card.component';
import { CreateContactModalComponent } from './modal/create-contact-modal/create-contact-modal.component';
import { CompanyContactsComponent } from './components/company-contacts/company-contacts.component';
import { ContactCardComponent } from './components/contact-card/contact-card.component';
import { ConfirmDeleteModalComponent } from './modal/confirm-delete-modal/confirm-delete-modal.component';
import { DoubleConfirmValidationModalComponent } from './modal/double-confirm-validation-modal/double-confirm-validation-modal.component';
import { FooterComponent } from './components/footer/footer.component';
import { CropImageModalComponent } from './modal/crop-image-modal/crop-image-modal.component';
import { ImageCropperModule } from 'ngx-img-cropper';

// Pipes
import { PipeModule } from './pipe/pipe.module';
import { SearchSkillsComponent } from './components/inputs/search-skills/search-skills.component';
import { ClickOutsideModule } from 'ng-click-outside';
@NgModule({
 imports: [
     CommonModule,
     IonRangeSliderModule,
     RouterModule,
     MomentModule,
     NgbModule.forRoot(),
     FormsModule,
     MatSelectModule,
     NgxSpinnerModule,
     MatDialogModule,
     ImageCropperModule,
     MatAutocompleteModule,
     ReactiveFormsModule,
     PipeModule,
     ClickOutsideModule
 ],
 declarations: [
     HeaderComponent,
     FooterComponent,
     SidebarComponent,
     RangeSliderComponent,
     StatsCounterComponent,
     NeedCardComponent,
     ClosedNeedCardComponent,
     CreateContactModalComponent,
     CropImageModalComponent,
     CompanyContactsComponent,
     ContactCardComponent,
     ConfirmDeleteModalComponent,
     DoubleConfirmValidationModalComponent,
     SearchSkillsComponent
    ],
 exports: [
   PipeModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MomentModule,
    StatsCounterComponent,
    MatDialogModule,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    RangeSliderComponent,
    NeedCardComponent,
    ClosedNeedCardComponent,
    CreateContactModalComponent,
    CropImageModalComponent,
    MatSelectModule,
    CompanyContactsComponent,
    ContactCardComponent,
    ConfirmDeleteModalComponent,
    DoubleConfirmValidationModalComponent,
    SearchSkillsComponent,
    ClickOutsideModule
   ],
 entryComponents: [
    ConfirmDeleteModalComponent,
    DoubleConfirmValidationModalComponent,
    CreateContactModalComponent,
    CropImageModalComponent
   ]
})
export class SharedModule {}
