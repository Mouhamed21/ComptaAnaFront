import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addcompte2Component } from './addcompte2.component';

describe('Addcompte2Component', () => {
  let component: Addcompte2Component;
  let fixture: ComponentFixture<Addcompte2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Addcompte2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Addcompte2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
