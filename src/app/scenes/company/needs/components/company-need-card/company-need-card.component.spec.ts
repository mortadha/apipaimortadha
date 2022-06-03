import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyNeedCardComponent } from './company-need-card.component';

describe('CompanyNeedCardComponent', () => {
  let component: CompanyNeedCardComponent;
  let fixture: ComponentFixture<CompanyNeedCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyNeedCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyNeedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
