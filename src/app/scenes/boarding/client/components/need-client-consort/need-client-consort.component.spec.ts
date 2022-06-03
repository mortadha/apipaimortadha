import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedClientConsortComponent } from './need-client-consort.component';

describe('NeedClientConsortComponent', () => {
  let component: NeedClientConsortComponent;
  let fixture: ComponentFixture<NeedClientConsortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeedClientConsortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedClientConsortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
