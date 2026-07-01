'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, ChevronDown, Headset, MessageSquare, RotateCcw, ShoppingCart, ShieldCheck, RefreshCw, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const products = [
  {
    name: 'Autoshipp Care',
    desc: 'AI 24/7 Customer Care Calls & Chat Support',
    icon: <Headset className="w-5 h-5 text-brand-orange" />,
    href: '/products/care'
  },
  {
    name: 'Autoshipp Engage',
    desc: 'WhatsApp Marketing, Utility Messages & Visitor Connect',
    icon: <MessageSquare className="w-5 h-5 text-brand-orange" />,
    badge: 'MOST POPULAR',
    href: '/products/engage'
  },
  {
    name: 'Autoshipp Returns',
    desc: 'Returns & Exchange Management',
    icon: <RotateCcw className="w-5 h-5 text-brand-orange" />,
    href: '/products/returns'
  },
  {
    name: 'Autoshipp Convert',
    desc: 'AI Size Rec, Virtual Try-On, ETA & Smart Upsells',
    icon: <ShoppingCart className="w-5 h-5 text-brand-orange" />,
    badge: 'NEW LAUNCH',
    href: '/products/convert'
  },
  {
    name: 'Autoshipp Shield',
    desc: 'COD Confirmation, WhatsApp Verification & AI RTO Risk Detection',
    icon: <ShieldCheck className="w-5 h-5 text-brand-orange" />,
    href: '/products/shield'
  },
  {
    name: 'Autoshipp Recover',
    desc: 'AI Cart Recovery & COD to Prepaid Conversions',
    icon: <RefreshCw className="w-5 h-5 text-brand-orange" />,
    href: '/products/recover'
  }
];

export default function Header({ isDark, setIsDark, onBookDemo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const { user } = useAuth();
  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (productsOpen) setProductsOpen(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [productsOpen]);

  return (
    <nav className="fixed top-0 w-full z-[1050] bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-md border-b border-border transition-all duration-300 pointer-events-auto">
      <div className="max-w-[1440px] mx-auto px-4 py-3 sm:px-6 lg:px-11">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-3 font-bold text-2xl tracking-tight text-brand-navy dark:text-white z-50">
            <img src="/images/Autoshipp_black_logo.png" alt="Autoshipp Logo" className="h-10 w-auto object-contain dark:hidden" />
            <img src="/images/Autoshipp_white_logo.png" alt="Autoshipp Logo" className="h-10 w-auto object-contain hidden dark:block" />
            Autoshipp.
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <div 
              className="relative py-2"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button 
                onClick={() => setProductsOpen(!productsOpen)}
                className="flex items-center gap-1.5 text-sm font-semibold text-brand-navy dark:text-white hover:text-brand-orange dark:hover:text-brand-orange transition-colors cursor-pointer py-1"
                aria-expanded={productsOpen}
              >
                <span>Products</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <Link href="/why-autoshipp" className="text-sm font-semibold text-brand-navy dark:text-white hover:text-brand-orange dark:hover:text-brand-orange transition-colors">
              Why Autoshipp
            </Link>

            <Link href="/pricing" className="text-sm font-semibold text-brand-navy dark:text-white hover:text-brand-orange dark:hover:text-brand-orange transition-colors">
              Pricing
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2.5 rounded-full hover:bg-brand-surface dark:hover:bg-white/10 text-brand-navy dark:text-white transition-colors cursor-pointer"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-brand-navy" />}
            </button>

            <Link href="/login" className="text-sm font-semibold text-brand-navy dark:text-white px-4 py-2 rounded-full hover:bg-brand-surface dark:hover:bg-white/5 transition-all">
              Login
            </Link>
            
            <button 
              onClick={onBookDemo}
              className="relative group h-10 flex items-center justify-center rounded-full px-6 text-white bg-brand-orange hover:bg-brand-orange/90 shadow-lg shadow-brand-orange/25 transition-all font-extrabold text-sm cursor-pointer overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span>Book A Demo</span>
              </span>
            </button>
          </div>

          {/* Mobile actions */}
          <div className="lg:hidden flex items-center gap-2">
            <button onClick={toggleMenu} className="p-2 text-brand-navy dark:text-white cursor-pointer" aria-label="Toggle Menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mega Menu Dropdown */}
      <AnimatePresence>
        {productsOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 w-full bg-white dark:bg-[#0A0A0A] border-b border-border shadow-xl z-40"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-11 flex flex-col md:flex-row py-8">
              <div className="flex-1 w-full">
                <h3 className="text-xs font-semibold text-brand-navy/60 dark:text-white/60 tracking-widest uppercase mb-6">Products</h3>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
                  {products.map((p, idx) => (
                    <Link href={p.href} key={idx} onClick={() => setProductsOpen(false)} className="group flex items-start gap-4 hover:bg-brand-surface dark:hover:bg-white/5 p-3 -m-3 rounded-2xl transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-brand-surface dark:bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white dark:group-hover:bg-[#111] group-hover:shadow-sm transition-all border border-transparent group-hover:border-border">
                        {p.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="font-bold text-brand-navy dark:text-white text-base">{p.name}</span>
                          {p.badge && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-orange/10 text-brand-orange uppercase tracking-wider">
                              {p.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-brand-navy/70 dark:text-white/70 leading-relaxed">{p.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border bg-white dark:bg-[#0A0A0A] overflow-hidden shadow-2xl"
          >
            <div className="px-5 py-6 space-y-4 flex flex-col">
              {/* 1. Book Demo CTA */}
              <button 
                onClick={() => { toggleMenu(); onBookDemo(); }}
                className="w-full h-12 rounded-full bg-brand-orange text-white font-extrabold text-sm shadow-xl shadow-brand-orange/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book A Demo</span>
              </button>

              {/* 2. Products Accordion */}
              <div className="border-b border-border/60 pb-3 pt-1">
                <button
                  onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                  className="w-full flex items-center justify-between py-2 text-base font-semibold text-brand-navy dark:text-white cursor-pointer"
                >
                  <span>Products</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 text-muted-foreground ${mobileProductsOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileProductsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pl-2 pt-2 space-y-2.5"
                    >
                      {products.map((p) => (
                        <Link 
                          href={p.href} 
                          key={p.name} 
                          onClick={toggleMenu} 
                          className="flex items-center justify-between py-2 px-3 rounded-xl text-sm font-medium hover:bg-muted/50 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            {p.icon}
                            <span className="text-brand-navy dark:text-white font-semibold group-hover:text-brand-orange transition-colors">{p.name}</span>
                          </div>
                          {p.badge && (
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-brand-orange/10 text-brand-orange uppercase tracking-wider shrink-0 border border-brand-orange/20">
                              {p.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 3. Why Autoshipp */}
              <Link href="/why-autoshipp" onClick={toggleMenu} className="text-base font-semibold text-brand-navy dark:text-white py-2 border-b border-border/60">
                Why Autoshipp
              </Link>

              {/* 4. Pricing */}
              <Link href="/pricing" onClick={toggleMenu} className="text-base font-semibold text-brand-navy dark:text-white py-2 border-b border-border/60">
                Pricing
              </Link>

              {/* 5. Login */}
              <Link href="/login" onClick={toggleMenu} className="text-base font-semibold text-brand-navy dark:text-white py-2 border-b border-border/60">
                Login
              </Link>

              {/* 6. Theme Toggle */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-muted-foreground">Appearance</span>
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border text-sm font-bold text-foreground cursor-pointer hover:border-brand-orange transition-colors"
                  aria-label="Toggle Theme"
                >
                  {isDark ? (
                    <>
                      <Sun className="w-4 h-4 text-amber-400" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 text-brand-navy" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}