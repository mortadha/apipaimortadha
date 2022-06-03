import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPopoverComponent } from './confirm-popover.component';

describe('ConfirmPopoverComponent', () => {
  let component: ConfirmPopoverComponent;
  let fixture: ComponentFixture<ConfirmPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
