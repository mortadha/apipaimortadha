import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignFreelanceRowComponent } from './assign-freelance-row.component';

describe('AssignFreelanceRowComponent', () => {
  let component: AssignFreelanceRowComponent;
  let fixture: ComponentFixture<AssignFreelanceRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignFreelanceRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignFreelanceRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
