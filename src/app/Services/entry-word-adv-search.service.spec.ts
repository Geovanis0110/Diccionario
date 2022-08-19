import { TestBed } from '@angular/core/testing';

import { EntryWordAdvSearchService } from './entry-word-adv-search.service';

describe('EntryWordAdvSearchService', () => {
  let service: EntryWordAdvSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntryWordAdvSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
