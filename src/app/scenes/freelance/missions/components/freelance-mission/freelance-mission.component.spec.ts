import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelanceMissionComponent } from './freelance-mission.component';

describe('FreelanceMissionComponent', () => {
  let component: FreelanceMissionComponent;
  let fixture: ComponentFixture<FreelanceMissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelanceMissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelanceMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
