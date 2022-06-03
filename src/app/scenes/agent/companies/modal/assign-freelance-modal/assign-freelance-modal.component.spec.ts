import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignFreelanceModalComponent } from './assign-freelance-modal.component';

describe('AssignFreelanceModalComponent', () => {
  let component: AssignFreelanceModalComponent;
  let fixture: ComponentFixture<AssignFreelanceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignFreelanceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignFreelanceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
