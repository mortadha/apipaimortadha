import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentProfileModalComponent } from './agent-profile.component';

describe('AgentProfileComponent', () => {
  let component: AgentProfileModalComponent;
  let fixture: ComponentFixture<AgentProfileModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentProfileModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentProfileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
