import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNeedModalComponent } from './create-need-modal.component';

describe('CreateNeedModalComponent', () => {
  let component: CreateNeedModalComponent;
  let fixture: ComponentFixture<CreateNeedModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNeedModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNeedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
