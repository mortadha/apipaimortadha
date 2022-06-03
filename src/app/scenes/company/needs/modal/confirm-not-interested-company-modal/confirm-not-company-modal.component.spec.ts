import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmNotInterestedCompanyModalComponent } from './confirm-not-interested-company-modal.component';

describe('ConfirmNotInterestedCompanyModalComponent', () => {
  let component: ConfirmNotInterestedCompanyModalComponent;
  let fixture: ComponentFixture<ConfirmNotInterestedCompanyModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmNotInterestedCompanyModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmNotInterestedCompanyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
