import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditExperienceModalComponent } from './profile-edit-experience-modal.component';

describe('ProfileEditExperienceModalComponent', () => {
  let component: ProfileEditExperienceModalComponent;
  let fixture: ComponentFixture<ProfileEditExperienceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileEditExperienceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditExperienceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
