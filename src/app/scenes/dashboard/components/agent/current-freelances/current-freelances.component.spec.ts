import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentFreelancesComponent } from './current-frelances.component';

describe('CurrentFreelancesComponent', () => {
  let component: CurrentFreelancesComponent;
  let fixture: ComponentFixture<CurrentFreelancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentFreelancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentFreelancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
