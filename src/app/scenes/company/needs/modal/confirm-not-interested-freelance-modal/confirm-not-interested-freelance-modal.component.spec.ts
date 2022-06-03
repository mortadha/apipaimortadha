import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmNotInterestedFreelanceModalComponent } from './confirm-not-interested-freelance-modal.component';

describe('ConfirmNotInterestedCompanyModalComponent', () => {
  let component: ConfirmNotInterestedFreelanceModalComponent;
  let fixture: ComponentFixture<ConfirmNotInterestedFreelanceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmNotInterestedFreelanceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmNotInterestedFreelanceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
