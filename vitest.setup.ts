import '@testing-library/jest-dom/vitest'

vi.mock('$app/env/public', () => ({ PUBLIC_SITE_URL: 'http://localhost:5173' }))
