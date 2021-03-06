import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedComponent } from './need.component';

describe('FreelanceMissionComponent', () => {
  let component: NeedComponent;
  let fixture: ComponentFixture<NeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
