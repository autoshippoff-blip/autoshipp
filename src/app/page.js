'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import DashboardPreview from '../components/DashboardPreview';
import ProblemSection from '../components/ProblemSection';
import SolutionSection from '../components/SolutionSection';
import PricingSection from '../components/PricingSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import BookDemoPopup from '../components/BookDemoPopup';
import useSmoothScroll from '../hooks/useSmoothScroll';

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [bookDemoOpen, setBookDemoOpen] = useState(false);

  useSmoothScroll({ enabled: true });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="w-8 h-8 rounded-md bg-primary animate-pulse" />
      </div>
    );
  }

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-foreground">
        
        <Header 
          isDark={isDark} 
          setIsDark={setIsDark} 
          onBookDemo={() => setBookDemoOpen(true)} 
        />

        <main>
          <Hero onBookDemo={() => setBookDemoOpen(true)} />
          <DashboardPreview />
          <ProblemSection />
          <SolutionSection />
          <PricingSection />
          <CTASection onBookDemo={() => setBookDemoOpen(true)} />
        </main>

        <Footer />
        
        <BookDemoPopup 
          isOpen={bookDemoOpen} 
          onClose={() => setBookDemoOpen(false)} 
        />
      </div>
    </div>
  );
}
