import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsortFinalComponent } from './consort-final.component';

describe('ConsortFinalComponent', () => {
  let component: ConsortFinalComponent;
  let fixture: ComponentFixture<ConsortFinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsortFinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsortFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
