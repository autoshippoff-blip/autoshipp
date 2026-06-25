'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  async function fetchMe() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Important for HTTP-only cookies
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setRole(data.role || 'client');
      } else {
        setUser(null);
        setRole(null);
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setUser(null);
      setRole(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMe();
  }, []);

  async function login(email, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await res.json();
    setUser(data.user);
    setRole(data.user.role);
    return data;
  }

  async function register(email, password, name) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password, name }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    // Automatically log in after registration, or let the caller decide.
    // For now, we expect the user to log in or the register endpoint returns cookies.
    await fetchMe();
    return res.json();
  }

  async function logout() {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      setUser(null);
      setRole(null);
    }
  }

  async function resetPassword(email) {
    // TODO: Implement with NestJS
    console.warn('resetPassword not fully implemented in backend yet');
  }

  return (
    <AuthContext.Provider value={{ user, role, loading, login, logout, register, resetPassword, fetchMe }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
