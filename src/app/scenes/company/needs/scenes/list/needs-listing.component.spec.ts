import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedsListingComponent } from './needs-listing.component';

describe('NeedsListingComponent', () => {
  let component: NeedsListingComponent;
  let fixture: ComponentFixture<NeedsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeedsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
