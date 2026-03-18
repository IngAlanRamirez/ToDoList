export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in_progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: TaskStatus;
  tags: string[];
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  syncedAt?: string;
}

export interface SyncQueueItem {
  taskId: string;
  operation: 'create' | 'update' | 'delete';
  retryCount: number;
  payload: Task | null;
}

export interface TaskFilter {
  status: TaskStatus | 'all';
  priority: Priority | 'all';
  tags: string[];
  search: string;
}

export const DEFAULT_FILTER: TaskFilter = {
  status: 'all',
  priority: 'all',
  tags: [],
  search: '',
};

