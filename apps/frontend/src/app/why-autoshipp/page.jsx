'use client';

import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BookDemoPopup from '../../components/BookDemoPopup';
import AnimatedPieChart from '../../components/AnimatedPieChart';
import { CheckCircle2, XCircle, ShieldCheck, Zap, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function WhyAutoshippPage() {
  const [isDark, setIsDark] = useTheme();
  const [bookDemoOpen, setBookDemoOpen] = useState(false);

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-foreground">
        <Header 
          isDark={isDark} 
          setIsDark={setIsDark} 
          onBookDemo={() => setBookDemoOpen(true)} 
        />

        <main className="pt-32 pb-20">
          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-xs font-semibold text-primary tracking-wide border border-primary/20">
                  The Autoshipp Advantage
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
                  Transforming COD Orders into <span className="text-primary">Guaranteed Profit</span>
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  D2C brands lose up to 30% of their revenue to RTOs (Return to Origin). Autoshipp uses advanced AI Voice Automation and WhatsApp confirmation to ensure high-intent deliveries and recover lost margins.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-primary text-primary-foreground font-extrabold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 text-sm sm:text-base cursor-pointer"
                  >
                    <span>Start Free Trial</span>
                  </Link>
                  <button
                    onClick={() => setBookDemoOpen(true)}
                    className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-card border border-border text-foreground font-extrabold hover:bg-muted transition-colors text-sm sm:text-base cursor-pointer"
                  >
                    <span>Book a Demo</span>
                  </button>
                </div>
              </div>
              
              <div className="relative w-full max-w-md mx-auto lg:ml-auto p-4 sm:p-0">
                {/* Background glow for chart */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-success/20 blur-3xl -z-10 rounded-full opacity-60" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="w-full overflow-hidden flex items-center justify-center"
                >
                  <AnimatedPieChart profit={94} rto={6} />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Key Benefits Section */}
          <section className="py-20 sm:py-24 bg-muted/30 border-y border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl sm:text-4xl font-black mb-4">Why Top Brands Choose Us</h2>
                <p className="text-muted-foreground text-base sm:text-lg">A comprehensive suite designed specifically for Indian D2C scale and unit economics.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                {[
                  { icon: <ShieldCheck className="w-8 h-8 text-primary" />, title: 'Smart RTO Prevention', desc: 'Identify high-risk addresses and confirm intent before shipping.' },
                  { icon: <Zap className="w-8 h-8 text-warning" />, title: 'AI Voice & WhatsApp', desc: 'Automated 24/7 engagement that feels human and converts faster.' },
                  { icon: <TrendingUp className="w-8 h-8 text-success" />, title: 'Margin Recovery', desc: 'Turn abandoned carts and cancelled orders into fulfilled revenue.' }
                ].map((benefit, i) => (
                  <div key={i} className="bg-card border border-border p-8 rounded-3xl hover:border-primary/50 transition-colors shadow-sm">
                    <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center mb-6">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Comparison Sections */}
          <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Autoshipp vs. Traditional Methods</h2>
              <p className="text-muted-foreground text-lg">See exactly what you get and how much you save.</p>
            </div>

            {/* Product Comparison Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-24">
              {/* The Old Way */}
              <div className="bg-destructive/5 border border-destructive/10 rounded-3xl p-8 flex flex-col gap-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 border-b border-destructive/10 pb-4">
                  <XCircle className="w-8 h-8 text-destructive" />
                  <h3 className="text-2xl font-bold text-destructive">Traditional Setup</h3>
                </div>
                <ul className="space-y-6">
                  {[
                    { title: 'Order Confirmation', text: 'Manual calls by support agents taking 8-10 hours.' },
                    { title: 'RTO Prevention', text: 'Basic pincode blocks missing real-time intent data.' },
                    { title: 'Abandoned Cart', text: 'Generic email blasts with low open rates (10-15%).' },
                    { title: 'Platform Tools', text: 'Multiple disjointed SaaS subscriptions.' },
                    { title: 'Customer Support', text: 'Human Agents available only 8-10 Hours.' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 group">
                      <XCircle className="w-5 h-5 text-destructive/70 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div>
                        <span className="block font-semibold text-foreground mb-1">{item.title}</span>
                        <span className="text-muted-foreground text-sm leading-relaxed">{item.text}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* The Autoshipp Way */}
              <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 flex flex-col gap-6 shadow-xl hover:shadow-2xl transition-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-bl-xl shadow-sm">
                  RECOMMENDED
                </div>
                <div className="flex items-center gap-3 border-b border-primary/20 pb-4">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold text-primary">Autoshipp</h3>
                </div>
                <ul className="space-y-6">
                  {[
                    { title: 'Order Confirmation', text: 'Instant AI Voice & WhatsApp verification within seconds.' },
                    { title: 'RTO Prevention', text: 'Advanced AI ML Models blocking high-risk orders instantly.' },
                    { title: 'Abandoned Cart', text: 'Personalized WhatsApp engagement with 70%+ read rates.' },
                    { title: 'Platform Tools', text: 'Unified dashboard managing everything from one place.' },
                    { title: 'Customer Support', text: '24/7 Multi-channel AI Agents supporting customers anytime.' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 group">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div>
                        <span className="block font-semibold text-foreground mb-1">{item.title}</span>
                        <span className="text-muted-foreground text-sm leading-relaxed">{item.text}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pricing Comparison */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6">Pricing That Scales With You</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Don't pay for multiple disjointed subscriptions. Autoshipp combines marketing, returns management, risk detection, and support automation into one predictable, value-driven pricing model.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    'The lowest, most competitive integration fee in the market',
                    'Pay only for successful verifications & messages',
                    'Flexible volume-based tiers for D2C growth',
                    'Consolidate 4+ SaaS tools into one platform'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                      </div>
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/pricing" className="inline-flex items-center text-primary font-semibold hover:gap-2 transition-all gap-1">
                  View Detailed Pricing Pricing <TrendingUp className="w-4 h-4" />
                </Link>
              </div>

              <div className="bg-card border border-border rounded-3xl p-8 shadow-xl">
                <div className="mb-8">
                  <div className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-4">Monthly Cost Comparison</div>
                  <div className="flex items-end gap-4">
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <div className="w-full bg-destructive/10 rounded-t-lg relative flex items-end justify-center" style={{ height: '200px' }}>
                        <div className="w-full bg-destructive/30 rounded-t-lg" style={{ height: '100%' }}></div>
                        <span className="absolute bottom-4 font-bold text-destructive-foreground">₹25,000+</span>
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">Other Tools</span>
                    </div>
                    
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <div className="w-full bg-primary/10 rounded-t-lg relative flex items-end justify-center" style={{ height: '200px' }}>
                        <div className="w-full bg-primary rounded-t-lg" style={{ height: '40%' }}></div>
                        <span className="absolute bottom-4 font-bold text-primary-foreground">from ₹1,999</span>
                      </div>
                      <span className="text-sm font-bold text-foreground">Autoshipp</span>
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground">Based on an average volume of 2000 orders/month.</p>
              </div>
            </div>

          </section>

          {/* Final CTA */}
          <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
            <div className="bg-primary text-primary-foreground rounded-[2.5rem] p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Ready to transform your COD metrics?</h2>
                <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto">
                  Join hundreds of top D2C brands taking control of their fulfillment costs and delivering superior customer experiences.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={() => setBookDemoOpen(true)} className="px-8 py-4 rounded-xl bg-background text-foreground font-bold hover:bg-muted transition-colors shadow-xl">
                    Book a Live Demo
                  </button>
                  <Link href="/login" className="px-8 py-4 rounded-xl bg-primary-foreground/10 text-primary-foreground font-bold border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-colors">
                    Start Free Trial
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <BookDemoPopup isOpen={bookDemoOpen} onClose={() => setBookDemoOpen(false)} />
      </div>
    </div>
  );
}
