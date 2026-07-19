"use client";

import { motion } from "framer-motion";
import { FadeInUp } from "@/components/AnimatedUI";
import { Glasses, Undo2, MapPin, MessageCircle } from "lucide-react";

export default function ClientDashboardPage() {
  const products = [
    {
      id: "virtual-tryon",
      name: "Virtual Try-On",
      description:
        "Allow your customers to visualize products before purchasing.",
      icon: Glasses,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      href: "https://virtual-tryon-api-service.onrender.com/v1/tenant/dashboard/thottil-maternity",
      external: true,
    },
    {
      id: "returns",
      name: "ReturnFlow",
      description:
        "Manage customer returns seamlessly with automated logistics.",
      icon: Undo2,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      href: "https://retrun-flow-off.vercel.app/dashboard?clientId=89dd70ce-fc05-4ad7-b7e5-112cfad041aa",
      external: true,
    },
    {
      id: "eta",
      name: "Delivery Estimate",
      description:
        "Hyper-local pincode delivery estimates integrated directly into checkout.",
      icon: MapPin,
      color: "text-brand-orange",
      bg: "bg-brand-orange/10",
      border: "border-brand-orange/20",
      href: "https://delivery-estimate-api.onrender.com/dashboard/index.html?clientId=4229d41b-3055-49d7-9c09-6e0e6e4dae71",
      external: true,
    },
    {
      id: "whatsapp",
      name: "WhatsApp & Communications",
      description:
        "Monitor messaging analytics, manage campaigns, and reply to customers.",
      icon: MessageCircle,
      color: "text-green-500",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      href: "/client-dashboard/whatsapp",
      external: false,
    },
  ];

  return (
    <div className="space-y-8">
      <FadeInUp>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Product Launchpad
          </h1>
          <p className="mt-2 text-muted-foreground text-lg max-w-2xl">
            Welcome to your AutoShipp portal. Select a product to view its
            dashboard.
          </p>
        </div>
      </FadeInUp>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product, index) => {
          const Icon = product.icon;
          return (
            <FadeInUp key={product.id} delay={index * 0.1}>
              <a
                href={product.href}
                target={product.external ? "_blank" : undefined}
                rel={product.external ? "noopener noreferrer" : undefined}
                className="group block h-full bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 hover:border-border"
              >
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`p-3 rounded-xl ${product.bg} ${product.border} border`}
                    >
                      <Icon className={`w-6 h-6 ${product.color}`} />
                    </div>
                    <h2 className="text-xl font-bold text-foreground group-hover:text-brand-orange transition-colors">
                      {product.name}
                    </h2>
                  </div>
                  <p className="text-muted-foreground">{product.description}</p>

                  <div className="mt-auto pt-6 flex items-center text-sm font-medium text-brand-orange group-hover:underline">
                    {product.external ? "Open Dashboard ↗" : "View Dashboard →"}
                  </div>
                </div>
              </a>
            </FadeInUp>
          );
        })}
      </div>
    </div>
  );
}
