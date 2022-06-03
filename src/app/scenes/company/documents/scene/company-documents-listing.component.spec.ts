import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDocumentsListingComponent } from './company-documents-listing.component';

describe('CompanyDocumentsListingComponent', () => {
  let component: CompanyDocumentsListingComponent;
  let fixture: ComponentFixture<CompanyDocumentsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyDocumentsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDocumentsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
