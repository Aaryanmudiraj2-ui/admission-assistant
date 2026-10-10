"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  GraduationCap,
  Sparkles,
  IndianRupee,
  BadgePercent,
  Building2,
  CalendarDays,
  BookOpen,
  ShieldCheck,
} from "lucide-react";

interface ChatWidgetProps {
  externalOpen?: boolean;
  initialQuery?: string;
  onClose?: () => void;
}

type ReplyCard = {
  label: string;
  value: string;
  hint?: string;
  query?: string;
};

type ReplyAction = {
  label: string;
  query: string;
};

type UserMessage = {
  id: string;
  role: "user";
  text: string;
};

type AssistantMessage = {
  id: string;
  role: "assistant";
  intro: string;
  tags?: string[];
  cards?: ReplyCard[];
  actions?: ReplyAction[];
  plainText?: string;
};

type ChatMessage = UserMessage | AssistantMessage;

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const WELCOME: AssistantMessage = {
  id: "welcome",
  role: "assistant",
  intro: "Namaste — Campus Admission Desk for 2026. Pick a topic and I’ll lay out the facts as cards.",
  tags: ["B.Tech 2026", "Live counseling", "Dark desk"],
  actions: [
    { label: "Cutoffs", query: "Cutoffs 2026" },
    { label: "TFWS waiver", query: "TFWS Waiver" },
    { label: "Fee structure", query: "Fee Structure" },
    { label: "Eligibility", query: "Eligibility" },
  ],
};

function buildStaticCardReply(queryText: string): AssistantMessage | null {
  const lower = queryText.toLowerCase();

  if (lower.includes("tfws") || lower.includes("waiver")) {
    return {
      id: uid(),
      role: "assistant",
      intro: "TFWS waives 100% tuition when family income is under ₹8 Lakh.",
      tags: ["TFWS", "Income < ₹8L", "Domicile"],
      cards: [
        {
          label: "Tuition",
          value: "₹0",
          hint: "100% exemption",
          query: "Explain 100% tuition fee waiver rules and scheme under TFWS.",
        },
        {
          label: "You still pay",
          value: "₹20,000",
          hint: "Development fee only",
          query: "Breakdown of ₹20,000 development fee paid by TFWS candidates.",
        },
        {
          label: "Proof",
          value: "Income + domicile",
          hint: "State certificates",
          query: "What exact Income and Domicile certificates are required for TFWS verification?",
        },
      ],
      actions: [
        { label: "Net fees", query: "Fee Structure" },
        { label: "OBC / EBC", query: "OBC concession" },
        { label: "Deadlines", query: "Deadlines" },
      ],
    };
  }

  if (lower.includes("concession") || lower.includes("obc") || lower.includes("ebc")) {
    return {
      id: uid(),
      role: "assistant",
      intro: "OBC / EBC follows state FRA: half tuition, with caste + NCL papers.",
      tags: ["OBC", "EBC", "50% concession"],
      cards: [
        {
          label: "Net tuition",
          value: "₹72,500",
          hint: "50% of ₹1,45,000",
          query: "How is the 50% OBC tuition fee calculated?",
        },
        {
          label: "Annual total",
          value: "₹92,500",
          hint: "Incl. development",
          query: "What is the complete ₹92,500 annual fee schedule for OBC/EBC students?",
        },
        {
          label: "Documents",
          value: "Caste · Validity · NCL",
          hint: "All three required",
          query: "List of valid documents required for OBC/EBC fee concession during CAP.",
        },
      ],
      actions: [
        { label: "TFWS instead?", query: "TFWS Waiver" },
        { label: "Fee grid", query: "Fee Structure" },
      ],
    };
  }

  if (
    lower.includes("net fees") ||
    lower.includes("calculate") ||
    lower.includes("fee") ||
    lower.includes("pricing")
  ) {
    return {
      id: uid(),
      role: "assistant",
      intro: "FRA-approved 2026 open-merit stack. Installments live on student ERP.",
      tags: ["FRA", "Installments", "2026"],
      cards: [
        {
          label: "Open merit",
          value: "₹1,65,000",
          hint: "Tuition 1.45L + Dev 20k",
          query: "Detailed breakdown of Open Merit ₹1,65,000 fee and ERP installment payment schedule.",
        },
        {
          label: "TFWS net",
          value: "₹20,000",
          hint: "Dev fee only",
          query: "How does TFWS reduce fee to ₹20,000 and who qualifies?",
        },
        {
          label: "SC / ST",
          value: "₹5,000",
          hint: "Nominal",
          query: "What concessions and scholarships apply to SC/ST students?",
        },
        {
          label: "OBC / EBC",
          value: "₹92,500",
          hint: "50% tuition",
          query: "How to claim the OBC/EBC 50% tuition fee reduction?",
        },
      ],
      actions: [
        { label: "Check TFWS", query: "TFWS Waiver" },
        { label: "Hostels", query: "Hostels" },
      ],
    };
  }

  if (lower.includes("cutoff") || lower.includes("cut-off") || lower.includes("cutoffs")) {
    return {
      id: uid(),
      role: "assistant",
      intro: "Projected Round-1 closing percentiles (3-year CAP trend, 2026).",
      tags: ["CAP 2026", "Round 1", "Projected"],
      cards: [
        {
          label: "CSE",
          value: "96.4 %ile",
          hint: "180 seats",
          query: "Computer Science & Engineering 96.4 percentile cutoff details, seats, and intake matrix.",
        },
        {
          label: "AI & DS",
          value: "93.8 %ile",
          hint: "High demand",
          query: "Artificial Intelligence & Data Science 93.8 percentile cutoff trends and career opportunities.",
        },
        {
          label: "ENTC",
          value: "88.2 %ile",
          hint: "Electronics",
          query: "Electronics & Telecomm (VLSI) 88.2 percentile cutoffs and syllabus focus.",
        },
      ],
      actions: [
        { label: "Eligibility", query: "Eligibility" },
        { label: "Programs", query: "Programs" },
      ],
    };
  }

  if (lower.includes("hostel")) {
    return {
      id: uid(),
      role: "assistant",
      intro: "Campus hostels open after seat confirmation. Mess is bundled.",
      tags: ["AC / Non-AC", "2–3 sharing", "Biometric"],
      cards: [
        {
          label: "Stay",
          value: "2 / 3 sharing",
          hint: "Boys & girls blocks",
          query: "What are the hostel room sharing options and fee packages?",
        },
        {
          label: "Power",
          value: "24×7 backup",
          hint: "Campus grid",
          query: "Hostel amenities, electricity backup, and security guidelines.",
        },
        {
          label: "Campus net",
          value: "Wi-Fi + mess",
          hint: "Hygiene kitchen",
          query: "Hostel mess menu quality, hygiene standards, and meal schedule.",
        },
      ],
      actions: [
        { label: "Fee stack", query: "Fee Structure" },
        { label: "Deadlines", query: "Deadlines" },
      ],
    };
  }

  return null;
}

function AssistantBubble({
  message,
  onAction,
}: {
  message: AssistantMessage;
  onAction: (q: string) => void;
}) {
  return (
    <div className="max-w-[92%] space-y-2">
      <div className="px-3.5 py-2.5 rounded-2xl rounded-bl-none bg-white/10 border border-white/10 text-white/90 leading-relaxed whitespace-pre-line">
        {message.intro}
      </div>

      {message.tags && message.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {message.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-[10px] text-cyan-200"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Clickable Bento Cards */}
      {message.cards && message.cards.length > 0 && (
        <div className="grid grid-cols-2 gap-1.5">
          {message.cards.map((card) => {
            const clickTarget = card.query || card.label;
            return (
              <motion.button
                key={card.label}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onAction(clickTarget)}
                className="liquid-glass rounded-xl p-2.5 col-span-1 last:odd:col-span-2 text-left border border-white/10 hover:border-cyan-400/60 bg-white/[0.04] hover:bg-white/[0.08] transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-wide text-white/45 group-hover:text-cyan-300">
                    {card.label}
                  </p>
                  <span className="text-[10px] text-white/20 group-hover:text-cyan-400 font-mono transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </div>
                <p className="text-sm font-semibold text-white mt-0.5">{card.value}</p>
                {card.hint && (
                  <p className="text-[10px] text-white/50 mt-0.5 group-hover:text-white/70">
                    {card.hint}
                  </p>
                )}
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Action Chips */}
      {message.actions && message.actions.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {message.actions.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => onAction(action.query)}
              className="px-2.5 py-1 rounded-full bg-white text-black text-[11px] font-medium hover:bg-cyan-300 hover:text-black active:scale-[0.98] transition cursor-pointer"
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdmissionChatWidget({
  externalOpen,
  initialQuery,
  onClose,
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const lastAutoQuery = useRef<string | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (externalOpen) setIsOpen(true);
  }, [externalOpen]);

  useEffect(() => {
    if (!initialQuery?.trim()) return;
    if (lastAutoQuery.current === initialQuery) return;
    lastAutoQuery.current = initialQuery;
    setIsOpen(true);
    triggerQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const triggerQuery = async (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { id: uid(), role: "user", text: trimmed }]);
    setIsTyping(true);

    const presetCards = buildStaticCardReply(trimmed);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();
      const aiReply = data.reply || "Details fetch karne mein dikkat aayi hai.";

      if (presetCards) {
        setMessages((prev) => [
          ...prev,
          {
            ...presetCards,
            intro: `${presetCards.intro}\n\n${aiReply}`,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: "assistant",
            intro: aiReply,
            tags: ["Campus AI", "Admissions 2026"],
          },
        ]);
      }
    } catch {
      if (presetCards) {
        setMessages((prev) => [...prev, presetCards]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: "assistant",
            intro: "Server se connect nahi ho paya. Kripya check karein local dev server chalu hai ya nahi.",
          },
        ]);
      }
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const q = input;
    setInput("");
    triggerQuery(q);
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-[min(calc(100vw-2rem),410px)] h-[min(72vh,560px)] rounded-3xl bg-[#101218] border border-white/15 shadow-2xl flex flex-col overflow-hidden text-white mb-4 backdrop-blur-2xl"
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-tight">Admission AI Desk</h3>
                  <p className="text-[11px] text-white/50 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    Live Counseling · Admissions 2026
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            <div className="px-3.5 py-2 flex gap-1.5 overflow-x-auto border-b border-white/5 text-[11px] text-white/70 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {[
                { label: "Cutoffs 2026", icon: Sparkles },
                { label: "TFWS Waiver", icon: BadgePercent },
                { label: "Fee Structure", icon: IndianRupee },
                { label: "Hostels", icon: Building2 },
                { label: "Eligibility", icon: ShieldCheck },
                { label: "Programs", icon: BookOpen },
                { label: "Deadlines", icon: CalendarDays },
              ].map((tag) => (
                <button
                  key={tag.label}
                  type="button"
                  onClick={() => triggerQuery(tag.label)}
                  className="whitespace-nowrap inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition cursor-pointer"
                >
                  <tag.icon size={11} />
                  {tag.label}
                </button>
              ))}
            </div>

            <div ref={scrollerRef} className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "user" ? (
                    <div className="max-w-[82%] px-3.5 py-2.5 rounded-2xl rounded-br-none leading-relaxed bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md">
                      {m.text}
                    </div>
                  ) : (
                    <AssistantBubble message={m} onAction={triggerQuery} />
                  )}
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="px-3 py-2 rounded-2xl bg-white/10 border border-white/10 text-white/50 text-[11px] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span>Campus AI thinking…</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 border-t border-white/10 bg-black/40">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask cutoff, fees, TFWS, dates…"
                  className="bg-transparent text-xs text-white placeholder-white/40 focus:outline-none flex-1 px-1"
                />
                <button
                  type="submit"
                  className="w-7 h-7 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center hover:opacity-90 transition shadow cursor-pointer"
                >
                  <Send size={12} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 via-cyan-500 to-teal-400 shadow-[0_0_25px_rgba(6,182,212,0.4)] flex items-center justify-center text-white border border-white/20 transition cursor-pointer"
      >
        {isOpen ? <X size={22} /> : <MessageSquare size={22} />}
      </motion.button>
    </div>
  );
}