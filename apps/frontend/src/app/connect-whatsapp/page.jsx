"use client";

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { CheckCircle2, MessageCircle, XCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ConnectWhatsApp() {
  const [status, setStatus] = useState('initial'); // 'initial', 'loading', 'success', 'error'
  const [loadingMessage, setLoadingMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Use the provided IDs
  const APP_ID = '1238432954736435';
  const CONFIG_ID = '1729387431576184';

  useEffect(() => {
    // Initialize FB SDK once loaded
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v19.0'
      });
    };

    // Listen for messages from the Embedded Signup flow
    const messageHandler = (event) => {
      if (!event.data) return;

      if (event.data.type === 'WA_EMBEDDED_SIGNUP') {
        const data = event.data;
        if (data.event === 'FINISH') {
          finalizeConnection(data);
        } else if (data.event === 'CANCEL') {
          setStatus('error');
          setErrorMessage('User cancelled setup');
        } else if (data.event === 'ERROR') {
          setStatus('error');
          setErrorMessage(data.errorMessage || 'Connection failed');
        }
      }
    };

    window.addEventListener('message', messageHandler);
    return () => window.removeEventListener('message', messageHandler);
  }, []);

  const loginCallback = async (response) => {
    if (response.authResponse) {
      const code = response.authResponse.code;
      setStatus('loading');
      setLoadingMessage('Verifying WhatsApp account...');
      window.__wa_auth_code = code;
    } else {
      setStatus('error');
      setErrorMessage('User cancelled login or did not fully authorize.');
    }
  };

  const finalizeConnection = async (data) => {
    setStatus('loading');
    setLoadingMessage('Finalizing setup...');
    
    const payload = {
      authorization_code: window.__wa_auth_code,
      waba_id: data.waba_id,
      phone_number_id: data.phone_number_id,
    };

    try {
      const res = await fetch('/api/whatsapp/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage('Failed to connect with our servers.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Network error occurred.');
    }
  };

  const launchWhatsAppSignup = () => {
    setStatus('loading');
    setLoadingMessage('Connecting to Meta...');
    setErrorMessage('');

    if (window.FB) {
      window.FB.login(loginCallback, {
        config_id: CONFIG_ID,
        response_type: 'code',
        override_default_response_type: true,
        extras: {
          setup: {},
          dataPath: '',
          sessionInfoVersion: '3',
          version: 'v4'
        }
      });
    } else {
      setStatus('error');
      setErrorMessage('Facebook SDK not loaded properly. Please refresh.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Script src="https://connect.facebook.net/en_US/sdk.js" strategy="lazyOnload" />

      <div className="w-full max-w-[480px]">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 font-semibold text-xl tracking-tight text-foreground">
            <div className="w-8 h-8 rounded-md overflow-hidden">
              <img src="/images/logo.png" alt="Autoshipp Logo" className="w-full h-full object-contain" />
            </div>
            Autoshipp
          </Link>
        </div>

        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden p-8">
          {status === 'initial' && (
            <div className="text-center">
              <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-[#25D366]" />
              </div>
              <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-3">
                Connect WhatsApp
              </h1>
              <p className="text-sm text-muted-foreground mb-8">
                Connect your WhatsApp Business account to enable automated order confirmations and tracking updates.
              </p>
              <button
                onClick={launchWhatsAppSignup}
                className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-medium py-3 rounded-md transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                Connect via Meta
              </button>
            </div>
          )}

          {status === 'loading' && (
            <div className="text-center py-8">
              <div className="mx-auto mb-6 w-12 h-12 border-4 border-muted rounded-full border-t-[#25D366] animate-spin" />
              <h2 className="text-xl font-semibold text-foreground tracking-tight mb-2">
                {loadingMessage}
              </h2>
              <p className="text-sm text-muted-foreground">
                Please wait while we establish a secure connection.
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground tracking-tight mb-3">
                Successfully Connected
              </h2>
              <p className="text-sm text-muted-foreground mb-8">
                Your WhatsApp Business account is now linked to Autoshipp.
              </p>
              <Link
                href="/brand/dashboard"
                className="w-full bg-primary text-primary-foreground font-medium py-3 rounded-md transition-colors flex items-center justify-center gap-2"
              >
                Go to Dashboard
                <ArrowRight size={16} />
              </Link>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-8 h-8 text-destructive" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground tracking-tight mb-3">
                Connection Failed
              </h2>
              <p className="text-sm font-medium text-destructive mb-8 px-4 py-3 bg-destructive/10 rounded-md">
                {errorMessage}
              </p>
              <button
                onClick={() => setStatus('initial')}
                className="w-full border border-border text-foreground font-medium py-3 rounded-md hover:bg-muted transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
