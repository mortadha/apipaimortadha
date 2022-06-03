import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentListingMissionComponent } from './documents-listing-mission.component';

describe('DocumentListingMissionComponent', () => {
  let component: DocumentListingMissionComponent;
  let fixture: ComponentFixture<DocumentListingMissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentListingMissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentListingMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
