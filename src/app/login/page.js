'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import BookDemoPopup from '@/components/BookDemoPopup';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookDemoOpen, setBookDemoOpen] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await login(email, password);
      const userRole = response.user?.role || 'brand';
      const destinations = { 
        admin: '/admin/dashboard', 
        super_admin: '/admin/dashboard', 
        brand: '/brand/dashboard', 
        aggregator: '/aggregator/dashboard' 
      };
      router.push(destinations[userRole] ?? '/brand/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 font-semibold text-xl tracking-tight text-foreground">
            <div className="w-8 h-8 rounded-md overflow-hidden">
              <img src="/images/logo.png" alt="Autoshipp Logo" className="w-full h-full object-contain" />
            </div>
            Autoshipp
          </Link>
        </div>

        {/* Card */}
        <div className="bg-card border border-border shadow-sm rounded-xl p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Login</h1>
            <p className="text-sm text-muted-foreground mt-1">Enter your details to access your account</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow sm:text-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-foreground" htmlFor="password">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow sm:text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors sm:text-sm"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-muted-foreground">
          Don't have an account?{' '}
          <button 
            type="button"
            onClick={() => setBookDemoOpen(true)}
            className="text-foreground font-medium hover:underline focus:outline-none"
          >
            Contact sales
          </button>
        </p>
      </div>

      <BookDemoPopup 
        isOpen={bookDemoOpen} 
        onClose={() => setBookDemoOpen(false)} 
      />
    </div>
  );
}

