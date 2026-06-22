import React from 'react';
import Link from 'next/link';
import { Headset, MessageSquare, RotateCcw, ShoppingCart, ShieldCheck, RefreshCw, ArrowRight } from 'lucide-react';

const products = [
  {
    name: 'Autoshipp Care',
    tagline: 'AI 24/7 Customer Care & Chat',
    desc: 'Handle thousands of customer queries simultaneously with human-like voice AI and instant chat resolution.',
    icon: <Headset className="w-6 h-6" />,
    href: '/products/care',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20'
  },
  {
    name: 'Autoshipp Engage',
    tagline: 'WhatsApp Marketing & Connect',
    desc: 'Drive repeat purchases and turn anonymous visitors into loyal customers through hyper-personalized messaging.',
    icon: <MessageSquare className="w-6 h-6" />,
    href: '/products/engage',
    color: 'text-[#25D366]',
    bg: 'bg-[#25D366]/10',
    border: 'border-[#25D366]/20'
  },
  {
    name: 'Autoshipp Returns',
    tagline: 'Returns & Exchange Management',
    desc: 'Turn a logistical nightmare into a seamless customer experience while retaining revenue through exchanges.',
    icon: <RotateCcw className="w-6 h-6" />,
    href: '/products/returns',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20'
  },
  {
    name: 'Autoshipp Convert',
    tagline: 'AI Sizing & Virtual Try-On',
    desc: 'Maximize every visitor\'s value with AI-powered conversion tools that reduce friction and increase AOV.',
    icon: <ShoppingCart className="w-6 h-6" />,
    href: '/products/convert',
    color: 'text-green-500',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20'
  },
  {
    name: 'Autoshipp Shield',
    tagline: 'COD Verification & Risk Detection',
    desc: 'Protect your margins. Prevent fake orders and reduce RTO before the package even leaves your warehouse.',
    icon: <ShieldCheck className="w-6 h-6" />,
    href: '/products/shield',
    color: 'text-red-500',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20'
  },
  {
    name: 'Autoshipp Recover',
    tagline: 'AI Cart Recovery Automation',
    desc: 'Reclaim lost revenue and improve cash flow with intelligent automated follow-ups via WhatsApp.',
    icon: <RefreshCw className="w-6 h-6" />,
    href: '/products/recover',
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/20'
  }
];

export default function DashboardPreview() {
  return (
    <section id="products" className="py-24 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground mb-4">
            The Autoshipp Suite
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A complete AI-powered operating system designed to automate, optimize, and scale every aspect of your D2C brand.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link 
              key={product.name} 
              href={product.href}
              className="group bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all hover:shadow-xl hover:-translate-y-1 duration-300 flex flex-col"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 border ${product.bg} ${product.color} ${product.border} transition-colors`}>
                {product.icon}
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              
              <div className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-widest">
                {product.tagline}
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-8 flex-1">
                {product.desc}
              </p>
              
              <div className="flex items-center text-sm font-bold text-primary group-hover:gap-2 transition-all">
                Explore Product <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
