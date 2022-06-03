import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProfileInfosComponent } from './main-profile-infos.component';

describe('MainProfileInfosComponent', () => {
  let component: MainProfileInfosComponent;
  let fixture: ComponentFixture<MainProfileInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainProfileInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainProfileInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
