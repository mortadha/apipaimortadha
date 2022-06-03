import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardingFreelanceComponent } from './boarding-freelance.component';

describe('BoardingClientComponent', () => {
  let component: BoardingFreelanceComponent;
  let fixture: ComponentFixture<BoardingFreelanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardingFreelanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardingFreelanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
