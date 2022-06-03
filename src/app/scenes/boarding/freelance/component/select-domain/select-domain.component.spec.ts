import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDomainFreelanceComponent } from './select-domain.component';

describe('SelectDomainFreelanceComponent', () => {
  let component: SelectDomainFreelanceComponent;
  let fixture: ComponentFixture<SelectDomainFreelanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectDomainFreelanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDomainFreelanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
