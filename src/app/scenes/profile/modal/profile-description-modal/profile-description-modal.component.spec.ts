import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProfileInfosModalComponent } from './main-profile-infos-modal.component';

describe('MainProfileInfosModalComponent', () => {
  let component: MainProfileInfosModalComponent;
  let fixture: ComponentFixture<MainProfileInfosModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainProfileInfosModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainProfileInfosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
