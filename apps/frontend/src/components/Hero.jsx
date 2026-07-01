'use client';

import React from 'react';
import Link from 'next/link';
import { Bot, PhoneCall, MessageSquare, ShieldCheck, Sparkles, CheckCircle2, Zap, ArrowRight, TrendingUp } from 'lucide-react';
import { FadeInUp, ScaleIn } from './AnimatedUI';

export default function Hero({ onBookDemo }) {
  return (
    <section className="relative z-0 w-full bg-background text-foreground overflow-hidden pt-28 pb-20 lg:pt-40 lg:pb-32 border-b border-border">
      {/* Decorative Background Glowing Blobs */}
      <div className="absolute top-0 right-0 -z-10 w-full h-full pointer-events-none opacity-50">
        <div className="absolute top-1/4 right-1/10 w-[450px] h-[450px] bg-brand-orange/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-1/10 w-[450px] h-[450px] bg-blue-600/15 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-11">
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          
          <FadeInUp delay={0.1}>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-orange/10 text-brand-orange border border-brand-orange/25 text-xs tracking-widest font-black mb-8 uppercase shadow-sm">
              <Sparkles size={14} className="fill-brand-orange animate-pulse" />
              <span>Autonomous AI & WhatsApp Logistics OS</span>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.08] mb-6">
              Unlock Your Highest CLTV with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-amber-500 to-brand-orange">Autonomous AI</span> Engagement
            </h1>
          </FadeInUp>

          <FadeInUp delay={0.3}>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
              Reduce RTO by up to <span className="font-bold text-foreground">70%</span> and convert one-time buyers into loyal customers with <span className="font-bold text-foreground">24/7 human-like AI Voice calls</span>, automated WhatsApp verification, and predictive risk workflows.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.4} className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
            <button 
              onClick={onBookDemo}
              className="relative group h-14 w-full sm:w-[200px] flex items-center justify-center gap-2 rounded-full text-white bg-brand-orange hover:bg-brand-orange/90 transition-all duration-300 shadow-xl shadow-brand-orange/25 cursor-pointer font-extrabold text-sm"
            >
              <Bot size={18} />
              <span>Book an AI Demo</span>
            </button>
            <Link 
              href="/login"
              className="relative group h-14 w-full sm:w-[200px] flex items-center justify-center gap-2 rounded-full text-foreground bg-card border border-border hover:border-brand-orange transition-all duration-300 shadow-md cursor-pointer font-extrabold text-sm"
            >
              <span>Start Free Trial</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeInUp>

          {/* Quick AI Stats Ticker */}
          <FadeInUp delay={0.5} className="mt-10 pt-8 border-t border-border/60 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-3xl text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-brand-orange">70%</div>
              <div className="text-xs font-semibold text-muted-foreground mt-1">RTO Reduction</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-foreground">&lt; 1.5s</div>
              <div className="text-xs font-semibold text-muted-foreground mt-1">AI Voice Latency</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-success">99.4%</div>
              <div className="text-xs font-semibold text-muted-foreground mt-1">Address Accuracy</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-brand-blue">24/7</div>
              <div className="text-xs font-semibold text-muted-foreground mt-1">Automated Operations</div>
            </div>
          </FadeInUp>
        </div>

        {/* Interactive AI Dashboard / Simulation Graphic */}
        <ScaleIn delay={0.6} className="mt-16 sm:mt-20 relative w-full max-w-5xl mx-auto rounded-3xl sm:rounded-[2.5rem] bg-[#0B0F19] text-white border border-white/10 shadow-2xl overflow-hidden p-4 sm:p-8">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 font-bold">
              <div className="w-3 h-3 rounded-full bg-success animate-ping" />
              <span className="text-white/90">Autoshipp Autonomous Engine v4.0</span>
            </div>
            <div className="flex items-center gap-4 text-white/60 font-semibold">
              <span className="hidden sm:inline-flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                <Zap size={13} className="text-amber-400" /> Live AI Processing
              </span>
              <span>14,280 Orders Verified Today</span>
            </div>
          </div>

          {/* Simulation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            {/* Card 1: AI Voice Agent */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between backdrop-blur-md relative overflow-hidden group hover:border-brand-orange/50 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/10 rounded-full blur-xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-brand-orange/20 text-brand-orange font-bold text-xs">
                    <PhoneCall size={12} /> AI Voice Agent
                  </span>
                  <span className="text-[11px] text-success font-semibold flex items-center gap-1">
                    ● Connected (0:14)
                  </span>
                </div>
                <div className="text-xs text-white/60 mb-1">Customer: Priya Patel (#4921)</div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-white/90 italic leading-relaxed mb-3">
                  &quot;Hello Priya! Calling from Urban Style. Can we confirm your COD order for delivery tomorrow at Sector 45?&quot;
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[11px] font-bold text-success">
                <span className="flex items-center gap-1"><CheckCircle2 size={13} /> COD Confirmed</span>
                <span className="text-white/50 font-normal">Hindi / English AI</span>
              </div>
            </div>

            {/* Card 2: WhatsApp Automation */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between backdrop-blur-md relative overflow-hidden group hover:border-success/50 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-success/10 rounded-full blur-xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-success/20 text-success font-bold text-xs">
                    <MessageSquare size={12} /> WhatsApp AI Bot
                  </span>
                  <span className="text-[11px] text-white/60 font-semibold">Instant Trigger</span>
                </div>
                <div className="text-xs text-white/60 mb-1">Action: Prepaid Conversion Upsell</div>
                <div className="p-3 rounded-xl bg-[#075E54]/30 border border-success/20 text-xs text-white/90 leading-relaxed mb-3">
                  🎉 Order confirmed! Pay online via UPI now and save flat ₹150 on this order. Click below to apply discount.
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[11px] font-bold text-brand-orange">
                <span className="flex items-center gap-1"><TrendingUp size={13} /> Converted to Prepaid</span>
                <span className="text-white/50 font-normal">+₹2,499 Secured</span>
              </div>
            </div>

            {/* Card 3: RTO Shield Risk Detection */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between backdrop-blur-md relative overflow-hidden group hover:border-blue-500/50 transition-all">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-400 font-bold text-xs">
                    <ShieldCheck size={12} /> AI RTO Shield
                  </span>
                  <span className="text-[11px] text-blue-400 font-semibold">Predictive ML</span>
                </div>
                <div className="text-xs text-white/60 mb-1">Order #4928 Evaluation</div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs space-y-1.5 mb-3">
                  <div className="flex justify-between text-white/80">
                    <span>Address Score:</span>
                    <span className="text-success font-bold">98/100 (Verified)</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>RTO Risk Level:</span>
                    <span className="text-success font-bold">Low Risk (2.1%)</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[11px] font-bold text-white/80">
                <span>Auto-Approved Dispatch</span>
                <span className="text-success font-normal">Zero Delay</span>
              </div>
            </div>

          </div>
        </ScaleIn>
      </div>

    </section>
  );
}
