'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import BookDemoPopup from '@/components/BookDemoPopup';
import { Headset, MessageSquare, RotateCcw, ShoppingCart, ShieldCheck, RefreshCw, CheckCircle2, ArrowRight, Menu, PhoneCall, Bot, Zap, TrendingUp, ShieldAlert, BadgeCheck } from 'lucide-react';

// --- Unique Visual Components for Each Product ---

const CareVisual = () => (
  <div className="relative w-full max-w-[320px] bg-card border border-border rounded-[2.5rem] shadow-2xl overflow-hidden aspect-[9/19] flex flex-col ring-8 ring-background">
    <div className="h-14 border-b border-border flex items-center px-6 bg-muted/30 pt-4">
      <div className="w-full flex justify-between items-center">
        <div className="w-20 h-4 bg-muted rounded-full" />
        <div className="flex gap-1"><div className="w-3 h-3 rounded-full bg-muted" /><div className="w-3 h-3 rounded-full bg-muted" /></div>
      </div>
    </div>
    <div className="flex-1 p-5 flex flex-col gap-4 bg-background overflow-hidden relative">
      <div className="flex flex-col gap-3">
        <div className="self-end max-w-[80%] bg-primary text-primary-foreground p-3 rounded-2xl rounded-tr-sm text-xs">
          Where is my order?
        </div>
        <div className="self-start max-w-[80%] bg-muted p-3 rounded-2xl rounded-tl-sm text-xs border border-border">
          <div className="flex items-center gap-2 mb-2 font-bold text-primary"><Bot size={14}/> AI Agent</div>
          Your order #1093 is arriving today by 7 PM.
        </div>
        <div className="self-end max-w-[80%] bg-primary text-primary-foreground p-3 rounded-2xl rounded-tr-sm text-xs mt-2">
          Can I change the address?
        </div>
        <div className="self-start max-w-[80%] bg-muted p-3 rounded-2xl rounded-tl-sm text-xs border border-border">
           <div className="flex items-center gap-2 mb-2 font-bold text-primary"><Bot size={14}/> AI Agent</div>
           Sure, please provide the new pincode.
        </div>
      </div>
      <div className="absolute bottom-4 left-4 right-4 h-12 bg-muted border border-border rounded-full flex items-center px-4 justify-between">
         <span className="text-xs text-muted-foreground">Type a message...</span>
         <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground"><ArrowRight size={12}/></div>
      </div>
    </div>
    <div className="absolute top-1/4 -left-12 lg:-left-20 bg-card border border-border p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-[bounce_4s_infinite]">
      <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0"><Headset size={20} /></div>
      <div className="flex flex-col pr-4"><span className="text-sm font-bold text-foreground">AI Resolution</span><span className="text-xs text-muted-foreground">98% Success Rate</span></div>
    </div>
    <div className="absolute bottom-1/3 -right-8 lg:-right-12 bg-primary text-primary-foreground p-4 rounded-2xl shadow-xl flex flex-col gap-1 animate-[bounce_5s_infinite_reverse]">
      <span className="text-sm font-bold opacity-90">Wait Time</span><span className="text-2xl font-black">0 Sec</span>
    </div>
  </div>
);

const EngageVisual = () => (
  <div className="relative w-full max-w-[320px] bg-card border border-border rounded-[2.5rem] shadow-2xl overflow-hidden aspect-[9/19] flex flex-col ring-8 ring-background">
    <div className="h-14 border-b border-border flex items-center px-6 bg-[#075E54] pt-4">
      <div className="w-full flex items-center gap-3 text-white">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><MessageSquare size={14}/></div>
        <span className="text-sm font-semibold">Brand Connect</span>
      </div>
    </div>
    <div className="flex-1 p-5 flex flex-col gap-4 bg-[#EFEAE2]">
      <div className="self-center bg-black/10 px-3 py-1 rounded-lg text-[10px] text-black/60 mb-2">Today</div>
      <div className="self-start max-w-[90%] bg-white p-3 rounded-2xl rounded-tl-sm text-xs shadow-sm">
        <div className="w-full h-24 bg-muted rounded-xl mb-2 overflow-hidden relative">
           <div className="absolute inset-0 bg-gradient-to-tr from-violet-500 to-fuchsia-500 opacity-20" />
           <div className="absolute inset-0 flex items-center justify-center font-bold text-lg text-primary">50% OFF SALE</div>
        </div>
        Hey there! 👋 Your favorite sneakers are back in stock. Tap below to claim your exclusive 50% discount.
        <div className="mt-3 w-full py-2 bg-[#25D366]/10 text-[#075E54] font-bold text-center rounded-lg border border-[#25D366]/30 cursor-pointer">Shop Now</div>
      </div>
    </div>
    <div className="absolute top-1/4 -left-12 lg:-left-20 bg-card border border-border p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-[bounce_4s_infinite]">
      <div className="w-10 h-10 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0"><CheckCircle2 size={20} /></div>
      <div className="flex flex-col pr-4"><span className="text-sm font-bold text-foreground">Open Rate</span><span className="text-xs text-muted-foreground">95% Average</span></div>
    </div>
    <div className="absolute bottom-1/4 -right-8 lg:-right-12 bg-[#25D366] text-white p-4 rounded-2xl shadow-xl flex flex-col gap-1 animate-[bounce_5s_infinite_reverse]">
      <span className="text-sm font-bold opacity-90">ROAS</span><span className="text-2xl font-black">10x</span>
    </div>
  </div>
);

const ReturnsVisual = () => (
  <div className="relative w-full max-w-[320px] bg-card border border-border rounded-[2.5rem] shadow-2xl overflow-hidden aspect-[9/19] flex flex-col ring-8 ring-background">
    <div className="h-14 border-b border-border flex items-center px-6 bg-muted/30 pt-4">
       <span className="text-sm font-bold text-foreground">Return Portal</span>
    </div>
    <div className="flex-1 p-5 flex flex-col gap-4 bg-background">
       <div className="p-4 border border-border rounded-xl flex items-center gap-4 bg-muted/20">
          <div className="w-12 h-12 bg-muted rounded-lg" />
          <div className="flex-1">
             <div className="text-sm font-bold">Black T-Shirt</div>
             <div className="text-xs text-muted-foreground">Size: M</div>
          </div>
       </div>
       <div className="text-sm font-semibold">What would you like to do?</div>
       <div className="p-4 border-2 border-primary bg-primary/5 rounded-xl flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary"><RefreshCw size={14}/></div>
             <span className="font-bold text-sm">Exchange Size</span>
          </div>
          <div className="w-4 h-4 rounded-full border-4 border-primary" />
       </div>
       <div className="p-4 border border-border rounded-xl flex items-center justify-between cursor-pointer opacity-70">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground"><ArrowRight size={14}/></div>
             <span className="font-bold text-sm">Refund</span>
          </div>
          <div className="w-4 h-4 rounded-full border-2 border-border" />
       </div>
       <div className="mt-auto w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold text-sm text-center">Confirm Exchange</div>
    </div>
    <div className="absolute top-1/4 -left-12 lg:-left-20 bg-card border border-border p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-[bounce_4s_infinite]">
      <div className="w-10 h-10 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0"><RefreshCw size={20} /></div>
      <div className="flex flex-col pr-4"><span className="text-sm font-bold text-foreground">Retained Revenue</span><span className="text-xs text-muted-foreground">Via Exchanges</span></div>
    </div>
  </div>
);

const ConvertVisual = () => (
  <div className="relative w-full max-w-[320px] bg-card border border-border rounded-[2.5rem] shadow-2xl overflow-hidden aspect-[9/19] flex flex-col ring-8 ring-background">
    <div className="h-48 bg-muted relative">
       <div className="absolute bottom-4 right-4 bg-background border border-border px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg">
          <BadgeCheck size={14} className="text-primary" /> AI Sizing
       </div>
    </div>
    <div className="flex-1 p-5 flex flex-col bg-background">
       <h3 className="font-bold text-lg mb-1">Premium Jacket</h3>
       <div className="text-xl font-black text-primary mb-4">$120.00</div>
       
       <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl flex gap-3 mb-4">
          <Zap size={18} className="text-green-600 mt-0.5" />
          <div className="flex flex-col">
             <span className="text-sm font-bold text-green-700">Perfect Fit: Medium</span>
             <span className="text-xs text-green-600/80">Based on your past purchases</span>
          </div>
       </div>

       <div className="grid grid-cols-4 gap-2 mb-6">
          <div className="py-2 border border-border rounded-lg text-center text-sm">S</div>
          <div className="py-2 border-2 border-primary bg-primary/5 rounded-lg text-center font-bold text-sm text-primary">M</div>
          <div className="py-2 border border-border rounded-lg text-center text-sm">L</div>
          <div className="py-2 border border-border rounded-lg text-center text-sm">XL</div>
       </div>

       <div className="mt-auto w-full py-4 bg-foreground text-background rounded-xl font-bold text-sm text-center">Add to Cart</div>
    </div>
    <div className="absolute top-1/4 -right-12 lg:-right-20 bg-card border border-border p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-[bounce_4s_infinite]">
      <div className="w-10 h-10 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center shrink-0"><TrendingUp size={20} /></div>
      <div className="flex flex-col pr-4"><span className="text-sm font-bold text-foreground">AOV Increase</span><span className="text-xs text-muted-foreground">+15% Average</span></div>
    </div>
  </div>
);

const ShieldVisual = () => (
  <div className="relative w-full max-w-[320px] bg-card border border-border rounded-[2.5rem] shadow-2xl overflow-hidden aspect-[9/19] flex flex-col ring-8 ring-background">
    <div className="flex-1 bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
       <div className="absolute inset-0 bg-red-500/10" />
       
       <div className="w-24 h-24 rounded-full bg-red-500/20 border-4 border-red-500/30 flex items-center justify-center mb-6 z-10 animate-[pulse_2s_infinite]">
          <ShieldAlert size={40} className="text-red-500" />
       </div>
       
       <h3 className="text-white font-bold text-xl mb-2 z-10">High Risk Detected</h3>
       <p className="text-white/60 text-center text-sm mb-8 z-10">This user has a 95% RTO history. Order blocked automatically.</p>
       
       <div className="w-full bg-white/10 rounded-xl p-4 backdrop-blur-md border border-white/10 z-10">
          <div className="flex justify-between items-center mb-3">
             <span className="text-white/60 text-xs">Order Value</span>
             <span className="text-white font-bold text-sm">$450.00</span>
          </div>
          <div className="flex justify-between items-center mb-3">
             <span className="text-white/60 text-xs">Payment</span>
             <span className="text-red-400 font-bold text-sm bg-red-400/10 px-2 py-0.5 rounded">COD</span>
          </div>
          <div className="flex justify-between items-center">
             <span className="text-white/60 text-xs">Action Taken</span>
             <span className="text-green-400 font-bold text-sm flex items-center gap-1"><CheckCircle2 size={12}/> Blocked</span>
          </div>
       </div>
    </div>
    <div className="absolute top-1/4 -left-12 lg:-left-20 bg-card border border-border p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-[bounce_4s_infinite]">
      <div className="w-10 h-10 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center shrink-0"><ShieldCheck size={20} /></div>
      <div className="flex flex-col pr-4"><span className="text-sm font-bold text-foreground">RTO Reduced</span><span className="text-xs text-muted-foreground">-40% Logistics Cost</span></div>
    </div>
  </div>
);

const RecoverVisual = () => (
  <div className="relative w-full max-w-[320px] bg-card border border-border rounded-[2.5rem] shadow-2xl overflow-hidden aspect-[9/19] flex flex-col ring-8 ring-background">
    <div className="h-14 border-b border-border flex items-center px-6 bg-muted/30 pt-4">
      <div className="text-sm font-bold text-foreground flex items-center gap-2"><ShoppingCart size={14}/> Cart Recovery</div>
    </div>
    <div className="flex-1 p-5 flex flex-col gap-4 bg-background relative">
       
       <div className="absolute left-9 top-10 bottom-20 w-0.5 bg-border z-0" />

       <div className="relative z-10 flex gap-4 mt-2">
          <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center shrink-0 border-2 border-background"><ShoppingCart size={14}/></div>
          <div className="bg-card border border-border p-3 rounded-xl flex-1 shadow-sm">
             <div className="text-xs font-bold">Cart Abandoned</div>
             <div className="text-[10px] text-muted-foreground">10 mins ago</div>
          </div>
       </div>

       <div className="relative z-10 flex gap-4 mt-4">
          <div className="w-8 h-8 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0 border-2 border-background"><MessageSquare size={14}/></div>
          <div className="bg-card border border-border p-3 rounded-xl flex-1 shadow-sm">
             <div className="text-xs font-bold">WhatsApp Reminder</div>
             <div className="text-[10px] text-muted-foreground mb-2">Automated trigger</div>
             <div className="bg-muted p-2 rounded text-[10px] italic">"Hey! You left something behind. Take 10% off to complete it now."</div>
          </div>
       </div>

       <div className="relative z-10 flex gap-4 mt-4">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground shrink-0 border-2 border-background shadow-lg shadow-primary/20"><BadgeCheck size={14}/></div>
          <div className="bg-primary/5 border border-primary/20 p-3 rounded-xl flex-1">
             <div className="text-xs font-bold text-primary">Recovered!</div>
             <div className="text-[10px] text-primary/70">Order placed successfully</div>
          </div>
       </div>

    </div>
    <div className="absolute bottom-1/4 -right-8 lg:-right-12 bg-card border border-border p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-[bounce_5s_infinite_reverse]">
      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0"><TrendingUp size={20} /></div>
      <div className="flex flex-col pr-4"><span className="text-sm font-bold text-foreground">Revenue Saved</span><span className="text-xs text-muted-foreground">22% Recovery Rate</span></div>
    </div>
  </div>
);


const productsData = {
  'care': {
    name: 'Autoshipp Care',
    tagline: 'AI 24/7 Customer Care Calls & Chat Support',
    description: 'Transform your customer experience with intelligent, always-on voice and chat automation designed specifically for D2C brands.',
    icon: Headset,
    visual: <CareVisual />,
    features: [
      { title: 'AI 24/7 Customer Care Calls', desc: 'Handle thousands of customer queries simultaneously with human-like voice AI.' },
      { title: 'AI 24/7 Chat Support', desc: 'Instant resolution across WhatsApp, Instagram, and web chat.' }
    ]
  },
  'engage': {
    name: 'Autoshipp Engage',
    tagline: 'WhatsApp Marketing, Utility Messages & Visitor Connect',
    description: 'Drive repeat purchases and turn anonymous visitors into loyal customers through hyper-personalized messaging.',
    icon: MessageSquare,
    visual: <EngageVisual />,
    features: [
      { title: 'WhatsApp Marketing', desc: 'Send targeted broadcast campaigns with high read and conversion rates.' },
      { title: 'Utility Messages', desc: 'Automated order updates, shipping alerts, and payment links.' },
      { title: 'Visitor Connect', desc: 'Identify website visitors and automatically send relevant WhatsApp marketing messages to convert them.' }
    ]
  },
  'returns': {
    name: 'Autoshipp Returns',
    tagline: 'Returns & Exchange Management',
    description: 'Turn a logistical nightmare into a seamless customer experience while retaining revenue through exchanges.',
    icon: RotateCcw,
    visual: <ReturnsVisual />,
    features: [
      { title: 'Returns Management', desc: 'Automated return approvals, reverse pickup scheduling, and instant refunds.' },
      { title: 'Exchange Management', desc: 'Encourage size/color exchanges over refunds with a frictionless 1-click exchange portal.' }
    ]
  },
  'convert': {
    name: 'Autoshipp Convert',
    tagline: 'AI Size Rec, Virtual Try-On, ETA & Smart Upsells',
    description: 'Maximize every visitor\'s value with AI-powered conversion tools that reduce friction and increase AOV.',
    icon: ShoppingCart,
    visual: <ConvertVisual />,
    features: [
      { title: 'AI Size Recommendation', desc: 'Eliminate fit-related returns with precision AI sizing.' },
      { title: 'Virtual Try-On', desc: 'Boost buyer confidence with interactive AR try-ons.' },
      { title: 'Estimated Delivery Date by Pincode', desc: 'Increase conversion by showing accurate delivery timelines upfront.' },
      { title: 'AI Shopping Assistant', desc: 'A pre-purchase chatbot that helps users find the right products instantly.' },
      { title: 'Smart Upsell', desc: 'Post-purchase upsells with one-click order add-ons.' }
    ]
  },
  'shield': {
    name: 'Autoshipp Shield',
    tagline: 'COD Confirmation, WhatsApp Verification & AI RTO Risk Detection',
    description: 'Protect your margins. Prevent fake orders and reduce RTO before the package even leaves your warehouse.',
    icon: ShieldCheck,
    visual: <ShieldVisual />,
    features: [
      { title: 'COD Confirmation Calls', desc: 'Automated AI voice calls to confirm intent on all Cash on Delivery orders.' },
      { title: 'COD WhatsApp Verification', desc: 'Frictionless WhatsApp-based OTP verification for high-risk orders.' },
      { title: 'AI RTO Risk Detection', desc: 'Predictive scoring to flag and block serial returners automatically.' }
    ]
  },
  'recover': {
    name: 'Autoshipp Recover',
    tagline: 'AI Cart Recovery & COD to Prepaid Conversions',
    description: 'Reclaim lost revenue and improve cash flow with intelligent automated follow-ups.',
    icon: RefreshCw,
    visual: <RecoverVisual />,
    features: [
      { title: 'AI Cart Recovery', desc: 'Multi-channel automated sequences to bring abandoned carts back to checkout.' },
      { title: 'COD to Prepaid Conversions', desc: 'Incentivize customers to switch from COD to Prepaid via automated WhatsApp offers.' }
    ]
  }
};

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug;
  const product = productsData[slug];

  const [isDark, setIsDark] = useTheme();
  const [mounted, setMounted] = useState(false);
  const [bookDemoOpen, setBookDemoOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (!product) return notFound();

  const Icon = product.icon;

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-foreground flex flex-col">
        <Header 
          isDark={isDark} 
          setIsDark={setIsDark} 
          onBookDemo={() => setBookDemoOpen(true)} 
        />
        
        <main className="flex-1 pt-32 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Hero Section */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center mb-24">
              
              {/* Left: Content */}
              <div className="flex flex-col items-start text-left max-w-2xl z-10">
                {/* Badge Row */}
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <div className="px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-xs tracking-widest uppercase flex items-center gap-2 border border-primary/20">
                    <Icon size={14} strokeWidth={2.5} />
                    {product.name}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase tracking-widest bg-card border border-border px-4 py-2 rounded-full">
                    <span className="text-orange-400 text-sm tracking-tighter">★★★★★</span> on Shopify
                  </div>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight text-foreground leading-[1.1] mb-6">
                  {product.tagline}
                </h1>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl">
                  {product.description}
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                  <Link href="/login" className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 text-sm tracking-widest uppercase text-center flex items-center justify-center">
                    Sign Up Now
                  </Link>
                  <button 
                    onClick={() => setBookDemoOpen(true)}
                    className="w-full sm:w-auto px-8 py-4 rounded-full border border-border bg-card text-foreground hover:bg-muted font-bold transition-all text-sm tracking-widest uppercase flex items-center justify-center gap-2 group"
                  >
                    Book a Demo 
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>

              {/* Right: Unique Visual Presentation */}
              <div className="relative w-full aspect-square lg:aspect-auto lg:h-[600px] flex items-center justify-center">
                {/* Decorative Background */}
                <div className="absolute inset-0 bg-primary/5 rounded-[100px] rotate-12 scale-110 blur-xl opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-tr from-background via-transparent to-background" />
                
                {product.visual}
              </div>
            </div>

            {/* Features Grid */}
            <div className="border-t border-border pt-20">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">Core Capabilities</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Everything you need to scale your D2C brand efficiently.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="p-8 rounded-xl border border-border bg-card shadow-sm flex flex-col hover:border-primary/50 transition-colors">
                    <CheckCircle2 className="w-8 h-8 text-primary mb-6" />
                    <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
        
        <CTASection onBookDemo={() => setBookDemoOpen(true)} />
        <Footer />
        
        <BookDemoPopup 
          isOpen={bookDemoOpen} 
          onClose={() => setBookDemoOpen(false)} 
        />
      </div>
    </div>
  );
}
