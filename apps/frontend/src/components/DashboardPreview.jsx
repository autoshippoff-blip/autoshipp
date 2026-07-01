'use client';

import React from 'react';
import Link from 'next/link';
import { Headset, MessageSquare, RotateCcw, ShoppingCart, ShieldCheck, RefreshCw, ArrowRight } from 'lucide-react';
import { FadeInUp, StaggerContainer, StaggerItem } from './AnimatedUI';

const products = [
  {
    name: 'Autoshipp Care',
    tagline: 'AI 24/7 Customer Care & Chat',
    desc: 'Handle thousands of customer queries simultaneously with human-like voice AI and instant chat resolution.',
    icon: <Headset className="w-6 h-6" />,
    href: '/products/care',
    color: 'text-brand-orange',
    bg: 'bg-brand-orange/10',
    border: 'border-brand-orange/20'
  },
  {
    name: 'Autoshipp Engage',
    tagline: 'WhatsApp Marketing & Connect',
    desc: 'Drive repeat purchases and turn anonymous visitors into loyal customers through hyper-personalized messaging.',
    icon: <MessageSquare className="w-6 h-6" />,
    href: '/products/engage',
    color: 'text-success',
    bg: 'bg-success/10',
    border: 'border-success/20'
  },
  {
    name: 'Autoshipp Returns',
    tagline: 'Returns & Exchange Management',
    desc: 'Turn a logistical nightmare into a seamless customer experience while retaining revenue through exchanges.',
    icon: <RotateCcw className="w-6 h-6" />,
    href: '/products/returns',
    color: 'text-brand-blue',
    bg: 'bg-brand-blue/10',
    border: 'border-brand-blue/20'
  },
  {
    name: 'Autoshipp Convert',
    tagline: 'AI Sizing & Virtual Try-On',
    desc: 'Maximize every visitor\'s value with AI-powered conversion tools that reduce friction and increase AOV.',
    icon: <ShoppingCart className="w-6 h-6" />,
    href: '/products/convert',
    color: 'text-brand-navy',
    bg: 'bg-brand-navy/10',
    border: 'border-brand-navy/20'
  },
  {
    name: 'Autoshipp Shield',
    tagline: 'COD Verification & Risk Detection',
    desc: 'Protect your margins. Prevent fake orders and reduce RTO before the package even leaves your warehouse.',
    icon: <ShieldCheck className="w-6 h-6" />,
    href: '/products/shield',
    color: 'text-destructive',
    bg: 'bg-destructive/10',
    border: 'border-destructive/20'
  },
  {
    name: 'Autoshipp Recover',
    tagline: 'AI Cart Recovery Automation',
    desc: 'Reclaim lost revenue and improve cash flow with intelligent automated follow-ups via WhatsApp.',
    icon: <RefreshCw className="w-6 h-6" />,
    href: '/products/recover',
    color: 'text-brand-orange',
    bg: 'bg-brand-orange/10',
    border: 'border-brand-orange/20'
  }
];

export default function DashboardPreview() {
  return (
    <section id="products" className="py-24 sm:py-32 bg-background text-foreground border-b border-border transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-11">
        <FadeInUp className="text-center mb-16 sm:mb-20 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-6">
            The Autoshipp Suite
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            A complete AI-powered operating system designed to automate, optimize, and scale every aspect of your D2C brand.
          </p>
        </FadeInUp>
        
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product) => (
            <StaggerItem key={product.name}>
              <Link 
                href={product.href}
                className="group bg-card border border-border rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 hover:border-brand-orange/40 transition-all hover:shadow-xl hover:-translate-y-1.5 duration-300 flex flex-col h-full shadow-md"
              >
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 border ${product.bg} ${product.color} ${product.border} transition-transform group-hover:scale-110 duration-300`}>
                  {product.icon}
                </div>
                
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3 group-hover:text-brand-orange transition-colors">
                  {product.name}
                </h3>
                
                <div className="text-[10px] sm:text-xs font-bold text-muted-foreground mb-4 sm:mb-6 uppercase tracking-widest">
                  {product.tagline}
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-8 flex-1 text-base sm:text-lg">
                  {product.desc}
                </p>
                
                <div className="flex items-center text-xs sm:text-sm font-extrabold text-brand-orange group-hover:gap-3 transition-all mt-auto uppercase tracking-wider">
                  <span>Explore Product</span> <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
