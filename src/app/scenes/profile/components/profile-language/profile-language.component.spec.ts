import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLanguageComponent } from './profile-language.component';

describe('ProfileExperienceComponent', () => {
  let component: ProfileLanguageComponent;
  let fixture: ComponentFixture<ProfileLanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileLanguageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
