import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditSchoolModalComponent } from './profile-edit-school-modal.component';

describe('ProfileEditSchoolModalComponent', () => {
  let component: ProfileEditSchoolModalComponent;
  let fixture: ComponentFixture<ProfileEditSchoolModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileEditSchoolModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditSchoolModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
