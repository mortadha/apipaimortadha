import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelanceEntrepriseComponent } from './freelance-entreprise.component';

describe('FreelanceEntrepriseComponent', () => {
  let component: FreelanceEntrepriseComponent;
  let fixture: ComponentFixture<FreelanceEntrepriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelanceEntrepriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelanceEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
