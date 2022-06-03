import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedDescriptionComponent } from './need-description.component';

describe('NeedDescriptionComponent', () => {
  let component: NeedDescriptionComponent;
  let fixture: ComponentFixture<NeedDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeedDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
