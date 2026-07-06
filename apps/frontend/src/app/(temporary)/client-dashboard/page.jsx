"use client";

import { motion } from "framer-motion";
import EtaWidget from "@/components/temporary/EtaWidget";
import { MapPin, Box, AlertCircle } from "lucide-react";
import { FadeInUp } from "@/components/AnimatedUI";
import { FeatureTwoDashboard } from "@/components/temporary/feature-two/FeatureTwoDashboard";

export default function ClientDashboardPage() {
  return (
    <div className="space-y-8">
      <FadeInUp>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome to your Portal
          </h1>
          <p className="mt-2 text-muted-foreground text-lg max-w-2xl">
            This temporary dashboard provides isolated access to our
            production-ready features.
          </p>
        </div>
      </FadeInUp>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Feature 1 */}
        <FadeInUp delay={0.1}>
          <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden h-full flex flex-col">
            <div className="p-6 border-b border-border/40 bg-muted/20 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-brand-orange" />
                  Hyper-Local Pincode ETA
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Live delivery estimate widget integrated directly into your
                  checkout flow.
                </p>
              </div>
              <div className="px-2 py-1 bg-green-500/10 border border-green-500/20 text-green-600 rounded text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
                Live & Active
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-center bg-muted/5 relative">
              {/* The ETA Widget mounts here via its internal ID */}
              <EtaWidget isActive={true} />
            </div>
          </div>
        </FadeInUp>

        {/* Feature 2 (Communication Analytics & Messaging) */}
        <FadeInUp delay={0.2}>
          <FeatureTwoDashboard />
        </FadeInUp>
      </div>
    </div>
  );
}
