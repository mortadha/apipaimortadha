import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelanceFinalComponent } from './freelance-final.component';

describe('NeedInfoFreelanceComponent', () => {
  let component: FreelanceFinalComponent;
  let fixture: ComponentFixture<FreelanceFinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelanceFinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelanceFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
