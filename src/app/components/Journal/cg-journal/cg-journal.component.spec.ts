import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CGJournalComponent } from './cg-journal.component';

describe('CGJournalComponent', () => {
  let component: CGJournalComponent;
  let fixture: ComponentFixture<CGJournalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CGJournalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CGJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
