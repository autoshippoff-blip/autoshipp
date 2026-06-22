import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            ₹4 per confirmed order.
          </h2>
          <p className="text-lg text-muted-foreground">
            No setup fees. No monthly subscriptions. Just pay for results.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="rounded-2xl border border-border bg-card shadow-lg overflow-hidden flex flex-col relative">
            <div className="absolute top-0 right-0 px-4 py-1 text-xs font-bold uppercase tracking-wider bg-primary text-primary-foreground rounded-bl-lg">
              Popular Plan
            </div>

            <div className="p-8 border-b border-border bg-muted/30 pt-10">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-bold tracking-tight text-foreground">₹4</span>
                <span className="text-muted-foreground font-medium">/ confirmation</span>
              </div>
            </div>

            <div className="p-8 flex-1 bg-card">
              <ul className="space-y-4 mb-8">
                {[
                  "AI Voice Calls (Human Tone)",
                  "Multi-language Support (8+ Langs)",
                  "WhatsApp Fallback Automation",
                  "Smart Carrier Optimization",
                  "Real-time Dashboard & Analytics",
                  "Zero Setup & Onboarding Fees"
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-md font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-colors">
                Start Saving Now
              </button>
              <p className="text-center mt-4 text-xs font-medium text-muted-foreground uppercase tracking-widest">
                Cancel or pause anytime
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}