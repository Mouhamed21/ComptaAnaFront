import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addcompte1Component } from './addcompte1.component';

describe('Addcompte1Component', () => {
  let component: Addcompte1Component;
  let fixture: ComponentFixture<Addcompte1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Addcompte1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Addcompte1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
