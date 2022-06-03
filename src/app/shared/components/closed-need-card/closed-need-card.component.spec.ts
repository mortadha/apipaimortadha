import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedNeedCardComponent } from './closed-need-card.component';

describe('NeedCardComponent', () => {
  let component: ClosedNeedCardComponent;
  let fixture: ComponentFixture<ClosedNeedCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedNeedCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedNeedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
