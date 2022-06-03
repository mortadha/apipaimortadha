import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentMissionComponent } from './current-mission.component';

describe('CurrentMissionComponent', () => {
  let component: CurrentMissionComponent;
  let fixture: ComponentFixture<CurrentMissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentMissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
