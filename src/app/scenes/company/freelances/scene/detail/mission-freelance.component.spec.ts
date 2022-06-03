import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MissionFreelanceComponent } from './mission-freelance.component';

describe('MissionFreelanceComponent', () => {
  let component: MissionFreelanceComponent;
  let fixture: ComponentFixture<MissionFreelanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionFreelanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionFreelanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
