import { appConfig } from './app.config';

describe('appConfig', () => {
  it('should expose providers for bootstrap (zoneless, router, errors)', () => {
    expect(Array.isArray(appConfig.providers)).toBe(true);
    expect(appConfig.providers.length).toBeGreaterThanOrEqual(3);
  });
});
