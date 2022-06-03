import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProfilePdfModalComponent } from './main-profile-pdf-modal.component';

describe('MainProfilePdfModalComponent', () => {
  let component: MainProfilePdfModalComponent;
  let fixture: ComponentFixture<MainProfilePdfModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainProfilePdfModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainProfilePdfModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
