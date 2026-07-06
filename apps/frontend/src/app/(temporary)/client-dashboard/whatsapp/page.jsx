"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FadeInUp } from "@/components/AnimatedUI";
import { FeatureTwoDashboard } from "@/components/temporary/feature-two/FeatureTwoDashboard";

export default function WhatsAppDashboardPage() {
  return (
    <div className="space-y-4">
      <FadeInUp>
        <div className="flex items-center gap-4">
          <Link
            href="/client-dashboard"
            className="p-2 -ml-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            title="Back to Launchpad"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            WhatsApp & Communications
          </h1>
        </div>
      </FadeInUp>

      <FadeInUp delay={0.1}>
        <FeatureTwoDashboard />
      </FadeInUp>
    </div>
  );
}
