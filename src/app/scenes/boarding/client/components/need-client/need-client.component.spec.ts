import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedClientComponent } from './need-client.component';

describe('NeedClientComponent', () => {
  let component: NeedClientComponent;
  let fixture: ComponentFixture<NeedClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeedClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
