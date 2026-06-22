import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sun, Moon, Menu, X, ChevronDown, Headset, MessageSquare, RotateCcw, ShoppingCart, ShieldCheck, RefreshCw, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const products = [
  {
    name: 'Autoshipp Care',
    desc: 'AI 24/7 Customer Care Calls & Chat Support',
    icon: <Headset className="w-5 h-5 text-primary" />,
    href: '/products/care'
  },
  {
    name: 'Autoshipp Engage',
    desc: 'WhatsApp Marketing, Utility Messages & Visitor Connect',
    icon: <MessageSquare className="w-5 h-5 text-primary" />,
    badge: 'MOST POPULAR',
    href: '/products/engage'
  },
  {
    name: 'Autoshipp Returns',
    desc: 'Returns & Exchange Management',
    icon: <RotateCcw className="w-5 h-5 text-primary" />,
    href: '/products/returns'
  },
  {
    name: 'Autoshipp Convert',
    desc: 'AI Size Rec, Virtual Try-On, ETA & Smart Upsells',
    icon: <ShoppingCart className="w-5 h-5 text-primary" />,
    badge: 'NEW LAUNCH',
    href: '/products/convert'
  },
  {
    name: 'Autoshipp Shield',
    desc: 'COD Confirmation, WhatsApp Verification & AI RTO Risk Detection',
    icon: <ShieldCheck className="w-5 h-5 text-primary" />,
    href: '/products/shield'
  },
  {
    name: 'Autoshipp Recover',
    desc: 'AI Cart Recovery & COD to Prepaid Conversions',
    icon: <RefreshCw className="w-5 h-5 text-primary" />,
    href: '/products/recover'
  }
];

const platforms = [
  { name: 'Shopify', color: 'text-green-600' },
  { name: 'WooCommerce', color: 'text-purple-600' },
  { name: 'Magento', color: 'text-orange-500' },
];

export default function Header({ isDark, setIsDark, onBookDemo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const { user } = useAuth();
  const toggleMenu = () => setIsOpen(!isOpen);

  // Close mega menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (productsOpen) setProductsOpen(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [productsOpen]);

  return (
    <nav className="fixed top-0 w-full z-50 border-b bg-background/95 backdrop-blur-md border-border transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 relative">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg tracking-tight text-foreground z-50">
          <div className="w-8 h-8 rounded-md overflow-hidden">
            <img src="/images/logo.png" alt="Autoshipp Logo" className="w-full h-full object-contain" />
          </div>
          Autoshipp
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground z-50">
          <div 
            className="flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors py-5"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            Products <ChevronDown size={14} className={`transition-transform duration-200 ${productsOpen ? 'rotate-180 text-foreground' : ''}`} />
          </div>
          {['Problem', 'Solution', 'Flow', 'Pricing'].map((item) => (
            <Link key={item} href={`#${item.toLowerCase()}`} className="hover:text-foreground transition-colors py-5">
              {item}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 z-50">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <Link
                href="/brand/dashboard"
                className="text-sm font-medium px-4 py-2 text-foreground hover:text-foreground/80 transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-sm font-medium px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Login
              </Link>
            )}
            <button
              onClick={onBookDemo}
              className="text-sm font-medium px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Book Demo
            </button>
          </div>

          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="md:hidden p-2 text-muted-foreground">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mega Menu Dropdown */}
      {productsOpen && (
        <div 
          className="absolute top-16 left-0 w-full bg-background border-b border-border shadow-xl animate-in fade-in slide-in-from-top-2 duration-200"
          onMouseEnter={() => setProductsOpen(true)}
          onMouseLeave={() => setProductsOpen(false)}
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
            
            {/* Left Column: Products Grid */}
            <div className="flex-1 p-8 pb-10">
              <h3 className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mb-6">Products</h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                {products.map((p, idx) => (
                  <Link href={p.href} key={idx} onClick={toggleMenu} className="group flex items-start gap-4 p-3 -m-3 rounded-xl hover:bg-muted/50 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0 group-hover:bg-background group-hover:shadow-sm transition-all border border-transparent group-hover:border-border">
                      {p.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-foreground text-sm">{p.name}</span>
                        {p.badge && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary uppercase tracking-wider">
                            {p.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className="mt-10 pt-6 border-t border-border flex items-center gap-6">
                <span className="text-xs font-semibold text-muted-foreground tracking-widest uppercase">Platform</span>
                <div className="flex items-center gap-4">
                  {platforms.map(plat => (
                    <div key={plat.name} className="px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium flex items-center gap-2 text-muted-foreground">
                      <div className={`w-2 h-2 rounded-full bg-current ${plat.color}`} />
                      {plat.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Featured */}
            <div className="w-full md:w-[320px] lg:w-[380px] bg-muted/30 p-8 border-l border-border flex flex-col">
              <h3 className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mb-6">Featured Merchant</h3>
              
              <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm flex-1 group cursor-pointer hover:border-primary/30 transition-colors">
                <div className="h-32 bg-primary/5 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10" />
                  <span className="font-bold text-2xl tracking-tighter text-primary/40 relative z-10">D2C BRAND</span>
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-foreground text-sm mb-2">Reduced RTO by 35% in the first three months</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    Learn how this top tier D2C brand leveraged Autoshipp Shield and Voice Automation to dramatically improve margins.
                  </p>
                  <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read Case Study <ArrowRight size={14} />
                  </span>
                </div>
              </div>
              
            </div>

          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background h-[calc(100vh-64px)] overflow-y-auto">
          <div className="px-4 py-6 space-y-4 flex flex-col">
            <div className="font-semibold text-sm text-foreground mb-2">Products</div>
            <div className="grid grid-cols-1 gap-4 pl-4 border-l border-border ml-2 mb-4">
              {products.map((p, idx) => (
                <Link href={p.href} key={p.name} onClick={toggleMenu} className="flex flex-col gap-1 py-2">
                  <span className="text-sm font-medium text-foreground">{p.name}</span>
                  <span className="text-xs text-muted-foreground leading-relaxed">{p.desc}</span>
                </Link>
              ))}
            </div>
            
            {['Problem', 'Solution', 'Flow', 'Pricing'].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={toggleMenu}
                className="text-sm font-medium text-muted-foreground hover:text-foreground py-2"
              >
                {item}
              </Link>
            ))}
            <hr className="border-border my-2" />
            <Link href="/login" onClick={toggleMenu} className="text-sm font-medium text-foreground py-2">
              Login
            </Link>
            <button onClick={() => { toggleMenu(); onBookDemo(); }} className="text-sm font-medium bg-primary text-primary-foreground py-3 mt-2 rounded-md text-center">
              Book Demo
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}