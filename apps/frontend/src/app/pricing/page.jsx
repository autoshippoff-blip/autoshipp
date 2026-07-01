'use client';

import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BookDemoPopup from '../../components/BookDemoPopup';
import { Headset, MessageSquare, RotateCcw, ShoppingCart, ShieldCheck, RefreshCw, CheckCircle2, ChevronDown, ChevronRight } from 'lucide-react';

const products = [
  { id: 'engage', name: 'Autoshipp Engage', icon: <MessageSquare className="w-5 h-5" /> },
  { id: 'care', name: 'Autoshipp Care', icon: <Headset className="w-5 h-5" /> },
  { id: 'returns', name: 'Autoshipp Returns', icon: <RotateCcw className="w-5 h-5" /> },
  { id: 'convert', name: 'Autoshipp Convert', icon: <ShoppingCart className="w-5 h-5" /> },
  { id: 'shield', name: 'Autoshipp Shield', icon: <ShieldCheck className="w-5 h-5" /> },
  { id: 'recover', name: 'Autoshipp Recover', icon: <RefreshCw className="w-5 h-5" /> },
];

const faqs = [
  { q: "What happens if I exceed my monthly order limit?", a: "If you exceed your monthly volume, you'll be automatically billed for the additional overage at a pro-rated per-transaction cost based on your current tier. We'll always notify you before this happens so you can upgrade if needed." },
  { q: "Is there any setup or integration fee?", a: "While we do charge a small one-time integration fee, it is comparatively the lowest in the entire market! We focus on delivering maximum ROI without burdening you with high upfront onboarding costs." },
  { q: "Can I cancel or change my plan at any time?", a: "Yes, Autoshipp operates on a flexible month-to-month basis. You can upgrade, downgrade, or cancel your subscription at any time directly from your dashboard." },
  { q: "Do you offer custom pricing for very large volumes?", a: "Absolutely. If you process more than 10,000 orders per month, please contact our sales team to get an exclusive Enterprise plan tailored to your unit economics." },
];

const PricingCard = ({ plan, returnsVolume, setReturnsVolume, onBookDemo }) => (
  <div className={`relative rounded-[2.5rem] border ${plan.isPopular ? 'border-primary shadow-lg shadow-primary/10' : 'border-border'} bg-card p-8 flex flex-col overflow-hidden h-full`}>
    <div className="absolute top-0 left-0 right-0 h-40 bg-muted/40 border-b border-border -z-10" />
    
    <div className="text-center mb-10 pt-4">
      <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
      <p className="text-sm text-muted-foreground mx-auto min-h-[40px] line-clamp-2">
        {plan.description}
      </p>
    </div>

    <div className="mb-8 min-h-[130px] flex flex-col justify-between">
      <div>
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Platform Fees</div>
        <div className="flex items-baseline gap-1">
          <span className={`text-3xl font-bold tracking-tight ${plan.price === 'Custom' ? 'text-primary' : 'text-foreground'}`}>
            {plan.price}
          </span>
          {plan.price !== 'Custom' && <span className="text-muted-foreground whitespace-nowrap">/ month</span>}
        </div>
      </div>

      {plan.isReturnsBasic && (
        <div className="mt-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 text-center">Requests Every Month</p>
          <div className="flex bg-muted/50 p-1 rounded-full border border-border">
            {[80, 200, 500].map(vol => (
              <button
                key={vol}
                onClick={() => setReturnsVolume(vol)}
                className={`flex-1 text-xs py-1.5 rounded-full transition-all ${
                  returnsVolume === vol 
                    ? 'bg-background text-primary shadow-sm border border-primary font-medium' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {vol}
              </button>
            ))}
          </div>
        </div>
      )}

      {plan.customText ? (
        <p className="text-xs font-medium text-foreground mt-4 leading-relaxed">
          {plan.customText}
        </p>
      ) : (
        !plan.isReturnsBasic && (
          <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
            Pricing is dependent on your specific requirements. Contact us for exact quote.
          </p>
        )
      )}
    </div>

    {/* Middle Stretch: Features List */}
    <div className="space-y-4 flex-1 mb-8">
      {plan.features.map((feat, idx) => (
        <div key={idx} className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
          <span className="text-sm text-muted-foreground">{feat}</span>
        </div>
      ))}
    </div>

    {/* Bottom: Contact Sales Button Container */}
    <div className={`p-1 rounded-full border transition-colors ${plan.name === 'Enterprise' || plan.isPopular ? 'border-primary/30' : 'border-border/60'} mt-auto`}>
      <button 
        onClick={onBookDemo}
        className={`w-full py-3 px-6 rounded-full font-bold tracking-wide text-sm transition-all flex items-center justify-between group ${
          plan.name === 'Enterprise' || plan.isPopular
            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
            : 'border border-primary/20 bg-background text-primary hover:border-primary hover:bg-primary/5'
        }`}
      >
        <span>CONTACT SALES</span>
        <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  </div>
);

export default function PricingPage() {
  const [isDark, setIsDark] = useTheme();
  const [bookDemoOpen, setBookDemoOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('engage');
  const [returnsVolume, setReturnsVolume] = useState(80);

  const currentProduct = products.find(p => p.id === activeTab);
  
  const plansData = {
    recover: [
      {
        name: 'Basic',
        description: 'Essential tools to get started',
        price: '₹1,999',
        features: [
          'Cart Recovery (300)',
          'Standard WhatsApp call recovery',
          'COD to prepaid messages',
          'Pre-built template',
          'AI calls for cart recovery',
          'Call per min ₹7',
          'Message per ₹4'
        ]
      },
      {
        name: 'Enterprise',
        description: 'Best for enterprise with large order volume',
        price: 'Custom',
        customText: 'Receiving More Than 2000+ Orders/month? Get an Exclusive Plan Tailored to Meet Your Business Needs',
        features: [
          'Everything in basic',
          'Cart Recovery (1000+)',
          'Conversation AI cart recovery',
          'Dedicated analyzed account lead',
          'Customize template',
          'Team support',
          'Call per min ₹5.5',
          'Message per ₹3'
        ]
      }
    ],
    shield: [
      {
        name: 'Basic',
        description: 'Essential tools to get started',
        price: '₹1,999',
        features: [
          'AI RTO risk detector',
          'AI automated COD calls',
          'WhatsApp COD Confirmations',
          'Manual Review dashboard',
          'RTO risk management',
          'Call rate ₹7 per minute',
          'Message rate ₹2 per message'
        ]
      },
      {
        name: 'Enterprise',
        description: 'Best for enterprise with large order volume',
        price: 'Custom',
        customText: 'Receiving More Than 2000+ Orders/month? Get an Exclusive Plan Tailored to Meet Your Business Needs',
        features: [
          'Everything in basic',
          'Address verification',
          'Phone number verification',
          'Fraud detection',
          'Smart RTO management',
          'Call rate ₹5.5 per minute',
          'Message rate ₹1.5 per message'
        ]
      }
    ],
    convert: [
      {
        name: 'Basic',
        description: 'Essential tools to get started',
        price: '₹3,999',
        features: [
          'Pincode Delivery Estimate',
          'AI size recommendation',
          'Virtual Trial Room (150 images)',
          'Images add on per image ₹7'
        ]
      },
      {
        name: 'Growth',
        description: 'Perfect for scaling businesses',
        price: '₹6,999',
        isPopular: true,
        features: [
          'Everything in basic',
          'Custom design theme',
          'Smart upsells',
          'Virtual Trial Room (500 images)',
          'Images add on per image ₹6'
        ]
      },
      {
        name: 'Enterprise',
        description: 'Best for enterprise with large order volume',
        price: 'Custom',
        customText: 'Receiving More Than 2000+ Orders/month? Get an Exclusive Plan Tailored to Meet Your Business Needs',
        features: [
          'Everything in Growth plan',
          'Customization (Virtual trial room, AI size recommendation, Pincode delivery estimate, smart upsells)',
          'Choose any one or all'
        ]
      }
    ],
    returns: [
      {
        name: 'Basic',
        description: 'Best for early-stage and mid size D2C brands',
        price: returnsVolume === 80 ? '₹1,999' : returnsVolume === 200 ? '₹3,999' : '₹6,999',
        isReturnsBasic: true,
        features: [
          `${returnsVolume} returns per month`,
          'Self portal',
          'Standard variant exchange',
          'Manual Approval',
          'Refund to store credits',
          'WhatsApp notification',
          'Own rules for Return and exchange'
        ]
      },
      {
        name: 'Enterprise',
        description: 'Best for enterprise with large order volume',
        price: 'Custom',
        customText: 'Receiving More Than 2000+ Orders/month? Get an Exclusive Plan Tailored to Meet Your Business Needs',
        features: [
          'Everything in basic plan',
          'Smart fraud prevention',
          'Multi warehouse routing',
          'ERP integration',
          'Instance refund API'
        ]
      }
    ],
    engage: [
      {
        name: 'Basic',
        description: 'Essential tools to get started',
        price: '₹3,999',
        features: [
          'Whatsapp Marketing campaigns (5)',
          'Utilities Messages (Shipment messages and COD messages)',
          'Standard integrations',
          'Broadcast Channels',
          '2000 Unique customers',
          'Team Seats (2)',
          'Team support',
          'Utilities messages ₹1 per message',
          'Marketing Message ₹1.8 per message'
        ]
      },
      {
        name: 'Growth',
        description: 'Perfect for scaling businesses',
        price: '₹5,999',
        isPopular: true,
        features: [
          'Everything in Basic',
          'Whatsapp Marketing campaigns (10)',
          '10000 Unique customers',
          'Advanced contact segmentation',
          'Smart marketing automation',
          'Team Seats (5)',
          'Fast team support',
          'Utilities messages ₹1 per message',
          'Marketing Message ₹1.8 per message'
        ]
      },
      {
        name: 'Enterprise',
        description: 'Best for enterprise with large order volume',
        price: 'Custom',
        customText: 'Receiving More Than 2000+ Orders/month? Get an Exclusive Plan Tailored to Meet Your Business Needs',
        features: [
          'Everything in Growth',
          'Whatsapp Marketing campaigns (Unlimited)',
          'AI Generated campaigns posters',
          '15,000 Unique customers',
          'Advance AI bot routing',
          'Team Seats (15+)'
        ]
      }
    ],
    care: [
      {
        name: 'Basic',
        description: 'Essential tools to get started',
        price: '₹4,999',
        features: [
          '24/7 customer care service',
          '24/7 chatbot',
          '24/7 inbound AI calling assistant',
          'Fast team support',
          '1000 chat conversations',
          '150 Mins of AI Voice call',
          'Additional call per call ₹6.5'
        ]
      },
      {
        name: 'Growth',
        description: 'Perfect for scaling businesses',
        price: '₹7,999',
        isPopular: true,
        features: [
          'Everything in Basic',
          'WhatsApp and Instagram chatbot',
          '2000 chat conversations',
          '300 Mins of AI Voice call',
          'Dedicated Team Manager',
          'Additional call per call ₹5.2'
        ]
      },
      {
        name: 'Enterprise',
        description: 'Best for enterprise with large order volume',
        price: 'Custom',
        customText: 'Receiving More Than 2000+ Orders/month? Get an Exclusive Plan Tailored to Meet Your Business Needs',
        features: [
          'Everything in Growth',
          'Unlimited calls',
          'Unlimited Chats',
          'Personalized chatbot',
          'Fast team support Within 15 mins',
          'Dedicated 2 Team Manager'
        ]
      }
    ],
    default: [
      {
        name: 'Basic',
        description: 'Best for early-stage and mid size D2C brands',
        price: '₹X,XXX',
        features: [
          'Up to 10,000 requests/month',
          'Standard analytics dashboard',
          'Email support',
          'Basic integrations'
        ]
      },
      {
        name: 'Growth',
        description: 'Scale your business with advanced features',
        price: '₹Y,YYY',
        isPopular: true,
        features: [
          'Everything in Basic',
          'Up to 50,000 requests/month',
          'Advanced analytics',
          'Priority support',
          'Premium integrations'
        ]
      },
      {
        name: 'Enterprise',
        description: 'Best for enterprise with large order volume',
        price: 'Custom',
        customText: 'Receiving More Than 2000+ Orders/month? Get an Exclusive Plan Tailored to Meet Your Business Needs',
        features: [
          'Everything in Growth',
          'Unlimited requests',
          'Dedicated customer success manager',
          'Exclusive pricing',
          'Early access to latest features'
        ]
      }
    ]
  };

  const currentPlans = plansData[activeTab] || plansData.default;

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-foreground flex flex-col">
        <Header 
          isDark={isDark} 
          setIsDark={setIsDark} 
          onBookDemo={() => setBookDemoOpen(true)} 
        />

        <main className="flex-1 pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4">Transparent Pricing for {currentProduct.name}</h1>
              <p className="text-base sm:text-lg text-muted-foreground">Scale your business with plans designed for your growth.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-12">
              {/* Mobile Accordion */}
              <div className="w-full md:hidden flex flex-col gap-4">
                {products.map((product) => (
                  <div key={product.id} className={`border rounded-3xl overflow-hidden transition-all ${activeTab === product.id ? 'border-primary shadow-md bg-card' : 'border-border bg-card'}`}>
                    <button
                      onClick={() => setActiveTab(activeTab === product.id ? null : product.id)}
                      className="w-full flex items-center justify-between p-5 font-semibold hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className={activeTab === product.id ? 'text-primary' : 'text-muted-foreground'}>{product.icon}</span>
                        <span className={activeTab === product.id ? 'text-primary' : 'text-foreground'}>{product.name}</span>
                      </div>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${activeTab === product.id ? 'rotate-180 text-primary' : 'text-muted-foreground'}`} />
                    </button>
                    <div className={`grid transition-all duration-300 ease-in-out ${activeTab === product.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                      <div className="overflow-hidden">
                        <div className="p-4 pt-2 bg-muted/10 border-t border-border flex flex-col gap-6 pb-6">
                          {(plansData[product.id] || plansData.default).map((plan, index) => (
                            <PricingCard key={index} plan={plan} returnsVolume={returnsVolume} setReturnsVolume={setReturnsVolume} onBookDemo={() => setBookDemoOpen(true)} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Sidebar */}
              <div className="hidden md:flex w-64 shrink-0">
                <div className="sticky top-28 flex flex-col gap-2 border-r border-border pr-4 w-full">
                  {products.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => setActiveTab(product.id)}
                      className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        activeTab === product.id 
                          ? 'bg-primary/10 text-primary font-medium' 
                          : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                      }`}
                    >
                      <span className={activeTab === product.id ? 'text-primary' : 'text-muted-foreground'}>
                        {product.icon}
                      </span>
                      {product.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Desktop Pricing Cards */}
              <div className={`hidden md:grid flex-1 gap-8 ${currentPlans.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2 max-w-4xl'}`}>
                {currentPlans.map((plan, index) => (
                  <PricingCard key={index} plan={plan} returnsVolume={returnsVolume} setReturnsVolume={setReturnsVolume} onBookDemo={() => setBookDemoOpen(true)} />
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="max-w-3xl mx-auto mt-32">
              <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <details key={i} className="group border border-border bg-card rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden shadow-sm">
                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 font-semibold text-foreground transition-colors hover:bg-muted/30">
                      <h3 className="text-lg">{faq.q}</h3>
                      <span className="shrink-0 rounded-full bg-primary/10 text-primary p-2">
                        <ChevronDown className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180" />
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                      <p>{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </main>

        <Footer />
        <BookDemoPopup isOpen={bookDemoOpen} onClose={() => setBookDemoOpen(false)} />
      </div>
    </div>
  );
}
