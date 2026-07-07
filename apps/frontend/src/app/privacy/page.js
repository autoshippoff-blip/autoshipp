"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import BookDemoPopup from "@/components/BookDemoPopup";

export default function PrivacyPage() {
  const [isDark, setIsDark] = useTheme();
  const [mounted, setMounted] = useState(false);
  const [bookDemoOpen, setBookDemoOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-foreground flex flex-col relative overflow-hidden">
        {/* Ambient Decorative Background */}
        <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

        <Header
          isDark={isDark}
          setIsDark={setIsDark}
          onBookDemo={() => setBookDemoOpen(true)}
        />

        <main className="flex-1 pt-36 pb-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-card/70 backdrop-blur-2xl border border-border rounded-3xl sm:rounded-[3rem] p-6 sm:p-16 shadow-2xl relative">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground mb-4 pb-8 border-b border-border/80">
                Privacy Policy
              </h1>

              <div className="space-y-10 pt-4 text-base md:text-lg leading-relaxed text-muted-foreground/90">
                <p className="font-semibold text-primary text-sm uppercase tracking-wider mb-2">
                  Last Updated: May 29, 2026
                </p>
                <p className="leading-relaxed">
                  Welcome to Autoshipp (&quot;we,&quot; &quot;our,&quot; or
                  &quot;us&quot;). We are committed to protecting your privacy.
                  This Privacy Policy explains how we collect, use, disclose,
                  and safeguard your information when you visit our website
                  (autoshipp.in) and use our e-commerce automation, shipping,
                  and communication infrastructure services (the
                  &quot;Services&quot;).
                </p>
                <p className="leading-relaxed">
                  Please read this Privacy Policy carefully. If you do not agree
                  with the terms of this privacy policy, please do not access
                  the Services.
                </p>

                <section className="space-y-4 pt-2">
                  <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-6">
                    1. Information We Collect
                  </h2>
                  <p className="leading-relaxed">
                    We collect information that you voluntarily provide to us
                    when you register for the Services, express an interest in
                    obtaining information about us or our products, or otherwise
                    contact us.
                  </p>
                  <ul className="space-y-4 pl-6 list-disc marker:text-primary">
                    <li className="pl-2">
                      <strong>Merchant Data:</strong> When you create an
                      account, we collect your company name, email address,
                      phone number, and billing information. We also collect
                      authentication tokens for third-party integrations such as
                      Shopify, Shiprocket, ShipXpeed, and Meta
                      (WhatsApp/Instagram).
                    </li>
                    <li className="pl-2">
                      <strong>End-Customer Data:</strong> In order to provide
                      our automation and messaging services on your behalf, we
                      process data regarding your customers. This explicitly
                      includes end-customer phone numbers, WhatsApp profile
                      names, shipping addresses, order details, and messaging
                      content.
                    </li>
                    <li className="pl-2">
                      <strong>Communication Data:</strong> We collect and store
                      the content of messages sent and received via our WhatsApp
                      and AI Voice Calling integrations to provide conversation
                      history and chatbot services.
                    </li>
                  </ul>
                </section>

                <section className="space-y-4 pt-4 border-t border-border/50">
                  <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-6 pt-4">
                    2. How We Use Your Information
                  </h2>
                  <p className="leading-relaxed">
                    Having accurate information about you and your customers
                    permits us to provide you with a smooth, efficient, and
                    customized experience. Specifically, we use information
                    collected via our Services to:
                  </p>
                  <ul className="space-y-3 pl-6 list-disc marker:text-primary">
                    <li className="pl-2">
                      Facilitate account creation and logon process.
                    </li>
                    <li className="pl-2">
                      Provide e-commerce automation services, including
                      generating shipping labels and managing Cash on Delivery
                      (COD) verifications.
                    </li>
                    <li className="pl-2">
                      Provide messaging services, including sending automated
                      WhatsApp notifications, order updates, marketing
                      campaigns, and providing customer support via AI chatbots.
                    </li>
                    <li className="pl-2">
                      Respond to customer inquiries and offer support to you.
                    </li>
                    <li className="pl-2">
                      Monitor and analyze usage and trends to improve your
                      experience with the Services.
                    </li>
                  </ul>
                </section>

                <section className="space-y-4 pt-4 border-t border-border/50">
                  <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-6 pt-4">
                    3. How We Share Your Information
                  </h2>
                  <p className="leading-relaxed">
                    We do not sell your personal information or your
                    customers&apos; information. We may share information we
                    have collected about you in certain situations:
                  </p>
                  <ul className="space-y-4 pl-6 list-disc marker:text-primary">
                    <li className="pl-2">
                      <strong>Third-Party Service Providers:</strong> We may
                      share your information with third parties that perform
                      services for us or on our behalf, including payment
                      processing, data analysis, email delivery, hosting
                      services, customer service, and marketing assistance.
                    </li>
                    <li className="pl-2">
                      <strong>Meta Platforms, Inc.:</strong> To provide our
                      WhatsApp Business messaging infrastructure, we explicitly
                      share end-customer phone numbers, WhatsApp profile names,
                      and messaging content with Meta Platforms, Inc. and its
                      affiliates. This is strictly to facilitate the delivery of
                      WhatsApp messages, sync templates, and manage business
                      profiles on your behalf.
                    </li>
                    <li className="pl-2">
                      <strong>Telephony & AI Partners:</strong> We share
                      necessary phone numbers and order details with our AI
                      voice calling partners (e.g., Tabbly AI) to execute
                      automated voice confirmations.
                    </li>
                    <li className="pl-2">
                      <strong>Shipping Partners:</strong> We share order and
                      address details with logistics providers (e.g.,
                      Shiprocket) to generate shipping labels.
                    </li>
                    <li className="pl-2">
                      <strong>Legal Obligations:</strong> If we believe the
                      release of information about you is necessary to respond
                      to legal process, to investigate or remedy potential
                      violations of our policies, or to protect the rights,
                      property, and safety of others.
                    </li>
                  </ul>
                </section>

                <section className="space-y-4 pt-4 border-t border-border/50">
                  <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-6 pt-4">
                    4. Security of Your Information
                  </h2>
                  <p className="leading-relaxed">
                    We use administrative, technical, and physical security
                    measures to help protect your personal information. All
                    sensitive credentials (such as Meta Access Tokens and
                    Shopify Secrets) are encrypted using industry-standard
                    AES-256 encryption at rest. While we have taken reasonable
                    steps to secure the personal information you provide to us,
                    please be aware that despite our efforts, no security
                    measures are perfect or impenetrable.
                  </p>
                </section>

                <section className="space-y-4 pt-4 border-t border-border/50">
                  <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-6 pt-4">
                    5. Data Retention and Deletion
                  </h2>
                  <p className="leading-relaxed">
                    We keep your information and your customers&apos;
                    information for as long as your account is active or as
                    needed to provide you the Services.
                  </p>
                  <p className="leading-relaxed">
                    <strong>User Rights and Data Deletion:</strong> You and your
                    end-customers have the right to request the deletion of
                    personal data. If you or any of your customers wish to have
                    phone numbers, messaging history, or any other personal
                    information permanently deleted from our servers, please
                    submit a deletion request by contacting us at{" "}
                    <a
                      href="mailto:privacy@autoshipp.in"
                      className="text-primary hover:underline font-bold"
                    >
                      privacy@autoshipp.in
                    </a>
                    . We will process all data deletion requests within 30 days.
                  </p>
                </section>

                <section className="mt-12 p-8 sm:p-10 rounded-[2rem] bg-muted/40 border border-border/80 shadow-xs">
                  <h2 className="text-2xl font-black text-foreground mb-4">
                    6. Contact Us
                  </h2>
                  <p className="leading-relaxed mb-6">
                    If you have questions or comments about this Privacy Policy,
                    please contact us at:
                  </p>
                  <div className="space-y-2 font-medium text-foreground">
                    <p className="font-bold text-lg">Autoshipp</p>
                    <p>
                      Email:{" "}
                      <a
                        href="mailto:privacy@autoshipp.in"
                        className="text-primary hover:underline"
                      >
                        privacy@autoshipp.in
                      </a>
                    </p>
                    <p>
                      Website:{" "}
                      <a
                        href="https://autoshipp.in"
                        className="text-primary hover:underline"
                      >
                        https://autoshipp.in
                      </a>
                    </p>
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
