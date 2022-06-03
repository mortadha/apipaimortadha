import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditCertificationModalComponent } from './profile-edit-certification-modal.component';

describe('ProfileEditSchoolModalComponent', () => {
  let component: ProfileEditCertificationModalComponent;
  let fixture: ComponentFixture<ProfileEditCertificationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileEditCertificationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditCertificationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
