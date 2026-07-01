'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BookDemoPopup from '../../../components/BookDemoPopup';
import EtaWidget from '@/components/temporary/EtaWidget';
import { FadeInUp, ScaleIn, StaggerContainer, StaggerItem } from '../../../components/AnimatedUI';
import { ArrowRight, ShoppingCart, Ruler, Eye, Clock, TrendingUp, Zap, MapPin, Sparkles, Shirt, CheckCircle2, ShieldCheck, Search, Layers, Box } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ConvertProductPage() {
  const [isDark, setIsDark] = useTheme();
  const [bookDemoOpen, setBookDemoOpen] = useState(false);

  // Interactive Tab State for Hero Showcase
  const [activeTab, setActiveTab] = useState('tryon'); // tryon | size | pincode
  const [pincode, setPincode] = useState('600001');
  const [etaResult, setEtaResult] = useState('Estimated Delivery: 2 to 3 Days (Metro Air)');
  const [courierPartner, setCourierPartner] = useState('BlueDart Express');
  const [codAvailable, setCodAvailable] = useState(true);
  const [expressEligible, setExpressEligible] = useState(true);

  // Size AI Form States
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(70);
  const [fitPref, setFitPref] = useState('Regular');
  const [gender, setGender] = useState('Male');
  const [recommendation, setRecommendation] = useState(null);

  const handleGetRecommendation = () => {
    let size = 'M';
    let confidence = 94.5;
    
    // Simple logic based on height/weight/fit
    const bmi = weight / ((height / 100) * (height / 100));
    
    if (bmi < 18.5) {
      size = fitPref === 'Oversized' ? 'M' : 'S';
      confidence = 96.2;
    } else if (bmi >= 18.5 && bmi < 24.9) {
      size = fitPref === 'Slim' ? 'S' : fitPref === 'Oversized' ? 'L' : 'M';
      confidence = 98.4;
    } else if (bmi >= 24.9 && bmi < 29.9) {
      size = fitPref === 'Slim' ? 'M' : fitPref === 'Oversized' ? 'XL' : 'L';
      confidence = 95.1;
    } else {
      size = fitPref === 'Slim' ? 'L' : 'XL';
      confidence = 92.8;
    }
    
    setRecommendation({
      size,
      confidence: confidence.toFixed(1),
      explanation: `Based on your body measurements (${height}cm, ${weight}kg) and ${fitPref.toLowerCase()} fit preference, ${size} provides the best fit.`
    });
  };



  const features = [
    {
      title: 'AI Generative Photo Try-On',
      desc: 'Shoppers upload a single photo to see opened apparel synthesized photorealistically onto their exact body contour — cutting return rates by 45%.',
      icon: <Eye className="w-6 h-6 text-brand-blue" />
    },
    {
      title: 'Hyper-Local Pincode ETA',
      desc: 'Display reliable approximate delivery estimates (e.g., 3 to 5 days) across 28,000+ Indian pincodes dynamically at product detail pages, increasing cart progression by 23%.',
      icon: <MapPin className="w-6 h-6 text-brand-orange" />
    },
    {
      title: 'AI Size Recommendation',
      desc: 'Analyses historical return patterns and customer body measurements (chest, waist, inseam) to suggest the mathematically exact size.',
      icon: <Ruler className="w-6 h-6 text-success" />
    },
    {
      title: 'Smart Cart Upsell Engine',
      desc: 'Surface hyper-personalised complementary bundles based on real-time cart intent, boosting Average Order Value significantly.',
      icon: <TrendingUp className="w-6 h-6 text-amber-500" />
    }
  ];

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand-orange/20">
        <Header isDark={isDark} setIsDark={setIsDark} onBookDemo={() => setBookDemoOpen(true)} />        <main className="pt-16 sm:pt-24 pb-16">
          
          {/* Hero Section */}
          <section className="relative z-0 bg-muted/30 dark:bg-card/40 overflow-hidden pt-8 sm:pt-16 pb-16 sm:pb-28 border-b border-border">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-11">
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Content */}
                <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
                  <FadeInUp delay={0.1}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-xs tracking-widest font-extrabold mb-8 uppercase border border-brand-orange/20 shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5" /> Virtual Trial Room &bull; Pincode AI
                    </div>
                  </FadeInUp>
                  <FadeInUp delay={0.2}>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.08] mb-6">
                      Convert More Visitors. <span className="bg-gradient-to-r from-brand-orange via-amber-500 to-brand-blue bg-clip-text text-transparent">Eliminate Doubt.</span>
                    </h1>
                  </FadeInUp>
                  <FadeInUp delay={0.3}>
                    <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
                      Transform hesitant window shoppers into high-confidence buyers with our AR Virtual Trial Room, predictive Pincode ETA calculator, and AI size intelligence suite.
                    </p>
                  </FadeInUp>
                  <FadeInUp delay={0.4} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <button
                      onClick={() => setBookDemoOpen(true)}
                      className="h-14 px-8 flex items-center justify-center rounded-full text-white bg-brand-orange hover:bg-brand-orange/90 shadow-xl shadow-brand-orange/25 transition-all font-extrabold text-base cursor-pointer group w-full sm:w-auto"
                    >
                      <span>Experience Virtual Try-On</span>
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </button>
                  </FadeInUp>
                </div>

                {/* Right Interactive Mockup Suite */}
                <div className="lg:col-span-6 relative z-10 w-full overflow-hidden">
                  <ScaleIn delay={0.4} className="w-full bg-card border border-border rounded-3xl sm:rounded-[3rem] shadow-2xl p-4 sm:p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />

                    {/* Showcase Tabs Header */}
                    <div className="flex flex-col sm:flex-row gap-2 p-1.5 rounded-2xl bg-muted mb-6 border border-border/60">
                      <button 
                        onClick={() => setActiveTab('tryon')}
                        className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${activeTab === 'tryon' ? 'bg-background text-brand-blue shadow-md border border-border/80' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        <Shirt className="w-4 h-4 shrink-0" /> <span>Virtual Trial Room</span>
                      </button>
                      <button 
                        onClick={() => setActiveTab('pincode')}
                        className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${activeTab === 'pincode' ? 'bg-background text-brand-orange shadow-md border border-border/80' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        <MapPin className="w-4 h-4 shrink-0" /> <span>Pincode Estimate</span>
                      </button>
                      <button 
                        onClick={() => setActiveTab('size')}
                        className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${activeTab === 'size' ? 'bg-background text-success shadow-md border border-border/80' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        <Ruler className="w-4 h-4 shrink-0" /> <span>Size AI</span>
                      </button>
                    </div>

                    {/* Tab Content Display */}
                    <div className="min-h-[320px] flex items-center justify-center w-full">
                      
                      {activeTab === 'tryon' && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full space-y-4">
                          <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-brand-navy text-white relative overflow-hidden border border-white/10 shadow-lg space-y-4">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                              <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">AI Image Try-On Engine</span>
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[11px] font-bold border border-cyan-500/30">
                                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" /> Generative Diffusion
                              </span>
                            </div>

                            {/* Three-step visual workflow */}
                            <div className="flex flex-col items-stretch gap-3">
                              {/* Step 1 */}
                              <div className="flex items-center gap-4 p-3 bg-white/5 border border-white/10 rounded-xl">
                                <div className="w-12 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-800 border border-white/10 relative">
                                  <img src="/images/User.webp" className="w-full h-full object-cover" alt="User selfie" />
                                </div>
                                <div className="text-left">
                                  <span className="text-[9px] font-bold text-cyan-300 uppercase block">Step 1: Customer Image</span>
                                  <h4 className="text-xs font-extrabold text-white">Upload your selfie</h4>
                                  <p className="text-[10px] text-slate-400">Provide a front-facing full-body or half-body photo.</p>
                                </div>
                              </div>

                              <div className="text-brand-orange text-center text-xs font-black">↓</div>

                              {/* Step 2 */}
                              <div className="flex items-center gap-4 p-3 bg-white/5 border border-white/10 rounded-xl">
                                <div className="w-12 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-800 border border-white/10 relative">
                                  <img src="/images/Product.webp" className="w-full h-full object-cover" alt="Product thumbnail" />
                                </div>
                                <div className="text-left">
                                  <span className="text-[9px] font-bold text-cyan-300 uppercase block">Step 2: Selected Product</span>
                                  <h4 className="text-xs font-extrabold text-white">Choose any product</h4>
                                  <p className="text-[10px] text-slate-400">Select any apparel from the merchant catalog.</p>
                                </div>
                              </div>

                              <div className="text-brand-orange text-center text-xs font-black">↓</div>

                              {/* Step 3 */}
                              <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-cyan-500/15 via-brand-blue/25 to-brand-orange/15 border border-cyan-500/30 rounded-xl">
                                <div className="w-12 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-800 border border-cyan-500/30 relative">
                                  <img src="/images/Result.jpg" className="w-full h-full object-cover" alt="AI Try-On Synthesis" />
                                </div>
                                <div className="text-left">
                                  <span className="text-[9px] font-bold text-cyan-300 uppercase block">Step 3: Generated AI Try-On</span>
                                  <h4 className="text-xs font-extrabold text-white">Receive try-on in seconds</h4>
                                  <p className="text-[10px] text-slate-300 leading-normal">Diffusion models map the garment to your body shape perfectly.</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeTab === 'pincode' && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full space-y-4">
                          <div className="p-4 sm:p-6 rounded-2xl bg-muted/60 border border-border space-y-4 text-left">
                            <div className="flex items-center justify-between border-b border-border pb-3 mb-2">
                              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Live Delivery Estimate Widget</span>
                              <span className="text-[10px] font-bold bg-brand-orange/15 text-brand-orange px-2 py-0.5 rounded-full uppercase text-center">Pincode Script Active</span>
                            </div>

                            <EtaWidget isActive={activeTab === 'pincode'} />
                          </div>
                        </motion.div>
                      )}

                      {activeTab === 'size' && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full space-y-4">
                          <div className="p-4 sm:p-6 rounded-2xl bg-muted/60 border border-border w-full space-y-4 text-left">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">AI Size Recommendation Form</p>
                            
                            <div className="grid grid-cols-2 gap-4">
                              {/* Height */}
                              <div className="flex flex-col space-y-1">
                                <label className="text-[10px] font-black uppercase text-muted-foreground">Height (cm)</label>
                                <input 
                                  type="number" 
                                  value={height} 
                                  onChange={(e) => setHeight(Number(e.target.value))} 
                                  className="h-10 px-3 bg-background border border-border rounded-xl text-xs font-mono font-bold focus:outline-none focus:border-success" 
                                />
                              </div>
                              {/* Weight */}
                              <div className="flex flex-col space-y-1">
                                <label className="text-[10px] font-black uppercase text-muted-foreground">Weight (kg)</label>
                                <input 
                                  type="number" 
                                  value={weight} 
                                  onChange={(e) => setWeight(Number(e.target.value))} 
                                  className="h-10 px-3 bg-background border border-border rounded-xl text-xs font-mono font-bold focus:outline-none focus:border-success" 
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              {/* Fit Preference */}
                              <div className="flex flex-col space-y-1">
                                <label className="text-[10px] font-black uppercase text-muted-foreground">Fit Preference</label>
                                <select 
                                  value={fitPref} 
                                  onChange={(e) => setFitPref(e.target.value)}
                                  className="h-10 px-3 bg-background border border-border rounded-xl text-xs font-bold focus:outline-none focus:border-success"
                                >
                                  {['Regular', 'Slim', 'Relaxed', 'Oversized'].map(f => (
                                    <option key={f} value={f}>{f}</option>
                                  ))}
                                </select>
                              </div>
                              {/* Gender */}
                              <div className="flex flex-col space-y-1">
                                <label className="text-[10px] font-black uppercase text-muted-foreground">Gender</label>
                                <select 
                                  value={gender} 
                                  onChange={(e) => setGender(e.target.value)}
                                  className="h-10 bg-background border border-border rounded-xl text-xs font-bold focus:outline-none focus:border-success"
                                >
                                  {['Male', 'Female', 'Unisex'].map(g => (
                                    <option key={g} value={g}>{g}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <button 
                              onClick={handleGetRecommendation}
                              className="w-full h-11 bg-success hover:bg-success/90 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md shadow-success/15"
                            >
                              Get Recommendation
                            </button>

                            {/* Recommendation Card */}
                            {recommendation && (
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                className="p-4 bg-card border border-success/30 rounded-xl space-y-3"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-black text-muted-foreground uppercase">Recommended Size</span>
                                  <span className="text-[10px] font-bold text-success bg-success/10 px-2 py-0.5 rounded-full">{recommendation.confidence}% Confidence</span>
                                </div>

                                <div className="flex gap-1.5">
                                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(s => (
                                    <div 
                                      key={s} 
                                      className={`flex-1 py-2 text-center text-xs font-black rounded-lg border transition-all ${
                                        recommendation.size === s 
                                          ? 'bg-success text-white border-success shadow-sm scale-105' 
                                          : 'bg-muted/40 border-border text-muted-foreground'
                                      }`}
                                    >
                                      {s}
                                    </div>
                                  ))}
                                </div>

                                <p className="text-[11px] text-muted-foreground leading-relaxed pt-1.5 border-t border-border flex items-start gap-2">
                                  <span className="text-success text-xs">ℹ</span>
                                  <span>{recommendation.explanation}</span>
                                </p>
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      )}

                    </div>
                  </ScaleIn>
                </div>

              </div>
            </div>
          </section>

          {/* Deep-Dive Section 1: Virtual Trial Room */}
          <section className="py-16 sm:py-24 bg-background border-b border-border overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-12 gap-16 items-center">
                
                {/* Visual Mockup */}
                <div className="lg:col-span-6 order-2 lg:order-1">
                  <div className="bg-gradient-to-tr from-brand-blue/10 via-card to-brand-orange/10 border border-border rounded-3xl sm:rounded-[3rem] p-4 sm:p-12 shadow-xl relative">
                    <div className="bg-background border border-border rounded-3xl p-4 sm:p-6 shadow-md space-y-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-border pb-4 gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-rose-500" />
                          <span className="w-3 h-3 rounded-full bg-amber-500" />
                          <span className="w-3 h-3 rounded-full bg-emerald-500" />
                        </div>
                        <span className="font-mono text-xs text-muted-foreground">generative-tryon.ai.v3.js</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="aspect-3/4 rounded-2xl bg-slate-900 border border-border relative flex flex-col justify-between p-4 overflow-hidden group">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded border border-cyan-500/30 self-start relative z-10">
                            1. UPLOAD PHOTO
                          </span>
                          <div className="relative z-10">
                            <p className="text-white text-xs font-bold">User Full-Body Image</p>
                            <p className="text-[10px] text-slate-300">Preserves facial features &amp; pose</p>
                          </div>
                        </div>
                        <div className="aspect-3/4 rounded-2xl bg-gradient-to-br from-brand-blue/20 to-brand-orange/10 border border-brand-blue/30 p-4 flex flex-col justify-between relative overflow-hidden">
                          <span className="text-[10px] font-mono font-bold text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded border border-brand-orange/20 self-start">
                            2. AI SYNTHESIS
                          </span>
                          <div className="space-y-1">
                            <span className="text-xs font-extrabold text-foreground block">Exact Garment Placed</span>
                            <p className="text-[11px] text-muted-foreground leading-relaxed">Generated image wrapping dress onto body flawlessly.</p>
                          </div>
                          <div className="p-2 rounded-xl bg-brand-orange text-white font-extrabold text-[11px] text-center shadow-sm">
                            ✓ Ultra-Accurate Fit
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-extrabold tracking-wider uppercase">
                    <Sparkles className="w-3.5 h-3.5" /> AI Working Model &bull; Generative Try-On
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.1]">
                    Upload a Photo. See the Dress on Your Body <span className="text-brand-blue">Instantly.</span>
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    This is not a clunky 3D avatar or robotic AR overlay. Autoshipp Convert’s Virtual Trial Room is a state-of-the-art AI generative working model. When a user uploads their image while viewing a product, our AI synthesizes a photorealistic try-on image placing that exact dress onto their body perfectly.
                  </p>
                  <ul className="space-y-3 pt-2 text-foreground font-medium text-base">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0" />
                      <span><strong>Accurate Fit &amp; Drape:</strong> Generates realistic fabric tension, natural folds, and authentic hem wrapping.</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0" />
                      <span><strong>Zero 3D Modeling Required:</strong> Works directly from standard product catalog photos and user uploads.</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-blue shrink-0" />
                      <span><strong>1-Line Javascript SDK:</strong> Plugs seamlessly into Shopify, WooCommerce, Next.js, and custom carts.</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </section>

          {/* Deep-Dive Section 2: Pincode ETA Estimates */}
          <section className="py-24 bg-muted/20 border-b border-border overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-12 gap-16 items-center">
                
                {/* Content */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-extrabold tracking-wider uppercase">
                    <Clock className="w-3.5 h-3.5" /> Predictive Pincode ETA
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.1]">
                    Eliminate Checkout Hesitation with <span className="text-brand-orange">Reliable ETAs.</span>
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    &quot;When will my order arrive?&quot; is the #1 reason carts get abandoned. Our pincode engine evaluates real-time courier partner transit SLAs across 28,000+ Indian pincodes and displays reliable delivery estimate windows (e.g. 3 to 5 days).
                  </p>
                  <ul className="space-y-3 pt-2 text-foreground font-medium text-base">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                      <span><strong>Live Courier Mapping:</strong> Evaluates BlueDart, Delhivery, Express, and Xpressbees transit times dynamically.</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                      <span><strong>Cart Abandonment Shield:</strong> +23% increase in checkout completion when transparent delivery day estimates are shown.</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                      <span><strong>Smart Holiday Buffers:</strong> Automatically accounts for Indian regional festivals and Sunday cutoffs.</span>
                    </li>
                  </ul>
                </div>

                {/* Visual Mockup */}
                <div className="lg:col-span-6">
                  <div className="bg-card border border-border rounded-[3rem] p-8 sm:p-12 shadow-xl space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-border">
                      <div className="flex items-center gap-3 font-bold text-foreground">
                        <Box className="w-5 h-5 text-brand-orange" />
                        <span>Checkout Conversion Widget</span>
                      </div>
                      <span className="text-xs text-success font-semibold">Active &bull; Live SLA</span>
                    </div>

                    <div className="p-6 rounded-2xl bg-muted/60 border border-border space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Deliver to Pincode:</span>
                        <span className="font-mono font-extrabold text-foreground bg-background px-3 py-1 rounded-lg border border-border">600001 (Chennai)</span>
                      </div>
                      <div className="p-4 rounded-xl bg-background border border-success/40 flex items-center justify-between shadow-2xs">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-success/10 text-success flex items-center justify-center font-bold">🚚</div>
                          <div>
                            <p className="text-sm font-extrabold text-foreground">Estimated Delivery: 3 to 5 Days</p>
                            <p className="text-xs text-muted-foreground">Free Prime Express Delivery</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-success">Verified</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Deep-Dive Section 3: AI Size Recommendation */}
          <section className="py-24 bg-background border-b border-border overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-12 gap-16 items-center">
                
                {/* Visual Mockup for Size AI */}
                <div className="lg:col-span-6 order-2 lg:order-1">
                  <div className="bg-gradient-to-tr from-success/10 via-card to-brand-blue/10 border border-border rounded-3xl sm:rounded-[3rem] p-6 sm:p-10 shadow-xl space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-border">
                      <div className="flex items-center gap-3 font-bold text-foreground">
                        <Ruler className="w-5 h-5 text-success" />
                        <span>Dynamic Size Intelligence Flow</span>
                      </div>
                      <span className="text-xs text-success font-semibold bg-success/10 px-2 py-0.5 rounded-full">Real-Time Sync</span>
                    </div>

                    <div className="space-y-4">
                      {/* Brand DB Step */}
                      <div className="p-4 bg-muted/50 border border-border rounded-2xl flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-success/10 text-success flex items-center justify-center font-bold">🏢</div>
                        <div>
                          <h4 className="text-xs font-black text-foreground uppercase">1. Merchant Database Fetch</h4>
                          <p className="text-xs text-muted-foreground mt-0.5">Fetches specific sizing charts (chest, waist, inseam) directly from your OMS.</p>
                        </div>
                      </div>

                      {/* Customer Body Step */}
                      <div className="p-4 bg-muted/50 border border-border rounded-2xl flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold">👤</div>
                        <div>
                          <h4 className="text-xs font-black text-foreground uppercase">2. Customer Body Input</h4>
                          <p className="text-xs text-muted-foreground mt-0.5">Shopper enters height, weight, and preferred wear profile (Slim, Oversized, etc.).</p>
                        </div>
                      </div>

                      {/* Recommendation Step */}
                      <div className="p-4 bg-success/10 border border-success/30 rounded-2xl flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-success/20 text-success flex items-center justify-center font-bold">✨</div>
                        <div>
                          <h4 className="text-xs font-black text-success uppercase">3. Matched AI Output</h4>
                          <p className="text-xs text-success font-medium mt-0.5">Delivers a personalized recommendation (98.4% accuracy) instead of generic size tables.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-success/10 text-success text-xs font-extrabold tracking-wider uppercase">
                    <Ruler className="w-3.5 h-3.5" /> AI Size Intelligence
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.1]">
                    Tailored Size Recommendations. <span className="text-success">Goodbye Returns.</span>
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Sizing discrepancies account for over 50% of apparel exchanges. Autoshipp Convert&apos;s Size AI bypasses generic size charts by dynamically reading the merchant&apos;s database parameters and comparing them with shopper height, weight, and fit style goals.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-xl border border-border bg-card">
                      <h4 className="text-sm font-bold text-foreground mb-1">Brand-Specific Sizing</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed font-medium">Reads unique product measurements directly from the brand&apos;s database.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-card">
                      <h4 className="text-sm font-bold text-foreground mb-1">AI Body Analysis</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">Calculates body mass index and proportions from basic height/weight inputs.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-card">
                      <h4 className="text-sm font-bold text-foreground mb-1">Product Size Chart Matching</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">Matches data segments instantly with item dimensions.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-card">
                      <h4 className="text-sm font-bold text-foreground mb-1">Personalized Recommendations</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed font-medium">Replaces static size charts with customized shopper fit predictions.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-card">
                      <h4 className="text-sm font-bold text-foreground mb-1">Reduced Exchanges</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">Minimizes size-related reverse logistics calls and costs by up to 45%.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-card">
                      <h4 className="text-sm font-bold text-foreground mb-1">Increased Customer Confidence</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">Boosts shopping cart progression by removing size hesitation before purchase.</p>
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
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-6">Every Tool to Maximise Conversions</h2>
                <p className="text-lg text-muted-foreground">Reduce friction, increase shopper confidence, and grow Average Order Value on every visitor.</p>
              </FadeInUp>
              <StaggerContainer className="grid md:grid-cols-2 gap-8">
                {features.map((feat, idx) => (
                  <StaggerItem key={idx}>
                    <div className="p-10 rounded-[2.5rem] bg-card border border-border hover:border-brand-orange/40 transition-all duration-300 shadow-xs hover:shadow-lg h-full flex flex-col items-start group">
                      <div className="p-4 bg-muted rounded-2xl shadow-2xs mb-6 group-hover:scale-110 transition-transform duration-300 border border-border/50">
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
          <section className="py-20 bg-gradient-to-r from-slate-900 via-brand-navy to-slate-900 text-white my-10 max-w-[1440px] mx-auto sm:rounded-[3rem] px-4 sm:px-10 lg:px-20 relative overflow-hidden border border-white/10 shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-2xl">
                <h2 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight">Boost AOV by 35% on every order</h2>
                <p className="text-lg text-slate-300 mb-8 leading-relaxed">Autoshipp Convert&apos;s Virtual Trial Room and personalised upsell engine surface the right sizing and products at the right moment, dramatically increasing basket sizes.</p>
                <button onClick={() => setBookDemoOpen(true)} className="flex items-center gap-2 text-brand-orange font-extrabold hover:text-white transition-colors cursor-pointer text-base">
                  <span>Get Started Today</span> <ArrowRight size={20} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-6 w-full lg:w-auto shrink-0">
                <div className="bg-white/10 p-8 rounded-3xl border border-white/10 backdrop-blur-md text-center">
                  <p className="text-4xl lg:text-5xl font-black text-brand-orange mb-2">35%</p>
                  <p className="text-sm font-bold text-slate-300 uppercase tracking-wider">AOV Uplift</p>
                </div>
                <div className="bg-white/10 p-8 rounded-3xl border border-white/10 backdrop-blur-md text-center">
                  <p className="text-4xl lg:text-5xl font-black text-brand-orange mb-2">45%</p>
                  <p className="text-sm font-bold text-slate-300 uppercase tracking-wider">Fewer Returns</p>
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

