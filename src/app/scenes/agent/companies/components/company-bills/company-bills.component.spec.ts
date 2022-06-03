import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyBillsComponent } from './company-bills.component';

describe('CompanyBillsComponent', () => {
  let component: CompanyBillsComponent;
  let fixture: ComponentFixture<CompanyBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
