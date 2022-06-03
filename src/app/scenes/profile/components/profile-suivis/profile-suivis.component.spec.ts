import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSuivisComponent } from './profile-suivis.component';

describe('ProfileSuiviComponent', () => {
  let component: ProfileSuivisComponent;
  let fixture: ComponentFixture<ProfileSuivisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileSuivisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSuivisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
