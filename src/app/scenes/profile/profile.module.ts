import { NgModule } from '@angular/core';
import { ClickOutsideModule } from 'ng-click-outside';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { MatAutocompleteModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Components
import { ProfileComponent } from './scene/profile.component';
import { MainProfileInfosComponent } from './components/main-profile-infos/main-profile-infos.component';
import { ProfileExperiencesComponent } from './components/profile-experiences/profile-experiences.component';
import { ProfileExperienceComponent } from './components/profile-experience/profile-experience.component';
import { ProfileSchoolsComponent } from './components/profile-schools/profile-schools.component';
import { ProfileSchoolComponent } from './components/profile-school/profile-school.component';
import { ProfileProjectsComponent } from './components/profile-projects/profile-projects.component';
import { ProfileProjectComponent } from './components/profile-project/profile-project.component';
import { ProfileSuivisComponent } from './components/profile-suivis/profile-suivis.component';
import { ProfileSuiviComponent } from './components/profile-suivi/profile-suivi.component';
import { MainProfileInfosModalComponent } from './modal/main-profile-infos-modal/main-profile-infos-modal.component';
import { ProfileEditExperienceModalComponent } from './modal/profile-edit-experience-modal/profile-edit-experience-modal.component';
import { ProfileEditSchoolModalComponent } from './modal/profile-edit-school-modal/profile-edit-school-modal.component';
import { MainProfileDataModalComponent } from './modal/main-profile-data-modal/main-profile-data-modal.component';
import { MainProfilePdfModalComponent } from './modal/main-profile-pdf-modal/main-profile-pdf-modal.component';
import { ProfileEditSuiviModalComponent } from './modal/profile-edit-suivi-modal/profile-edit-suvi-modal.component';
import { MainProfileProDataModalComponent } from './modal/main-profile-pro-data-modal/main-profile-pro-data-modal.component';
import { ProfileContactComponent } from './components/profile-contact/profile-contact.component';
import { ProfileQualificationComponent } from './components/profile-qualification/profile-qualification.component';
import { ProfileProComponent } from './components/profile-pro/profile-pro.component';
import { ProfileActionsComponent } from './components/profile-actions/profile-actions.component';
import { ProfileLanguageComponent } from './components/profile-language/profile-language.component';
import { ProfileLanguagesComponent } from './components/profile-languages/profile-languages.component';
import { ProfileEditLanguageModalComponent } from './modal/profile-edit-language-modal/profile-edit-language-modal.component';
import { ProfileDescriptionModalComponent } from './modal/profile-description-modal/profile-description-modal.component';
import { ProfileTechModalComponent } from './modal/profile-tech-modal/profile-tech-modal.component';

// Services
import { ProfileService } from '@app/core/services/profile.service';
import { EducationService } from './services/education.service';
import { ExperienceService } from './services/experience.service';
import { CommentService } from './services/comment.service';
import { LanguageService } from './services/language.service';
import { ProfileCertificationsComponent } from './components/profile-certifications/profile-certifications.component';
import { CertificationService } from './services/certification.service';
import {
  ProfileEditCertificationModalComponent
} from './modal/profile-edit-certification-modal/profile-edit-certification-modal.component';
import { ProfileCertificationComponent } from './components/profile-certification/profile-certification.component';

@NgModule({
  imports: [
    SharedModule,
    NgbModule.forRoot(),
    ClickOutsideModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  providers: [ProfileService, EducationService, ExperienceService, CommentService, LanguageService, CertificationService],
  declarations: [
    ProfileComponent,
    MainProfileInfosComponent,
    ProfileExperiencesComponent,
    ProfileExperienceComponent,
    ProfileSchoolsComponent,
    ProfileSchoolComponent,
    ProfileProjectsComponent,
    ProfileProjectComponent,
    ProfileSuivisComponent,
    ProfileSuiviComponent,
    MainProfileInfosModalComponent,
    ProfileEditExperienceModalComponent,
    ProfileEditSchoolModalComponent,
    ProfileEditSuiviModalComponent,
    MainProfileDataModalComponent,
    MainProfileProDataModalComponent,
    MainProfilePdfModalComponent,
    ProfileContactComponent,
    ProfileQualificationComponent,
    ProfileProComponent,
    ProfileActionsComponent,
    ProfileDescriptionModalComponent,
    ProfileTechModalComponent,
    ProfileLanguagesComponent,
    ProfileLanguageComponent,
    ProfileEditLanguageModalComponent,
    ProfileCertificationsComponent,
    ProfileCertificationComponent,
    ProfileEditCertificationModalComponent,
  ],
  entryComponents: [
    ProfileEditSuiviModalComponent,
    MainProfileInfosModalComponent,
    ProfileEditExperienceModalComponent,
    ProfileEditSchoolModalComponent,
    MainProfileDataModalComponent,
    MainProfileProDataModalComponent,
    MainProfilePdfModalComponent,
    ProfileDescriptionModalComponent,
    ProfileTechModalComponent,
    ProfileEditLanguageModalComponent,
    ProfileEditCertificationModalComponent,
  ]
})
export class ProfileModule { }
