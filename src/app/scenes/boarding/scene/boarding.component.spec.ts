import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardingComponent } from './boarding.component';

describe('BoardingClientComponent', () => {
  let component: BoardingComponent;
  let fixture: ComponentFixture<BoardingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
