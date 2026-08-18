import { site } from "@/lib/site";

export interface LeadPayload {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
  /** Honeypot — must stay empty. Bots that fill it are silently dropped. */
  botField?: string;
  /** Where on the site the lead came from (e.g. "home-cta", "contact-page"). */
  source: string;
}

/**
 * Form backend: Formspree (https://formspree.io), form ID "maewllyl".
 * Submissions are delivered to the inbox configured in the Formspree
 * dashboard. Override per environment with VITE_FORMSPREE_ID, or point
 * VITE_CONTACT_ENDPOINT at any custom JSON POST endpoint instead.
 */
const FORMSPREE_ID = (import.meta.env.VITE_FORMSPREE_ID as string | undefined) ?? "maewllyl";
const CUSTOM_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

export async function submitLead(payload: LeadPayload): Promise<void> {
  // Honeypot triggered → pretend success, never send.
  if (payload.botField) return;

  const url = CUSTOM_ENDPOINT ?? `https://formspree.io/f/${FORMSPREE_ID}`;

  const body = {
    name: payload.name,
    email: payload.email, // Formspree uses this as the reply-to address
    company: payload.company || "—",
    phone: payload.phone || "—",
    service: payload.service || "Not specified",
    budget: payload.budget || "Not specified",
    message: payload.message,
    source: payload.source,
    page: typeof window !== "undefined" ? window.location.href : "",
    _subject: `New lead from ${payload.name} — ${site.name}`,
  };

  // Form-encoded — verified working with Formspree (raw JSON posts are rejected).
  const res = await fetch(url, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: new URLSearchParams(body),
  });

  if (!res.ok) {
    throw new Error(`Form submission failed with status ${res.status}`);
  }
}
