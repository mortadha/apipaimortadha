import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSchoolComponent } from './profile-school.component';

describe('ProfileSchoolComponent', () => {
  let component: ProfileSchoolComponent;
  let fixture: ComponentFixture<ProfileSchoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileSchoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
