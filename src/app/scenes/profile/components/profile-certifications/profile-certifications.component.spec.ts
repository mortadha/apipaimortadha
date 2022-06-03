import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCertificationsComponent } from './profile-certifications.component';

describe('ProfileCertificationsComponent', () => {
  let component: ProfileCertificationsComponent;
  let fixture: ComponentFixture<ProfileCertificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCertificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCertificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
