import { Injectable } from '@angular/core';

import { SyncQueueItem, Task } from '../models/task.model';

const TASKS_KEY = 'todo_tasks';
const QUEUE_KEY = 'todo_sync_queue';

@Injectable({ providedIn: 'root' })
export class StorageService {
  getTasks(): Task[] {
    try {
      if (typeof localStorage === 'undefined') return [];
      const raw = localStorage.getItem(TASKS_KEY);
      return raw ? (JSON.parse(raw) as Task[]) : [];
    } catch {
      return [];
    }
  }

  saveTasks(tasks: Task[]): void {
    try {
      if (typeof localStorage === 'undefined') return;
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    } catch {
    }
  }

  getSyncQueue(): SyncQueueItem[] {
    try {
      if (typeof localStorage === 'undefined') return [];
      const raw = localStorage.getItem(QUEUE_KEY);
      return raw ? (JSON.parse(raw) as SyncQueueItem[]) : [];
    } catch {
      return [];
    }
  }

  saveSyncQueue(queue: SyncQueueItem[]): void {
    try {
      if (typeof localStorage === 'undefined') return;
      localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
    } catch {
    }
  }
}

