import { TestBed } from '@angular/core/testing';

import { ParametrageNiveauServiceService } from './parametrage-niveau-service.service';

describe('ParametrageNiveauServiceService', () => {
  let service: ParametrageNiveauServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParametrageNiveauServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
