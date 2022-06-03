import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedProfileClientComponent } from './need-profile.component';

describe('NeedProfileClientComponent', () => {
  let component: NeedProfileClientComponent;
  let fixture: ComponentFixture<NeedProfileClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeedProfileClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedProfileClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
