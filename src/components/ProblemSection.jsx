import React from 'react';
import { TrendingDown, Activity, Clock } from 'lucide-react';

export default function ProblemSection() {
  const problemData = [
    {
      icon: <TrendingDown className="w-6 h-6 text-destructive" />,
      stat: "25%",
      label: "Average RTO Rate",
      desc: "1 in 4 orders are fake or undelivered, burning your marketing budget."
    },
    {
      icon: <Activity className="w-6 h-6 text-warning" />,
      stat: "₹150",
      label: "Lost per Return",
      desc: "Every RTO costs you double in shipping and logistics overhead."
    },
    {
      icon: <Clock className="w-6 h-6 text-foreground" />,
      stat: "10 Mins",
      label: "Manual Delay",
      desc: "Confirming orders manually is slow, error-prone, and expensive to scale."
    },
  ];

  return (
    <section id="problem" className="py-24 bg-muted/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            COD is hurting your margins.
          </h2>
          <p className="text-lg text-muted-foreground">
            The traditional e-commerce model leaves you exposed to high return rates and manual verification overhead.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problemData.map((item, i) => (
            <div key={i} className="p-8 rounded-xl border border-border bg-card shadow-sm flex flex-col items-start text-left">
              <div className="mb-6 p-3 rounded-lg bg-muted">
                {item.icon}
              </div>
              <div className="text-4xl font-bold tracking-tight text-foreground mb-2">
                {item.stat}
              </div>
              <div className="text-lg font-semibold text-foreground mb-3">
                {item.label}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}