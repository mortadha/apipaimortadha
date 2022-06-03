import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleConfirmValidationModalComponent } from './double-confirm-validation-modal.component';

describe('DoubleConfirmValidationModalComponent', () => {
  let component: DoubleConfirmValidationModalComponent;
  let fixture: ComponentFixture<DoubleConfirmValidationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoubleConfirmValidationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoubleConfirmValidationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
