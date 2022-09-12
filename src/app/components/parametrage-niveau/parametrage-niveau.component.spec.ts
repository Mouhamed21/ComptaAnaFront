import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrageNiveauComponent } from './parametrage-niveau.component';

describe('ParametrageNiveauComponent', () => {
  let component: ParametrageNiveauComponent;
  let fixture: ComponentFixture<ParametrageNiveauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametrageNiveauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametrageNiveauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
