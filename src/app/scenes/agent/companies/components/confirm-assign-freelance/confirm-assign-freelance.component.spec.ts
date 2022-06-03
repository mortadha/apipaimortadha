import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmAssignFreelanceComponent } from './confirm-assign-freelance.component';

describe('AssignFreelanceList', () => {
  let component: ConfirmAssignFreelanceComponent;
  let fixture: ComponentFixture<ConfirmAssignFreelanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmAssignFreelanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmAssignFreelanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
