import { TestBed } from '@angular/core/testing';

import { EntryWordListService } from './entry-word-list.service';

describe('EntryWordListService', () => {
  let service: EntryWordListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntryWordListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
