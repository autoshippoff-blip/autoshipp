'use client';

import React, { useState } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BookDemoPopup from '../../../components/BookDemoPopup';
import { FadeInUp, ScaleIn, StaggerContainer, StaggerItem } from '../../../components/AnimatedUI';
import { ArrowRight, RotateCcw, RefreshCw, CheckCircle2, TrendingUp, Package, LayoutDashboard, UserCheck, Sparkles, Filter, AlertCircle, ShieldCheck, ExternalLink, Clock, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ReturnsProductPage() {
  const [isDark, setIsDark] = useTheme();
  const [bookDemoOpen, setBookDemoOpen] = useState(false);
  const [portalTab, setPortalTab] = useState('shopper'); // shopper | dashboard

  const features = [
    {
      title: 'Branded Customer Portal',
      desc: 'Give shoppers a self-service 60-second portal customized with your brand logo, colors, and domain to initiate returns or instant exchanges.',
      icon: <UserCheck className="w-6 h-6 text-brand-orange" />
    },
    {
      title: 'Individual Brand Dashboard',
      desc: 'A centralized merchant command center showing every return request, AI reason tagging, carrier pickup statuses, and retention analytics.',
      icon: <LayoutDashboard className="w-6 h-6 text-brand-blue" />
    },
    {
      title: 'Automated Return Labels',
      desc: 'Generate reverse pickup shipping labels automatically with BlueDart, Delhivery, or Xpressbees the exact moment QC rules are satisfied.',
      icon: <Package className="w-6 h-6 text-success" />
    },
    {
      title: 'Smart Refund Deflection',
      desc: 'Offer shoppers bonus store credit (+15%) or 1-click variant exchanges prior to refund processing — saving up to 70% of lost revenue.',
      icon: <TrendingUp className="w-6 h-6 text-brand-navy dark:text-amber-400" />
    }
  ];

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand-orange/20 transition-colors duration-300">
        <Header isDark={isDark} setIsDark={setIsDark} onBookDemo={() => setBookDemoOpen(true)} />

        <main className="pt-16 sm:pt-24 pb-16">
          {/* Hero Section */}
          <section className="relative z-0 bg-muted/30 overflow-hidden pt-8 sm:pt-20 pb-16 sm:pb-28 border-b border-border">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-11">
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Intro */}
                <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
                  <FadeInUp delay={0.1}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-xs tracking-widest font-extrabold mb-8 uppercase border border-brand-orange/20 shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5" /> Return &amp; Exchange Suite
                    </div>
                  </FadeInUp>
                  <FadeInUp delay={0.2}>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.08] mb-6">
                      Turn Returns Into <span className="bg-gradient-to-r from-brand-orange via-amber-500 to-brand-blue bg-clip-text text-transparent">Retained Revenue.</span>
                    </h1>
                  </FadeInUp>
                  <FadeInUp delay={0.3}>
                    <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
                      Deliver a 60-second self-service shopper portal and equip your team with a dedicated brand dashboard to automate approvals, reverse logistics, and revenue retention.
                    </p>
                  </FadeInUp>
                  <FadeInUp delay={0.4} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <button
                      onClick={() => setBookDemoOpen(true)}
                      className="h-14 px-8 flex items-center justify-center rounded-full text-white bg-brand-orange hover:bg-brand-orange/90 shadow-xl shadow-brand-orange/25 transition-all font-extrabold text-base cursor-pointer group w-full sm:w-auto"
                    >
                      <span>Explore Brand Dashboard</span>
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </button>
                  </FadeInUp>
                </div>

                {/* Right Interactive Dual Suite Showcase */}
                <div className="lg:col-span-6 relative z-10 w-full overflow-hidden">
                  <ScaleIn delay={0.4} className="w-full bg-card border border-border rounded-3xl sm:rounded-[3rem] shadow-2xl p-4 sm:p-8 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />

                    {/* Switcher Tabs */}
                    <div className="flex flex-col sm:flex-row gap-2 p-1.5 rounded-2xl bg-muted mb-6 border border-border/60">
                      <button
                        onClick={() => setPortalTab('shopper')}
                        className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${portalTab === 'shopper' ? 'bg-background text-brand-orange shadow-md border border-border/80' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        <UserCheck className="w-4 h-4" /> Customer Portal
                      </button>
                      <button
                        onClick={() => setPortalTab('dashboard')}
                        className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${portalTab === 'dashboard' ? 'bg-background text-brand-blue shadow-md border border-border/80' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        <LayoutDashboard className="w-4 h-4" /> Brand Dashboard
                      </button>
                    </div>

                    {/* Tab Views */}
                    <div className="min-h-[360px] flex items-center justify-center w-full">
                      
                      {portalTab === 'shopper' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full space-y-4">
                          <div className="p-4 sm:p-5 rounded-2xl bg-background border border-border shadow-md space-y-4">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-border pb-3 gap-2">
                              <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                                <span className="font-extrabold text-xs tracking-wider uppercase text-foreground">Shopper Self-Service Portal</span>
                              </div>
                              <span className="font-mono text-[11px] text-muted-foreground">returns.yourbrand.com</span>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/60">
                              <Package className="w-8 h-8 text-brand-orange shrink-0" />
                              <div className="flex-1">
                                <p className="text-xs font-bold text-foreground">Priya Sharma &bull; Order #ORD-8892</p>
                                <p className="text-[11px] text-muted-foreground">Emerald Silk Saree &bull; Delivered Jun 22</p>
                              </div>
                              <span className="text-xs font-mono font-bold text-foreground">₹3,499</span>
                            </div>

                            <div className="space-y-2">
                              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">Select Resolution</span>
                              
                              <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between cursor-pointer gap-2">
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-1.5 font-extrabold text-xs text-foreground">
                                    <span>✨ Instant Size Exchange</span>
                                    <span className="bg-emerald-500 text-white text-[9px] px-1.5 py-0.2 rounded font-mono">RECOMMENDED</span>
                                  </div>
                                  <p className="text-[11px] text-muted-foreground">Free doorstep pickup &bull; Replacement shipped instantly</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-emerald-500 shrink-0" />
                              </div>

                              <div className="p-3 rounded-xl bg-muted/40 border border-border hover:border-brand-orange/40 flex flex-col sm:flex-row items-start sm:items-center justify-between cursor-pointer transition-colors gap-2">
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-1.5 font-extrabold text-xs text-foreground">
                                    <span>🎁 Store Credit Gift Card</span>
                                    <span className="bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[9px] px-1.5 py-0.2 rounded font-mono">+15% BONUS</span>
                                  </div>
                                  <p className="text-[11px] text-muted-foreground">Receive ₹4,024 wallet credit instantly</p>
                                </div>
                                <DollarSign className="w-4 h-4 text-muted-foreground shrink-0" />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {portalTab === 'dashboard' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full space-y-4">
                          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 text-white border border-white/10 shadow-xl space-y-4">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-3 gap-2">
                              <div className="flex items-center gap-2">
                                <LayoutDashboard className="w-4 h-4 text-brand-blue shrink-0" />
                                <span className="font-extrabold text-xs tracking-wider uppercase text-white">Brand Merchant Command Center</span>
                              </div>
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Live Sync
                              </span>
                            </div>

                            {/* KPI Metrics */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center font-mono">
                              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                                <span className="text-[9px] text-slate-400 uppercase block">Return Requests</span>
                                <span className="text-sm font-bold text-white">24 Pending</span>
                              </div>
                              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                                <span className="text-[9px] text-slate-400 uppercase block">Revenue Retained</span>
                                <span className="text-sm font-bold text-emerald-400">₹1,84,200</span>
                              </div>
                              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                                <span className="text-[9px] text-slate-400 uppercase block">Auto-Labels</span>
                                <span className="text-sm font-bold text-brand-orange">99.2% SLA</span>
                              </div>
                            </div>

                            {/* Live Requests Feed */}
                            <div className="space-y-2 font-sans">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Recent Return Feed</span>
                              
                              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs gap-2">
                                <div>
                                  <span className="font-bold text-white">#RET-104 &bull; Ananya V.</span>
                                  <p className="text-[10px] text-slate-400">Denim Jacket (L) &bull; Reason: Color variance</p>
                                </div>
                                <span className="px-2 py-0.5 rounded bg-brand-blue/20 text-brand-blue font-mono text-[10px] font-bold self-start sm:self-auto">Exchange Approved</span>
                              </div>

                              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs gap-2">
                                <div>
                                  <span className="font-bold text-white">#RET-105 &bull; Rahul M.</span>
                                  <p className="text-[10px] text-slate-400">Sneakers (10) &bull; Reason: Defective QC</p>
                                </div>
                                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold self-start sm:self-auto">Courier Assigned</span>
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

          {/* Deep-Dive Showcase 1: Customer Portal */}
          <section className="py-16 sm:py-24 bg-background border-b border-border overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-12 gap-16 items-center">
                
                <div className="lg:col-span-6 order-2 lg:order-1">
                  <div className="bg-gradient-to-br from-brand-orange/10 via-card to-brand-blue/10 border border-border rounded-3xl sm:rounded-[3rem] p-4 sm:p-8 shadow-xl">
                    <div className="bg-background border border-border rounded-3xl p-4 sm:p-6 shadow-md space-y-5">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-border pb-3 gap-2">
                        <span className="font-extrabold text-sm text-foreground">White-Label Shopper Experience</span>
                        <span className="text-xs font-mono text-success">✓ Zero Support Tickets</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        When shoppers want to exchange or return an item, they visit your dedicated portal (e.g., <code className="text-foreground font-bold">returns.yourbrand.com</code>). In under 60 seconds, they verify their order via OTP, select the return reason, and choose instant variant replacement.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div className="p-3 rounded-xl bg-muted text-center">
                          <p className="text-xl font-black text-brand-orange">60s</p>
                          <p className="text-xs text-muted-foreground">Self-Service Time</p>
                        </div>
                        <div className="p-3 rounded-xl bg-muted text-center">
                          <p className="text-xl font-black text-success">70%</p>
                          <p className="text-xs text-muted-foreground">Refund Deflection</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-extrabold tracking-wider uppercase">
                    <UserCheck className="w-3.5 h-3.5" /> Branded User Portal
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.1]">
                    Delight Shoppers with <span className="text-brand-orange">1-Click Exchanges.</span>
                  </h2>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    Eliminate frustrating email back-and-forth and customer support queues. Give your shoppers a frictionless, Amazon-grade reverse logistics portal fully customized with your brand identity.
                  </p>
                  <ul className="space-y-3 pt-2 text-foreground font-medium text-sm sm:text-base">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                      <span><strong>Instant OTP Verification:</strong> Shoppers authenticate securely using mobile number or order ID.</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                      <span><strong>AI Variant Recommendation:</strong> Automatically suggests alternative sizes or trending colors in stock.</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                      <span><strong>Live WhatsApp Notifications:</strong> Automated reverse courier tracking updates sent straight to shopper phones.</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </section>

          {/* Deep-Dive Showcase 2: Individual Brand Dashboard */}
          <section className="py-16 sm:py-24 bg-muted/20 border-b border-border overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-12 gap-16 items-center">
                
                <div className="lg:col-span-6 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-extrabold tracking-wider uppercase">
                    <LayoutDashboard className="w-3.5 h-3.5" /> Merchant Command Center
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.1]">
                    Individual Dashboards for <span className="text-brand-blue">Total Control.</span>
                  </h2>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    Every D2C brand on Autoshipp receives a dedicated, highly granular merchant dashboard. Monitor every incoming return request, inspect AI-flagged fraud alerts, trigger automated carrier reverse labels, and track net saved revenue in real time.
                  </p>
                  <ul className="space-y-3 pt-2 text-foreground font-medium text-sm sm:text-base">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0" />
                      <span><strong>Complete Request Oversight:</strong> Search, filter, and review return reasons across warehouses effortlessly.</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0" />
                      <span><strong>Automated Courier Allocation:</strong> Dispatches BlueDart or Delhivery reverse pickup agents automatically.</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0" />
                      <span><strong>QC &amp; Restock Engine:</strong> Marks items for warehouse restocking or quality inspection with 1 click.</span>
                    </li>
                  </ul>
                </div>

                <div className="lg:col-span-6">
                  <div className="bg-card border border-border rounded-3xl sm:rounded-[3rem] p-4 sm:p-8 shadow-xl space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-border pb-4 gap-2">
                      <div className="flex items-center gap-2 font-bold text-foreground">
                        <ShieldCheck className="w-5 h-5 text-brand-blue shrink-0" />
                        <span>Brand Operations Dashboard</span>
                      </div>
                      <span className="text-xs font-mono bg-brand-blue/10 text-brand-blue px-2.5 py-1 rounded-full font-bold">Admin Portal v4.2</span>
                    </div>

                    <div className="space-y-3">
                      <div className="p-4 rounded-2xl bg-muted/60 border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm gap-2">
                        <div className="space-y-1">
                          <span className="font-extrabold text-foreground block">Automated QC Policy Rule</span>
                          <p className="text-xs text-muted-foreground">Auto-approve apparel exchanges within 7-day window.</p>
                        </div>
                        <span className="px-2.5 py-1 rounded-lg bg-success text-white font-bold text-xs shrink-0">Active</span>
                      </div>

                      <div className="p-4 rounded-2xl bg-muted/60 border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm gap-2">
                        <div className="space-y-1">
                          <span className="font-extrabold text-foreground block">Reverse Courier Routing</span>
                          <p className="text-xs text-muted-foreground">Priority assigned to cheapest partner with &lt; 24h pickup SLA.</p>
                        </div>
                        <span className="px-2.5 py-1 rounded-lg bg-brand-blue text-white font-bold text-xs shrink-0">Automated</span>
                      </div>

                      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm gap-2">
                        <div className="flex items-center gap-3">
                          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                          <div>
                            <span className="font-extrabold text-foreground block">AI Return Fraud Protection</span>
                            <p className="text-xs text-muted-foreground">Blocks repeat offenders with high Wardrobing score.</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 shrink-0">Enforced</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-32 bg-background">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-11">
              <FadeInUp className="text-center max-w-3xl mx-auto mb-20">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-6">Built to Protect D2C Margins</h2>
                <p className="text-lg text-muted-foreground">A complete post-purchase operating system designed to keep customers happy and your accounting green.</p>
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
                <h2 className="text-4xl lg:text-5xl font-black mb-6">Ready to Retain 70% of Return Revenue?</h2>
                <p className="text-lg text-slate-300 mb-8 leading-relaxed">Equip your brand with Autoshipp Returns today. Give your shoppers an effortless exchange portal and take full command with your dedicated merchant dashboard.</p>
                <button onClick={() => setBookDemoOpen(true)} className="h-14 px-8 rounded-full bg-brand-orange hover:bg-brand-orange/90 text-white font-extrabold flex items-center gap-2 shadow-xl shadow-brand-orange/30 transition-all cursor-pointer">
                  <span>Schedule Brand Walkthrough</span>
                  <ArrowRight size={20} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-6 w-full lg:w-auto font-mono">
                <div className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-sm text-center">
                  <p className="text-4xl font-black text-brand-orange mb-2">70%</p>
                  <p className="text-xs font-bold text-slate-300 uppercase">Exchange Conversion</p>
                </div>
                <div className="bg-white/10 p-6 rounded-2xl border border-border/10 backdrop-blur-sm text-center">
                  <p className="text-4xl font-black text-emerald-400 mb-2">60s</p>
                  <p className="text-xs font-bold text-slate-300 uppercase">Portal Initiation</p>
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
