import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedDetailsComponent } from './need-details.component';

describe('NeedDetailsComponent', () => {
  let component: NeedDetailsComponent;
  let fixture: ComponentFixture<NeedDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeedDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
