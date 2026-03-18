import { Injectable } from '@angular/core';

import { EMPTY, Observable, throwError, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { SyncQueueItem } from '../models/task.model';

const MIN_LATENCY_MS = 800;
const MAX_LATENCY_MS = 1200;
const FAILURE_RATE = 0.1;

@Injectable({ providedIn: 'root' })
export class SyncService {
  syncTask(item: SyncQueueItem): Observable<void> {
    const latency =
      MIN_LATENCY_MS + Math.random() * (MAX_LATENCY_MS - MIN_LATENCY_MS);

    return timer(latency).pipe(
      mergeMap(() => {
        if (Math.random() < FAILURE_RATE) {
          return throwError(
            () => new Error(`Sync failed for task ${item.taskId}`)
          );
        }

        return EMPTY;
      })
    );
  }
}

