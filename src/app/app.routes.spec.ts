import { routes } from './app.routes';
import { HomeComponent } from './home/home.component';

describe('routes', () => {
  it('should be a Routes array', () => {
    expect(Array.isArray(routes)).toBe(true);
  });

  it('should map root path to HomeComponent', () => {
    expect(routes.length).toBe(1);
    expect(routes[0].path).toBe('');
    expect(routes[0].component).toBe(HomeComponent);
  });
});
