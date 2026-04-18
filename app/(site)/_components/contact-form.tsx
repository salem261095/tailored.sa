"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const serviceOptions = [
  "استراتيجية العلامة",
  "صناعة المحتوى",
  "استراتيجية التسويق",
  "تطوير الويب",
] as const;

const ATTRIBUTION_STORAGE_KEY = "tailored.leadAttribution";

type ContactFormProps = {
  rows?: number;
  submitLabel: string;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

type LeadAttribution = {
  channel: string;
  landingPagePath: string;
  landingPageUrl: string;
  referrer: string;
  utmCampaign: string;
  utmMedium: string;
  utmSource: string;
};

type ContactPayload = {
  company: string;
  email: string;
  formPage: string;
  landingPage: string;
  landingPageUrl: string;
  message: string;
  name: string;
  referrer: string;
  service: string;
  source: string;
  subject: string;
  utmCampaign: string;
  utmMedium: string;
  utmSource: string;
  whatsapp: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function ContactForm({ rows = 6, submitLabel }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const pathname = usePathname();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const existing = readStoredAttribution();

    if (existing) {
      return;
    }

    const currentUrl = new URL(window.location.href);
    const attribution: LeadAttribution = {
      landingPagePath: buildPagePath(pathname, currentUrl.search.slice(1)),
      landingPageUrl: currentUrl.toString(),
      referrer: document.referrer,
      utmSource: currentUrl.searchParams.get("utm_source") ?? "",
      utmMedium: currentUrl.searchParams.get("utm_medium") ?? "",
      utmCampaign: currentUrl.searchParams.get("utm_campaign") ?? "",
      channel: inferChannel(document.referrer, {
        utmSource: currentUrl.searchParams.get("utm_source") ?? "",
        utmMedium: currentUrl.searchParams.get("utm_medium") ?? "",
      }),
    };

    try {
      window.sessionStorage.setItem(
        ATTRIBUTION_STORAGE_KEY,
        JSON.stringify(attribution),
      );
    } catch {
      // Ignore storage failures and continue with runtime values.
    }
  }, [pathname]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const attribution = getLeadAttribution(pathname);

    const payload: ContactPayload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      whatsapp: String(formData.get("whatsapp") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
      subject: String(formData.get("subject") ?? "").trim(),
      service: String(formData.get("service") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      formPage: getCurrentPagePath(pathname),
      landingPage: attribution.landingPagePath,
      landingPageUrl: attribution.landingPageUrl,
      referrer: attribution.referrer,
      source: attribution.channel,
      utmSource: attribution.utmSource,
      utmMedium: attribution.utmMedium,
      utmCampaign: attribution.utmCampaign,
    };

    setSubmitState("submitting");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!response.ok) {
        setSubmitState("error");
        setSubmitMessage(
          result?.message ?? "تعذّر إرسال الرسالة حاليًا. حاول مرة أخرى.",
        );
        return;
      }

      trackLeadSubmission(payload);
      formRef.current?.reset();
      setSubmitState("success");
      setSubmitMessage("تم إرسال رسالتك بنجاح.");
    } catch {
      setSubmitState("error");
      setSubmitMessage("حدث خطأ غير متوقع أثناء الإرسال. حاول مرة أخرى.");
    }
  }

  return (
    <form
      ref={formRef}
      className="grid gap-8 md:gap-10"
      onSubmit={handleSubmit}
    >
      <FormField name="name" label="الاسم" required />

      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        <FormField
          name="email"
          type="email"
          label="البريد الإلكتروني"
          required
        />
        <FormField
          name="whatsapp"
          type="tel"
          label="رقم الواتساب"
          required
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        <FormField name="company" label="اسم الشركة" />
        <FormField name="subject" label="الموضوع" required />
      </div>

      <fieldset className="grid gap-4">
        <legend className="text-sm font-semibold text-muted">الخدمة المطلوبة</legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {serviceOptions.map((option) => (
            <label key={option} className="cursor-pointer">
              <input
                type="radio"
                name="service"
                value={option}
                className="peer sr-only"
              />
              <span className="ui-radius-button inline-flex items-center justify-center border border-black/8 bg-white px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-foreground/20 hover:bg-black/[0.03] peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-white">
                {option}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="grid gap-3">
        <span className="text-sm font-semibold text-muted">
          الرسالة <RequiredMark />
        </span>
        <textarea
          name="message"
          rows={rows}
          required
          className="w-full border-0 border-b border-black/20 bg-transparent px-0 pb-5 pt-2 text-base text-foreground outline-none transition focus:border-foreground"
        />
      </label>

      <div className="flex flex-col items-start gap-4">
        <button
          type="submit"
          disabled={submitState === "submitting"}
          className="ui-radius-button inline-flex w-auto self-start items-center justify-center bg-foreground px-6 py-4 text-base font-semibold text-white transition hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitState === "submitting" ? "جارٍ الإرسال..." : submitLabel}
        </button>

        <p
          aria-live="polite"
          className={`text-sm font-medium ${
            submitState === "error"
              ? "text-accent"
              : submitState === "success"
                ? "text-foreground"
                : "text-transparent"
          }`}
        >
          {submitMessage || "."}
        </p>
      </div>
    </form>
  );
}

type FormFieldProps = {
  label: string;
  name: string;
  required?: boolean;
  type?: "email" | "tel" | "text";
};

function FormField({
  label,
  name,
  required = false,
  type = "text",
}: FormFieldProps) {
  return (
    <label className="grid gap-3">
      <span className="text-sm font-semibold text-muted">
        {label}
        {required ? (
          <>
            {" "}
            <RequiredMark />
          </>
        ) : null}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full border-0 border-b border-black/20 bg-transparent px-0 pb-5 pt-2 text-base text-foreground outline-none transition focus:border-foreground"
      />
    </label>
  );
}

function RequiredMark() {
  return <span className="text-accent">*</span>;
}

function buildPagePath(pathname: string, search: string) {
  return search ? `${pathname}?${search}` : pathname;
}

function getCurrentPagePath(pathname: string) {
  if (typeof window === "undefined") {
    return pathname;
  }

  return buildPagePath(pathname, window.location.search.slice(1));
}

function getLeadAttribution(pathname: string): LeadAttribution {
  if (typeof window === "undefined") {
    return {
      landingPagePath: pathname,
      landingPageUrl: pathname,
      referrer: "",
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
      channel: "direct",
    };
  }

  const stored = readStoredAttribution();

  if (stored) {
    return stored;
  }

  const currentUrl = new URL(window.location.href);
  return {
    landingPagePath: buildPagePath(pathname, currentUrl.search.slice(1)),
    landingPageUrl: currentUrl.toString(),
    referrer: document.referrer,
    utmSource: currentUrl.searchParams.get("utm_source") ?? "",
    utmMedium: currentUrl.searchParams.get("utm_medium") ?? "",
    utmCampaign: currentUrl.searchParams.get("utm_campaign") ?? "",
    channel: inferChannel(document.referrer, {
      utmSource: currentUrl.searchParams.get("utm_source") ?? "",
      utmMedium: currentUrl.searchParams.get("utm_medium") ?? "",
    }),
  };
}

function readStoredAttribution() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);

    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as LeadAttribution;
  } catch {
    return null;
  }
}

function inferChannel(
  referrer: string,
  values: { utmMedium: string; utmSource: string },
) {
  if (values.utmSource) {
    return values.utmMedium
      ? `${values.utmSource} / ${values.utmMedium}`
      : values.utmSource;
  }

  if (!referrer) {
    return "direct";
  }

  const normalizedReferrer = referrer.toLowerCase();

  if (
    normalizedReferrer.includes("google.") ||
    normalizedReferrer.includes("bing.") ||
    normalizedReferrer.includes("yahoo.")
  ) {
    return "organic search";
  }

  if (
    normalizedReferrer.includes("instagram.") ||
    normalizedReferrer.includes("facebook.") ||
    normalizedReferrer.includes("linkedin.") ||
    normalizedReferrer.includes("x.com") ||
    normalizedReferrer.includes("t.co")
  ) {
    return "social";
  }

  return "referral";
}

function trackLeadSubmission(payload: ContactPayload) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "generate_lead", {
    event_category: "contact",
    event_label: payload.subject || payload.service || "contact_form",
    form_location: payload.formPage,
    landing_page: payload.landingPage,
    lead_source: payload.source,
    utm_source: payload.utmSource || undefined,
    utm_medium: payload.utmMedium || undefined,
    utm_campaign: payload.utmCampaign || undefined,
    value: 1,
  });
}
