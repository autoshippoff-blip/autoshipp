'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BookDemoPopup from '../../../components/BookDemoPopup';
import { FadeInUp, ScaleIn, StaggerContainer, StaggerItem } from '../../../components/AnimatedUI';
import { ArrowRight, Headset, Phone, Bot, Clock, TrendingUp, Zap, Sparkles, MessageSquare, Globe, Volume2, CheckCircle2, ShieldCheck, Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CareProductPage() {
  const [isDark, setIsDark] = useTheme();
  const [bookDemoOpen, setBookDemoOpen] = useState(false);
  const [careTab, setCareTab] = useState('voice'); // voice | chat
  const [selectedLang, setSelectedLang] = useState('Hindi');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const audioFiles = {
    Hindi: '/audio/Hindi.mpeg',
    Tamil: '/audio/Tamil.mpeg',
    Telugu: '/audio/Telungu.mpeg',
    English: '/audio/English.mpeg',
  };

  const transcripts = {
    Hindi: 'Namaste! Aapka order #ORD-992 aaj shaam 5 baje se pehle delivery ke liye scheduled hai.',
    Tamil: 'Vanakkam! Ungaludaiya order #ORD-992 indru kaalai paththu manikku delivery seiyya scheduled seiyya pattulladhu.',
    Telugu: 'Namaskaram! Mee order #ORD-992 eeroju saayantram 5 gantalalopu delivery ki schedule cheyabadindhi.',
    English: 'Hello! Your shipment #ORD-992 is scheduled for courier delivery today before 5 PM.',
  };

  const handlePlayPause = () => {
    if (!audioRef.current) {
      const audio = new Audio(audioFiles[selectedLang]);
      audioRef.current = audio;
      audio.onended = () => setIsPlaying(false);
    } else if (audioRef.current.src && !audioRef.current.src.endsWith(audioFiles[selectedLang])) {
      audioRef.current.pause();
      const audio = new Audio(audioFiles[selectedLang]);
      audioRef.current = audio;
      audio.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.log('Playback failed:', err);
          setIsPlaying(false);
        });
    }
  };

  const handleLangChange = (lang) => {
    if (lang === selectedLang) {
      handlePlayPause();
      return;
    }

    setSelectedLang(lang);
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    const audio = new Audio(audioFiles[lang]);
    audioRef.current = audio;
    
    audio.play()
      .then(() => setIsPlaying(true))
      .catch((err) => {
        console.log('Playback failed:', err);
        setIsPlaying(false);
      });

    audio.onended = () => {
      setIsPlaying(false);
    };
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsPlaying(false);
    }
  }, [careTab]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const features = [
    {
      title: 'AI Voice Calls in 8+ Languages',
      desc: 'Our AI voice agent handles inbound calls with conversational natural fluency across Hindi, Tamil, Telugu, Kannada, Marathi, Bengali, and English.',
      icon: <Phone className="w-6 h-6 text-brand-orange" />
    },
    {
      title: '24/7 Omnichannel Chatbots',
      desc: 'Deploy intelligent neural chatbots across WhatsApp, Instagram DM, and website live chat that resolve 80% of routine inquiries instantly.',
      icon: <Bot className="w-6 h-6 text-brand-blue" />
    },
    {
      title: 'Automated Order Actions',
      desc: 'Empower AI to execute live order modifications — address updates, cancellation requests, and instant refund status checks — securely via API.',
      icon: <Zap className="w-6 h-6 text-success" />
    },
    {
      title: 'Contextual Human Escalation',
      desc: 'When nuanced emotional inquiries arise, the AI automatically transfers the live call or chat thread to your human agents with full transcript summary.',
      icon: <Headset className="w-6 h-6 text-brand-navy dark:text-amber-400" />
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
                      <Sparkles className="w-3.5 h-3.5" /> Autonomous Support Engine
                    </div>
                  </FadeInUp>
                  <FadeInUp delay={0.2}>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.08] mb-6">
                      AI Support That Speaks <span className="bg-gradient-to-r from-brand-orange via-amber-500 to-brand-blue bg-clip-text text-transparent">Every Language.</span>
                    </h1>
                  </FadeInUp>
                  <FadeInUp delay={0.3}>
                    <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
                      Resolve customer service inquiries instantly with human-quality AI voice calls and intelligent WhatsApp chatbots. Cut support costs by <b>60%</b> while boosting CSAT.
                    </p>
                  </FadeInUp>
                  <FadeInUp delay={0.4} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <button
                      onClick={() => setBookDemoOpen(true)}
                      className="h-14 px-8 flex items-center justify-center rounded-full text-white bg-brand-orange hover:bg-brand-orange/90 shadow-xl shadow-brand-orange/25 transition-all font-extrabold text-base cursor-pointer group w-full sm:w-auto"
                    >
                      <span>Test AI Voice Agent</span>
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </button>
                  </FadeInUp>
                </div>

                {/* Right Interactive Simulator */}
                <div className="lg:col-span-6 relative z-10 w-full overflow-hidden">
                  <ScaleIn delay={0.4} className="w-full bg-card border border-border rounded-3xl sm:rounded-[3rem] shadow-2xl p-4 sm:p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />

                    {/* Switcher */}
                    <div className="flex flex-col sm:flex-row gap-2 p-1.5 rounded-2xl bg-muted mb-6 border border-border/60">
                      <button
                        onClick={() => setCareTab('voice')}
                        className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${careTab === 'voice' ? 'bg-background text-brand-orange shadow-md border border-border/80' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        <Phone className="w-4 h-4" /> AI Voice Call
                      </button>
                      <button
                        onClick={() => setCareTab('chat')}
                        className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${careTab === 'chat' ? 'bg-background text-brand-blue shadow-md border border-border/80' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        <MessageSquare className="w-4 h-4" /> WhatsApp Bot
                      </button>
                    </div>

                    {/* Display */}
                    <div className="min-h-[340px] flex items-center justify-center w-full">
                      {careTab === 'voice' && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full space-y-4">
                          <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-brand-navy text-white border border-white/10 shadow-lg space-y-5">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                              <span className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                                <span>Live Neural Voice Stream</span>
                                {isPlaying && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-black uppercase tracking-wider animate-pulse">
                                    ● Now Playing
                                  </span>
                                )}
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {['Hindi','Tamil','Telugu','English'].map(l => (
                                  <button
                                    key={l}
                                    onClick={() => handleLangChange(l)}
                                    aria-label={`Play AI voice sample in ${l}`}
                                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold cursor-pointer transition-all flex items-center gap-1 ${
                                      selectedLang === l 
                                        ? 'bg-brand-orange text-white' 
                                        : 'bg-white/10 text-slate-400 hover:text-white'
                                    }`}
                                  >
                                    <span>{l}</span>
                                    {selectedLang === l && isPlaying && (
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                                    )}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                              <button
                                onClick={handlePlayPause}
                                aria-label={isPlaying ? "Pause audio" : "Play audio"}
                                className={`w-12 h-12 rounded-full flex items-center justify-center border shrink-0 transition-all duration-300 cursor-pointer ${
                                  isPlaying 
                                    ? 'bg-emerald-500 text-slate-900 border-emerald-400 shadow-lg shadow-emerald-500/20' 
                                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                                }`}
                              >
                                {isPlaying ? (
                                  <Pause className="w-5 h-5 fill-current" />
                                ) : (
                                  <Play className="w-5 h-5 fill-current ml-0.5" />
                                )}
                              </button>
                              <div className="flex-1">
                                <p className="text-xs font-extrabold text-white">Autoshipp AI Voice ({selectedLang})</p>
                                <p className="text-[11px] text-emerald-300 font-mono">&quot;{transcripts[selectedLang]}&quot;</p>
                              </div>
                            </div>

                            {/* Audio Waveform Graphic */}
                            <div className="flex items-end justify-center gap-1 sm:gap-1.5 h-12 px-2 sm:px-4 py-2 bg-black/40 rounded-xl border border-white/5 overflow-hidden">
                              {[40, 70, 30, 90, 60, 100, 50, 80, 45, 85, 35, 95, 60, 40].map((h, i) => (
                                <motion.div
                                  key={i}
                                  animate={isPlaying ? { height: [`${h}%`, `${Math.max(20, (h * i * 7) % 100)}%`, `${h}%`] } : { height: '6px' }}
                                  transition={isPlaying ? { repeat: Infinity, duration: 1.2, delay: i * 0.05 } : { duration: 0.3 }}
                                  className="w-1.5 bg-gradient-to-t from-brand-orange to-amber-400 rounded-full shrink-0"
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {careTab === 'chat' && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full space-y-4">
                          <div className="p-4 sm:p-5 rounded-2xl bg-muted/60 border border-border space-y-3 font-sans">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-border pb-2.5 gap-2">
                              <span className="text-xs font-bold text-foreground">Verified WhatsApp Official Account</span>
                              <span className="text-[10px] font-mono bg-success/15 text-success px-2 py-0.5 rounded-full font-bold">● Instant AI Reply</span>
                            </div>

                            <div className="space-y-2 text-xs">
                              <div className="bg-background p-3 rounded-2xl rounded-tl-xs border border-border max-w-[85%]">
                                <p className="text-muted-foreground text-[10px] font-bold mb-0.5">Shopper (10:14 AM)</p>
                                <p className="text-foreground font-medium">Can I change my delivery address to Koramangala 4th Block?</p>
                              </div>
                              
                              <div className="bg-success/15 p-3 rounded-2xl rounded-tr-xs border border-success/30 ml-auto max-w-[85%] text-foreground">
                                <p className="text-success text-[10px] font-extrabold mb-0.5">Autoshipp Bot (10:14 AM)</p>
                                <p className="font-semibold">Address updated successfully! I’ve alerted Delhivery courier partner. Your new tracking link is ready.</p>
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
          <section className="py-16 sm:py-24 bg-background border-b border-border overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-6 order-2 lg:order-1">
                  <div className="bg-gradient-to-tr from-brand-orange/10 via-card to-brand-blue/10 border border-border rounded-3xl sm:rounded-[3rem] p-4 sm:p-8 shadow-xl">
                    <div className="bg-background border border-border rounded-3xl p-4 sm:p-6 shadow-md space-y-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-border pb-3 gap-2">
                        <span className="font-extrabold text-sm text-foreground">Sub-Second Conversational AI</span>
                        <span className="text-xs font-mono text-brand-orange">Latency: 420ms</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Unlike robotic IVR menus (*&quot;Press 1 for English&quot;*), Autoshipp Care utilizes generative speech neural models. Shoppers speak naturally, and our AI understands regional dialects, background noise, and intent instantly.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-muted text-center">
                          <p className="text-2xl font-black text-brand-orange">8+</p>
                          <p className="text-xs text-muted-foreground">Indian Languages</p>
                        </div>
                        <div className="p-3 rounded-xl bg-muted text-center">
                          <p className="text-2xl font-black text-success">80%</p>
                          <p className="text-xs text-muted-foreground">Auto-Resolution</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-extrabold tracking-wider uppercase">
                    <Phone className="w-3.5 h-3.5" /> Neural Voice Engine
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.1]">
                    Human-Like Voice Calls. <span className="text-brand-orange">Zero Hold Times.</span>
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Delight your customers with empathetic, natural inbound voice support. From answering shipment inquiries to processing cancellations, our voice agent resolves customer queries instantly with human-like understanding.
                  </p>
                  <ul className="space-y-3 pt-2 text-foreground font-medium text-base">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                      <span><strong>Dialect &amp; Emotion AI:</strong> Detects customer frustration and adapts tone appropriately.</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                      <span><strong>Instant CRM &amp; OMS Lookup:</strong> Fetches Shopify cart items and courier tracking live during calls.</span>
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
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-6">Support Built for Indian Commerce</h2>
                <p className="text-lg text-muted-foreground">Scale your customer satisfaction ratings without linearly increasing your support headcount.</p>
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
                <h2 className="text-4xl lg:text-5xl font-black mb-6">Ready to Cut Support Costs by 60%?</h2>
                <p className="text-lg text-slate-300 mb-8 leading-relaxed">Deploy Autoshipp Care across your telephone numbers and WhatsApp channels today. Provide 24/7 autonomous resolution with human empathy.</p>
                <button onClick={() => setBookDemoOpen(true)} className="h-14 px-8 rounded-full bg-brand-orange hover:bg-brand-orange/90 text-white font-extrabold flex items-center gap-2 shadow-xl shadow-brand-orange/30 transition-all cursor-pointer">
                  <span>Schedule Voice AI Demo</span>
                  <ArrowRight size={20} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-6 w-full lg:w-auto font-mono">
                <div className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-sm text-center">
                  <p className="text-4xl font-black text-brand-orange mb-2">60%</p>
                  <p className="text-xs font-bold text-slate-300 uppercase">Support Cost Drop</p>
                </div>
                <div className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-sm text-center">
                  <p className="text-4xl font-black text-emerald-400 mb-2">47s</p>
                  <p className="text-xs font-bold text-slate-300 uppercase">Avg Resolution</p>
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
