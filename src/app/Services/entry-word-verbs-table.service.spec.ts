import { TestBed } from '@angular/core/testing';

import { EntryWordVerbsTableService } from './entry-word-verbs-table.service';

describe('EntryWordVerbsTableService', () => {
  let service: EntryWordVerbsTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntryWordVerbsTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
