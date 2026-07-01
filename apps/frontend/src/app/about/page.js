'use client';

import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BookDemoPopup from '../../components/BookDemoPopup';
import { MapPin, Sparkles, Target, Eye, Zap, ShieldCheck, TrendingUp, Users, Award, Phone, ArrowRight, Building2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const [isDark, setIsDark] = useTheme();
  const [bookDemoOpen, setBookDemoOpen] = useState(false);

  const stats = [
    { metric: '10M+', label: 'Orders Protected', desc: 'COD parcels verified across India' },
    { metric: '70%', label: 'RTO Reduction', desc: 'Average margin saved for merchants' },
    { metric: '99.2%', label: 'Intent Accuracy', desc: 'AI regional language comprehension' },
    { metric: 'Chennai', label: 'Global Headquarters', desc: 'Tamil Nadu, India' },
  ];

  const values = [
    { icon: <Zap className="w-6 h-6 text-brand-orange" />, title: 'Speed Over Friction', desc: 'We believe checkout should be instant. Our AI confirms delivery intent in under 3 seconds via WhatsApp and Voice.' },
    { icon: <ShieldCheck className="w-6 h-6 text-brand-blue" />, title: 'Margin Obsession', desc: 'Revenue is vanity, profit is sanity. Every feature we ship is strictly engineered to protect brand unit economics.' },
    { icon: <Users className="w-6 h-6 text-success" />, title: 'Network Intelligence', desc: 'Bad actors target multiple stores. Our collaborative predictive shield connects risk patterns across thousands of D2C brands.' },
  ];

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand-orange/20 selection:text-foreground relative overflow-hidden">
        
        {/* Ambient Decorative Background */}
        <div className="absolute top-0 left-1/4 -z-10 w-[500px] h-[500px] bg-brand-orange/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-10 -z-10 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[140px] pointer-events-none" />

        <Header 
          isDark={isDark} 
          setIsDark={setIsDark} 
          onBookDemo={() => setBookDemoOpen(true)} 
        />

        <main className="pt-36 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Header */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold tracking-widest uppercase mb-6 border border-brand-orange/20"
            >
              <Building2 className="w-3.5 h-3.5" /> Our Story & Mission
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.1] mb-6"
            >
              The AI Dispatch Engine for <span className="bg-gradient-to-r from-brand-orange via-amber-500 to-brand-blue bg-clip-text text-transparent">High-Growth D2C</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
            >
              Headquartered in Chennai, Autoshipp was engineered with a singular obsession: eliminating Return-to-Origin (RTO) losses and turning unpredictable COD orders into guaranteed retained profit.
            </motion.p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-24">
            {stats.map((st, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
                className="bg-card border border-border p-6 sm:p-8 rounded-3xl text-center shadow-xs hover:border-brand-orange/40 transition-all duration-300 relative group overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-brand-orange/10 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform" />
                <p className="text-3xl sm:text-4xl font-black text-brand-orange mb-2 font-mono">{st.val}</p>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{st.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Vision Story Section */}
          <div className="grid lg:grid-cols-12 gap-12 items-center mb-24">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-brand-blue font-bold text-xs uppercase tracking-widest">
                <Target className="w-4 h-4" /> Why We Exist
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground leading-tight">
                Solving India&apos;s $2 Billion Reverse Logistics Problem
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                In Indian e-commerce, over 65% of orders are placed via Cash-On-Delivery (COD). Historically, nearly 1 in 3 of these orders end up returned before delivery &mdash; costing merchants millions in wasted courier shipping fees and damaged inventory.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                We realized that generic SMS reminders and email campaigns don&apos;t work for Indian shoppers. Autoshipp replaces passive notifications with conversational AI Voice confirmation calls and interactive WhatsApp workflows that verify real intent in sub-seconds.
              </p>
            </div>

            <div className="lg:col-span-6 bg-card border border-border rounded-3xl sm:rounded-[3rem] p-6 sm:p-10 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
              <div className="space-y-6 relative z-10 font-sans">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <span className="font-extrabold text-sm text-foreground uppercase tracking-wider">Traditional vs Autoshipp Engine</span>
                  <span className="text-xs font-mono font-bold text-success">&check; +45% Margin Saved</span>
                </div>
                <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-xs space-y-1">
                  <p className="font-bold text-destructive">&cross; Traditional Dispatch:</p>
                  <p className="text-muted-foreground">Blindly pack COD order &rarr; Ship via courier &rarr; Customer rejects at doorstep &rarr; Pay double reverse logistics penalty.</p>
                </div>
                <div className="p-4 rounded-2xl bg-success/15 border border-success/30 text-xs space-y-1">
                  <p className="font-bold text-success">&zap; Autoshipp AI Flow:</p>
                  <p className="text-foreground font-medium">Instant AI Voice Call &amp; RTO Scoring &rarr; Block risky COD / Flip to UPI Prepaid &rarr; Ship with 98.4% delivery certainty.</p>
                </div>
              </div>
              <div className="pt-6 border-t border-border flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-blue">
                <span>Made in Chennai</span> &bull; <span>Built for the World</span>
              </div>
            </div>

          </div>

          {/* Core Values */}
          <div className="mb-24">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">How We Operate</h2>
              <p className="text-muted-foreground text-lg">The architectural and cultural principles driving our engineering team.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((val, idx) => (
                <div key={idx} className="bg-card border border-border p-8 rounded-3xl shadow-xs hover:shadow-md hover:border-border/80 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-muted/60 flex items-center justify-center mb-6 border border-border/50">
                    {val.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{val.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Office & Contact Callout Banner */}
          <div className="bg-gradient-to-r from-brand-surface via-card to-brand-surface dark:from-[#161616] dark:via-[#1f1f1f] dark:to-[#161616] border border-border rounded-[3rem] p-10 md:p-16 shadow-xl flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-2 text-brand-orange font-bold text-xs uppercase tracking-widest">
                <MapPin className="w-4 h-4" /> Global Headquarters
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-foreground">
                Proudly Headquartered in Chennai, India
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Want to meet our engineering leadership or discuss enterprise volume requirements in person? Reach out to our direct sales team.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a href="tel:+919600816505" className="px-5 py-2.5 rounded-xl bg-background border border-border text-foreground font-mono font-bold text-sm hover:border-brand-orange hover:text-brand-orange transition-colors">
                  📞 +91 9600816505
                </a>
                <a href="tel:+918903942674" className="px-5 py-2.5 rounded-xl bg-background border border-border text-foreground font-mono font-bold text-sm hover:border-brand-orange hover:text-brand-orange transition-colors">
                  📞 +91 8903942674
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
              <Link 
                href="/contact"
                className="px-8 py-4 rounded-full bg-brand-orange hover:bg-brand-orange/90 text-white font-bold text-center shadow-lg shadow-brand-orange/25 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Contact Sales</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link 
                href="/careers"
                className="px-8 py-4 rounded-full bg-card hover:bg-muted border border-border text-foreground font-bold text-center transition-all flex items-center justify-center"
              >
                Explore Careers
              </Link>
            </div>
          </div>

        </main>

        <Footer />
        <BookDemoPopup isOpen={bookDemoOpen} onClose={() => setBookDemoOpen(false)} />
      </div>
    </div>
  );
}
