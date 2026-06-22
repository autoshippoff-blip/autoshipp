import React from 'react';
import { PhoneCall, MessageCircle, Truck, Zap } from 'lucide-react';

export default function SolutionSection() {
  const steps = [
    {
      icon: <PhoneCall className="w-5 h-5 text-primary" />,
      title: "AI Voice calls that feel human.",
      desc: "Our AI calls customers instantly in 8+ Indian languages. It confirms address, intent, and time preferences with 99% accuracy.",
    },
    {
      icon: <MessageCircle className="w-5 h-5 text-primary" />,
      title: "WhatsApp Fallback",
      desc: "Missed calls? No problem. We automatically trigger an interactive WhatsApp flow to secure confirmation.",
    },
    {
      icon: <Truck className="w-5 h-5 text-primary" />,
      title: "Smart Carrier Selection",
      desc: "Auto-selects best courier based on speed, cost, and historical RTO for that pincode.",
    },
    {
      icon: <Zap className="w-5 h-5 text-primary" />,
      title: "Zero-Touch Dispatch",
      desc: "Auto-tags Shopify orders and triggers labels instantly. No manual work required.",
    }
  ];

  return (
    <section id="solution" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Built for hyper-growth.
          </h2>
          <p className="text-lg text-muted-foreground">
            Verify, automate, and dominate the Indian market.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="p-6 rounded-xl border border-border bg-card shadow-sm flex flex-col items-start hover:border-primary/50 transition-colors">
              <div className="mb-5 p-3 rounded-lg bg-primary/10">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}