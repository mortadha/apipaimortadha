import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFreelanceModalComponent } from './create-freelance-modal.component';

describe('CreateFreelanceModalComponent', () => {
  let component: CreateFreelanceModalComponent;
  let fixture: ComponentFixture<CreateFreelanceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFreelanceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFreelanceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
