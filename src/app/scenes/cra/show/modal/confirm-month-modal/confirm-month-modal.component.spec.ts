import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmMonthModalComponent } from './confirm-month-modal.component';

describe('ConfirmMonthModalComponent', () => {
  let component: ConfirmMonthModalComponent;
  let fixture: ComponentFixture<ConfirmMonthModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmMonthModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmMonthModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
