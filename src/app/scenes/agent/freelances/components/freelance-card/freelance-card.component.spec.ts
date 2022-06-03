import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelanceCardComponent } from './freelance-card.component';

describe('FreelanceCardComponent', () => {
  let component: FreelanceCardComponent;
  let fixture: ComponentFixture<FreelanceCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelanceCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelanceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
