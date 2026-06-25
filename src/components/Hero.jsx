'use client';

import React from 'react';
import Link from 'next/link';
import { FadeInUp, ScaleIn } from './AnimatedUI';

export default function Hero({ onBookDemo }) {
  return (
    <section className="relative z-0 w-full bg-background text-foreground overflow-hidden pt-28 pb-16 lg:pt-40 lg:pb-24 border-b border-border">
      {/* Decorative Background SVGs / Shapes */}
      <div className="absolute top-0 right-0 -z-10 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-orange/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-11">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          
          <FadeInUp delay={0.1}>
            <div className="inline-flex items-center px-5 py-2 rounded-full bg-brand-orange/10 text-brand-orange border border-brand-orange/20 text-xs tracking-widest font-extrabold mb-8 uppercase shadow-2xs">
              Transform Your Ecommerce Growth
            </div>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.08] mb-6">
              Unlock Your Highest CLTV with Customer Engagement
            </h1>
          </FadeInUp>

          <FadeInUp delay={0.3}>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
              Reduce RTO by up to 70% and turn one-time buyers into loyal customers with intelligent AI Voice and WhatsApp automation.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.4} className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
            <button 
              onClick={onBookDemo}
              className="relative group h-14 w-full sm:w-[180px] flex items-center justify-center rounded-full text-foreground bg-card border border-border hover:border-brand-orange transition-all duration-300 shadow-md cursor-pointer font-extrabold text-sm"
            >
              <span>Book a Demo</span>
            </button>
            <Link 
              href="/login"
              className="relative group h-14 w-full sm:w-[180px] flex items-center justify-center rounded-full text-white bg-brand-orange hover:bg-brand-orange/90 transition-all duration-300 shadow-xl shadow-brand-orange/25 cursor-pointer font-extrabold text-sm"
            >
              <span>Start Free Trial</span>
            </Link>
          </FadeInUp>
        </div>

        {/* Hero Image / Graphic */}
        <ScaleIn delay={0.6} className="mt-16 sm:mt-20 relative w-full max-w-5xl mx-auto h-[280px] sm:h-[400px] md:h-[500px] bg-card rounded-3xl sm:rounded-[2.5rem] border border-border shadow-2xl overflow-hidden flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/10 to-transparent z-0" />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-brand-orange text-white flex items-center justify-center shadow-lg">
              <span className="font-bold text-2xl">A</span>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <div className="px-4 py-2 rounded-full bg-background shadow-sm flex items-center justify-center border border-border">
                <div className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse" />
                <span className="text-xs font-semibold text-foreground">Order Verified</span>
              </div>
              <div className="px-4 py-2 rounded-full bg-background shadow-sm flex items-center justify-center border border-border">
                <div className="w-2 h-2 rounded-full bg-brand-blue mr-2 animate-pulse" />
                <span className="text-xs font-semibold text-foreground">Message Sent</span>
              </div>
            </div>
          </div>
        </ScaleIn>
      </div>

    </section>
  );
}
