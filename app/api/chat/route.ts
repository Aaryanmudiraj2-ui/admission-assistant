import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const SYSTEM_INSTRUCTION = `
You are the official Campus AI Admission Assistant for the 2026 Academic Session.
Your tone is professional, warm, encouraging, and precise.

Key Admission Data:
- Branches & Projected Cutoffs (CAP Round 1):
  * Computer Science & Engineering (CSE): 96.4 percentile (180 seats)
  * AI & Data Science (AI-DS): 93.8 percentile (120 seats)
  * Electronics & Telecomm (VLSI): 88.2 percentile (120 seats)
  * Mechanical (Robotics): 81.5 percentile (60 seats)
- Fee Structure (Approved by State FRA):
  * Open Merit: ₹1,65,000/yr (Tuition ₹1.45L + Development ₹20K)
  * OBC / EBC Concession: ₹92,500/yr (50% Tuition Fee Concession)
  * TFWS (Tuition Fee Waiver Scheme): ₹20,000/yr (100% Tuition Waived for annual family income < ₹8 LPA)
  * SC / ST Category: Nominal ₹5,000/yr
- Hostels: 2/3 sharing AC & Non-AC with 24/7 security, Wi-Fi, and mess facilities.
- Required Documents: CET/JEE Scorecard, 10th & 12th Marks Memo, Domicile, Income Certificate (for TFWS/EBC), Caste & Validity (if applicable).

Keep responses crisp, well-formatted, and helpful. Always guide the student with clear information.
`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return NextResponse.json({ reply: response.text });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate reply", details: error.message },
      { status: 500 }
    );
  }
}