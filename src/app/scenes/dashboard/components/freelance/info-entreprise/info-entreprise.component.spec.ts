import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEntrepriseComponent } from './info-entreprise.component';

describe('InfoEntrepriseComponent', () => {
  let component: InfoEntrepriseComponent;
  let fixture: ComponentFixture<InfoEntrepriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoEntrepriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
