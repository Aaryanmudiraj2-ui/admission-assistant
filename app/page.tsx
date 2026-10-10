"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Menu,
  Search,
  Sparkles,
  BookOpen,
  Award,
  Layers,
  Building2,
  Check,
  GraduationCap,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import AdmissionChatWidget from "@/components/AdmissionChatWidget";

// --- Branding & UI Helpers ---

function CampusBadgeLogo() {
  return (
    <div className="flex items-center gap-3 cursor-pointer group">
      {/* Original Curved Geometric Star Emblem */}
      <svg
        className="w-6 h-6 text-white fill-current transition-transform duration-300 group-hover:scale-105"
        viewBox="0 0 24 24"
      >
        <path d="M12 2C12 7.52285 7.52285 12 2 12C7.52285 12 12 16.4771 12 22C12 16.4771 16.4771 12 22 12C16.4771 12 12 7.52285 12 2Z" />
      </svg>

      {/* Clean Brand Typography */}
      <div className="flex items-baseline gap-1.5">
        <span className="font-semibold text-base text-white tracking-tight">Campus</span>
        <span className="font-medium text-base text-cyan-400">AI</span>
      </div>
    </div>
  );
}

function PillButton({
  label = "Check Eligibility",
  full = false,
  icon: Icon = Sparkles,
  onClick,
}: {
  label?: string;
  full?: boolean;
  icon?: React.ElementType;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-white text-black font-semibold text-sm px-5 py-3 transition-all hover:bg-neutral-100 active:scale-[0.98] cursor-pointer shadow-lg ${
        full ? "w-full" : ""
      }`}
    >
      <Icon className="w-4 h-4 text-blue-600" />
      <span className="text-black font-bold">{label}</span>
      <ChevronRight className="w-4 h-4 text-black transition-transform group-hover:translate-x-[2px]" />
    </button>
  );
}

function SectionEyebrow({ label, tag }: { label: string; tag?: string }) {
  return (
    <div className="inline-flex items-center gap-2.5">
      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
      <span className="text-xs font-semibold tracking-wider text-white uppercase">{label}</span>
      {tag && (
        <span className="px-2 py-0.5 rounded-full border border-white/10 text-white/50 text-[11px] font-mono">
          {tag}
        </span>
      )}
    </div>
  );
}

const shinyGradientStyle: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, #091020 0%, #0B2551 12.5%, #A4F4FD 32.5%, #00d2ff 50%, #0B2551 67.5%, #091020 87.5%, #091020 100%)",
  backgroundSize: "200% auto",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  WebkitTextFillColor: "transparent",
  filter: "url(#c3-noise)",
};

const consoleSections = [
  {
    id: 1,
    title: "Cutoff Matrix 2026",
    tag: "CAP Round 1 & 2",
    badge: "B.Tech Admissions",
    badgeColor: "#00d2ff",
    summary:
      "CSE Round 1 closing threshold normalized at 96.4 percentile. AI-DS and IT branches projected between 92.5 - 94.0 percentile.",
    items: [
      { name: "Computer Science & Engineering", val: "96.4 %ile", note: "180 Seats · Intake High" },
      { name: "Artificial Intelligence & Data Science", val: "93.8 %ile", note: "120 Seats · Rapid Growth" },
      { name: "Electronics & Telecomm (VLSI)", val: "88.2 %ile", note: "120 Seats · Core Electronics" },
      { name: "Mechanical Engineering (Robotics)", val: "81.5 %ile", note: "60 Seats · Automation Lab" },
    ],
  },
  {
    id: 2,
    title: "Fee Structure & TFWS",
    tag: "Approved by State FRA",
    badge: "Tuition Exemption",
    badgeColor: "#10b981",
    summary:
      "General open tuition ₹1,65,000/yr. TFWS candidates get 100% tuition exemption (only ₹20,000 dev charges). OBC candidates pay 50% tuition.",
    items: [
      { name: "Open General Category", val: "₹1,65,000 / yr", note: "Tuition ₹1.45L + Dev ₹20K" },
      { name: "OBC / EBC Scheme", val: "₹92,500 / yr", note: "50% Tuition Fee Concession" },
      { name: "TFWS (Tuition Fee Waiver)", val: "₹20,000 / yr", note: "100% Tuition Waived (<8 LPA)" },
      { name: "SC / ST Category", val: "₹5,000 / yr", note: "100% Free Concession Scheme" },
    ],
  },
  {
    id: 3,
    title: "Merit Scholarships",
    tag: "Automated Evaluation",
    badge: "Direct Grants",
    badgeColor: "#A4F4FD",
    summary:
      "Merit-based scholarships evaluated seamlessly during document submission. Up to 75% tuition assistance awarded for top 98%ile scholars.",
    items: [
      { name: "Presidential Excellence", val: "75% Fee Waiver", note: "For entrance score >= 98 %ile" },
      { name: "Women in STEM Bursary", val: "₹40,000 / yr", note: "All eligible female tech students" },
      { name: "Sports & National Honors", val: "50% Fee Waiver", note: "State/National level medalists" },
      { name: "Innovation Incubation Grant", val: "Up to ₹1,00,000", note: "For patented hardware/software ideas" },
    ],
  },
  {
    id: 4,
    title: "Hostel & Campus Facilities",
    tag: "Twin Sharing AC",
    badge: "Residential Blocks",
    badgeColor: "#f59e0b",
    summary:
      "Separate boys and girls residential blocks with 24/7 power backup, high-speed campus Wi-Fi, modern gym, and hygienic multi-cuisine mess.",
    items: [
      { name: "Air-Conditioned 2-Seater", val: "₹95,000 / yr", note: "Attached washroom + Wi-Fi" },
      { name: "Standard 3-Seater Regular", val: "₹65,000 / yr", note: "Biometric security + Mess included" },
      { name: "Central Sports & Gym Complex", val: "Complimentary", note: "Badminton, gym, turf ground" },
      { name: "Medical & Ambulance Desk", val: "24/7 Available", note: "Resident doctor on campus" },
    ],
  },
];

export default function Home() {
  const [activeConsoleId, setActiveConsoleId] = useState(1);
  const [yearly, setYearly] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedBotQuery, setSelectedBotQuery] = useState("");

  const activeTab =
    consoleSections.find((c) => c.id === activeConsoleId) || consoleSections[0];

  const openBotWith = (query: string) => {
    setSelectedBotQuery(query);
    setChatOpen(true);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0c0c0c] text-white">
      {/* Root SVG Noise Filter for headline */}
      <svg className="fixed inset-0 pointer-events-none w-0 h-0" aria-hidden="true">
        <filter id="c3-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0" />
          <feComposite in2="SourceGraphic" operator="in" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
        </filter>
      </svg>

      {/* Global Background Video */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none opacity-80"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c]/40 via-transparent to-[#0c0c0c]" />
      </div>

      {/* 36rem Fixed Vertical Guide Lines */}
      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 -translate-x-[calc(50%+36rem)] w-px bg-white/10 z-[5]" />
      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 translate-x-[calc(-50%+36rem)] w-px bg-white/10 z-[5]" />

      {/* SECTION 1: Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-20 max-w-6xl mx-auto px-6 h-20 flex items-center justify-between border-b border-white/5"
      >
       <CampusBadgeLogo />

        <div className="hidden md:flex gap-8">
          {["Cutoffs", "Seat Matrix", "Fees & TFWS", "Hostels", "Scholarships"].map((link, i) => (
            <motion.a
              key={link}
              href="#console"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
              className="text-white/70 text-sm font-medium hover:text-white transition-colors"
            >
              {link}
            </motion.a>
          ))}
        </div>

        <div className="hidden md:block">
          <PillButton
            label="Chat with Admission AI"
            icon={MessageSquare}
            onClick={() => openBotWith("Admission 2026 Process & Eligibility")}
          />
        </div>

        <button
          onClick={() => openBotWith("Admission Inquiries 2026")}
          className="md:hidden w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center cursor-pointer"
        >
          <Menu className="w-4 h-4 text-white" />
        </button>
      </motion.nav>

      {/* SECTION 2: Hero */}
      <section className="relative z-10 pt-16 md:pt-28 pb-20 text-center flex flex-col items-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-semibold text-white/90 font-mono">
            CAP ROUND 1 & 2 COUNSELING LIVE
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-7xl font-semibold tracking-tight leading-[0.9]"
        >
          <span>Your Campus Journey.</span>
          <br />
          <span className="animate-shiny inline-block mt-2" style={shinyGradientStyle}>
            Reimagined with AI
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-8 text-white/60 max-w-md text-base leading-[1.5]"
        >
          Campus AI is the premier admission intelligence platform for the 2026 cohort. It leverages real-time models to organize cutoffs, evaluate TFWS waivers, and clarify your eligibility into total certainty.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <PillButton
            label="Explore 2026 Admissions"
            icon={Sparkles}
            onClick={() => openBotWith("Cutoff Matrix & Eligibility Criteria")}
          />
          <span className="text-xs text-white/40">Verified FRA Cutoffs · Real-Time Seat Matrix</span>
        </motion.div>
      </section>

      {/* SECTION 3: macOS menu bar strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="relative z-10 w-full h-10 bg-black/40 backdrop-blur-md border-t border-b border-white/10"
      >
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00d2ff]" />
              <span className="font-bold text-white tracking-wide">Campus AI</span>
            </div>
            {["Cutoffs", "Programs", "Seat Matrix", "Eligibility", "Scholarships", "Help"].map((item, idx) => (
              <span
                key={item}
                className={`text-white/80 cursor-pointer hover:text-white transition ${
                  idx > 3 ? "hidden md:inline" : idx > 2 ? "hidden sm:inline" : "inline"
                }`}
                onClick={() => openBotWith(`${item} information`)}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3 text-white/70">
            <Search className="w-3.5 h-3.5" />
            <span>Admissions Portal · Session 2026</span>
          </div>
        </div>
      </motion.div>

      {/* SECTION 4: Realistic Admission Console */}
      <section id="console" className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0e1014]/90 backdrop-blur-2xl shadow-2xl"
        >
          {/* Console Header */}
          <div className="h-10 bg-black/50 border-b border-white/10 px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="text-xs text-white/50 font-medium font-mono">
              admission-console.internal · Live Allotment Desk
            </span>
            <div className="text-xs text-cyan-400 flex items-center gap-1.5 font-mono">
              <ShieldCheck size={14} /> AI Engine Active
            </div>
          </div>

          {/* Console Body */}
          <div className="grid grid-cols-12 min-h-[520px]">
            <div className="col-span-12 md:col-span-3 border-r border-white/10 bg-black/30 p-4 flex flex-col justify-between">
              <div className="space-y-4">
                <button
                  onClick={() => openBotWith("Help me choose branch according to my score")}
                  className="w-full rounded-lg bg-white text-black text-xs font-semibold px-3 py-2 flex items-center justify-center gap-2 hover:bg-white/90 transition cursor-pointer shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  Ask Admission AI Desk
                </button>

                <nav className="space-y-1">
                  {[
                    { id: 1, icon: Layers, label: "Cutoff Matrix", count: "2026" },
                    { id: 2, icon: BookOpen, label: "Fee Slabs & TFWS", count: "FRA" },
                    { id: 3, icon: Award, label: "Merit Scholarships", count: "Grants" },
                    { id: 4, icon: Building2, label: "Hostel Facilities", count: "Rooms" },
                  ].map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setActiveConsoleId(item.id)}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs cursor-pointer transition ${
                        activeConsoleId === item.id
                          ? "bg-white/10 text-white font-semibold border border-white/10"
                          : "text-white/60 hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <item.icon className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{item.label}</span>
                      </div>
                      <span className="text-[10px] text-white/40 font-mono">{item.count}</span>
                    </div>
                  ))}
                </nav>

                <div className="pt-2 border-t border-white/5">
                  <span className="text-[10px] uppercase tracking-wider text-white/40 font-semibold px-2 block mb-2 font-mono">
                    Top B.Tech Specializations
                  </span>
                  <div className="space-y-1 text-xs text-white/70">
                    <div className="flex items-center gap-2 px-2 py-1">
                      <span className="w-2 h-2 rounded-full bg-[#00d2ff]" /> Computer Science (CSE)
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1">
                      <span className="w-2 h-2 rounded-full bg-[#A4F4FD]" /> AI & Data Science
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1">
                      <span className="w-2 h-2 rounded-full bg-[#f59e0b]" /> VLSI & Systems Design
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1">
                      <span className="w-2 h-2 rounded-full bg-[#10b981]" /> TFWS Seat Scheme
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 md:col-span-4 border-r border-white/10 bg-black/20 flex flex-col">
              <div className="p-3 border-b border-white/10">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs text-white/50">
                  <Search className="w-3.5 h-3.5" />
                  <span>Filter by branch or category...</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-white/5">
                {consoleSections.map((sec) => (
                  <div
                    key={sec.id}
                    onClick={() => setActiveConsoleId(sec.id)}
                    className={`p-3.5 cursor-pointer transition text-xs ${
                      activeConsoleId === sec.id ? "bg-white/10" : "hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-white/90">{sec.title}</span>
                      <span className="text-[10px] text-cyan-400 font-mono">{sec.tag}</span>
                    </div>
                    <p className="text-white/40 text-[11px] truncate mt-0.5">{sec.summary}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-12 md:col-span-5 p-5 flex flex-col justify-between bg-black/10">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-white/60">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-semibold text-white">Central Admission Matrix</span>
                  </div>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                    style={{
                      backgroundColor: `${activeTab.badgeColor}22`,
                      color: activeTab.badgeColor,
                      border: `1px solid ${activeTab.badgeColor}44`,
                    }}
                  >
                    {activeTab.badge}
                  </span>
                </div>

                <div className="pt-4">
                  <h3 className="text-base font-semibold text-white">{activeTab.title}</h3>
                  <p className="text-xs text-white/50 mt-1">{activeTab.summary}</p>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#A4F4FD]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Summary by Campus AI</span>
                  </div>
                  <p className="text-[11px] text-white/70 leading-relaxed">
                    Verified through State Fee Regulating Authority (FRA) guidelines. Cutoffs correspond to CAP Round 1 normalizing benchmarks.
                  </p>
                </div>

                <div className="mt-4 space-y-2">
                  {activeTab.items.map((row, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-medium text-white/90">{row.name}</p>
                        <p className="text-[10px] text-white/40">{row.note}</p>
                      </div>
                      <span className="font-mono font-bold text-cyan-400">{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-white/10 mt-4">
                <button
                  onClick={() => openBotWith(`Detailed inquiry about ${activeTab.title}`)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs text-white/80 hover:bg-white/10 transition cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Ask questions on {activeTab.title}</span>
                </button>
                <span className="text-[10px] text-white/40 font-mono">ID: 2026-CAP-OK</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 5: Feature Triage */}
      <section id="triage" className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionEyebrow label="Triage" tag="AI-native" />
            <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.02]">
              Clear your inquiries <br />
              in a single pass.
            </h2>
            <p className="mt-6 text-white/60 text-base leading-[1.6] max-w-md">
              Campus AI evaluates your entrance exam marks, understands eligibility criteria, and routes queries directly into confirmed action items. Focus on your career trajectory — the platform handles the complexity.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Cutoff Probability", "TFWS Matcher", "Hostel Bed Status", "Fee Installments"].map((chip) => (
                <button
                  key={chip}
                  onClick={() => openBotWith(`Inquire about ${chip}`)}
                  className="text-xs text-white/70 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] hover:border-cyan-400/40 hover:text-white transition cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="liquid-glass rounded-2xl p-5 space-y-3">
            <span className="text-xs text-white/40 block mb-2 font-mono">Today · 42 admission inquiries triaged</span>
            {[
              { title: "Priority", count: 4, color: "#ffffff", items: "CSE Round 1 Eligibility · Documents Verified" },
              { title: "Follow-up", count: 7, color: "#e5e5e5", items: "TFWS Income Certificate · Domicile Attestation" },
              { title: "Updates", count: 18, color: "#a3a3a3", items: "CAP Round 2 Seat Matrix · Hostel Vacancies" },
              { title: "Archived", count: 13, color: "#525252", items: "Fee Receipts · Sports Quota Approvals" },
            ].map((card) => (
              <div
                key={card.title}
                onClick={() => openBotWith(`Status of ${card.title} queries`)}
                className="liquid-glass rounded-lg p-3 cursor-pointer hover:border-cyan-400/30 transition"
              >
                <div className="flex items-center justify-between text-xs font-semibold mb-1" style={{ color: card.color }}>
                  <span>{card.title}</span>
                  <span>({card.count})</span>
                </div>
                <p className="text-[11px] text-white/50">{card.items}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Recruiters Cloud */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-20 text-center">
        <p className="text-xs uppercase tracking-widest text-white/40 font-mono">
          Trusted by Premier Institutes & Industry Recruiters
        </p>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 items-center">
          {["TCS", "Infosys", "Amazon", "Microsoft", "Cognizant", "Wipro", "Accenture", "NVIDIA"].map(
            (brand, i) => (
              <motion.span
                key={brand}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="text-sm font-semibold tracking-tight text-white/50 hover:text-white transition-colors cursor-default"
              >
                {brand}
              </motion.span>
            )
          )}
        </div>
      </section>

      {/* SECTION 7: Testimonials */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28 border-t border-white/10">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              quote: "Campus AI saved us endless visits to the administrative office. Cutoffs and fee allocations were clarified in seconds.",
              name: "Tanmay Deshmukh",
              role: "B.Tech Computer Science '26",
              company: "ADMISSION COHORT",
            },
            {
              quote: "The interactive seat matrix and TFWS probability calculator helped me secure a 100% tuition waiver.",
              name: "Pooja Sharma",
              role: "AI & Data Science Scholar",
              company: "CAMPUS FELLOW",
            },
            {
              quote: "Triage that actually understands cutoff normalizations. Our counselors resolved over 5,000 inquiries without confusion.",
              name: "Dr. K. Raghavan",
              role: "Head of Admissions",
              company: "DIRECTORATE",
            },
          ].map((t, idx) => (
            <figure key={idx} className="liquid-glass rounded-2xl p-6 flex flex-col justify-between">
              <blockquote className="text-sm text-white/80 leading-[1.6]">"{t.quote}"</blockquote>
              <figcaption className="mt-6 pt-5 border-t border-white/10">
                <div className="text-sm font-semibold text-white">{t.name}</div>
                <div className="text-xs text-white/50">{t.role}</div>
                <div className="text-xs text-white font-semibold tracking-wide mt-1 uppercase">{t.company}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* SECTION 8: Pricing / Fee Structure Cards */}
      <section id="pricing" className="c3-pricing-section">
        <svg className="fixed inset-0 pointer-events-none w-0 h-0" aria-hidden="true">
          <filter id="c3-noise-pricing">
            <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves={2} stitchTiles="stitch" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.075" />
            </feComponentTransfer>
            <feComposite in2="SourceGraphic" operator="in" result="noise" />
            <feBlend in="SourceGraphic" in2="noise" mode="overlay" />
          </filter>
        </svg>

        <div className="c3-watermark-container">
          <div className="c3-watermark-main">
            <span className="c3-watermark-line-1">Your Campus.</span>
            <span className="c3-watermark-line-2">Reimagined</span>
          </div>
        </div>

        <div className="c3-grid">
          <div className="c3-card">
            <span className="c3-tier-small">TFWS / Merit Waiver</span>
            <span className="c3-tier-large">₹0 Tuition</span>
            <p className="c3-desc">For high-merit applicants with family income under 8 LPA.</p>
            <ul className="c3-list">
              {[
                "100% Tuition Fee Exemption",
                "Full digital library & lab access",
                "Central scholarship matriculation",
                "Dedicated mentor allocation",
                "Hostel priority allotment",
              ].map((feat, i) => (
                <li key={i}>
                  <span className="c3-check">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => openBotWith("Tell me complete eligibility & income criteria for TFWS 100% tuition waiver")}
              className="c3-btn"
            >
              Check TFWS Eligibility
            </button>
          </div>

          <div className="c3-card">
            <span className="c3-tier-small">OBC / EBC Scheme</span>
            <span className="c3-tier-large">{yearly ? "₹92,500/yr" : "₹46,250/sem"}</span>
            <p className="c3-desc">State regulatory subsidized tuition for reserved category candidates.</p>
            <ul className="c3-list">
              {[
                "50% Tuition Fee Concession",
                "Standard development fee waiver",
                "Government DBT scholarship auto-fill",
                "Hostel and mess subsidization",
                "Placement cell priority onboarding",
              ].map((feat, i) => (
                <li key={i}>
                  <span className="c3-check">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => openBotWith("How can I apply for OBC / EBC 50% tuition concession?")}
              className="c3-btn"
            >
              Apply Concession
            </button>
          </div>

          <div className="c3-card c3-card-pro">
            <span className="c3-tier-small">General Merit</span>
            <span className="c3-tier-large">{yearly ? "₹1,65,000/yr" : "₹82,500/sem"}</span>
            <p className="c3-desc">Standard all-inclusive academic fee approved by State Fee Regulatory Authority.</p>
            <ul className="c3-list">
              {[
                "Unlimited academic credits",
                "AI innovation lab & cloud credits",
                "Zero-interest installment plans",
                "Full sports complex & gym access",
                "International hackathon sponsorships",
              ].map((feat, i) => (
                <li key={i}>
                  <span className="c3-check">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => openBotWith("Calculate my net fees breakdown including installment choices")}
              className="c3-btn"
            >
              Calculate Net Fees
            </button>
          </div>
        </div>

        <div className="c3-toggle-wrap">
          <span className="text-xs text-white/60">Annual Payment Mode</span>
          <button
            onClick={() => setYearly(!yearly)}
            className={`c3-toggle ${yearly ? "active" : ""}`}
            aria-label="Toggle annual billing mode"
          >
            <span className="c3-toggle-knob" />
          </button>
        </div>
      </section>

      {/* SECTION 9: Final CTA */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="liquid-glass relative overflow-hidden rounded-3xl px-8 py-16 md:py-24 text-center border border-white/10"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background: "radial-gradient(600px circle at 50% 0%, rgba(255,255,255,0.15), transparent 70%)",
            }}
          />
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.02]">
            Close the tabs. <br />
            Secure your admission.
          </h2>
          <p className="mt-6 text-white/60 max-w-md mx-auto text-sm leading-[1.6]">
            Join thousands of applicants, parents, and scholars who process their 2026 admissions with precision and zero friction.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <PillButton
              label="Chat with Admission AI"
              icon={MessageSquare}
              onClick={() => openBotWith("Help me secure my admission for 2026")}
            />
            <button
              onClick={() => openBotWith("Download Cutoff Matrix 2026")}
              className="rounded-full border border-white/15 text-white text-sm font-medium px-5 py-3 hover:bg-white/5 transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>Download Cutoff Matrix</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Floating Animated Admission Chat Assistant */}
      <AdmissionChatWidget
        externalOpen={chatOpen}
        initialQuery={selectedBotQuery}
        onClose={() => setChatOpen(false)}
      />
    </div>
  );
}