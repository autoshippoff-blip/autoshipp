import React from 'react';
import Link from 'next/link';

export default function CTASection({ onBookDemo }) {
  return (
    <section className="py-24 bg-foreground text-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-background">
          Ready to stop losing money?
        </h2>
        <p className="text-lg text-muted mb-10 max-w-2xl mx-auto">
          Setup takes 15 minutes. Impact is immediate. Start protecting your margins today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/login"
            className="px-8 py-3 rounded-md bg-background text-foreground font-medium hover:bg-muted transition-colors"
          >
            Start Free Trial
          </Link>
          <button 
            onClick={onBookDemo}
            className="px-8 py-3 rounded-md bg-transparent border border-background/20 hover:bg-background/10 text-background font-medium transition-colors"
          >
            Book Demo
          </button>
        </div>
        <p className="mt-6 text-sm text-muted font-medium">
          No credit card required • 14-day free trial
        </p>
      </div>
    </section>
  );
}