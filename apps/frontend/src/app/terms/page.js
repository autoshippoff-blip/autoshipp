"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import BookDemoPopup from "@/components/BookDemoPopup";

export default function TermsPage() {
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
        <div className="absolute top-0 left-1/4 -z-10 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

        <Header
          isDark={isDark}
          setIsDark={setIsDark}
          onBookDemo={() => setBookDemoOpen(true)}
        />

        <main className="flex-1 pt-36 pb-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-card/70 backdrop-blur-2xl border border-border rounded-3xl sm:rounded-[3rem] p-6 sm:p-16 shadow-2xl relative">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground mb-4 pb-8 border-b border-border/80">
                Terms of Service
              </h1>

              <div className="space-y-10 pt-4 text-base md:text-lg leading-relaxed text-muted-foreground/90">
                <p className="font-semibold text-primary text-sm uppercase tracking-wider mb-2">
                  Last Updated: May 29, 2026
                </p>
                <p className="leading-relaxed">
                  Welcome to Autoshipp. These Terms of Service
                  (&quot;Terms&quot;) constitute a legally binding agreement
                  made between you (&quot;Merchant&quot;, &quot;you&quot;, or
                  &quot;your&quot;) and Autoshipp (&quot;we,&quot;
                  &quot;us,&quot; or &quot;our&quot;), concerning your access to
                  and use of the autoshipp.in website as well as any other media
                  form, channel, mobile website or related applications
                  connected thereto (collectively, the &quot;Services&quot;).
                </p>
                <p className="leading-relaxed">
                  By accessing or using our Services, you agree to be bound by
                  these Terms. If you disagree with any part of the terms, then
                  you may not access the Service.
                </p>

                <section className="space-y-4 pt-2">
                  <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-6">
                    1. Description of Service
                  </h2>
                  <p className="leading-relaxed">
                    Autoshipp provides an e-commerce automation platform that
                    allows merchants to automate shipping label generation, Cash
                    on Delivery (COD) confirmations via AI voice calls, and
                    multi-channel messaging via WhatsApp and Instagram.
                  </p>
                </section>

                <section className="space-y-4 pt-4 border-t border-border/50">
                  <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-6 pt-4">
                    2. WhatsApp and Meta Integration
                  </h2>
                  <p className="leading-relaxed">
                    Our Services allow you to connect your Meta WhatsApp
                    Business Account to automate messaging with your
                    end-customers. By using these messaging features, you
                    acknowledge and agree to the following:
                  </p>

                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 mt-8 pt-2">
                    2.1 Adherence to Third-Party Policies
                  </h3>
                  <p className="leading-relaxed">
                    You agree to fully comply with the WhatsApp Business Terms
                    of Service and the Meta Commerce Policy. You are solely
                    responsible for ensuring that all messages sent through
                    Autoshipp comply with these third-party terms.
                  </p>

                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 mt-8 pt-2">
                    2.2 User Consent and Opt-In
                  </h3>
                  <p className="leading-relaxed">
                    You represent and warrant that you have obtained the
                    necessary, explicit opt-in consent from your end-customers
                    prior to sending them any WhatsApp messages or automated
                    voice calls through our platform, in accordance with
                    applicable laws and Meta&apos;s guidelines.
                  </p>
                </section>

                <section className="space-y-4 pt-4 border-t border-border/50">
                  <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-6 pt-4">
                    3. Acceptable Use and Anti-Spam Policy
                  </h2>
                  <p className="leading-relaxed">
                    You agree not to use the Services to:
                  </p>
                  <ul className="space-y-3 pl-6 list-disc marker:text-primary">
                    <li className="pl-2">
                      Send spam, unsolicited promotional messages, or bulk
                      messaging that violates Meta&apos;s policies.
                    </li>
                    <li className="pl-2">
                      Send content that is illegal, abusive, harassing,
                      defamatory, fraudulent, or deceptive.
                    </li>
                    <li className="pl-2">
                      Transmit viruses, malware, or any other malicious code.
                    </li>
                    <li className="pl-2">
                      Interfere with or disrupt the integrity or performance of
                      the Services or third-party data contained therein.
                    </li>
                  </ul>
                  <p className="leading-relaxed pt-2">
                    We maintain a zero-tolerance policy for spam and platform
                    abuse.
                  </p>
                </section>

                <section className="space-y-4 pt-4 border-t border-border/50">
                  <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-6 pt-4">
                    4. Account Suspension and Termination
                  </h2>
                  <p className="leading-relaxed">
                    <strong>Termination for Violation:</strong> We reserve the
                    right to immediately suspend or terminate your account,
                    without prior notice or liability, for any reason
                    whatsoever, including without limitation if you breach these
                    Terms of Service. Specifically, if we determine or receive
                    notice from Meta that you are violating the WhatsApp
                    Business Terms of Service or sending spam, your access to
                    our messaging infrastructure will be permanently revoked.
                  </p>
                </section>

                <section className="space-y-4 pt-4 border-t border-border/50">
                  <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-6 pt-4">
                    5. Limitation of Liability
                  </h2>
                  <p className="leading-relaxed">
                    In no event shall Autoshipp, nor its directors, employees,
                    partners, agents, suppliers, or affiliates, be liable for
                    any indirect, incidental, special, consequential or punitive
                    damages, including without limitation, loss of profits,
                    data, use, goodwill, or other intangible losses, resulting
                    from (i) your access to or use of or inability to access or
                    use the Services; (ii) any conduct or content of any third
                    party on the Services; (iii) any messaging failures or
                    account bans issued by Meta Platforms, Inc. or other
                    third-party providers.
                  </p>
                </section>

                <section className="space-y-4 pt-4 border-t border-border/50">
                  <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-6 pt-4">
                    6. Changes to Terms
                  </h2>
                  <p className="leading-relaxed">
                    We reserve the right, at our sole discretion, to modify or
                    replace these Terms at any time. What constitutes a material
                    change will be determined at our sole discretion. By
                    continuing to access or use our Services after those
                    revisions become effective, you agree to be bound by the
                    revised terms.
                  </p>
                </section>

                <section className="mt-12 p-8 sm:p-10 rounded-[2rem] bg-muted/40 border border-border/80 shadow-xs">
                  <h2 className="text-2xl font-black text-foreground mb-4">
                    7. Contact Us
                  </h2>
                  <p className="leading-relaxed mb-6">
                    If you have any questions about these Terms, please contact
                    us at:
                  </p>
                  <div className="space-y-2 font-medium text-foreground">
                    <p className="font-bold text-lg">Autoshipp</p>
                    <p>
                      Email:{" "}
                      <a
                        href="mailto:support@autoshipp.in"
                        className="text-primary hover:underline"
                      >
                        support@autoshipp.in
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
