import { TestBed } from '@angular/core/testing';

import { EntryWordSuggestService } from './entry-word-suggest.service';

describe('EntryWordSuggestService', () => {
  let service: EntryWordSuggestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntryWordSuggestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
