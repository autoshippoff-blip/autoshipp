'use client';

import React, { useState } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BookDemoPopup from '../../../components/BookDemoPopup';
import { FadeInUp, ScaleIn, StaggerContainer, StaggerItem } from '../../../components/AnimatedUI';
import { ArrowRight, ShieldCheck, AlertTriangle, Ban, TrendingDown, Activity, Sparkles, PhoneCall, MapPin, CheckCircle2, Lock, FileWarning } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ShieldProductPage() {
  const [isDark, setIsDark] = useTheme();
  const [bookDemoOpen, setBookDemoOpen] = useState(false);
  const [shieldTab, setShieldTab] = useState('risk'); // risk | verify
  const [sampleRisk, setSampleRisk] = useState('low'); // low | medium | high

  const sampleOrders = {
    low: {
      customer: 'Deepak S. (+91 98821 XXXXX)',
      details: 'PIN: 560034 (Koramangala, Bangalore)',
      risk: '4.2%',
      riskClass: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
      policy: 'Order auto-approved for instant BlueDart dispatch.',
      policyClass: 'text-emerald-300',
      policyIcon: <CheckCircle2 className="w-4 h-4 shrink-0" />
    },
    medium: {
      customer: 'Preeti K. (+91 70192 XXXXX)',
      details: 'PIN: 400001 (Colaba, Mumbai - High COD Vol)',
      risk: '58.7%',
      riskClass: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
      policy: 'AI verification call scheduled to confirm dispatch intent.',
      policyClass: 'text-amber-300',
      policyIcon: <PhoneCall className="w-4 h-4 shrink-0" />
    },
    high: {
      customer: 'Anonymous Buyer (+91 88291 XXXXX)',
      details: 'PIN: 284001 (High RTO Zone Cluster)',
      risk: '89.4%',
      riskClass: 'bg-destructive/20 text-red-400 border border-destructive/30 animate-pulse',
      policy: 'COD blocked. Mandatory UPI advance payment link triggered.',
      policyClass: 'text-red-300',
      policyIcon: <FileWarning className="w-4 h-4 shrink-0" />
    }
  };

  const features = [
    {
      title: 'AI COD Intent Verification',
      desc: 'Our AI calls every Cash-On-Delivery customer within 180 seconds of order placement, verifying genuine intent and confirming precise address markers.',
      icon: <ShieldCheck className="w-6 h-6 text-brand-orange" />
    },
    {
      title: '50-Point RTO Risk Scoring',
      desc: 'Every order receives an instant neural probability score evaluating pincode courier return history, IP anomalies, and device fingerprint patterns.',
      icon: <Activity className="w-6 h-6 text-brand-blue" />
    },
    {
      title: 'Automated COD Gatekeeping',
      desc: 'Automatically hides Cash-On-Delivery payment options for repeat fraudulent buyers or pushes them to prepaid with small discount incentives.',
      icon: <Ban className="w-6 h-6 text-destructive" />
    },
    {
      title: 'Shared Brand Intelligence',
      desc: 'Tap into Autoshipp\'s federated fraud defense network across 15,000+ Indian merchants to block bad actors before they damage your inventory.',
      icon: <AlertTriangle className="w-6 h-6 text-warning dark:text-amber-400" />
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
                      <Sparkles className="w-3.5 h-3.5" /> RTO Reduction &amp; Fraud Shield
                    </div>
                  </FadeInUp>
                  <FadeInUp delay={0.2}>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.08] mb-6">
                      Eliminate RTO Losses. <span className="bg-gradient-to-r from-brand-orange via-amber-500 to-brand-blue bg-clip-text text-transparent">Ship Securely.</span>
                    </h1>
                  </FadeInUp>
                  <FadeInUp delay={0.3}>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
                      Slash reverse shipping losses by up to 45% using real-time 50-point RTO risk scoring, automated AI telephone verification calls, and federated merchant fraud intelligence.
                    </p>
                  </FadeInUp>
                  <FadeInUp delay={0.4} className="flex flex-wrap gap-4">
                    <button
                      onClick={() => setBookDemoOpen(true)}
                      className="h-14 px-8 flex items-center justify-center rounded-full text-white bg-brand-orange hover:bg-brand-orange/90 shadow-xl shadow-brand-orange/25 transition-all font-extrabold text-base cursor-pointer group"
                    >
                      <span>Test RTO Risk Calculator</span>
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </button>
                  </FadeInUp>
                </div>

                {/* Right Interactive Simulator */}
                <div className="lg:col-span-6 relative z-10">
                  <ScaleIn delay={0.4} className="w-full bg-card border border-border rounded-[3rem] shadow-2xl p-6 sm:p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />

                    {/* Switcher */}
                    <div className="flex gap-2 p-1.5 rounded-2xl bg-muted mb-6 border border-border/60">
                      <button
                        onClick={() => setShieldTab('risk')}
                        className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${shieldTab === 'risk' ? 'bg-background text-brand-orange shadow-md border border-border/80' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        <ShieldCheck className="w-4 h-4" /> Risk Predictor AI
                      </button>
                      <button
                        onClick={() => setShieldTab('verify')}
                        className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${shieldTab === 'verify' ? 'bg-background text-brand-blue shadow-md border border-border/80' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        <PhoneCall className="w-4 h-4" /> AI COD Call
                      </button>
                    </div>

                    {/* View */}
                    <div className="min-h-[340px] flex items-center justify-center font-sans">
                      {shieldTab === 'risk' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full space-y-4">
                          <div className="p-5 rounded-2xl bg-slate-950 text-white border border-white/10 shadow-xl space-y-4 font-mono">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-3 gap-2">
                              <span className="text-xs font-bold text-slate-300">Live RTO Neural Engine</span>
                              <div className="flex gap-1 flex-wrap">
                                <button 
                                  onClick={() => setSampleRisk('low')} 
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-all ${
                                    sampleRisk === 'low' ? 'bg-emerald-500 text-white' : 'bg-white/10 text-slate-400 hover:text-white'
                                  }`}
                                >
                                  Non-Risk (0-45%)
                                </button>
                                <button 
                                  onClick={() => setSampleRisk('medium')} 
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-all ${
                                    sampleRisk === 'medium' ? 'bg-amber-500 text-white' : 'bg-white/10 text-slate-400 hover:text-white'
                                  }`}
                                >
                                  Medium Risk (45-70%)
                                </button>
                                <button 
                                  onClick={() => setSampleRisk('high')} 
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-all ${
                                    sampleRisk === 'high' ? 'bg-destructive text-white' : 'bg-white/10 text-slate-400 hover:text-white'
                                  }`}
                                >
                                  High Risk (70-100%)
                                </button>
                              </div>
                            </div>

                            <div className="space-y-3 font-sans">
                              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                                <div>
                                  <p className="text-xs font-bold text-white">{sampleOrders[sampleRisk].customer}</p>
                                  <p className="text-[11px] text-slate-400">{sampleOrders[sampleRisk].details}</p>
                                </div>
                                <span className={`px-2.5 py-1 rounded-lg font-mono text-xs font-bold ${sampleOrders[sampleRisk].riskClass}`}>
                                  RTO Risk: {sampleOrders[sampleRisk].risk}
                                </span>
                              </div>

                              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1.5">
                                <span className="font-bold text-slate-300 block font-mono uppercase text-[10px]">Automated Enforcement Policy</span>
                                <p className={`${sampleOrders[sampleRisk].policyClass} flex items-center gap-1.5`}>
                                  {sampleOrders[sampleRisk].policyIcon}
                                  <span>{sampleOrders[sampleRisk].policy}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {shieldTab === 'verify' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full space-y-4">
                          <div className="p-5 rounded-2xl bg-muted/60 border border-border space-y-3 font-sans text-left">
                            <div className="flex items-center justify-between border-b border-border pb-2.5">
                              <span className="text-xs font-extrabold uppercase text-foreground">AI Automated Order Call</span>
                              <span className="text-[10px] font-mono font-bold bg-success/20 text-success px-2 py-0.5 rounded animate-pulse">● Dialing Customer</span>
                            </div>

                            <div className="space-y-2 text-xs">
                              <div className="bg-background p-3 rounded-2xl border border-border">
                                <p className="text-brand-orange font-bold mb-1">🤖 Autoshipp AI Voice (00:12)</p>
                                <p className="text-muted-foreground leading-relaxed">&quot;Hello Priya! You just placed a COD order for ₹1,899 on BrandStore. Press 1 to confirm dispatch, or Press 2 to cancel.&quot;</p>
                              </div>
                              <div className="p-3 rounded-xl bg-success/15 border border-success/30 flex items-center justify-between text-foreground font-semibold">
                                <span>Customer Pressed [ 1 ]</span>
                                <span className="text-success font-mono font-bold">✓ Confirmed Safe</span>
                              </div>
                            </div>
                          </div>

                          {/* Recent Call Logs */}
                          <div className="p-5 rounded-2xl bg-card border border-border space-y-4 font-sans text-left">
                            <div>
                              <span className="text-xs font-bold text-foreground block">Call Verification Logs (Recent)</span>
                              <p className="text-[10px] text-muted-foreground mt-0.5">Logs of automated telephone dispatches and outcomes.</p>
                            </div>

                            <div className="space-y-2.5">
                              {[
                                {
                                  customer: 'Suresh M. (+91 81291 XXXXX)',
                                  details: 'Order #4489 | ₹1,450 COD | 5m ago',
                                  status: 'Failed: Pressed 2 (Cancel)',
                                  action: 'Order Cancelled',
                                  statusClass: 'text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20',
                                  icon: <Ban className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                                },
                                {
                                  customer: 'Neha G. (+91 99120 XXXXX)',
                                  details: 'Order #4488 | ₹3,200 COD | 12m ago',
                                  status: 'Safe: Confirmed Dispatch',
                                  action: 'Auto-Approved',
                                  statusClass: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
                                  icon: <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                },
                                {
                                  customer: 'Karan T. (+91 78921 XXXXX)',
                                  details: 'Order #4485 | ₹1,999 COD | 28m ago',
                                  status: 'Failed: Unanswered (3 attempts)',
                                  action: 'Held - WhatsApp Sent',
                                  statusClass: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20',
                                  icon: <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                },
                                {
                                  customer: 'Fake Buyer (+91 00000 XXXXX)',
                                  details: 'Order #4481 | ₹5,899 COD | 45m ago',
                                  status: 'Failed: Carrier Error (Invalid)',
                                  action: 'Blocked & Held',
                                  statusClass: 'text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20',
                                  icon: <FileWarning className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                                }
                              ].map((log, idx) => (
                                <div key={idx} className="p-3 bg-muted/40 border border-border/80 rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-3 transition-all">
                                  <div className="flex gap-2.5 items-start">
                                    {log.icon}
                                    <div>
                                      <p className="text-xs font-bold text-foreground">{log.customer}</p>
                                      <p className="text-[10px] text-muted-foreground mt-0.5">{log.details}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-4 justify-between sm:justify-end text-right">
                                    <div className="text-left sm:text-right">
                                      <span className="text-[9px] font-bold text-muted-foreground uppercase block">Outcome</span>
                                      <span className="text-[11px] font-semibold text-foreground">{log.status}</span>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border shrink-0 ${log.statusClass}`}>
                                      {log.action}
                                    </span>
                                  </div>
                                </div>
                              ))}
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
                        <span className="font-extrabold text-sm text-foreground">Federated Merchant Intelligence</span>
                        <span className="text-xs font-mono text-success">✓ 15,000+ Brands</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Fraudulent shoppers routinely order expensive D2C items via COD on false addresses just to reject delivery. Autoshipp Shield compiles bad actor phone numbers and IP subnets across India to blacklist RTO abusers before packing.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-muted text-center">
                          <p className="text-2xl font-black text-brand-orange">45%</p>
                          <p className="text-xs text-muted-foreground">RTO Drop</p>
                        </div>
                        <div className="p-3 rounded-xl bg-muted text-center">
                          <p className="text-2xl font-black text-success">180s</p>
                          <p className="text-xs text-muted-foreground">Call SLA</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-extrabold tracking-wider uppercase">
                    <Lock className="w-3.5 h-3.5" /> Order Gatekeeping Engine
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.1]">
                    Stop Shipping To Ghosts. <span className="text-brand-orange">Verify Every COD.</span>
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Reverse shipping logistics and courier return penalties can destroy up to 20% of your D2C operating margin. Gatekeep your warehouse dispatches with predictive AI scoring that flags incomplete addresses and fake orders.
                  </p>
                  <ul className="space-y-3 pt-2 text-foreground font-medium text-base">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                      <span><strong>Automated Address Parsing:</strong> Highlights missing house numbers or unserviceable pincodes.</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                      <span><strong>Dynamic COD Restrictions:</strong> Hides COD option at checkout for users with &gt;70% RTO history.</span>
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
                <p className="text-lg text-muted-foreground">Protect your unit economics without introducing friction for legitimate buyers.</p>
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
                <h2 className="text-4xl lg:text-5xl font-black mb-6">Ready to Slash RTO Losses by 45%?</h2>
                <p className="text-lg text-slate-300 mb-8 leading-relaxed">Equip your brand with Autoshipp Shield today. Filter out fake COD orders, verify genuine buyer intent via automated telephone calls, and protect your profitability.</p>
                <button onClick={() => setBookDemoOpen(true)} className="h-14 px-8 rounded-full bg-brand-orange hover:bg-brand-orange/90 text-white font-extrabold flex items-center gap-2 shadow-xl shadow-brand-orange/30 transition-all cursor-pointer">
                  <span>Schedule Shield Demo</span>
                  <ArrowRight size={20} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-6 w-full lg:w-auto font-mono">
                <div className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-sm text-center">
                  <p className="text-4xl font-black text-brand-orange mb-2">45%</p>
                  <p className="text-xs font-bold text-slate-300 uppercase">RTO Reduction</p>
                </div>
                <div className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-sm text-center">
                  <p className="text-4xl font-black text-emerald-400 mb-2">180s</p>
                  <p className="text-xs font-bold text-slate-300 uppercase">Verification Speed</p>
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
