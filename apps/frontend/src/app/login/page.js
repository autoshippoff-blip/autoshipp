"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Sparkles,
  ArrowRight,
  Bot,
  ShieldCheck,
  Zap,
  Star,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import BookDemoPopup from "@/components/BookDemoPopup";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookDemoOpen, setBookDemoOpen] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await login(email, password);
      const userRole = response.user?.role || "brand";
      const destinations = {
        admin: "/admin/dashboard",
        super_admin: "/admin/dashboard",
        brand: "/brand/dashboard",
        aggregator: "/aggregator/dashboard",
      };
      router.push(destinations[userRole] ?? "/brand/dashboard");
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-background flex">
      {/* Left Column - AI Branding Showcase (Hidden on smaller screens) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-brand-navy text-white flex-col justify-between p-12 overflow-hidden">
        {/* Background Gradients & Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-orange/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

        {/* Top Logo */}
        <div className="relative z-10 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 font-bold text-2xl tracking-tight text-white hover:opacity-90 transition-opacity"
          >
            <Image
              src="/images/Autoshipp_white_logo.png"
              alt="Autoshipp Logo"
              width={160}
              height={40}
              className="h-10 w-auto object-contain"
            />
            Autoshipp.
          </Link>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold text-brand-orange">
            <Sparkles size={12} /> AI Operating System
          </span>
        </div>

        {/* Center Content */}
        <div className="relative z-10 my-auto max-w-lg space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl xl:text-5xl font-black tracking-tight leading-[1.15] mb-6">
              Supercharge Your D2C Logistics with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-400">
                Autonomous AI
              </span>
            </h1>
            <p className="text-lg text-white/80 leading-relaxed font-normal">
              Turn one-time buyers into loyal customers and eliminate up to 70%
              of RTO losses with intelligent Voice AI &amp; WhatsApp automation.
            </p>
          </motion.div>

          {/* AI Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 gap-4 pt-2"
          >
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="w-12 h-12 rounded-xl bg-brand-orange/20 text-brand-orange flex items-center justify-center shrink-0">
                <Bot size={24} />
              </div>
              <div>
                <h4 className="font-bold text-base text-white">
                  Autonomous AI Voice Agents
                </h4>
                <p className="text-xs text-white/70">
                  Instant human-like COD confirmation calls in 8+ languages.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-base text-white">
                  Predictive RTO Risk Engine
                </h4>
                <p className="text-xs text-white/70">
                  Automatically identify fake orders and flag high-risk buyers.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Quote */}
        <div className="relative z-10 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-1 text-amber-400 mb-2">
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
          </div>
          <p className="text-sm text-white/90 italic mb-3">
            &quot;Autoshipp&apos;s AI voice bots reduced our RTO rate by 42%
            within just two weeks. It feels like having a 100-person support
            team running 24/7.&quot;
          </p>
          <div className="flex items-center justify-between text-xs text-white/60 font-semibold">
            <span>Rahul Sharma, Founder @ Apex Lifestyle</span>
            <span className="text-brand-orange">Verified Partner</span>
          </div>
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 relative">
        {/* Back to Home & Theme / Logo on mobile */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between lg:justify-end">
          <Link
            href="/"
            className="lg:hidden flex items-center gap-2 font-bold text-xl tracking-tight text-foreground"
          >
            <Image
              src="/images/Autoshipp_black_logo.png"
              alt="Autoshipp Logo"
              width={128}
              height={32}
              className="h-8 w-auto object-contain dark:hidden"
            />
            <Image
              src="/images/Autoshipp_white_logo.png"
              alt="Autoshipp Logo"
              width={128}
              height={32}
              className="h-8 w-auto object-contain hidden dark:block"
            />
            Autoshipp.
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors py-2 px-4 rounded-full bg-muted/50 hover:bg-muted border border-border"
          >
            <span>Back to website</span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[420px] my-auto pt-12 lg:pt-0"
        >
          {/* Header */}
          <div className="text-center lg:text-left mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">
              <Zap size={13} className="fill-brand-orange" /> Portal Access
            </div>
            <h2 className="text-3xl font-black tracking-tight text-foreground">
              Welcome Back
            </h2>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
              Log in to your Autoshipp dashboard to manage AI automations and
              track customer engagement.
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-semibold flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-destructive shrink-0 animate-ping" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2"
                htmlFor="email"
              >
                Work Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl bg-muted/30 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange focus:bg-background transition-all text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  className="block text-xs font-bold uppercase tracking-wider text-foreground"
                  htmlFor="password"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-bold text-brand-orange hover:underline transition-all"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 border border-border rounded-xl bg-muted/30 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange focus:bg-background transition-all text-sm font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-brand-orange text-white font-extrabold text-sm hover:bg-brand-orange/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange shadow-lg shadow-brand-orange/25 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Accessing AI Portal...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-3 text-muted-foreground font-bold tracking-wider">
                New to Autoshipp?
              </span>
            </div>
          </div>

          {/* Contact Sales / Book Demo CTA */}
          <div className="p-5 rounded-2xl bg-muted/30 border border-border text-center">
            <p className="text-sm font-medium text-foreground mb-3">
              Want to deploy AI Voice &amp; WhatsApp agents for your brand?
            </p>
            <button
              type="button"
              onClick={() => setBookDemoOpen(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-card border border-border hover:border-brand-orange text-foreground text-xs font-extrabold uppercase tracking-wider transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles size={14} className="text-brand-orange" />
              <span>Book a Personalized AI Demo</span>
            </button>
          </div>
        </motion.div>
      </div>

      <BookDemoPopup
        isOpen={bookDemoOpen}
        onClose={() => setBookDemoOpen(false)}
      />
    </div>
  );
}
