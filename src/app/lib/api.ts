const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

export interface ApiResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

function getAccessToken(): string | null {
  if (typeof document === 'undefined') return null;
  // Try cookie first
  const match = document.cookie.match(/(?:^|;\s*)access_token=([^;]+)/);
  return match ? decodeURIComponent(match[1] ?? '') : null;
}

export function setAccessToken(token: string): void {
  document.cookie = `access_token=${encodeURIComponent(token)}; path=/; max-age=${15 * 60}; SameSite=Strict; Secure`;
}

export function clearAccessToken(): void {
  document.cookie = 'access_token=; path=/; max-age=0; SameSite=Strict';
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<ApiResult<T>> {
  const token = getAccessToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${BACKEND_URL}${path}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return {
        success: false,
        error: body.error || `HTTP ${res.status}`,
      };
    }

    const data = await res.json();
    return { success: true, data: data as T };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Network error',
    };
  }
}