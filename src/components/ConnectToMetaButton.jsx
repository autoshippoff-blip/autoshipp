'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '@/contexts/AuthContext';
import { MessageSquare, X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const MetaIcon = () => (
  <svg className="w-5 h-5 shrink-0 fill-current" viewBox="0 0 24 24">
    <path d="M19.14 7.6a5.19 5.19 0 0 0-3.67 1.5l-.23.23-.23-.23a5.19 5.19 0 0 0-7.34 0 5.19 5.19 0 0 0 0 7.34 5.19 5.19 0 0 0 7.34 0l.23-.23.23.23a5.19 5.19 0 0 0 7.34 0 5.19 5.19 0 0 0 0-7.34 5.19 5.19 0 0 0-3.67-1.53zm-10.96 6.3a2.6 2.6 0 1 1 0-3.68 2.6 2.6 0 0 1 0 3.68zm10.96 0a2.6 2.6 0 1 1 0-3.68 2.6 2.6 0 0 1 0 3.68z"/>
  </svg>
);

export default function ConnectToMetaButton({ className, onOpenBookDemo }) {
  const { user } = useAuth();
  
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('');
  const [toast, setToast] = useState(null); // { type: 'success'|'error', message: string }
  const [showDemoPrompt, setShowDemoPrompt] = useState(false);
  const [verifiedTenantId, setVerifiedTenantId] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Environment variables
  const FACEBOOK_APP_ID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '1238432954736435';
  const META_CONFIG_ID = process.env.NEXT_PUBLIC_META_CONFIG_ID || '1729387431576184';

  useEffect(() => {
    // Listen for messages from the Meta/FB Embedded Signup flow
    const messageHandler = (event) => {
      if (!event.data) return;

      if (event.data.type === 'WA_EMBEDDED_SIGNUP') {
        const data = event.data;
        if (data.event === 'FINISH') {
          handleOnboard(data);
        } else if (data.event === 'CANCEL') {
          showToast('error', 'User cancelled Meta setup');
          setStatus('idle');
        } else if (data.event === 'ERROR') {
          showToast('error', data.errorMessage || 'Meta setup failed');
          setStatus('idle');
        }
      }
    };

    window.addEventListener('message', messageHandler);
    return () => window.removeEventListener('message', messageHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifiedTenantId]);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  const loadFbSdk = () => {
    return new Promise((resolve, reject) => {
      if (window.FB) {
        resolve(window.FB);
        return;
      }

      // Check if script is already injected
      const existingScript = document.getElementById('facebook-jssdk');
      if (existingScript) {
        const interval = setInterval(() => {
          if (window.FB) {
            clearInterval(interval);
            resolve(window.FB);
          }
        }, 100);
        return;
      }

      // Load SDK Script
      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        window.fbAsyncInit = function () {
          window.FB.init({
            appId: FACEBOOK_APP_ID,
            cookie: true,
            xfbml: true,
            version: 'v19.0'
          });
          resolve(window.FB);
        };
      };
      script.onerror = () => reject(new Error('Failed to load Meta SDK'));
      document.body.appendChild(script);
    });
  };

  const handleConnectClick = async () => {
    // 1. Not logged in
    if (!user) {
      setShowDemoPrompt(true);
      return;
    }

    setStatus('loading');
    setStatusMessage('Verifying account...');

    try {
      // 2. Query NestJS backend to verify if client is active in core_accounts
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${API_URL}/auth/check-client`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include' // Send cookies
      });

      if (!res.ok) {
        throw new Error('Authentication check failed');
      }

      const clientInfo = await res.json();

      // 3. User has no active tenant/subscription
      if (!clientInfo.active || !clientInfo.tenantId) {
        setShowDemoPrompt(true);
        setStatus('idle');
        return;
      }

      // Success: Save tenant ID and initiate Meta SDK / Login
      setVerifiedTenantId(clientInfo.tenantId);
      launchMetaEmbeddedSignup(clientInfo.tenantId);

    } catch (err) {
      console.error(err);
      showToast('error', 'Network error. Please try again.');
      setStatus('idle');
    }
  };

  const launchMetaEmbeddedSignup = async (tenantId) => {
    setStatus('loading');
    setStatusMessage('Connecting to Meta...');

    try {
      const FB = await loadFbSdk();
      
      // Call Meta login with Embedded Signup settings
      FB.login(
        (response) => {
          if (response.authResponse) {
            const code = response.authResponse.code;
            window.__wa_auth_code = code; // temporarily store code
          } else {
            showToast('error', 'Meta login cancelled or not authorized.');
            setStatus('idle');
          }
        },
        {
          config_id: META_CONFIG_ID,
          response_type: 'code',
          override_default_response_type: true,
          scope: 'whatsapp_business_management,whatsapp_business_messaging,business_management'
        }
      );
    } catch (err) {
      showToast('error', 'Meta SDK could not be loaded. Please disable ad-blocker.');
      setStatus('idle');
    }
  };

  const handleOnboard = async (metaData) => {
    setStatus('loading');
    setStatusMessage('Onboarding WhatsApp...');

    try {
      const payload = {
        code: window.__wa_auth_code,
        tenantId: verifiedTenantId
      };

      const res = await fetch('/api/whatsapp/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setStatus('success');
        showToast('success', '✓ WhatsApp Connected Successfully');
        
        // Wait 2s to show success state, then redirect to Dashboard WhatsApp
        setTimeout(() => {
          window.location.href = '/brand/dashboard?tab=whatsapp';
        }, 2000);
      } else {
        showToast('error', 'Failed to save connection on Autoshipp servers.');
        setStatus('idle');
      }
    } catch (err) {
      showToast('error', 'Connection timed out. Please try again.');
      setStatus('idle');
    }
  };

  return (
    <>
      <button
        onClick={handleConnectClick}
        disabled={status === 'loading' || status === 'success'}
        className={`${className} cursor-pointer flex items-center justify-center gap-2.5 transition-all relative overflow-hidden`}
      >
        {status === 'idle' && (
          <>
            <MetaIcon />
            <span>Connect to Meta</span>
          </>
        )}

        {status === 'loading' && (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>{statusMessage || 'Connecting...'}</span>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle2 className="w-5 h-5 text-white" />
            <span>Connected ✓</span>
          </>
        )}
      </button>

      {/* Demo Modal Prompt for Non-Clients */}
      {showDemoPrompt && mounted && createPortal(
        <div className="fixed inset-0 z-[2000] overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowDemoPrompt(false)} />
            
            <div className="relative bg-card border border-border w-full max-w-md rounded-2xl shadow-2xl p-6 z-10 animate-in zoom-in-95 duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <button 
                  onClick={() => setShowDemoPrompt(false)}
                  className="p-1 hover:bg-muted border border-transparent hover:border-border rounded-lg text-muted-foreground transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <h3 className="text-lg font-bold text-foreground mb-2">Connect WhatsApp Business</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Connect your WhatsApp Business account after creating your Autoshipp workspace. Book a quick demo to get started.
              </p>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDemoPrompt(false)}
                  className="px-4 py-2 text-sm font-semibold border border-border rounded-xl hover:bg-muted transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowDemoPrompt(false);
                    if (onOpenBookDemo) onOpenBookDemo();
                  }}
                  className="px-5 py-2 text-sm font-semibold text-white bg-brand-orange hover:bg-brand-orange/90 rounded-xl transition-all shadow-md shadow-brand-orange/20 cursor-pointer"
                >
                  Book Demo
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Toast Notification Container */}
      {toast && mounted && createPortal(
        <div className="fixed bottom-5 right-5 z-[3000] p-4 rounded-xl border shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 bg-card text-foreground border-border max-w-sm">
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
          )}
          <span className="text-xs font-semibold">{toast.message}</span>
        </div>,
        document.body
      )}
    </>
  );
}
