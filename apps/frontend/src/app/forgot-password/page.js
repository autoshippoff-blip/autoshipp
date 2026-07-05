"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        // Still show success to avoid user enumeration
        setSent(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-xl tracking-tight text-foreground"
          >
            <div className="w-8 h-8 rounded-md overflow-hidden">
              <Image
                src="/images/logo.png"
                alt="Autoshipp Logo"
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>
            Autoshipp
          </Link>
        </div>

        <div className="bg-card border border-border shadow-sm rounded-xl p-8">
          {sent ? (
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-foreground mb-1">
                Check your email
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                We&apos;ve sent a password reset link to{" "}
                <span className="font-medium text-foreground">{email}</span>.
              </p>
              <Link
                href="/login"
                className="w-full block py-2.5 border border-border rounded-md text-sm font-medium hover:bg-muted transition-colors text-center"
              >
                Return to login
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <h1 className="text-xl font-semibold tracking-tight text-foreground">
                  Reset password
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Enter your email to receive a reset link
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium text-foreground mb-1.5"
                    htmlFor="email"
                  >
                    Email address
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
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors sm:text-sm"
                >
                  {loading ? "Sending link..." : "Send reset link"}
                </button>
              </form>
            </>
          )}
        </div>

        {!sent && (
          <p className="text-center mt-6 text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link
              href="/login"
              className="text-foreground font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
