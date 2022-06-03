import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelanceProComponent } from './freelance-pro.component';

describe('FreelanceProComponent', () => {
  let component: FreelanceProComponent;
  let fixture: ComponentFixture<FreelanceProComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelanceProComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelanceProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
