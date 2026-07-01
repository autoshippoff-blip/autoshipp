'use client';

import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BookDemoPopup from '../../components/BookDemoPopup';
import { Phone, Mail, MapPin, MessageSquare, ArrowRight, CheckCircle2, Sparkles, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [isDark, setIsDark] = useTheme();
  const [bookDemoOpen, setBookDemoOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    brandName: '',
    email: '',
    phone: '',
    volume: '10k-50k',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand-orange/20 selection:text-foreground relative overflow-hidden">
        
        {/* Ambient Decorative Background */}
        <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-brand-orange/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-10 -z-10 w-96 h-96 bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />

        <Header 
          isDark={isDark} 
          setIsDark={setIsDark} 
          onBookDemo={() => setBookDemoOpen(true)} 
        />

        <main className="pt-36 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold tracking-widest uppercase mb-6 border border-brand-orange/20"
            >
              <Sparkles className="w-3.5 h-3.5" /> Direct Connect
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1] mb-6"
            >
              Get in Touch with <span className="bg-gradient-to-r from-brand-orange to-amber-500 bg-clip-text text-transparent">Autoshipp</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed"
            >
              Have questions about AI voice automation, RTO protection, or enterprise custom pricing? Our sales engineering team is ready to help.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Direct Contact Info */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Sales Contact Card */}
              <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden group hover:border-brand-orange/40 transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />
                
                <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-6">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Sales & Partnerships</h3>
                <p className="text-sm text-muted-foreground mb-6">Speak directly with our growth strategists for instant onboarding.</p>
                
                <div className="space-y-4">
                  <a 
                    href="tel:+919600816505" 
                    className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 p-4 rounded-2xl bg-muted/40 hover:bg-brand-orange/10 hover:text-brand-orange transition-colors border border-border/60 group/num"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-success" />
                      <span className="font-mono font-bold text-base sm:text-lg">+91 9600816505</span>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-background text-muted-foreground group-hover/num:text-brand-orange shadow-2xs">Call Sales</span>
                  </a>

                  <a 
                    href="tel:+918903942674" 
                    className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 p-4 rounded-2xl bg-muted/40 hover:bg-brand-orange/10 hover:text-brand-orange transition-colors border border-border/60 group/num"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-success" />
                      <span className="font-mono font-bold text-base sm:text-lg">+91 8903942674</span>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-background text-muted-foreground group-hover/num:text-brand-orange shadow-2xs">Call Sales</span>
                  </a>
                </div>
              </div>

              {/* Email & Support Card */}
              <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-6">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Support & Operations</h3>
                <p className="text-sm text-muted-foreground mb-6">For existing merchants requiring integration assistance or SLA inquiries.</p>
                
                <div className="space-y-3 font-medium text-sm">
                  <div className="flex items-center gap-3 text-foreground">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>sales@autoshipp.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    <span>support@autoshipp.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground pt-2 border-t border-border">
                    <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span>Chennai, Tamil Nadu, India</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7 bg-card border border-border rounded-[2.5rem] p-8 sm:p-12 shadow-xl relative">
              
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center space-y-6 max-w-md mx-auto"
                >
                  <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto border border-success/20 animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-foreground">Message Received!</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Thank you for reaching out. One of our dispatch AI engineers will review your brand details and contact you within 2 hours.
                  </p>
                  <button 
                    onClick={() => { setSubmitted(false); setFormData({ name: '', brandName: '', email: '', phone: '', volume: '10k-50k', message: '' }); }}
                    className="px-8 py-3 rounded-full bg-muted hover:bg-muted/80 text-foreground font-semibold text-sm transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="border-b border-border pb-6">
                    <h3 className="text-2xl font-bold text-foreground">Send us a Message</h3>
                    <p className="text-sm text-muted-foreground mt-1">Fill out the details below for a customized growth assessment.</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Your Name *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full h-12 px-4 rounded-xl bg-background border border-border focus:border-brand-orange focus:outline-none text-sm transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Brand Name *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Supercraft D2C"
                        value={formData.brandName}
                        onChange={(e) => setFormData({...formData, brandName: e.target.value})}
                        className="w-full h-12 px-4 rounded-xl bg-background border border-border focus:border-brand-orange focus:outline-none text-sm transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Work Email *</label>
                      <input 
                        type="email" 
                        required
                        placeholder="rahul@supercraft.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full h-12 px-4 rounded-xl bg-background border border-border focus:border-brand-orange focus:outline-none text-sm transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone Number *</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full h-12 px-4 rounded-xl bg-background border border-border focus:border-brand-orange focus:outline-none text-sm transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Monthly Order Volume</label>
                    <select 
                      value={formData.volume}
                      onChange={(e) => setFormData({...formData, volume: e.target.value})}
                      className="w-full h-12 px-4 rounded-xl bg-background border border-border focus:border-brand-orange focus:outline-none text-sm transition-colors"
                    >
                      <option value="1k-10k">1,000 - 10,000 Orders / month</option>
                      <option value="10k-50k">10,000 - 50,000 Orders / month</option>
                      <option value="50k+">50,000+ Orders / month (Enterprise)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">How can we help? *</label>
                    <textarea 
                      rows={4}
                      required
                      placeholder="Tell us about your current RTO rates, courier partners, and automation goals..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full p-4 rounded-xl bg-background border border-border focus:border-brand-orange focus:outline-none text-sm transition-colors resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 rounded-full bg-brand-orange hover:bg-brand-orange/90 text-white font-bold text-base shadow-lg shadow-brand-orange/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 group cursor-pointer"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">Sending Message...</span>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-muted-foreground">
                    🔒 By submitting this form, you agree to our privacy policy and strict data security commitment.
                  </p>
                </form>
              )}

            </div>

          </div>

        </main>

        <Footer />
        <BookDemoPopup isOpen={bookDemoOpen} onClose={() => setBookDemoOpen(false)} />
      </div>
    </div>
  );
}
