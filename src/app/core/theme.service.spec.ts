import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme');
    localStorage.removeItem('todo-theme-preference');
  });

  function setupBrowser(): ThemeService {
    TestBed.configureTestingModule({
      providers: [ThemeService, { provide: PLATFORM_ID, useValue: 'browser' }],
    });
    return TestBed.inject(ThemeService);
  }

  it('should default to light and set data-theme light', () => {
    const service = setupBrowser();
    expect(service.mode()).toBe('light');
    expect(service.isDark()).toBe(false);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('should set dark and persist', () => {
    const service = setupBrowser();
    service.setMode('dark');
    expect(service.mode()).toBe('dark');
    expect(service.isDark()).toBe(true);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('todo-theme-preference')).toBe('dark');
  });

  it('should toggle light to dark and back', () => {
    const service = setupBrowser();
    expect(service.mode()).toBe('light');
    service.toggle();
    expect(service.mode()).toBe('dark');
    service.toggle();
    expect(service.mode()).toBe('light');
  });

  it('should load stored dark on init', () => {
    localStorage.setItem('todo-theme-preference', 'dark');
    TestBed.resetTestingModule();
    const service = setupBrowser();
    expect(service.mode()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should treat invalid or system stored value as light', () => {
    localStorage.setItem('todo-theme-preference', 'system');
    TestBed.resetTestingModule();
    const service = setupBrowser();
    expect(service.mode()).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('should not write localStorage when not in browser', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [ThemeService, { provide: PLATFORM_ID, useValue: 'server' }],
    });
    const service = TestBed.inject(ThemeService);
    expect(service.mode()).toBe('light');
    service.setMode('dark');
    expect(service.mode()).toBe('dark');
    expect(localStorage.getItem('todo-theme-preference')).toBeNull();
  });
});
