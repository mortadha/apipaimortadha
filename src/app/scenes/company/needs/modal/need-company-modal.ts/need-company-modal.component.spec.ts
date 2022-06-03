import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedCompanyModalComponent } from './need-company-modal.component';

describe('ConfirmNotInterestedCompanyModalComponent', () => {
  let component: NeedCompanyModalComponent;
  let fixture: ComponentFixture<NeedCompanyModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeedCompanyModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedCompanyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
