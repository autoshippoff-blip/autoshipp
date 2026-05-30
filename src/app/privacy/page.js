'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, CheckCircle } from 'lucide-react';

export default function PrivacyPage() {
  const [isDark, setIsDark] = useState(true);
  
  // Theme-specific color classes
  const theme = {
    dark: isDark,
    bg: isDark ? 'bg-[#030014]' : 'bg-slate-50',
    text: isDark ? 'text-slate-300' : 'text-slate-600',
    heading: isDark ? 'text-white' : 'text-slate-900',
    accent: isDark ? 'text-violet-400' : 'text-blue-600',
    primaryBtn: isDark ? 'bg-violet-600 hover:bg-violet-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white',
    secondaryBtn: isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 shadow-sm',
    card: isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-slate-200 shadow-sm',
    glow: isDark ? 'opacity-20' : 'opacity-10',
    accentGradient: isDark ? 'from-violet-500 to-fuchsia-500' : 'from-blue-600 to-indigo-600',
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} font-sans`}>
      {/* Header */}
      <nav className={`border-b ${isDark ? 'border-white/[0.06]' : 'border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform">
                <img src="/images/logo.png" alt="Autoship Logo" className="w-full h-full object-contain" />
              </div>
              <span className={`text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Auto<span className="text-violet-400">shipp</span>
              </span>
            </Link>
            
            <Link 
              href="/"
              className={`flex items-center gap-2 text-sm font-medium ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <div className={`max-w-3xl mx-auto ${theme.card} rounded-3xl p-8 md:p-12`}>
          <h1 className={`text-3xl md:text-4xl font-black ${theme.heading} mb-8`}>Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <p className={`leading-relaxed ${theme.text} mb-4`}>Last Updated: May 29, 2026</p>
            <p className={`leading-relaxed ${theme.text} mb-4`}>
              Welcome to Autoshipp ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (autoshipp.in) and use our e-commerce automation, shipping, and communication infrastructure services (the "Services").
            </p>
            <p className={`leading-relaxed ${theme.text} mb-4`}>
              Please read this Privacy Policy carefully. If you do not agree with the terms of this privacy policy, please do not access the Services.
            </p>

            <section>
              <h2 className={`text-2xl font-bold ${theme.heading} mb-4`}>1. Information We Collect</h2>
              <p className={`leading-relaxed ${theme.text} mb-4`}>
                We collect information that you voluntarily provide to us when you register for the Services, express an interest in obtaining information about us or our products, or otherwise contact us.
              </p>
              <ul className="space-y-4 ml-6 list-disc">
                <li className={`text-sm ${theme.text}`}><strong>Merchant Data:</strong> When you create an account, we collect your company name, email address, phone number, and billing information. We also collect authentication tokens for third-party integrations such as Shopify, Shiprocket, ShipXpeed, and Meta (WhatsApp/Instagram).</li>
                <li className={`text-sm ${theme.text}`}><strong>End-Customer Data:</strong> In order to provide our automation and messaging services on your behalf, we process data regarding your customers. This explicitly includes end-customer phone numbers, WhatsApp profile names, shipping addresses, order details, and messaging content.</li>
                <li className={`text-sm ${theme.text}`}><strong>Communication Data:</strong> We collect and store the content of messages sent and received via our WhatsApp and AI Voice Calling integrations to provide conversation history and chatbot services.</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-2xl font-bold ${theme.heading} mb-4`}>2. How We Use Your Information</h2>
              <p className={`leading-relaxed ${theme.text} mb-4`}>
                Having accurate information about you and your customers permits us to provide you with a smooth, efficient, and customized experience. Specifically, we use information collected via our Services to:
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li className={`text-sm ${theme.text}`}>Facilitate account creation and logon process.</li>
                <li className={`text-sm ${theme.text}`}>Provide e-commerce automation services, including generating shipping labels and managing Cash on Delivery (COD) verifications.</li>
                <li className={`text-sm ${theme.text}`}>Provide messaging services, including sending automated WhatsApp notifications, order updates, marketing campaigns, and providing customer support via AI chatbots.</li>
                <li className={`text-sm ${theme.text}`}>Respond to customer inquiries and offer support to you.</li>
                <li className={`text-sm ${theme.text}`}>Monitor and analyze usage and trends to improve your experience with the Services.</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-2xl font-bold ${theme.heading} mb-4`}>3. How We Share Your Information</h2>
              <p className={`leading-relaxed ${theme.text} mb-4`}>
                We do not sell your personal information or your customers' information. We may share information we have collected about you in certain situations:
              </p>
              <ul className="space-y-4 ml-6 list-disc">
                <li className={`text-sm ${theme.text}`}><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
                <li className={`text-sm ${theme.text}`}><strong>Meta Platforms, Inc.:</strong> To provide our WhatsApp Business messaging infrastructure, we explicitly share end-customer phone numbers, WhatsApp profile names, and messaging content with Meta Platforms, Inc. and its affiliates. This is strictly to facilitate the delivery of WhatsApp messages, sync templates, and manage business profiles on your behalf.</li>
                <li className={`text-sm ${theme.text}`}><strong>Telephony & AI Partners:</strong> We share necessary phone numbers and order details with our AI voice calling partners (e.g., Tabbly AI) to execute automated voice confirmations.</li>
                <li className={`text-sm ${theme.text}`}><strong>Shipping Partners:</strong> We share order and address details with logistics providers (e.g., Shiprocket) to generate shipping labels.</li>
                <li className={`text-sm ${theme.text}`}><strong>Legal Obligations:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others.</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-2xl font-bold ${theme.heading} mb-4`}>4. Security of Your Information</h2>
              <p className={`leading-relaxed ${theme.text} mb-4`}>
                We use administrative, technical, and physical security measures to help protect your personal information. All sensitive credentials (such as Meta Access Tokens and Shopify Secrets) are encrypted using industry-standard AES-256 encryption at rest. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
              </p>
            </section>

            <section>
              <h2 className={`text-2xl font-bold ${theme.heading} mb-4`}>5. Data Retention and Deletion</h2>
              <p className={`leading-relaxed ${theme.text} mb-4`}>
                We keep your information and your customers' information for as long as your account is active or as needed to provide you the Services.
              </p>
              <p className={`leading-relaxed ${theme.text} mb-4`}>
                <strong>User Rights and Data Deletion:</strong> You and your end-customers have the right to request the deletion of personal data. If you or any of your customers wish to have phone numbers, messaging history, or any other personal information permanently deleted from our servers, please submit a deletion request by contacting us at <a href="mailto:privacy@autoshipp.in" className="text-blue-500 hover:underline">privacy@autoshipp.in</a>. We will process all data deletion requests within 30 days.
              </p>
            </section>

            <section className={`mt-8 p-6 rounded-2xl ${isDark ? 'bg-violet-500/10 border-violet-500/20' : 'bg-blue-50 border-blue-200'}`}>
              <h2 className={`text-2xl font-bold ${theme.heading} mb-4`}>6. Contact Us</h2>
              <p className={`leading-relaxed ${theme.text} mb-4`}>
                If you have questions or comments about this Privacy Policy, please contact us at:
              </p>
              <div className={`${theme.text}`}>
                <p><strong>Autoshipp</strong></p>
                <p>Email: <a href="mailto:privacy@autoshipp.in" className="text-blue-500 hover:underline">privacy@autoshipp.in</a></p>
                <p>Website: <a href="https://autoshipp.in" className="text-blue-500 hover:underline">https://autoshipp.in</a></p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
