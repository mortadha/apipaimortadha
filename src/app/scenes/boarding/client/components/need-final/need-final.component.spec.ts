import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedFinalComponent } from './need-final.component';

describe('NeedFinalComponent', () => {
  let component: NeedFinalComponent;
  let fixture: ComponentFixture<NeedFinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeedFinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
