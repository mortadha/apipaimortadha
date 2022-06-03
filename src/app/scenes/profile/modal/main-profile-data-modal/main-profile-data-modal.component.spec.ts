import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProfileDataModalComponent } from './main-profile-data-modal.component';

describe('MainProfileDataModalComponent', () => {
  let component: MainProfileDataModalComponent;
  let fixture: ComponentFixture<MainProfileDataModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainProfileDataModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainProfileDataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
