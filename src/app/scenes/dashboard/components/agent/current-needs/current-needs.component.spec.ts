import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentNeedsComponent } from './current-needs.component';

describe('CurrentNeedsComponent', () => {
  let component: CurrentNeedsComponent;
  let fixture: ComponentFixture<CurrentNeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentNeedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentNeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
