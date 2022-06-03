import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyDatesMissionModalComponent } from './modify-dates-mission-modal.component';

describe('ModifyDatesMissionModalComponent', () => {
  let component: ModifyDatesMissionModalComponent;
  let fixture: ComponentFixture<ModifyDatesMissionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyDatesMissionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyDatesMissionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
