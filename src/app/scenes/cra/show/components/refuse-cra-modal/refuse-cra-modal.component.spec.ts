import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefuseCraModalComponent } from './refuse-cra-modal.component';

describe('RefuseCraModalComponent', () => {
  let component: RefuseCraModalComponent;
  let fixture: ComponentFixture<RefuseCraModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefuseCraModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefuseCraModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
