import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelanceCvComponent } from './freelance-cv.component';

describe('FreelanceCvComponent', () => {
  let component: FreelanceCvComponent;
  let fixture: ComponentFixture<FreelanceCvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelanceCvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelanceCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
