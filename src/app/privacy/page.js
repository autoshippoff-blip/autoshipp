'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTASection from '@/components/CTASection';
import BookDemoPopup from '@/components/BookDemoPopup';

export default function PrivacyPage() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [bookDemoOpen, setBookDemoOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-foreground flex flex-col">
        <Header 
          isDark={isDark} 
          setIsDark={setIsDark} 
          onBookDemo={() => setBookDemoOpen(true)} 
        />
        
        <main className="flex-1 pt-32 pb-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-sm">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-8">Privacy Policy</h1>
              
              <div className="space-y-8">
                <p className="leading-relaxed text-muted-foreground mb-4">Last Updated: May 29, 2026</p>
                <p className="leading-relaxed text-muted-foreground mb-4">
                  Welcome to Autoshipp ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (autoshipp.in) and use our e-commerce automation, shipping, and communication infrastructure services (the "Services").
                </p>
                <p className="leading-relaxed text-muted-foreground mb-4">
                  Please read this Privacy Policy carefully. If you do not agree with the terms of this privacy policy, please do not access the Services.
                </p>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
                  <p className="leading-relaxed text-muted-foreground mb-4">
                    We collect information that you voluntarily provide to us when you register for the Services, express an interest in obtaining information about us or our products, or otherwise contact us.
                  </p>
                  <ul className="space-y-4 ml-6 list-disc text-muted-foreground">
                    <li className="text-sm"><strong>Merchant Data:</strong> When you create an account, we collect your company name, email address, phone number, and billing information. We also collect authentication tokens for third-party integrations such as Shopify, Shiprocket, ShipXpeed, and Meta (WhatsApp/Instagram).</li>
                    <li className="text-sm"><strong>End-Customer Data:</strong> In order to provide our automation and messaging services on your behalf, we process data regarding your customers. This explicitly includes end-customer phone numbers, WhatsApp profile names, shipping addresses, order details, and messaging content.</li>
                    <li className="text-sm"><strong>Communication Data:</strong> We collect and store the content of messages sent and received via our WhatsApp and AI Voice Calling integrations to provide conversation history and chatbot services.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">2. How We Use Your Information</h2>
                  <p className="leading-relaxed text-muted-foreground mb-4">
                    Having accurate information about you and your customers permits us to provide you with a smooth, efficient, and customized experience. Specifically, we use information collected via our Services to:
                  </p>
                  <ul className="space-y-2 ml-6 list-disc text-muted-foreground">
                    <li className="text-sm">Facilitate account creation and logon process.</li>
                    <li className="text-sm">Provide e-commerce automation services, including generating shipping labels and managing Cash on Delivery (COD) verifications.</li>
                    <li className="text-sm">Provide messaging services, including sending automated WhatsApp notifications, order updates, marketing campaigns, and providing customer support via AI chatbots.</li>
                    <li className="text-sm">Respond to customer inquiries and offer support to you.</li>
                    <li className="text-sm">Monitor and analyze usage and trends to improve your experience with the Services.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Share Your Information</h2>
                  <p className="leading-relaxed text-muted-foreground mb-4">
                    We do not sell your personal information or your customers' information. We may share information we have collected about you in certain situations:
                  </p>
                  <ul className="space-y-4 ml-6 list-disc text-muted-foreground">
                    <li className="text-sm"><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
                    <li className="text-sm"><strong>Meta Platforms, Inc.:</strong> To provide our WhatsApp Business messaging infrastructure, we explicitly share end-customer phone numbers, WhatsApp profile names, and messaging content with Meta Platforms, Inc. and its affiliates. This is strictly to facilitate the delivery of WhatsApp messages, sync templates, and manage business profiles on your behalf.</li>
                    <li className="text-sm"><strong>Telephony & AI Partners:</strong> We share necessary phone numbers and order details with our AI voice calling partners (e.g., Tabbly AI) to execute automated voice confirmations.</li>
                    <li className="text-sm"><strong>Shipping Partners:</strong> We share order and address details with logistics providers (e.g., Shiprocket) to generate shipping labels.</li>
                    <li className="text-sm"><strong>Legal Obligations:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">4. Security of Your Information</h2>
                  <p className="leading-relaxed text-muted-foreground mb-4">
                    We use administrative, technical, and physical security measures to help protect your personal information. All sensitive credentials (such as Meta Access Tokens and Shopify Secrets) are encrypted using industry-standard AES-256 encryption at rest. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-foreground mb-4">5. Data Retention and Deletion</h2>
                  <p className="leading-relaxed text-muted-foreground mb-4">
                    We keep your information and your customers' information for as long as your account is active or as needed to provide you the Services.
                  </p>
                  <p className="leading-relaxed text-muted-foreground mb-4">
                    <strong>User Rights and Data Deletion:</strong> You and your end-customers have the right to request the deletion of personal data. If you or any of your customers wish to have phone numbers, messaging history, or any other personal information permanently deleted from our servers, please submit a deletion request by contacting us at <a href="mailto:privacy@autoshipp.in" className="text-primary hover:underline font-medium">privacy@autoshipp.in</a>. We will process all data deletion requests within 30 days.
                  </p>
                </section>

                <section className="mt-8 p-6 rounded-2xl bg-muted/50 border border-border">
                  <h2 className="text-xl font-bold text-foreground mb-4">6. Contact Us</h2>
                  <p className="leading-relaxed text-muted-foreground mb-4">
                    If you have questions or comments about this Privacy Policy, please contact us at:
                  </p>
                  <div className="text-muted-foreground space-y-1">
                    <p className="font-semibold text-foreground">Autoshipp</p>
                    <p>Email: <a href="mailto:privacy@autoshipp.in" className="text-primary hover:underline">privacy@autoshipp.in</a></p>
                    <p>Website: <a href="https://autoshipp.in" className="text-primary hover:underline">https://autoshipp.in</a></p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
        
        <CTASection onBookDemo={() => setBookDemoOpen(true)} />
        <Footer />
        
        <BookDemoPopup 
          isOpen={bookDemoOpen} 
          onClose={() => setBookDemoOpen(false)} 
        />
      </div>
    </div>
  );
}
