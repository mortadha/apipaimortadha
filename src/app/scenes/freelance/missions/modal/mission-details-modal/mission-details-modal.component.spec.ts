import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionDetailsModalComponent } from './mission-details-modal.component';

describe('MissionDetailsModalComponent', () => {
  let component: MissionDetailsModalComponent;
  let fixture: ComponentFixture<MissionDetailsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionDetailsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
