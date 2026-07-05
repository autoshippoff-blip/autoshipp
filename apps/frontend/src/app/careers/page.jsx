"use client";

import React, { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BookDemoPopup from "../../components/BookDemoPopup";
import {
  Briefcase,
  Award,
  Zap,
  Code,
  Heart,
  CheckCircle2,
  Sparkles,
  Send,
  Upload,
  User,
  Mail,
  Phone,
  Laptop,
} from "lucide-react";
import { motion } from "framer-motion";

export default function CareersPage() {
  const [isDark, setIsDark] = useTheme();
  const [bookDemoOpen, setBookDemoOpen] = useState(false);

  // Application Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "AI / ML Engineer",
    experience: "1-3 Years",
    skills: "",
    portfolio: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const perks = [
    {
      icon: <Zap className="w-6 h-6 text-brand-orange" />,
      title: "AI-Native Scale",
      desc: "Work directly on high-throughput LLM voice pipelines handling millions of Indian D2C orders.",
    },
    {
      icon: <Laptop className="w-6 h-6 text-brand-blue" />,
      title: "High Autonomy",
      desc: "Remote-friendly culture with rapid shipping cycles and zero bureaucratic gatekeeping.",
    },
    {
      icon: <Award className="w-6 h-6 text-success" />,
      title: "Competitive Equity",
      desc: "Generous ESOP allocation for early team members shaping unit economics in Indian D2C.",
    },
  ];

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand-blue/20 selection:text-foreground relative overflow-hidden">
        {/* Ambient Decorative Background */}
        <div className="absolute top-10 left-1/3 -z-10 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 -z-10 w-[400px] h-[400px] bg-brand-orange/10 rounded-full blur-[140px] pointer-events-none" />

        <Header
          isDark={isDark}
          setIsDark={setIsDark}
          onBookDemo={() => setBookDemoOpen(true)}
        />

        <main className="pt-36 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold tracking-widest uppercase mb-6 border border-brand-blue/20"
            >
              <Briefcase className="w-3.5 h-3.5" /> Join Our Team
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1] mb-6"
            >
              Build the Intelligence Behind{" "}
              <span className="bg-gradient-to-r from-brand-blue to-teal-500 bg-clip-text text-transparent">
                Ecommerce
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed"
            >
              We are looking for passionate engineers, AI researchers, and
              growth operators to solve the toughest logistical challenges in
              India.
            </motion.p>
          </div>

          {/* Culture / Perks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-20">
            {perks.map((perk, i) => (
              <div
                key={i}
                className="bg-card border border-border p-6 sm:p-8 rounded-3xl sm:rounded-[2rem] shadow-xs hover:border-brand-blue/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-6">
                  {perk.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {perk.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Application Form Section */}
          <div
            id="apply"
            className="max-w-4xl mx-auto bg-card border border-border rounded-3xl sm:rounded-[3rem] p-6 sm:p-16 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />

            {/* No Active Openings Notice Banner */}
            <div className="mb-10 p-6 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider mb-3">
                <Briefcase className="w-3.5 h-3.5" /> Future Opportunities
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">
                We Currently Have No Active Openings
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our team is currently at full capacity. However, we are always
                on the lookout for exceptional talent in Chennai. Submit your
                skills and details below to join our priority talent network for
                upcoming positions!
              </p>
            </div>

            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
                Join Our Talent Network
              </h2>
              <p className="text-muted-foreground">
                Tell us about your background, skills, and what excites you
                about Autoshipp.
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center space-y-6 max-w-lg mx-auto"
              >
                <div className="w-24 h-24 bg-brand-blue/10 text-brand-blue rounded-full flex items-center justify-center mx-auto border border-brand-blue/20 animate-bounce">
                  <Sparkles className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-black text-foreground">
                  Application Submitted!
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  Thank you for applying to Autoshipp. Our engineering talent
                  team will review your skills and portfolio, and reach out for
                  an introductory call if there&apos;s a strong fit.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      role: "AI / ML Engineer",
                      experience: "1-3 Years",
                      skills: "",
                      portfolio: "",
                      message: "",
                    });
                  }}
                  className="px-8 py-3.5 rounded-full bg-brand-blue text-white font-bold text-sm shadow-lg shadow-brand-blue/25 hover:bg-brand-blue/90 transition-all cursor-pointer"
                >
                  Submit Another Profile
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" /> Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Vikram Aditya"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full h-12 px-4 rounded-xl bg-background border border-border focus:border-brand-blue focus:outline-none text-sm transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" /> Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="vikram@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full h-12 px-4 rounded-xl bg-background border border-border focus:border-brand-blue focus:outline-none text-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" /> Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 12345"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full h-12 px-4 rounded-xl bg-background border border-border focus:border-brand-blue focus:outline-none text-sm transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Role Applying For *
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                      className="w-full h-12 px-4 rounded-xl bg-background border border-border focus:border-brand-blue focus:outline-none text-sm transition-colors font-medium"
                    >
                      <option value="AI / ML Engineer">
                        AI / ML Engineer (Voice & LLM)
                      </option>
                      <option value="Full Stack Engineer">
                        Full Stack Engineer (Next.js / Node)
                      </option>
                      <option value="Product Manager">
                        Product Manager (Logistics AI)
                      </option>
                      <option value="Growth Specialist">
                        Growth & Enterprise Sales Manager
                      </option>
                      <option value="Logistics Operations">
                        Merchant Success & Operations
                      </option>
                    </select>
                  </div>
                </div>

                {/* Experience & Skills */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Total Experience *
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) =>
                        setFormData({ ...formData, experience: e.target.value })
                      }
                      className="w-full h-12 px-4 rounded-xl bg-background border border-border focus:border-brand-blue focus:outline-none text-sm transition-colors"
                    >
                      <option value="Fresher / Intern">
                        0 - 1 Years (Fresher / Intern)
                      </option>
                      <option value="1-3 Years">1 - 3 Years</option>
                      <option value="3-5 Years">3 - 5 Years</option>
                      <option value="5+ Years">5+ Years (Senior Lead)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5" /> LinkedIn / Github /
                      Portfolio
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/username"
                      value={formData.portfolio}
                      onChange={(e) =>
                        setFormData({ ...formData, portfolio: e.target.value })
                      }
                      className="w-full h-12 px-4 rounded-xl bg-background border border-border focus:border-brand-blue focus:outline-none text-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                    <span>Key Skills & Tech Stack *</span>
                    <span className="text-[10px] font-normal text-muted-foreground">
                      Comma separated
                    </span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. React, Next.js, Python, FastAPI, PyTorch, PostgreSQL, Redis, AWS"
                    value={formData.skills}
                    onChange={(e) =>
                      setFormData({ ...formData, skills: e.target.value })
                    }
                    className="w-full h-12 px-4 rounded-xl bg-background border border-border focus:border-brand-blue focus:outline-none text-sm transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Why Autoshipp? & Note on Experience *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Briefly describe your most complex project, your passion for AI, or why you want to work on Indian D2C scale..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full p-4 rounded-xl bg-background border border-border focus:border-brand-blue focus:outline-none text-sm transition-colors resize-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 rounded-full bg-brand-blue hover:bg-brand-blue/90 text-white font-extrabold text-base shadow-xl shadow-brand-blue/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 group cursor-pointer mt-8"
                >
                  {loading ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <span>Submit Candidate Application</span>
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
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
