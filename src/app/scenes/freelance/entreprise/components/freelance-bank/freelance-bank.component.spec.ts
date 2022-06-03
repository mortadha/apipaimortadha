import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelanceBankComponent } from './freelance-bank.component';

describe('FreelanceBankComponent', () => {
  let component: FreelanceBankComponent;
  let fixture: ComponentFixture<FreelanceBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelanceBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelanceBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
