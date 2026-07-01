'use client';

import React from 'react';
import Link from 'next/link';
import { PhoneCall, MessageCircle, Truck, Zap, ArrowRight } from 'lucide-react';
import { FadeInUp, ScaleIn } from './AnimatedUI';

export default function SolutionSection() {
  const steps = [
    {
      icon: <PhoneCall className="w-6 h-6 text-brand-orange" />,
      title: "AI Voice & Interactive WhatsApp",
      desc: "Our AI engages customers instantly in 8+ Indian languages. It confirms address, intent, and time preferences with 99% accuracy.",
      link: "/products/engage",
      bgColor: "bg-brand-surface",
      accent: "bg-brand-orange/10",
      image: "A"
    },
    {
      icon: <Truck className="w-6 h-6 text-brand-blue" />,
      title: "Predictive RTO Shielding",
      desc: "Stop fake orders before they dispatch. Our network intelligence auto-flags high-risk buyers and restricts COD automatically.",
      link: "/products/shield",
      bgColor: "bg-white",
      accent: "bg-brand-blue/10",
      image: "S"
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-success" />,
      title: "Automated Returns & Exchanges",
      desc: "Turn frustrating returns into seamless exchanges. Keep revenue locked in with automated 1-click exchange flows.",
      link: "/products/returns",
      bgColor: "bg-brand-cream",
      accent: "bg-success/10",
      image: "R"
    }
  ];

  return (
    <section id="solution" className="py-20 sm:py-24 bg-background text-foreground overflow-hidden border-b border-border transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-11">
        <FadeInUp className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground mb-6 leading-tight">
            Comprehensive Growth Suite for D2C Brands
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            From checkout to post-purchase, Autoshipp provides the intelligence and automation needed to boost conversions and protect margins.
          </p>
        </FadeInUp>

        <div className="flex flex-col gap-8 md:gap-16">
          {steps.map((step, idx) => (
            <div key={idx} className="w-full rounded-3xl sm:rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden bg-card border border-border flex flex-col md:flex-row shadow-lg transition-all">
              
              <div className={`p-6 sm:p-10 md:p-16 flex flex-col justify-center flex-1 order-2 ${idx % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                <FadeInUp delay={0.1}>
                  <div className={`mb-6 inline-flex p-4 rounded-2xl ${step.accent}`}>
                    {step.icon}
                  </div>
                </FadeInUp>
                <FadeInUp delay={0.2}>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">{step.title}</h3>
                </FadeInUp>
                <FadeInUp delay={0.3}>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 sm:mb-10 max-w-xl">{step.desc}</p>
                </FadeInUp>
                <FadeInUp delay={0.4}>
                  <Link 
                    href={step.link}
                    className="inline-flex items-center gap-2 text-brand-orange font-extrabold text-sm sm:text-base tracking-wider uppercase group"
                  >
                    <span>Explore Capabilities</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </FadeInUp>
              </div>

              <div className={`w-full md:w-[45%] lg:w-[50%] p-6 sm:p-10 flex items-center justify-center order-1 bg-muted/30 ${idx % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                <ScaleIn delay={0.3} className="w-full aspect-video sm:aspect-square md:aspect-auto md:h-full min-h-[220px] sm:min-h-[300px] rounded-2xl sm:rounded-3xl bg-background border border-border shadow-md flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/10 to-transparent z-0" />
                   <span className="font-black text-6xl sm:text-8xl text-foreground/10 relative z-10">{step.image}</span>
                </ScaleIn>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}