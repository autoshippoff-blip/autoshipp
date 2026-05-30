'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Scale } from 'lucide-react';

export default function TermsPage() {
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
          <h1 className={`text-3xl md:text-4xl font-black ${theme.heading} mb-8`}>Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <p className={`leading-relaxed ${theme.text} mb-4`}>Last Updated: May 29, 2026</p>
            <p className={`leading-relaxed ${theme.text} mb-4`}>
              Welcome to Autoshipp. These Terms of Service ("Terms") constitute a legally binding agreement made between you ("Merchant", "you", or "your") and Autoshipp ("we," "us," or "our"), concerning your access to and use of the autoshipp.in website as well as any other media form, channel, mobile website or related applications connected thereto (collectively, the "Services").
            </p>
            <p className={`leading-relaxed ${theme.text} mb-4`}>
              By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
            </p>

            <section>
              <h2 className={`text-2xl font-bold ${theme.heading} mb-4`}>1. Description of Service</h2>
              <p className={`leading-relaxed ${theme.text} mb-4`}>
                Autoshipp provides an e-commerce automation platform that allows merchants to automate shipping label generation, Cash on Delivery (COD) confirmations via AI voice calls, and multi-channel messaging via WhatsApp and Instagram.
              </p>
            </section>

            <section>
              <h2 className={`text-2xl font-bold ${theme.heading} mb-4`}>2. WhatsApp and Meta Integration</h2>
              <p className={`leading-relaxed ${theme.text} mb-4`}>
                Our Services allow you to connect your Meta WhatsApp Business Account to automate messaging with your end-customers. By using these messaging features, you acknowledge and agree to the following:
              </p>

              <h3 className={`text-xl font-bold ${theme.heading} mb-2 mt-6`}>2.1 Adherence to Third-Party Policies</h3>
              <p className={`leading-relaxed ${theme.text} mb-4`}>
                You agree to fully comply with the WhatsApp Business Terms of Service and the Meta Commerce Policy. You are solely responsible for ensuring that all messages sent through Autoshipp comply with these third-party terms.
              </p>

              <h3 className={`text-xl font-bold ${theme.heading} mb-2 mt-6`}>2.2 User Consent and Opt-In</h3>
              <p className={`leading-relaxed ${theme.text} mb-4`}>
                You represent and warrant that you have obtained the necessary, explicit opt-in consent from your end-customers prior to sending them any WhatsApp messages or automated voice calls through our platform, in accordance with applicable laws and Meta's guidelines.
              </p>
            </section>

            <section>
              <h2 className={`text-2xl font-bold ${theme.heading} mb-4`}>3. Acceptable Use and Anti-Spam Policy</h2>
              <p className={`leading-relaxed ${theme.text} mb-4`}>
                You agree not to use the Services to:
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li className={`text-sm ${theme.text}`}>Send spam, unsolicited promotional messages, or bulk messaging that violates Meta's policies.</li>
                <li className={`text-sm ${theme.text}`}>Send content that is illegal, abusive, harassing, defamatory, fraudulent, or deceptive.</li>
                <li className={`text-sm ${theme.text}`}>Transmit viruses, malware, or any other malicious code.</li>
                <li className={`text-sm ${theme.text}`}>Interfere with or disrupt the integrity or performance of the Services or third-party data contained therein.</li>
              </ul>
              <p className={`leading-relaxed ${theme.text} mt-4`}>
                We maintain a zero-tolerance policy for spam and platform abuse.
              </p>
            </section>

            <section>
              <h2 className={`text-2xl font-bold ${theme.heading} mb-4`}>4. Account Suspension and Termination</h2>
              <p className={`leading-relaxed ${theme.text} mb-4`}>
                <strong>Termination for Violation:</strong> We reserve the right to immediately suspend or terminate your account, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms of Service. Specifically, if we determine or receive notice from Meta that you are violating the WhatsApp Business Terms of Service or sending spam, your access to our messaging infrastructure will be permanently revoked.
              </p>
            </section>

            <section>
              <h2 className={`text-2xl font-bold ${theme.heading} mb-4`}>5. Limitation of Liability</h2>
              <p className={`leading-relaxed ${theme.text} mb-4`}>
                In no event shall Autoshipp, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Services; (ii) any conduct or content of any third party on the Services; (iii) any messaging failures or account bans issued by Meta Platforms, Inc. or other third-party providers.
              </p>
            </section>

            <section>
              <h2 className={`text-2xl font-bold ${theme.heading} mb-4`}>6. Changes to Terms</h2>
              <p className={`leading-relaxed ${theme.text} mb-4`}>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Services after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>

            <section className={`mt-8 p-6 rounded-2xl ${isDark ? 'bg-violet-500/10 border-violet-500/20' : 'bg-blue-50 border-blue-200'}`}>
              <h2 className={`text-2xl font-bold ${theme.heading} mb-4`}>7. Contact Us</h2>
              <p className={`leading-relaxed ${theme.text} mb-4`}>
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className={`${theme.text}`}>
                <p><strong>Autoshipp</strong></p>
                <p>Email: <a href="mailto:support@autoshipp.in" className="text-blue-500 hover:underline">support@autoshipp.in</a></p>
                <p>Website: <a href="https://autoshipp.in" className="text-blue-500 hover:underline">https://autoshipp.in</a></p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
