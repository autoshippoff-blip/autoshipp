import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-16 mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-8">
        <div className="max-w-sm">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg tracking-tight text-foreground mb-4">
            <div className="w-8 h-8 rounded overflow-hidden">
              <img src="/images/logo.png" alt="Autoshipp Logo" className="w-full h-full object-contain" />
            </div>
            Autoshipp
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The AI-native dispatch engine for high-growth Indian D2C brands. Stop RTO, Start Profit.
          </p>
        </div>
        
        <div className="flex flex-wrap sm:flex-nowrap gap-12 sm:gap-16">
          <div className="flex flex-col gap-3 text-sm min-w-[120px]">
            <h4 className="font-semibold text-foreground mb-1">Products</h4>
            <Link href="/products/care" className="text-muted-foreground hover:text-foreground transition-colors">Autoshipp Care</Link>
            <Link href="/products/engage" className="text-muted-foreground hover:text-foreground transition-colors">Autoshipp Engage</Link>
            <Link href="/products/returns" className="text-muted-foreground hover:text-foreground transition-colors">Autoshipp Returns</Link>
            <Link href="/products/convert" className="text-muted-foreground hover:text-foreground transition-colors">Autoshipp Convert</Link>
            <Link href="/products/shield" className="text-muted-foreground hover:text-foreground transition-colors">Autoshipp Shield</Link>
            <Link href="/products/recover" className="text-muted-foreground hover:text-foreground transition-colors">Autoshipp Recover</Link>
          </div>
          <div className="flex flex-col gap-3 text-sm min-w-[120px]">
            <h4 className="font-semibold text-foreground mb-1">Company</h4>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link>
            <Link href="/brand" className="text-muted-foreground hover:text-foreground transition-colors">Brand Assets</Link>
            <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">Careers</Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
          </div>
          <div className="flex flex-col gap-3 text-sm min-w-[120px]">
            <h4 className="font-semibold text-foreground mb-1">Legal</h4>
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="/security" className="text-muted-foreground hover:text-foreground transition-colors">Security</Link>
            <Link href="/sla" className="text-muted-foreground hover:text-foreground transition-colors">SLA</Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© 2026 Autoshipp Technologies. All rights reserved.</p>
        <div className="flex items-center gap-2 font-medium text-foreground">
          Made in India for the World
        </div>
      </div>
    </footer>
  );
}