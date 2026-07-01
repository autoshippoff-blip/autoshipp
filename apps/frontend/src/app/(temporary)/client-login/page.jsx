'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { motion } from 'framer-motion';
import { loginTempClient } from './actions';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { FadeInUp } from '@/components/AnimatedUI';
import Image from 'next/image';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full h-12 bg-foreground text-background font-semibold rounded-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
    >
      {pending ? (
        <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          Secure Login <ArrowRight className="w-4 h-4" />
        </>
      )}
    </button>
  );
}

export default function ClientLoginPage() {
  const [error, setError] = useState(null);

  async function handleSubmit(formData) {
    const result = await loginTempClient(formData);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <FadeInUp>
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-foreground rounded-xl flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-6 h-6 text-background" />
            </div>
          </div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-foreground tracking-tight">
            Client Portal Access
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Please enter your provided credentials to access your secure dashboard.
          </p>
        </FadeInUp>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <FadeInUp delay={0.1}>
          <div className="bg-card py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-border/50 backdrop-blur-xl">
            <form action={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Client Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    className="block w-full pl-10 h-12 bg-background border border-input rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-shadow text-foreground placeholder:text-muted-foreground"
                    placeholder="Enter your registered email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Access Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    name="password"
                    type="password"
                    required
                    className="block w-full pl-10 h-12 bg-background border border-input rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-shadow text-foreground placeholder:text-muted-foreground"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium text-center"
                >
                  {error}
                </motion.div>
              )}

              <div className="pt-2">
                <SubmitButton />
              </div>
            </form>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          <div className="mt-8 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
            <Lock className="w-3 h-3" />
            <span>End-to-end encrypted connection</span>
          </div>
        </FadeInUp>
      </div>
    </div>
  );
}
