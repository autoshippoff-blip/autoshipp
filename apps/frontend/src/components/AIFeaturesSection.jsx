'use client';

import React from 'react';
import { Bot, Cpu, MessageSquare, ShieldCheck, Zap, RefreshCw, PhoneCall, Sparkles } from 'lucide-react';
import { FadeInUp, StaggerContainer, StaggerItem } from './AnimatedUI';

export default function AIFeaturesSection() {
  const aiCapabilities = [
    {
      title: 'Conversational AI Voice Calling',
      tagline: 'HUMAN-LIKE REGIONAL VOICE BOTS',
      desc: 'Engage customers instantly in 8+ Indian regional languages. Our voice AI confirms COD intent, updates wrong pin codes, and reschedules deliveries without sounding robotic.',
      icon: <PhoneCall className="w-6 h-6 text-brand-orange" />,
      bg: 'bg-brand-orange/10',
      border: 'border-brand-orange/20',
      badgeColor: 'text-brand-orange bg-brand-orange/10'
    },
    {
      title: 'Predictive RTO Risk Engine',
      tagline: 'ML-POWERED FRAUD DETECTION',
      desc: 'Our proprietary machine learning model evaluates over 50+ buyer parameters across millions of shipments to identify high-risk shoppers and block fake COD orders before dispatch.',
      icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      badgeColor: 'text-blue-500 bg-blue-500/10'
    },
    {
      title: 'Automated WhatsApp Workflows',
      tagline: '24/7 INSTANT RESOLUTION BOTS',
      desc: 'Deliver automated order tracking, instant NDR verification, and 1-click size exchanges directly on WhatsApp. Eliminate support tickets and keep buyers engaged continuously.',
      icon: <MessageSquare className="w-6 h-6 text-success" />,
      bg: 'bg-success/10',
      border: 'border-success/20',
      badgeColor: 'text-success bg-success/10'
    },
    {
      title: 'Self-Learning Cart Recovery',
      tagline: 'AUTONOMOUS REVENUE RECAPTURE',
      desc: 'AI algorithms detect cart abandonment triggers and automatically deploy personalized WhatsApp follow-ups with dynamic discounts at the exact moment highest conversion is predicted.',
      icon: <RefreshCw className="w-6 h-6 text-amber-500" />,
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
      badgeColor: 'text-amber-500 bg-amber-500/10'
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-muted/20 text-foreground border-b border-border relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-11 relative z-10">
        
        <FadeInUp className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider mb-6 border border-primary/20">
            <Sparkles size={14} /> Autonomous AI Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-6 leading-tight">
            Powered by Next-Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500">Automated AI</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            Autoshipp replaces repetitive manual call centers and spreadsheet workflows with intelligent, self-learning AI agents built specifically for modern ecommerce scale.
          </p>
        </FadeInUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {aiCapabilities.map((item, idx) => (
            <StaggerItem key={idx}>
              <div className="bg-card border border-border rounded-3xl p-8 sm:p-10 hover:border-brand-orange/40 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col h-full relative group overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${item.bg} ${item.border} group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${item.badgeColor}`}>
                    {item.tagline}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-brand-orange transition-colors">
                  {item.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed text-base sm:text-lg flex-1">
                  {item.desc}
                </p>

                <div className="mt-8 pt-6 border-t border-border/60 flex items-center justify-between text-xs font-bold text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Zap size={14} className="text-brand-orange" /> Zero Human Intervention
                  </span>
                  <span className="text-foreground font-extrabold">Instant Deployment</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
}
