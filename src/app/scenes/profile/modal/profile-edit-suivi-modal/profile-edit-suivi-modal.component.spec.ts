import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditSuiviModalComponent } from './profile-edit-suvi-modal.component';

describe('ProfileEditSuiviModalComponent', () => {
  let component: ProfileEditSuiviModalComponent;
  let fixture: ComponentFixture<ProfileEditSuiviModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileEditSuiviModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditSuiviModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
