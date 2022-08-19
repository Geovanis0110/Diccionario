import { TestBed } from '@angular/core/testing';

import { EntryWordDescriptionService } from './entry-word-description.service';

describe('EntryWordDescriptionService', () => {
  let service: EntryWordDescriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntryWordDescriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
