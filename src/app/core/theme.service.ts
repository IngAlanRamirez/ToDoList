import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'todo-theme-preference';

@Injectable()
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);

  readonly mode = signal<ThemeMode>('light');

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    const initial: ThemeMode =
      stored === 'light' || stored === 'dark' ? stored : 'light';
    this.mode.set(initial);
    this.applyDom(initial);
  }

  isDark(): boolean {
    return this.mode() === 'dark';
  }

  setMode(value: ThemeMode): void {
    this.mode.set(value);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(STORAGE_KEY, value);
      this.applyDom(value);
    }
  }

  toggle(): void {
    this.setMode(this.mode() === 'light' ? 'dark' : 'light');
  }

  private applyDom(value: ThemeMode): void {
    document.documentElement.setAttribute('data-theme', value);
  }
}
