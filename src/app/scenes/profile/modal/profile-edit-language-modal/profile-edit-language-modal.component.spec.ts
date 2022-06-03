import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditLanguageModalComponent } from './profile-edit-language-modal.component';

describe('ProfileEditSchoolModalComponent', () => {
  let component: ProfileEditLanguageModalComponent;
  let fixture: ComponentFixture<ProfileEditLanguageModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileEditLanguageModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditLanguageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
