import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelanceContactComponent } from './freelance-contact.component';

describe('NeedInfoFreelanceComponent', () => {
  let component: FreelanceContactComponent;
  let fixture: ComponentFixture<FreelanceContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelanceContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelanceContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
