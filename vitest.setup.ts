import '@testing-library/jest-dom/vitest'

vi.mock('$app/env/public', () => ({
  PUBLIC_SITE_URL: 'http://localhost:5173',
  PUBLIC_GLITCHTIP_DSN: undefined,
  PUBLIC_GLITCHTIP_ENVIRONMENT: undefined,
}))
vi.mock('$app/env/private', () => ({
  MAINTENANCE: '0',
  DEV_ROUTES: '0',
  GLITCHTIP_DSN: undefined,
}))
