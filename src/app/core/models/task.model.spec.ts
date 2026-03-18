import { DEFAULT_FILTER } from './task.model';

describe('task.model', () => {
  it('DEFAULT_FILTER should match expected defaults', () => {
    expect(DEFAULT_FILTER).toEqual({
      status: 'all',
      priority: 'all',
      tags: [],
      search: '',
    });
  });
});

