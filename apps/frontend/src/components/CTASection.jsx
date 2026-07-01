'use client';

import React from 'react';
import Link from 'next/link';
import { FadeInUp } from './AnimatedUI';

export default function CTASection({ onBookDemo }) {
  return (
    <section className="py-20 sm:py-24 bg-gradient-to-br from-slate-900 via-brand-navy to-black text-white my-10 max-w-[1440px] mx-auto md:rounded-[3.5rem] px-4 sm:px-10 lg:px-20 relative overflow-hidden shadow-2xl border border-white/10">
      <div className="absolute top-0 right-0 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-brand-orange/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-brand-blue/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10 py-6 sm:py-10">
        <FadeInUp delay={0.1}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 sm:mb-8 text-white leading-tight">
            Ready to scale your D2C brand?
          </h2>
        </FadeInUp>
        <FadeInUp delay={0.2}>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
            Join 15,000+ brands that use Autoshipp to automate engagement, prevent RTO, and maximize CLTV.
          </p>
        </FadeInUp>
        <FadeInUp delay={0.3} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto">
          <Link 
            href="/login"
            className="relative group h-14 w-full sm:w-[200px] flex items-center justify-center rounded-full text-white bg-brand-orange hover:bg-brand-orange/90 shadow-xl shadow-brand-orange/30 transition-all font-extrabold text-sm sm:text-base cursor-pointer"
          >
             <span>Get Started Free</span>
          </Link>
          <button 
            onClick={onBookDemo}
            className="relative group h-14 w-full sm:w-[200px] flex items-center justify-center rounded-full text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all font-extrabold text-sm sm:text-base cursor-pointer"
          >
             <span>Book Demo</span>
          </button>
        </FadeInUp>
        <FadeInUp delay={0.4}>
          <p className="mt-8 text-xs sm:text-sm text-slate-400 font-medium tracking-wide">
            No credit card required &bull; Setup in 15 minutes
          </p>
        </FadeInUp>
      </div>
    </section>
  );
}