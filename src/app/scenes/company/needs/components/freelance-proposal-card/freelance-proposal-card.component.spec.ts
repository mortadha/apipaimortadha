import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelanceProposalCardComponent } from './freelance-proposal-card.component';

describe('FreelanceProposalCardComponent', () => {
  let component: FreelanceProposalCardComponent;
  let fixture: ComponentFixture<FreelanceProposalCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelanceProposalCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelanceProposalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
