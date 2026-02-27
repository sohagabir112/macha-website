
import { describe, it, expect, vi } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { middleware } from './middleware';

// Mock the updateSession function to avoid Supabase calls
vi.mock('@/utils/supabase/middleware', () => ({
  updateSession: vi.fn((request: NextRequest) => {
    return Promise.resolve(NextResponse.next({
      request,
    }));
  }),
}));

describe('Middleware Security Headers', () => {
  it('should add security headers to the response', async () => {
    const req = new NextRequest('http://localhost/');
    const res = await middleware(req);

    expect(res.headers.get('X-Frame-Options')).toBe('DENY');
    expect(res.headers.get('X-Content-Type-Options')).toBe('nosniff');
    expect(res.headers.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
    expect(res.headers.get('Permissions-Policy')).toBe('camera=(), microphone=(), geolocation=()');
  });
});
