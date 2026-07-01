'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginTempClient(formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const expectedEmail = process.env.TEMP_CLIENT_EMAIL;
  const expectedPassword = process.env.TEMP_CLIENT_PASSWORD;

  if (!expectedEmail || !expectedPassword) {
    return { error: 'Temporary credentials are not configured on the server.' };
  }

  if (email === expectedEmail && password === expectedPassword) {
    cookies().set('temp_client_session', 'authenticated', {
      maxAge: 60 * 60 * 8, // 8 hours
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      httpOnly: true,
      path: '/',
    });
    
    redirect('/client-dashboard');
  }

  return { error: 'Invalid credentials. Please try again.' };
}

export async function logoutTempClient() {
  cookies().delete('temp_client_session');
  redirect('/client-login');
}
