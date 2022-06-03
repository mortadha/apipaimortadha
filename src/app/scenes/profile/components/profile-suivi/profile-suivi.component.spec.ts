import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSuiviComponent } from './profile-suivi.component';

describe('ProfileSuiviComponent', () => {
  let component: ProfileSuiviComponent;
  let fixture: ComponentFixture<ProfileSuiviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileSuiviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSuiviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
