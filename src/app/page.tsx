'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:3001';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Login failed');
      }

      // Optional: Store user role
      if (data.role) {
        localStorage.setItem('userRole', data.role);
      }

      router.push('/home');
    } catch (e: any) {
      setError(e.message ?? 'Login error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-container">
      <div className="login-box">
        <h1 className="login-title">Project Cecil Login</h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            disabled={loading || !username || !password}
            className="login-button"
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>
          {error && <p className="login-error">{error}</p>}
        </div>
      </div>
    </main>
  );
}
