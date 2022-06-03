import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLanguagesComponent } from './profile-languages.component';

describe('ProfileExperiencesComponent', () => {
  let component: ProfileLanguagesComponent;
  let fixture: ComponentFixture<ProfileLanguagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileLanguagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
