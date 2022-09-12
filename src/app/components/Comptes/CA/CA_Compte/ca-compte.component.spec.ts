import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaCompteComponent } from './ca-compte.component';

describe('CaCompteComponent', () => {
  let component: CaCompteComponent;
  let fixture: ComponentFixture<CaCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaCompteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
