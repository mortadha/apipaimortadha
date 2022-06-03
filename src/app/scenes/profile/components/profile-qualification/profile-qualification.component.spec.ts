import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileQualificationComponent } from './profile-qualification.component';

describe('ProfileSuiviComponent', () => {
  let component: ProfileQualificationComponent;
  let fixture: ComponentFixture<ProfileQualificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileQualificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
