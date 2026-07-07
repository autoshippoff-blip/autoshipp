"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTheme } from "../../../hooks/useTheme";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import BookDemoPopup from "../../../components/BookDemoPopup";
import ConnectToMetaButton from "../../../components/ConnectToMetaButton";
import {
  FadeInUp,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
} from "../../../components/AnimatedUI";
import {
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  Zap,
  Activity,
  Users,
  Sparkles,
  Send,
  BellRing,
  Target,
  BarChart3,
  ExternalLink,
  Plus,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";

export default function EngageProductPage() {
  const [isDark, setIsDark] = useTheme();
  const [bookDemoOpen, setBookDemoOpen] = useState(false);
  const [engageTab, setEngageTab] = useState("campaign"); // campaign | alert
  const [selectedAudience, setSelectedAudience] =
    useState("High AOV Repeaters");

  const features = [
    {
      title: "Behavioral WhatsApp Flows",
      desc: "Trigger hyper-personalised promotional broadcasts automatically based on browsing history and wishlist additions.",
      icon: <Zap className="w-6 h-6 text-brand-orange" />,
    },
    {
      title: "Automated Courier Alerts",
      desc: "Keep shoppers engaged post-purchase with rich tracking cards, out-for-delivery OTPs, and instant NDR confirmation.",
      icon: <Activity className="w-6 h-6 text-brand-blue" />,
    },
    {
      title: "Conversational Commerce",
      desc: "Embed 1-click checkout buttons directly inside WhatsApp messages so users buy without redirecting to a browser.",
      icon: <MessageSquare className="w-6 h-6 text-success" />,
    },
    {
      title: "AI RFM Audience Clustering",
      desc: "Automatically segment your customer base into VIPs, Churn Risks, and Discount Seekers for maximum campaign ROAS.",
      icon: <Users className="w-6 h-6 text-brand-navy dark:text-amber-400" />,
    },
  ];

  // Dashboard & Creator states
  const [dashboardView, setDashboardView] = useState("list"); // list | create
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchProgress, setLaunchProgress] = useState(0);

  const [campaignList, setCampaignList] = useState([
    {
      id: "cmp-001",
      brandName: "Monochrome Footwear",
      campaignName: "VIP Sneaker Launch Drop",
      bannerImage:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
      message: `⭐ VIP Early Access Launch ⭐\n\n👟 *Monochrome Premium Club* brings an exclusive, limited-edition early release to our Top 5% shoppers!\n\n✨ *Experience premium luxury with:*\n🤖 Handcrafted Italian Leather\n👀 Ultra-Responsive Cushioning\n😴 Orthopedic Memory Foam\n🚨 Weatherproof Shield Protection\n\n🎁 Powered by your exclusive 20% discount code: *MONOVIP20*`,
      ctaText: "Claim 20% Discount",
      sent: 12450,
      delivered: 12201,
      clicked: 2315,
      ctr: "18.6%",
      status: "Completed",
      date: "2026-06-28",
    },
    {
      id: "cmp-002",
      brandName: "Urban Outfitters",
      campaignName: "Summer Clearance Sale",
      bannerImage:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
      message: `⭐ Summer Clearance Sale ⭐\n\n🛍️ *Urban Outfitters* clearance event is now live! Get up to 50% off on all clothing items.\n\n✨ *Explore summer collections:*\n👕 Cool Linen Shirts\n🩳 Chino Shorts\n🕶️ Premium Sunglasses\n\n🎁 Use coupon code *SUMMER50* for an extra 10% off.`,
      ctaText: "Shop Clearance Sale",
      sent: 8900,
      delivered: 8620,
      clicked: 1317,
      ctr: "14.8%",
      status: "Completed",
      date: "2026-06-15",
    },
  ]);

  const [formBrandName, setFormBrandName] = useState("(Brand Name)");
  const [formCampaignName, setFormCampaignName] = useState("New Product Drop");
  const [formBannerImage, setFormBannerImage] = useState(
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
  );
  const [formMessageText, setFormMessageText] = useState(
    `⭐ VIP Early Access Launch ⭐\n\n👟 *Premium Club* brings an exclusive, limited-edition early release to our Top 5% shoppers!\n\n✨ *Experience premium luxury with:*\n🤖 Handcrafted Italian Leather\n👀 Ultra-Responsive Cushioning\n😴 Orthopedic Memory Foam\n🚨 Weatherproof Shield Protection\n\n🎁 Powered by your exclusive 20% discount code: *MONOVIP20*\n\n⭐ Walk with confidence, style, and unmatched comfort.`,
  );
  const [formCtaText, setFormCtaText] = useState("Claim 20% Discount");
  const [formAudienceSize, setFormAudienceSize] = useState("5450");

  const handleLaunchCampaign = (e) => {
    e.preventDefault();
    setIsLaunching(true);
    setLaunchProgress(0);

    const interval = setInterval(() => {
      setLaunchProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const newCampaign = {
              id: `cmp-${Date.now()}`,
              brandName: formBrandName,
              campaignName: formCampaignName,
              bannerImage: formBannerImage,
              message: formMessageText,
              ctaText: formCtaText,
              sent: parseInt(formAudienceSize) || 5000,
              delivered: Math.floor(
                (parseInt(formAudienceSize) || 5000) * 0.98,
              ),
              clicked: Math.floor((parseInt(formAudienceSize) || 5000) * 0.15),
              ctr: "15.0%",
              status: "Completed",
              date: new Date().toISOString().split("T")[0],
            };
            setCampaignList([newCampaign, ...campaignList]);
            setIsLaunching(false);
            setDashboardView("list");
          }, 600);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const totalSent = campaignList.reduce((acc, c) => acc + c.sent, 0);
  const totalClicked = campaignList.reduce((acc, c) => acc + c.clicked, 0);
  const avgCtr =
    totalSent > 0 ? ((totalClicked / totalSent) * 100).toFixed(1) : "0.0";

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand-orange/20 transition-colors duration-300">
        <Header
          isDark={isDark}
          setIsDark={setIsDark}
          onBookDemo={() => setBookDemoOpen(true)}
        />

        <main className="pt-24 pb-16">
          {/* Hero Section */}
          <section className="relative z-0 bg-muted/30 overflow-hidden pt-20 pb-28 border-b border-border">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-11">
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
                  <FadeInUp delay={0.1}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-xs tracking-widest font-extrabold mb-8 uppercase border border-brand-orange/20 shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5" /> WhatsApp Marketing
                      Engine
                    </div>
                  </FadeInUp>
                  <FadeInUp delay={0.2}>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.08] mb-6">
                      Engage Shoppers On{" "}
                      <span className="bg-gradient-to-r from-brand-orange via-amber-500 to-brand-blue bg-clip-text text-transparent">
                        Their #1 App.
                      </span>
                    </h1>
                  </FadeInUp>
                  <FadeInUp delay={0.3}>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
                      Drive 4x higher CTR than traditional email with automated
                      WhatsApp broadcast campaigns, predictive RFM audience
                      clustering, and real-time courier utility alerts.
                    </p>
                  </FadeInUp>
                  <FadeInUp delay={0.4} className="flex flex-wrap gap-4">
                    <ConnectToMetaButton
                      onOpenBookDemo={() => setBookDemoOpen(true)}
                      className="h-14 px-8 flex items-center justify-center rounded-full text-white bg-brand-orange hover:bg-brand-orange/90 shadow-xl shadow-brand-orange/25 transition-all font-extrabold text-base cursor-pointer group"
                    />
                  </FadeInUp>
                </div>

                {/* Right Interactive Showcase */}
                <div className="lg:col-span-6 relative z-10">
                  <ScaleIn
                    delay={0.4}
                    className="w-full bg-card border border-border rounded-[3rem] shadow-2xl p-6 sm:p-8 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />

                    {/* Tabs */}
                    <div className="flex gap-2 p-1.5 rounded-2xl bg-muted mb-6 border border-border/60">
                      <button
                        onClick={() => setEngageTab("campaign")}
                        className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${engageTab === "campaign" ? "bg-background text-brand-orange shadow-md border border-border/80" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        <Send className="w-4 h-4" /> Marketing Message AI
                      </button>
                      <button
                        onClick={() => setEngageTab("alert")}
                        className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${engageTab === "alert" ? "bg-background text-brand-blue shadow-md border border-border/80" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        <BellRing className="w-4 h-4" /> Utility Alerts
                      </button>
                    </div>

                    {/* View */}
                    <div className="min-h-[340px] flex items-center justify-center">
                      {engageTab === "campaign" && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                          className="w-full space-y-6 text-left"
                        >
                          {/* Launch Loader overlay */}
                          {isLaunching && (
                            <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6 text-center transition-all duration-300 rounded-[2rem]">
                              <div className="w-16 h-16 rounded-full bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center mb-6 animate-pulse">
                                <Loader2 className="w-8 h-8 text-brand-orange animate-spin" />
                              </div>
                              <h3 className="text-xl font-bold text-white mb-2">
                                Launching WhatsApp Campaign
                              </h3>
                              <p className="text-sm text-slate-400 max-w-sm mb-6">
                                Uploading template details and launching
                                broadcasts to{" "}
                                {parseInt(formAudienceSize).toLocaleString()}{" "}
                                contacts...
                              </p>

                              {/* Progress Bar */}
                              <div className="w-64 bg-white/10 h-2 rounded-full overflow-hidden mb-2">
                                <div
                                  className="bg-brand-orange h-full transition-all duration-150 ease-out"
                                  style={{ width: `${launchProgress}%` }}
                                />
                              </div>
                              <span className="text-xs font-mono text-brand-orange font-bold">
                                {launchProgress}% Sent
                              </span>
                            </div>
                          )}

                          {dashboardView === "list" ? (
                            <div className="space-y-6">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                  <h3 className="text-xl font-bold text-foreground">
                                    Marketing Campaigns
                                  </h3>
                                  <p className="text-xs text-muted-foreground">
                                    Monitor delivery, CTR, and launch templates.
                                  </p>
                                </div>
                                <button
                                  onClick={() => setDashboardView("create")}
                                  className="px-4 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange/90 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all shrink-0 self-start"
                                >
                                  <Plus className="w-4 h-4" /> Create Campaign
                                </button>
                              </div>

                              {/* Stats Grid */}
                              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                                <div className="bg-muted/50 border border-border p-2 sm:p-3 rounded-2xl text-center flex flex-col justify-center min-w-0">
                                  <span className="text-[8px] sm:text-[9px] font-bold text-muted-foreground uppercase block mb-0.5 truncate">
                                    Total Sent
                                  </span>
                                  <span className="text-sm sm:text-lg font-black text-foreground truncate">
                                    {totalSent.toLocaleString()}
                                  </span>
                                </div>
                                <div className="bg-muted/50 border border-border p-2 sm:p-3 rounded-2xl text-center flex flex-col justify-center min-w-0">
                                  <span className="text-[8px] sm:text-[9px] font-bold text-muted-foreground uppercase block mb-0.5 truncate">
                                    Total Clicks
                                  </span>
                                  <span className="text-sm sm:text-lg font-black text-brand-orange truncate">
                                    {totalClicked.toLocaleString()}
                                  </span>
                                </div>
                                <div className="bg-muted/50 border border-border p-2 sm:p-3 rounded-2xl text-center flex flex-col justify-center min-w-0">
                                  <span className="text-[8px] sm:text-[9px] font-bold text-muted-foreground uppercase block mb-0.5 truncate">
                                    Avg. CTR
                                  </span>
                                  <span className="text-sm sm:text-lg font-black text-emerald-600 dark:text-emerald-400 truncate">
                                    {avgCtr}%
                                  </span>
                                </div>
                              </div>

                              {/* Campaigns List */}
                              <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                                {campaignList.map((cmp) => (
                                  <div
                                    key={cmp.id}
                                    className="bg-background border border-border/80 hover:border-border p-4 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition-all"
                                  >
                                    <div className="flex gap-3">
                                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-border shrink-0 bg-slate-900">
                                        <Image
                                          src={cmp.bannerImage}
                                          width={48}
                                          height={48}
                                          className="w-full h-full object-cover"
                                          alt=""
                                        />
                                      </div>
                                      <div>
                                        <p className="text-xs font-bold text-foreground">
                                          {cmp.campaignName}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground font-semibold">
                                          Brand: {cmp.brandName}
                                        </p>
                                        <p className="text-[9px] font-mono text-muted-foreground/80 mt-1">
                                          {cmp.date}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-6 justify-between sm:justify-end">
                                      <div className="text-right">
                                        <span className="text-[9px] font-bold text-muted-foreground uppercase block">
                                          Sent
                                        </span>
                                        <span className="text-xs font-extrabold text-foreground">
                                          {cmp.sent.toLocaleString()}
                                        </span>
                                      </div>
                                      <div className="text-right">
                                        <span className="text-[9px] font-bold text-muted-foreground uppercase block">
                                          CTR
                                        </span>
                                        <span className="text-xs font-extrabold text-brand-orange">
                                          {cmp.ctr}
                                        </span>
                                      </div>
                                      <div className="text-right shrink-0">
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20">
                                          ● Sent
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch text-left">
                              {/* Form Column */}
                              <div className="lg:col-span-6 bg-muted/30 border border-border rounded-2xl p-5 flex flex-col justify-between space-y-4">
                                <div>
                                  <h3 className="text-sm font-bold text-foreground mb-1">
                                    Create Message Template
                                  </h3>
                                  <p className="text-[11px] text-muted-foreground">
                                    Submit details and banner for the message
                                    template.
                                  </p>
                                </div>

                                <div className="space-y-3 text-xs">
                                  <div>
                                    <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">
                                      Campaign Name
                                    </label>
                                    <input
                                      type="text"
                                      value={formCampaignName}
                                      onChange={(e) =>
                                        setFormCampaignName(e.target.value)
                                      }
                                      className="w-full px-3 py-2 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brand-orange text-xs font-semibold"
                                      placeholder="e.g. Winter Sale Drop"
                                    />
                                  </div>

                                  <div className="grid grid-cols-2 gap-3">
                                    <div>
                                      <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">
                                        Brand Name
                                      </label>
                                      <input
                                        type="text"
                                        value={formBrandName}
                                        onChange={(e) =>
                                          setFormBrandName(e.target.value)
                                        }
                                        className="w-full px-3 py-2 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brand-orange text-xs font-semibold"
                                        placeholder="e.g. Zara"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">
                                        Audience Size
                                      </label>
                                      <input
                                        type="number"
                                        value={formAudienceSize}
                                        onChange={(e) =>
                                          setFormAudienceSize(e.target.value)
                                        }
                                        className="w-full px-3 py-2 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brand-orange text-xs font-semibold"
                                        placeholder="e.g. 5000"
                                      />
                                    </div>
                                  </div>

                                  <div>
                                    <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">
                                      Banner Image URL
                                    </label>
                                    <input
                                      type="text"
                                      value={formBannerImage}
                                      onChange={(e) =>
                                        setFormBannerImage(e.target.value)
                                      }
                                      className="w-full px-3 py-2 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brand-orange font-mono text-[10px]"
                                      placeholder="Image URL"
                                    />
                                    {/* Preset selector */}
                                    <div className="flex gap-2 mt-1">
                                      {[
                                        {
                                          label: "Sneakers",
                                          url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
                                        },
                                        {
                                          label: "Smartwatch",
                                          url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
                                        },
                                        {
                                          label: "Travel Bus",
                                          url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=80",
                                        },
                                      ].map((preset) => (
                                        <button
                                          key={preset.label}
                                          type="button"
                                          onClick={() =>
                                            setFormBannerImage(preset.url)
                                          }
                                          className={`px-2 py-0.5 rounded text-[9px] font-bold cursor-pointer transition-all border ${
                                            formBannerImage === preset.url
                                              ? "bg-brand-orange/10 text-brand-orange border-brand-orange/30"
                                              : "bg-background text-muted-foreground border-border hover:text-foreground hover:border-muted-foreground"
                                          }`}
                                        >
                                          {preset.label}
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  <div>
                                    <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">
                                      Message Template Body
                                    </label>
                                    <textarea
                                      value={formMessageText}
                                      onChange={(e) =>
                                        setFormMessageText(e.target.value)
                                      }
                                      rows={4}
                                      className="w-full px-3 py-2 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brand-orange font-mono text-[10px] whitespace-pre-line"
                                      placeholder="Type message template body here..."
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1">
                                      CTA Button Text
                                    </label>
                                    <input
                                      type="text"
                                      value={formCtaText}
                                      onChange={(e) =>
                                        setFormCtaText(e.target.value)
                                      }
                                      className="w-full px-3 py-2 bg-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brand-orange text-xs font-semibold"
                                      placeholder="e.g. Shop Now"
                                    />
                                  </div>
                                </div>

                                <div className="flex gap-2 pt-2 border-t border-border shrink-0">
                                  <button
                                    type="button"
                                    onClick={() => setDashboardView("list")}
                                    className="flex-1 py-2.5 rounded-xl border border-border hover:bg-muted text-foreground font-bold text-xs cursor-pointer transition-all text-center"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="button"
                                    onClick={handleLaunchCampaign}
                                    className="flex-1 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange/90 text-white font-bold text-xs cursor-pointer transition-all text-center"
                                  >
                                    Launch Campaign 🚀
                                  </button>
                                </div>
                              </div>

                              {/* Live Preview Column */}
                              <div className="lg:col-span-6 bg-slate-950 rounded-2xl border border-white/10 p-4 flex flex-col justify-between text-left relative overflow-hidden font-sans">
                                {/* Header */}
                                <div className="flex items-center gap-2.5 border-b border-white/10 pb-2.5 mb-3">
                                  <div className="w-8 h-8 rounded-full overflow-hidden border border-white/15 bg-white/10 shrink-0 flex items-center justify-center text-xs font-bold text-white uppercase font-mono">
                                    {formBrandName.substring(0, 2)}
                                  </div>
                                  <div className="flex-1 min-w-0 text-white">
                                    <div className="flex items-center gap-1">
                                      <span className="text-xs font-extrabold truncate">
                                        {formBrandName}
                                      </span>
                                      <span className="w-3 h-3 text-[#25D366] shrink-0 font-bold">
                                        ✓
                                      </span>
                                    </div>
                                    <span className="text-[9px] text-white/50 block">
                                      Official Account
                                    </span>
                                  </div>
                                </div>

                                {/* Message Area */}
                                <div className="flex-1 flex flex-col justify-start">
                                  {/* Message bubble */}
                                  <div className="bg-[#1f2c34] rounded-2xl rounded-tl-none overflow-hidden text-[11px] leading-relaxed max-w-[95%] border border-[#2c3d48] shadow-md text-white">
                                    {/* Header Image */}
                                    {formBannerImage && (
                                      <div className="w-full h-36 relative border-b border-[#2c3d48] bg-slate-900 flex items-center justify-center text-xs text-muted-foreground">
                                        {/* eslint-disable-next-line @next/next/no-img-element -- dynamic user-supplied URL; remote patterns not configured */}
                                        <img
                                          src={formBannerImage}
                                          alt="Product Drop"
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                    )}

                                    <div className="p-3.5 space-y-2">
                                      <p className="text-[9px] text-white/40 font-semibold">
                                        Reply with &apos;STOP&apos; to
                                        unsubscribe
                                      </p>

                                      <div className="whitespace-pre-line text-white/90 font-normal">
                                        {formMessageText}
                                      </div>

                                      <p className="text-[9px] text-white/40 font-semibold pt-1">
                                        Reply with &apos;STOP&apos; to
                                        unsubscribe
                                      </p>

                                      <div className="flex justify-end text-[9px] text-white/40 font-medium">
                                        3:29 PM
                                      </div>
                                    </div>
                                  </div>

                                  {/* Dynamic Action Button */}
                                  {formCtaText && (
                                    <div className="mt-1.5 bg-[#1f2c34] rounded-xl overflow-hidden max-w-[95%] border border-[#2c3d48] shadow-md hover:bg-[#253943] transition-colors duration-200">
                                      <button className="w-full py-2.5 flex items-center justify-center gap-2 text-[#00a884] font-extrabold text-xs cursor-pointer">
                                        <ExternalLink className="w-4 h-4 text-[#00a884]" />
                                        <span>{formCtaText}</span>
                                      </button>
                                    </div>
                                  )}
                                </div>

                                <span className="text-[9px] text-white/40 italic block mt-3 text-center shrink-0">
                                  ⚡ Instant WhatsApp Delivery via Autoshipp
                                </span>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}

                      {engageTab === "alert" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="w-full space-y-4"
                        >
                          <div className="p-6 rounded-2xl bg-muted/50 border border-border space-y-4 font-sans">
                            <div className="flex items-center justify-between border-b border-border pb-3">
                              <span className="text-xs font-extrabold uppercase tracking-wider text-foreground">
                                Post-Purchase Utility Automation
                              </span>
                              <span className="text-xs font-mono text-brand-blue font-bold">
                                100% Automated
                              </span>
                            </div>

                            <div className="space-y-2.5">
                              <div className="p-3.5 rounded-xl bg-background border border-border shadow-2xs flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-brand-blue/15 text-brand-blue flex items-center justify-center font-bold">
                                  📦
                                </div>
                                <div className="flex-1">
                                  <p className="text-xs font-extrabold text-foreground">
                                    Order Shipped Alert
                                  </p>
                                  <p className="text-[11px] text-muted-foreground">
                                    Triggered when BlueDart generates AWB
                                    #772810
                                  </p>
                                </div>
                                <span className="text-[10px] font-mono font-bold bg-success/20 text-success px-2 py-0.5 rounded">
                                  Sent
                                </span>
                              </div>

                              <div className="p-3.5 rounded-xl bg-background border border-border shadow-2xs flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-brand-orange/15 text-brand-orange flex items-center justify-center font-bold">
                                  🚚
                                </div>
                                <div className="flex-1">
                                  <p className="text-xs font-extrabold text-foreground">
                                    Out For Delivery + Secure OTP
                                  </p>
                                  <p className="text-[11px] text-muted-foreground">
                                    Includes live courier agent phone & delivery
                                    PIN
                                  </p>
                                </div>
                                <span className="text-[10px] font-mono font-bold bg-brand-blue/20 text-brand-blue px-2 py-0.5 rounded">
                                  Queued
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </ScaleIn>
                </div>
              </div>
            </div>
          </section>

          {/* Deep-Dive Showcase 1 */}
          <section className="py-24 bg-background border-b border-border overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-6 order-2 lg:order-1">
                  <div className="bg-gradient-to-tr from-brand-orange/10 via-card to-brand-blue/10 border border-border rounded-[3rem] p-8 shadow-xl">
                    <div className="bg-background border border-border rounded-3xl p-6 shadow-md space-y-6">
                      <div className="flex items-center justify-between border-b border-border pb-3">
                        <span className="font-extrabold text-sm text-foreground">
                          Predictive RFM Audience Segmentation
                        </span>
                        <span className="text-xs font-mono text-success">
                          ✓ Zero Spam Reports
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Blasting the exact same promotional message to your
                        entire contact database destroys brand reputation.
                        Autoshipp Engage neural clustering analyses customer
                        recency, frequency, and monetary metrics to deliver the
                        exact right offer.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-muted text-center">
                          <p className="text-2xl font-black text-brand-orange">
                            4x
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Higher ROAS
                          </p>
                        </div>
                        <div className="p-3 rounded-xl bg-muted text-center">
                          <p className="text-2xl font-black text-brand-blue">
                            98%
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Msg Delivery Rate
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-extrabold tracking-wider uppercase">
                    <Target className="w-3.5 h-3.5" /> Smart Broadcast Engine
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight leading-[1.1]">
                    Stop Blasting Email.{" "}
                    <span className="text-brand-orange">Start Conversing.</span>
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Indian consumers check WhatsApp over 25 times per day.
                    Transform your marketing funnel by launching interactive
                    catalogs, private product drops, and automated restock
                    alerts directly on customer lock screens.
                  </p>
                  <ul className="space-y-3 pt-2 text-foreground font-medium text-base">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                      <span>
                        <strong>Dynamic 1-Click Checkout:</strong> Customers
                        review cart items and select UPI payments inside
                        WhatsApp.
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                      <span>
                        <strong>AI Send-Time Optimisation:</strong> Fires
                        messages when each specific shopper is statistically
                        most active.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-32 bg-background">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-11">
              <FadeInUp className="text-center max-w-3xl mx-auto mb-20">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-6">
                  Marketing Built for Retention
                </h2>
                <p className="text-lg text-muted-foreground">
                  Convert one-time purchasers into repeat brand advocates with
                  automated messaging.
                </p>
              </FadeInUp>
              <StaggerContainer className="grid md:grid-cols-2 gap-8">
                {features.map((feat, idx) => (
                  <StaggerItem key={idx}>
                    <div className="p-10 rounded-[2.5rem] bg-card border border-border hover:border-brand-orange/40 shadow-lg transition-all h-full flex flex-col items-start group">
                      <div className="p-4 bg-muted rounded-2xl shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                        {feat.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-4">
                        {feat.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {feat.desc}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>

          {/* ROI Banner */}
          <section className="py-20 bg-gradient-to-br from-slate-900 to-brand-navy text-white my-10 max-w-[1440px] mx-auto sm:rounded-[3rem] px-4 sm:px-10 lg:px-20 relative overflow-hidden shadow-2xl border border-white/10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-2xl">
                <h2 className="text-4xl lg:text-5xl font-black mb-6">
                  Ready to Boost Campaign ROAS 4x?
                </h2>
                <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                  Launch Autoshipp Engage today. Connect your Shopify or custom
                  store to unlock automated WhatsApp marketing flows and
                  real-time utility notifications.
                </p>
                <button
                  onClick={() => setBookDemoOpen(true)}
                  className="h-14 px-8 rounded-full bg-brand-orange hover:bg-brand-orange/90 text-white font-extrabold flex items-center gap-2 shadow-xl shadow-brand-orange/30 transition-all cursor-pointer"
                >
                  <span>Schedule Engage Walkthrough</span>
                  <ArrowRight size={20} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-6 w-full lg:w-auto font-mono">
                <div className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-sm text-center">
                  <p className="text-4xl font-black text-brand-orange mb-2">
                    98%
                  </p>
                  <p className="text-xs font-bold text-slate-300 uppercase">
                    Open Rate
                  </p>
                </div>
                <div className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-sm text-center">
                  <p className="text-4xl font-black text-emerald-400 mb-2">
                    4x
                  </p>
                  <p className="text-xs font-bold text-slate-300 uppercase">
                    Higher ROAS
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <BookDemoPopup
          isOpen={bookDemoOpen}
          onClose={() => setBookDemoOpen(false)}
        />
      </div>
    </div>
  );
}
