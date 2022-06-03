import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignFreelanceListComponent } from './assign-freelance-list.component';

describe('AssignFreelanceList', () => {
  let component: AssignFreelanceListComponent;
  let fixture: ComponentFixture<AssignFreelanceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignFreelanceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignFreelanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
