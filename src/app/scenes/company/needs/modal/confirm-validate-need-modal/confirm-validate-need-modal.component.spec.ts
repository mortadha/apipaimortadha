import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmValidateNeedModalComponent } from './confirm-validate-need-modal.component';

describe('ConfirmValidateNeedModalComponent', () => {
  let component: ConfirmValidateNeedModalComponent;
  let fixture: ComponentFixture<ConfirmValidateNeedModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmValidateNeedModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmValidateNeedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
