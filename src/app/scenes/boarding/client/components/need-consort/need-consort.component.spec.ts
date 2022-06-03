import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedConsortComponent } from './need-consort.component';

describe('NeedConsortComponent', () => {
  let component: NeedConsortComponent;
  let fixture: ComponentFixture<NeedConsortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeedConsortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedConsortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
