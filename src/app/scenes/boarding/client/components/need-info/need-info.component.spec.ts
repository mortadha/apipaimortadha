import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedInfoClientComponent } from './need-info.component';

describe('NeedInfoClientComponent', () => {
  let component: NeedInfoClientComponent;
  let fixture: ComponentFixture<NeedInfoClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeedInfoClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedInfoClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
