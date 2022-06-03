import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardingClientComponent } from './boarding-client.component';

describe('BoardingClientComponent', () => {
  let component: BoardingClientComponent;
  let fixture: ComponentFixture<BoardingClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardingClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardingClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
