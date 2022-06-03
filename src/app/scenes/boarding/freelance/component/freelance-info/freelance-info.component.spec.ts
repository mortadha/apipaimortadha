import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelanceInfoComponent } from './freelance-info.component';

describe('FreelanceInfoComponent', () => {
  let component: FreelanceInfoComponent;
  let fixture: ComponentFixture<FreelanceInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelanceInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelanceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
