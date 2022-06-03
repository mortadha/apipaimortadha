import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsListingComponent } from './documents-listing.component';

describe('DocumentsListingComponent', () => {
  let component: DocumentsListingComponent;
  let fixture: ComponentFixture<DocumentsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
