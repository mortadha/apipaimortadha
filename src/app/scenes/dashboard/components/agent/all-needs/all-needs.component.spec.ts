import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllNeedsComponent } from './all-needs.component';

describe('AllNeedsComponent', () => {
  let component: AllNeedsComponent;
  let fixture: ComponentFixture<AllNeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllNeedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllNeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
