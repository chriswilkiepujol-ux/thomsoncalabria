"use server";

import { createPublicClient } from "@/lib/supabase/public";

export type EnquiryState = { ok: boolean; error?: string } | null;

export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  // Honeypot
  if (formData.get("company_website")) return { ok: true };

  const get = (k: string) => (formData.get(k)?.toString() ?? "").trim();
  const name = get("name");
  const email = get("email");
  if (!name || !email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return {
      ok: false,
      error:
        formData.get("lang") === "es"
          ? "Indíquenos su nombre y un email válido."
          : "Please give us your name and a valid email address.",
    };
  }

  const locations = formData.getAll("locations").map(String).join(", ");

  const row = {
    name,
    email,
    phone: get("phone") || null,
    buyer_type: get("buyer_type") || null,
    interest: get("interest") || null,
    location: locations || null,
    budget: get("budget") || null,
    timeframe: get("timeframe") || null,
    property_ref: get("property_ref") || null,
    message: get("message") || null,
    source_page: get("source_page") || null,
  };

  const supabase = createPublicClient();
  const { error } = await supabase.from("enquiries").insert(row);
  if (error) {
    console.error("enquiry insert failed", error);
    return {
      ok: false,
      error: formData.get("lang") === "es" ? "Algo ha fallado. Escríbanos directamente por email." : "Something went wrong. Please email us directly.",
    };
  }

  // Optional email notification via Resend (set RESEND_API_KEY + ENQUIRY_TO in Vercel).
  if (process.env.RESEND_API_KEY) {
    try {
      const to = process.env.ENQUIRY_TO ?? "info@thomsoncalabria.com";
      const lines = Object.entries(row)
        .filter(([, v]) => v)
        .map(([k, v]) => `${k.replace("_", " ")}: ${v}`)
        .join("\n");
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.ENQUIRY_FROM ?? "Thomson Calabria <enquiries@thomsoncalabria.com>",
          to: [to],
          reply_to: email,
          subject: `New private enquiry — ${name}${row.interest ? ` (${row.interest})` : ""}`,
          text: lines,
        }),
      });
    } catch (e) {
      console.error("resend failed", e);
    }
  }

  return { ok: true };
}
