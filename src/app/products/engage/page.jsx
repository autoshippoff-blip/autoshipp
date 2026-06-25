'use client';

import React, { useState } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BookDemoPopup from '../../../components/BookDemoPopup';
import { FadeInUp, ScaleIn, StaggerContainer, StaggerItem } from '../../../components/AnimatedUI';
import { ArrowRight, CheckCircle2, MessageSquare, Zap, Activity, Users, Sparkles, Send, BellRing, Target, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EngageProductPage() {
  const [isDark, setIsDark] = useTheme();
  const [bookDemoOpen, setBookDemoOpen] = useState(false);
  const [engageTab, setEngageTab] = useState('campaign'); // campaign | alert
  const [selectedAudience, setSelectedAudience] = useState('High AOV Repeaters');

  const features = [
    { title: 'Behavioral WhatsApp Flows', desc: 'Trigger hyper-personalised promotional broadcasts automatically based on browsing history and wishlist additions.', icon: <Zap className="w-6 h-6 text-brand-orange" /> },
    { title: 'Automated Courier Alerts', desc: 'Keep shoppers engaged post-purchase with rich tracking cards, out-for-delivery OTPs, and instant NDR confirmation.', icon: <Activity className="w-6 h-6 text-brand-blue" /> },
    { title: 'Conversational Commerce', desc: 'Embed 1-click checkout buttons directly inside WhatsApp messages so users buy without redirecting to a browser.', icon: <MessageSquare className="w-6 h-6 text-success" /> },
    { title: 'AI RFM Audience Clustering', desc: 'Automatically segment your customer base into VIPs, Churn Risks, and Discount Seekers for maximum campaign ROAS.', icon: <Users className="w-6 h-6 text-brand-navy dark:text-amber-400" /> }
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
                      <Sparkles className="w-3.5 h-3.5" /> WhatsApp Marketing Engine
                    </div>
                  </FadeInUp>
                  <FadeInUp delay={0.2}>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.08] mb-6">
                      Engage Shoppers On <span className="bg-gradient-to-r from-brand-orange via-amber-500 to-brand-blue bg-clip-text text-transparent">Their #1 App.</span>
                    </h1>
                  </FadeInUp>
                  <FadeInUp delay={0.3}>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
                      Drive 4x higher CTR than traditional email with automated WhatsApp broadcast campaigns, predictive RFM audience clustering, and real-time courier utility alerts.
                    </p>
                  </FadeInUp>
                  <FadeInUp delay={0.4} className="flex flex-wrap gap-4">
                    <button
                      onClick={() => setBookDemoOpen(true)}
                      className="h-14 px-8 flex items-center justify-center rounded-full text-white bg-brand-orange hover:bg-brand-orange/90 shadow-xl shadow-brand-orange/25 transition-all font-extrabold text-base cursor-pointer group"
                    >
                      <span>Launch Campaign Simulator</span>
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </button>
                  </FadeInUp>
                </div>

                {/* Right Interactive Showcase */}
                <div className="lg:col-span-6 relative z-10">
                  <ScaleIn delay={0.4} className="w-full bg-card border border-border rounded-[3rem] shadow-2xl p-6 sm:p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />

                    {/* Tabs */}
                    <div className="flex gap-2 p-1.5 rounded-2xl bg-muted mb-6 border border-border/60">
                      <button
                        onClick={() => setEngageTab('campaign')}
                        className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${engageTab === 'campaign' ? 'bg-background text-brand-orange shadow-md border border-border/80' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        <Send className="w-4 h-4" /> Broadcast AI
                      </button>
                      <button
                        onClick={() => setEngageTab('alert')}
                        className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${engageTab === 'alert' ? 'bg-background text-brand-blue shadow-md border border-border/80' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        <BellRing className="w-4 h-4" /> Utility Alerts
                      </button>
                    </div>

                    {/* View */}
                    <div className="min-h-[340px] flex items-center justify-center">
                      {engageTab === 'campaign' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full space-y-4">
                          <div className="p-6 rounded-2xl bg-slate-950 text-white border border-white/10 shadow-xl space-y-4 font-sans">
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                              <span className="text-xs font-bold text-slate-300 uppercase">Audience Target Selector</span>
                              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded font-bold">98.4% Open Rate</span>
                            </div>

                            <div className="flex gap-1.5 flex-wrap">
                              {['High AOV Repeaters','Cart Abandoners (24h)','Inactive VIPs'].map(seg => (
                                <button key={seg} onClick={() => setSelectedAudience(seg)} className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${selectedAudience === seg ? 'bg-brand-orange text-white shadow-md' : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'}`}>{seg}</button>
                              ))}
                            </div>

                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3 relative overflow-hidden">
                              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                                <span>WhatsApp Template: VIP Private Drop</span>
                                <span className="text-brand-orange">● Ready to Fire</span>
                              </div>
                              <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-xs text-emerald-200 leading-relaxed">
                                "Hey Rahul! 🌟 Because you’re in our Top 5% shoppers, we’ve unlocked an exclusive 20% OFF on the new Monochrome Sneaker drop. Tap below to claim before stock runs out!"
                              </div>
                              <button className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs tracking-wider uppercase shadow-md transition-all cursor-pointer">
                                ⚡ Send Broadcast (14,200 Recipients)
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {engageTab === 'alert' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full space-y-4">
                          <div className="p-6 rounded-2xl bg-muted/50 border border-border space-y-4 font-sans">
                            <div className="flex items-center justify-between border-b border-border pb-3">
                              <span className="text-xs font-extrabold uppercase tracking-wider text-foreground">Post-Purchase Utility Automation</span>
                              <span className="text-xs font-mono text-brand-blue font-bold">100% Automated</span>
                            </div>

                            <div className="space-y-2.5">
                              <div className="p-3.5 rounded-xl bg-background border border-border shadow-2xs flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-brand-blue/15 text-brand-blue flex items-center justify-center font-bold">📦</div>
                                <div className="flex-1">
                                  <p className="text-xs font-extrabold text-foreground">Order Shipped Alert</p>
                                  <p className="text-[11px] text-muted-foreground">Triggered when BlueDart generates AWB #772810</p>
                                </div>
                                <span className="text-[10px] font-mono font-bold bg-success/20 text-success px-2 py-0.5 rounded">Sent</span>
                              </div>

                              <div className="p-3.5 rounded-xl bg-background border border-border shadow-2xs flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center font-bold">🚚</div>
                                <div className="flex-1">
                                  <p className="text-xs font-extrabold text-foreground">Out For Delivery + Secure OTP</p>
                                  <p className="text-[11px] text-muted-foreground">Includes live courier agent phone & delivery PIN</p>
                                </div>
                                <span className="text-[10px] font-mono font-bold bg-brand-blue/20 text-brand-blue px-2 py-0.5 rounded">Queued</span>
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
                        <span className="font-extrabold text-sm text-foreground">Predictive RFM Audience Segmentation</span>
                        <span className="text-xs font-mono text-success">✓ Zero Spam Reports</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Blasting the exact same promotional message to your entire contact database destroys brand reputation. Autoshipp Engage neural clustering analyses customer recency, frequency, and monetary metrics to deliver the exact right offer.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-muted text-center">
                          <p className="text-2xl font-black text-brand-orange">4x</p>
                          <p className="text-xs text-muted-foreground">Higher ROAS</p>
                        </div>
                        <div className="p-3 rounded-xl bg-muted text-center">
                          <p className="text-2xl font-black text-brand-blue">98%</p>
                          <p className="text-xs text-muted-foreground">Msg Delivery Rate</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-extrabold tracking-wider uppercase">
                    <Target className="w-3.5 h-3.5" /> Smart Broadcast Engine
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.1]">
                    Stop Blasting Email. <span className="text-brand-orange">Start Conversing.</span>
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Indian consumers check WhatsApp over 25 times per day. Transform your marketing funnel by launching interactive catalogs, private product drops, and automated restock alerts directly on customer lock screens.
                  </p>
                  <ul className="space-y-3 pt-2 text-foreground font-medium text-base">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                      <span><strong>Dynamic 1-Click Checkout:</strong> Customers review cart items and select UPI payments inside WhatsApp.</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                      <span><strong>AI Send-Time Optimisation:</strong> Fires messages when each specific shopper is statistically most active.</span>
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
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-6">Marketing Built for Retention</h2>
                <p className="text-lg text-muted-foreground">Convert one-time purchasers into repeat brand advocates with automated messaging.</p>
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
                <h2 className="text-4xl lg:text-5xl font-black mb-6">Ready to Boost Campaign ROAS 4x?</h2>
                <p className="text-lg text-slate-300 mb-8 leading-relaxed">Launch Autoshipp Engage today. Connect your Shopify or custom store to unlock automated WhatsApp marketing flows and real-time utility notifications.</p>
                <button onClick={() => setBookDemoOpen(true)} className="h-14 px-8 rounded-full bg-brand-orange hover:bg-brand-orange/90 text-white font-extrabold flex items-center gap-2 shadow-xl shadow-brand-orange/30 transition-all cursor-pointer">
                  <span>Schedule Engage Walkthrough</span>
                  <ArrowRight size={20} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-6 w-full lg:w-auto font-mono">
                <div className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-sm text-center">
                  <p className="text-4xl font-black text-brand-orange mb-2">98%</p>
                  <p className="text-xs font-bold text-slate-300 uppercase">Open Rate</p>
                </div>
                <div className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-sm text-center">
                  <p className="text-4xl font-black text-emerald-400 mb-2">4x</p>
                  <p className="text-xs font-bold text-slate-300 uppercase">Higher ROAS</p>
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
