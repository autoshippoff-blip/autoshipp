import React, { useState } from 'react';
import Link from 'next/link';

export default function Hero({ onBookDemo }) {
  const [feedItems] = useState([
    { id: 'ORD-882', user: 'Rajesh K.', flow: 'AI Voice Flow Triggered', amount: '₹2,499 COD Order', status: 'Verified', color: 'text-success' },
    { id: 'ORD-881', user: 'Ananya S.', flow: 'WhatsApp Flow Triggered', amount: '₹1,200 COD Order', status: 'Confirming', color: 'text-warning' },
    { id: 'ORD-880', user: 'Unknown', flow: 'AI Voice Flow Triggered', amount: '₹5,400 COD Order', status: 'Cancelled', color: 'text-destructive' },
  ]);

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Copy */}
        <div className="space-y-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-destructive/10 text-xs font-semibold text-destructive tracking-wide uppercase border border-destructive/20">
            Stop Losing COD Profits
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
            Verify orders with AI Voice Automation
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            Reduce RTO by up to 70% by confirming intent before you ship. Zero setup fees. Zero monthly costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-sm"
            >
              Start Free Trial
            </Link>
            <button
              onClick={onBookDemo}
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-background border border-border text-foreground font-medium hover:bg-muted transition-colors"
            >
              Book Demo
            </button>
          </div>
          <div className="pt-4 flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-background bg-slate-200" />
              <div className="w-8 h-8 rounded-full border-2 border-background bg-slate-300" />
              <div className="w-8 h-8 rounded-full border-2 border-background bg-slate-400" />
              <div className="w-8 h-8 rounded-full border-2 border-background bg-slate-500 flex items-center justify-center text-[10px] text-white font-medium">+5k</div>
            </div>
            <p className="text-sm font-medium text-muted-foreground">Join 500+ India&apos;s top D2C brands</p>
          </div>
        </div>

        {/* Live Dispatch Stream UI */}
        <div className="relative w-full max-w-lg mx-auto lg:ml-auto">
          {/* Subtle background blur */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent blur-3xl -z-10 rounded-full opacity-50" />
          
          <div className="rounded-xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col">
            <div className="p-5 border-b border-border bg-muted/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                </span>
                <span className="text-sm font-semibold tracking-tight text-foreground">Active Verification Stream</span>
              </div>
            </div>
            
            <div className="p-2 flex flex-col gap-2 bg-background">
              {feedItems.map((item, i) => (
                <div key={i} className="p-3 rounded-lg border border-border bg-card flex flex-col gap-2 text-sm shadow-sm transition-all hover:border-primary/30">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">{item.id} &mdash; {item.user}</span>
                    <span className={`font-semibold text-xs ${item.color} bg-background px-2 py-0.5 rounded-full border border-border`}>{item.status}</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground text-xs">
                    <span className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                      {item.flow}
                    </span>
                    <span className="font-medium text-foreground">{item.amount}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-border bg-muted/30 grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5 font-medium">Total Savings</p>
                <p className="font-bold text-foreground tracking-tight">&#8377;84,200</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5 font-medium">RTO Drop</p>
                <p className="font-bold text-success tracking-tight">12%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5 font-medium">Success Rate</p>
                <p className="font-bold text-foreground tracking-tight">94.8%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
