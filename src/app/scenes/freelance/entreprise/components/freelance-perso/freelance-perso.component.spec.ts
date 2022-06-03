import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancePersoComponent } from './freelance-perso.component';

describe('FreelancePersoComponent', () => {
  let component: FreelancePersoComponent;
  let fixture: ComponentFixture<FreelancePersoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelancePersoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelancePersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
