import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgCompteComponent } from './cg-compte.component';

describe('CgCompteComponent', () => {
  let component: CgCompteComponent;
  let fixture: ComponentFixture<CgCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CgCompteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CgCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
