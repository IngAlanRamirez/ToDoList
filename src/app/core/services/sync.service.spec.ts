import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { SyncService } from './sync.service';
import { SyncQueueItem, Task } from '../models/task.model';

const mockTask: Task = {
  id: '1',
  title: 'Test task',
  priority: 'medium',
  status: 'todo',
  tags: [],
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

const mockItem: SyncQueueItem = {
  taskId: '1',
  operation: 'create',
  retryCount: 0,
  payload: mockTask,
};

describe('SyncService', () => {
  let service: SyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyncService);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should complete after delay on success', async () => {
    vi.useFakeTimers();
    vi.spyOn(Math, 'random').mockReturnValue(0.5);

    let completed = false;
    service.syncTask(mockItem).subscribe({
      complete: () => {
        completed = true;
      },
    });

    await vi.advanceTimersByTimeAsync(1200);
    expect(completed).toBe(true);
  });

  it('should emit error after delay on simulated failure', async () => {
    vi.useFakeTimers();
    vi.spyOn(Math, 'random').mockReturnValue(0.05);

    let errored = false;
    service.syncTask(mockItem).subscribe({
      error: () => {
        errored = true;
      },
    });

    await vi.advanceTimersByTimeAsync(1200);
    expect(errored).toBe(true);
  });
});

