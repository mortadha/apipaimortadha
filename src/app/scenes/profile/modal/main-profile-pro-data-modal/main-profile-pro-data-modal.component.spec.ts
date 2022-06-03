import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProfileProDataModalComponent } from './main-profile-pro-data-modal.component';

describe('MainProfileDataModalComponent', () => {
  let component: MainProfileProDataModalComponent;
  let fixture: ComponentFixture<MainProfileProDataModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainProfileProDataModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainProfileProDataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
