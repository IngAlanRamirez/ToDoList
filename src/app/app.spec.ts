import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';
import { App } from './app';
import { routes } from './app.routes';
import { ThemeService } from './core/theme.service';
import { HomeComponent } from './home/home.component';

describe('App', () => {
  beforeEach(async () => {
    document.documentElement.removeAttribute('data-theme');
    localStorage.removeItem('todo-theme-preference');
    await TestBed.configureTestingModule({
      imports: [App, HomeComponent],
      providers: [ThemeService, provideRouter(routes)],
    }).compileComponents();
  });

  async function setupOutlet(): Promise<ReturnType<typeof TestBed.createComponent<App>>> {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/');
    fixture.detectChanges();
    await fixture.whenStable();
    return fixture;
  }

  function themeToggle(fixture: ReturnType<typeof TestBed.createComponent<App>>): HTMLInputElement {
    const el = fixture.nativeElement.querySelector(
      '[data-testid="theme-toggle"]',
    ) as HTMLInputElement;
    expect(el).toBeTruthy();
    return el;
  }

  function themeControlLabel(fixture: ReturnType<typeof TestBed.createComponent<App>>): HTMLElement {
    const input = themeToggle(fixture);
    return input.closest('label') as HTMLElement;
  }

  it('should create the app', async () => {
    const fixture = await setupOutlet();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render app title via title() in navbar', async () => {
    const fixture = await setupOutlet();
    const titleEl = fixture.nativeElement.querySelector('[data-testid="app-title"]');
    expect(titleEl?.textContent?.trim()).toBe('ToDoList');
  });

  it('should render app title in navbar', async () => {
    const fixture = await setupOutlet();
    expect(fixture.nativeElement.querySelector('.navbar')?.textContent).toContain('ToDoList');
  });

  it('should render HomeComponent inside router-outlet', async () => {
    const fixture = await setupOutlet();
    const home = fixture.nativeElement.querySelector('[data-testid="outlet-home"]');
    expect(home?.textContent?.trim()).toBe('Inicio');
  });

  it('should not render theme hint', async () => {
    const fixture = await setupOutlet();
    expect(fixture.nativeElement.querySelector('[data-testid="theme-hint"]')).toBeNull();
  });

  it('should use DaisyUI toggle theme-controller with value dark', async () => {
    const fixture = await setupOutlet();
    const input = themeToggle(fixture);
    expect(input.classList.contains('theme-controller')).toBe(true);
    expect(input.classList.contains('toggle')).toBe(true);
    expect(input.getAttribute('value')).toBe('dark');
  });

  it('should have theme toggle unchecked when light', async () => {
    const fixture = await setupOutlet();
    expect(themeToggle(fixture).checked).toBe(false);
  });

  it('should call theme toggle when checkbox changes', async () => {
    const fixture = await setupOutlet();
    const theme = TestBed.inject(ThemeService);
    const toggleSpy = vi.spyOn(theme, 'toggle');

    themeToggle(fixture).click();
    expect(toggleSpy).toHaveBeenCalledTimes(1);
  });

  it('should switch to dark then light on successive toggles', async () => {
    const fixture = await setupOutlet();
    const theme = TestBed.inject(ThemeService);

    expect(theme.mode()).toBe('light');
    themeToggle(fixture).click();
    fixture.detectChanges();
    expect(theme.mode()).toBe('dark');
    expect(themeToggle(fixture).checked).toBe(true);

    themeToggle(fixture).click();
    fixture.detectChanges();
    expect(theme.mode()).toBe('light');
    expect(themeToggle(fixture).checked).toBe(false);
  });

  it('should set aria-label on theme control for light and dark', async () => {
    const fixture = await setupOutlet();
    const label = themeControlLabel(fixture);
    expect(label.getAttribute('aria-label')).toBe('Activar tema oscuro');

    themeToggle(fixture).click();
    fixture.detectChanges();
    expect(themeControlLabel(fixture).getAttribute('aria-label')).toBe('Activar tema claro');
  });
});
