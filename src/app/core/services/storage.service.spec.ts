import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { StorageService } from './storage.service';
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

const mockQueueItem: SyncQueueItem = {
  taskId: '1',
  operation: 'create',
  retryCount: 0,
  payload: mockTask,
};

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
    localStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('should return empty tasks when nothing is stored', () => {
    expect(service.getTasks()).toEqual([]);
  });

  it('should persist and restore tasks', () => {
    service.saveTasks([mockTask]);
    expect(service.getTasks()).toEqual([mockTask]);
  });

  it('should return empty tasks on invalid JSON', () => {
    localStorage.setItem('todo_tasks', 'invalid-json');
    expect(service.getTasks()).toEqual([]);
  });

  it('should return empty arrays when localStorage is undefined', () => {
    vi.stubGlobal('localStorage', undefined as any);
    expect(service.getTasks()).toEqual([]);
    expect(service.getSyncQueue()).toEqual([]);
    expect(() => service.saveTasks([mockTask])).not.toThrow();
    expect(() => service.saveSyncQueue([mockQueueItem])).not.toThrow();
  });

  it('should ignore errors when saveTasks JSON.stringify throws', () => {
    const circular: any = { ...mockTask };
    circular.self = circular;

    expect(() => service.saveTasks([circular])).not.toThrow();
  });

  it('should ignore errors when saveSyncQueue JSON.stringify throws', () => {
    const circular: any = { ...mockTask };
    circular.self = circular;

    const circularQueue: SyncQueueItem = {
      ...mockQueueItem,
      payload: circular,
    };

    expect(() => service.saveSyncQueue([circularQueue])).not.toThrow();
  });

  it('should return empty sync queue when nothing is stored', () => {
    expect(service.getSyncQueue()).toEqual([]);
  });

  it('should persist and restore sync queue', () => {
    service.saveSyncQueue([mockQueueItem]);
    expect(service.getSyncQueue()).toEqual([mockQueueItem]);
  });

  it('should return empty sync queue on invalid JSON', () => {
    localStorage.setItem('todo_sync_queue', 'invalid-json');
    expect(service.getSyncQueue()).toEqual([]);
  });
});

