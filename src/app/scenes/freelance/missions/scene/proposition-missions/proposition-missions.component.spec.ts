import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PropositionMissionsComponent } from './proposition-missions.component';

describe('PropositionMissionsComponent', () => {
  let component: PropositionMissionsComponent;
  let fixture: ComponentFixture<PropositionMissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropositionMissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropositionMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
