import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileContactComponent } from './profile-contact.component';

describe('ProfileContactComponenent', () => {
  let component: ProfileContactComponent;
  let fixture: ComponentFixture<ProfileContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
