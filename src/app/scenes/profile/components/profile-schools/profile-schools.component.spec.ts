import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSchoolsComponent } from './profile-schools.component';

describe('ProfileSchoolsComponent', () => {
  let component: ProfileSchoolsComponent;
  let fixture: ComponentFixture<ProfileSchoolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileSchoolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSchoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
