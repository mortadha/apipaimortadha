import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileExperiencesComponent } from './profile-experiences.component';

describe('ProfileExperiencesComponent', () => {
  let component: ProfileExperiencesComponent;
  let fixture: ComponentFixture<ProfileExperiencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileExperiencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileExperiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
