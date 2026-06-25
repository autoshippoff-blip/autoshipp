'use client';

import React, { useState } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BookDemoPopup from '../../../components/BookDemoPopup';
import { FadeInUp, ScaleIn, StaggerContainer, StaggerItem } from '../../../components/AnimatedUI';
import { ArrowRight, RefreshCw, ShoppingCart, CreditCard, MessageSquare, TrendingUp, Sparkles, Send, DollarSign, Clock, ShieldCheck, CheckCircle2, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RecoverProductPage() {
  const [isDark, setIsDark] = useTheme();
  const [bookDemoOpen, setBookDemoOpen] = useState(false);
  const [recoverTab, setRecoverTab] = useState('cart'); // cart | prepaid
  const [sequenceStep, setSequenceStep] = useState(1);

  const features = [
    {
      title: 'Multi-Step Cart Recovery',
      desc: 'Deploy automated 3-stage WhatsApp sequences (1h reminder -> 6h social proof -> 24h urgency discount) recovering up to 35% of lost carts.',
      icon: <ShoppingCart className="w-6 h-6 text-brand-orange" />
    },
    {
      title: 'COD to Prepaid Deflection',
      desc: 'Incentivise risky Cash-On-Delivery orders to switch instantly to UPI prepaid prior to courier packing by offering automated +10% cashback nudges.',
      icon: <CreditCard className="w-6 h-6 text-brand-blue" />
    },
    {
      title: 'Dynamic Discount Nudges',
      desc: 'Automatically calculates unique single-use coupon codes that expire in 120 minutes to create genuine FOMO and lock customer checkout.',
      icon: <TrendingUp className="w-6 h-6 text-success" />
    },
    {
      title: 'Omnichannel Fallback Routing',
      desc: 'If a customer is unreachable on WhatsApp, the recovery engine seamlessly falls back to personalized SMS and rich web push notifications.',
      icon: <MessageSquare className="w-6 h-6 text-brand-navy dark:text-amber-400" />
    }
  ];

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand-orange/20 transition-colors duration-300">
        <Header isDark={isDark} setIsDark={setIsDark} onBookDemo={() => setBookDemoOpen(true)} />

        <main className="pt-24 pb-16">
          {/* Hero Section */}
          <section className="relative z-0 bg-muted/30 overflow-hidden pt-20 pb-28 border-b border-border">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-11">
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                
                <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
                  <FadeInUp delay={0.1}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-xs tracking-widest font-extrabold mb-8 uppercase border border-brand-orange/20 shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5" /> Revenue Recovery Engine
                    </div>
                  </FadeInUp>
                  <FadeInUp delay={0.2}>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.08] mb-6">
                      Recover Abandoned Carts <span className="bg-gradient-to-r from-brand-orange via-amber-500 to-brand-blue bg-clip-text text-transparent">On Auto-Pilot.</span>
                    </h1>
                  </FadeInUp>
                  <FadeInUp delay={0.3}>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
                      Convert 3x more abandoned checkouts than email with intelligent WhatsApp sequences and instantly flip high-risk COD orders into secure UPI prepaid revenue.
                    </p>
                  </FadeInUp>
                  <FadeInUp delay={0.4} className="flex flex-wrap gap-4">
                    <button
                      onClick={() => setBookDemoOpen(true)}
                      className="h-14 px-8 flex items-center justify-center rounded-full text-white bg-brand-orange hover:bg-brand-orange/90 shadow-xl shadow-brand-orange/25 transition-all font-extrabold text-base cursor-pointer group"
                    >
                      <span>Simulate Cart Recovery</span>
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </button>
                  </FadeInUp>
                </div>

                {/* Right Interactive Simulator */}
                <div className="lg:col-span-6 relative z-10">
                  <ScaleIn delay={0.4} className="w-full bg-card border border-border rounded-[3rem] shadow-2xl p-6 sm:p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />

                    {/* Tabs */}
                    <div className="flex gap-2 p-1.5 rounded-2xl bg-muted mb-6 border border-border/60">
                      <button
                        onClick={() => setRecoverTab('cart')}
                        className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${recoverTab === 'cart' ? 'bg-background text-brand-orange shadow-md border border-border/80' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        <ShoppingCart className="w-4 h-4" /> Cart Recovery AI
                      </button>
                      <button
                        onClick={() => setRecoverTab('prepaid')}
                        className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${recoverTab === 'prepaid' ? 'bg-background text-brand-blue shadow-md border border-border/80' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        <CreditCard className="w-4 h-4" /> COD to Prepaid
                      </button>
                    </div>

                    {/* Display */}
                    <div className="min-h-[340px] flex items-center justify-center font-sans">
                      {recoverTab === 'cart' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full space-y-4">
                          <div className="p-5 rounded-2xl bg-slate-950 text-white border border-white/10 shadow-xl space-y-4">
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                              <span className="text-xs font-bold text-slate-300 uppercase">Automated WhatsApp Drip</span>
                              <div className="flex gap-1">
                                {[1, 2, 3].map(s => (
                                  <button key={s} onClick={() => setSequenceStep(s)} className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold cursor-pointer transition-all ${sequenceStep === s ? 'bg-brand-orange text-white' : 'bg-white/10 text-slate-400'}`}>Stage {s}</button>
                                ))}
                              </div>
                            </div>

                            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                              <div className="flex items-center justify-between text-[11px] font-mono text-amber-400">
                                <span>{sequenceStep === 1 ? '⏱️ Triggered +60 Mins Post-Abandon' : sequenceStep === 2 ? '🌟 Triggered +6 Hours (Social Proof)' : '⚡ Triggered +24 Hours (Urgency Coupon)'}</span>
                                <span>● Live API</span>
                              </div>
                              <p className="text-xs text-slate-200 leading-relaxed">
                                {sequenceStep === 1 && "Hi Sneha! Did you leave something behind? Your Wireless Noise-Cancelling Headphones (₹4,999) are safely saved in your bag. Tap to complete checkout before items sell out!"}
                                {sequenceStep === 2 && "Hey Sneha! 🎧 Over 450 shoppers bought these headphones this week. Here’s what Amit says: 'Best audio bass under 5k!' Grab yours with Free Next-Day BlueDart Shipping."}
                                {sequenceStep === 3 && "⚠️ Final Notice Sneha! We’ve unlocked an exclusive 15% OFF coupon (Code: COMEBACK15). This expires in exactly 2 hours. Tap below to buy now for ₹4,249!"}
                              </p>
                              <div className="pt-1">
                                <button className="w-full py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-[11px] uppercase tracking-wider transition-all cursor-pointer">
                                  🛒 1-Click WhatsApp Checkout (Saved ₹4,999)
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {recoverTab === 'prepaid' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full space-y-4">
                          <div className="p-5 rounded-2xl bg-muted/50 border border-border space-y-4 font-sans">
                            <div className="flex items-center justify-between border-b border-border pb-3">
                              <div className="flex items-center gap-2">
                                <Gift className="w-4 h-4 text-brand-orange" />
                                <span className="text-xs font-extrabold uppercase tracking-wider text-foreground">Prepaid Incentive Deflector</span>
                              </div>
                              <span className="text-xs font-mono font-bold text-success">35% Conversion</span>
                            </div>

                            <div className="p-4 rounded-xl bg-background border border-border shadow-md space-y-3">
                              <p className="text-xs font-bold text-foreground">Order #ORD-4491 &bull; ₹2,499 (Placed as COD)</p>
                              <p className="text-[11px] text-muted-foreground leading-relaxed">
                                "Hi Karthik! Convert your ₹2,499 COD order to UPI Prepaid right now and get an instant ₹250 flat discount (+ Priority Same-Day Dispatch)."
                              </p>
                              
                              <div className="grid grid-cols-2 gap-2 pt-1">
                                <button className="py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer">
                                  ⚡ Pay ₹2,249 via UPI
                                </button>
                                <button className="py-2.5 rounded-xl bg-muted border border-border text-muted-foreground text-xs font-bold hover:text-foreground cursor-pointer">
                                  Keep COD
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </ScaleIn>
                </div>

              </div>
            </div>
          </section>

          {/* Deep-Dive Showcase 1 */}
          <section className="py-24 bg-background border-b border-border overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-6 order-2 lg:order-1">
                  <div className="bg-gradient-to-tr from-brand-orange/10 via-card to-brand-blue/10 border border-border rounded-[3rem] p-8 shadow-xl">
                    <div className="bg-background border border-border rounded-3xl p-6 shadow-md space-y-6">
                      <div className="flex items-center justify-between border-b border-border pb-3">
                        <span className="font-extrabold text-sm text-foreground">Automated Recovery Pipeline</span>
                        <span className="text-xs font-mono text-success">✓ 35% Recovery Rate</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        When a shopper drops off at your Shopify payment gateway, Autoshipp Recover captures the exact cart items, variant selections, and checkout URL. Within 60 minutes, our AI initiates an empathetic conversational reminder.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-muted text-center">
                          <p className="text-2xl font-black text-brand-orange">3x</p>
                          <p className="text-xs text-muted-foreground">Better Than Email</p>
                        </div>
                        <div className="p-3 rounded-xl bg-muted text-center">
                          <p className="text-2xl font-black text-success">₹4.2L</p>
                          <p className="text-xs text-muted-foreground">Avg Mo. Revenue Saved</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-extrabold tracking-wider uppercase">
                    <ShoppingCart className="w-3.5 h-3.5" /> Cart Recovery Engine
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.1]">
                    Stop Leaving Carts Behind. <span className="text-brand-orange">Re-engage Instantly.</span>
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Over 75% of e-commerce shopping carts are abandoned before purchase. Win back high-intent shoppers using multi-stage messaging triggers that combine helpful reminders, authentic customer reviews, and timed coupon nudges.
                  </p>
                  <ul className="space-y-3 pt-2 text-foreground font-medium text-base">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                      <span><strong>Direct Cart Restoration:</strong> Tapping the WhatsApp CTA link restores Shopify bag contents instantly.</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                      <span><strong>Smart Exit-Intent Detection:</strong> Identifies tab switching events to fire priority discount interventions.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-32 bg-background">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-11">
              <FadeInUp className="text-center max-w-3xl mx-auto mb-20">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-6">Designed to Plug Revenue Leaks</h2>
                <p className="text-lg text-muted-foreground">Automatically turn dropped checkout sessions into paid customer orders.</p>
              </FadeInUp>
              <StaggerContainer className="grid md:grid-cols-2 gap-8">
                {features.map((feat, idx) => (
                  <StaggerItem key={idx}>
                    <div className="p-10 rounded-[2.5rem] bg-card border border-border hover:border-brand-orange/40 shadow-lg transition-all h-full flex flex-col items-start group">
                      <div className="p-4 bg-muted rounded-2xl shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                        {feat.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-4">{feat.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">{feat.desc}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>

          {/* ROI Banner */}
          <section className="py-20 bg-gradient-to-br from-slate-900 to-brand-navy text-white my-10 max-w-[1440px] mx-auto sm:rounded-[3rem] px-4 sm:px-10 lg:px-20 relative overflow-hidden shadow-2xl border border-white/10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-2xl">
                <h2 className="text-4xl lg:text-5xl font-black mb-6">Ready to Recover 35% of Lost Checkouts?</h2>
                <p className="text-lg text-slate-300 mb-8 leading-relaxed">Equip your webstore with Autoshipp Recover today. Launch automated WhatsApp cart win-back drips and flip risky COD orders into UPI prepaid cash.</p>
                <button onClick={() => setBookDemoOpen(true)} className="h-14 px-8 rounded-full bg-brand-orange hover:bg-brand-orange/90 text-white font-extrabold flex items-center gap-2 shadow-xl shadow-brand-orange/30 transition-all cursor-pointer">
                  <span>Schedule Recovery Walkthrough</span>
                  <ArrowRight size={20} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-6 w-full lg:w-auto font-mono">
                <div className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-sm text-center">
                  <p className="text-4xl font-black text-brand-orange mb-2">35%</p>
                  <p className="text-xs font-bold text-slate-300 uppercase">Cart Win-Back Rate</p>
                </div>
                <div className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-sm text-center">
                  <p className="text-4xl font-black text-emerald-400 mb-2">3x</p>
                  <p className="text-xs font-bold text-slate-300 uppercase">Better Than Email</p>
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
