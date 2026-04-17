"use client";

import { useRef, useState } from "react";

import { SectionHeading } from "@/components/ui/section-heading";

type SubmitState = "idle" | "submitting" | "success" | "error";
type NewsletterSignupVariant = "section" | "footer";

type NewsletterSignupFormProps = {
  variant?: NewsletterSignupVariant;
};

export function NewsletterSignupForm({
  variant = "section",
}: NewsletterSignupFormProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();

    setSubmitState("submitting");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!response.ok) {
        setSubmitState("error");
        setSubmitMessage(
          result?.message ?? "تعذر إتمام الاشتراك حاليًا. حاول مرة أخرى لاحقًا.",
        );
        return;
      }

      formRef.current?.reset();
      setSubmitState("success");
      setSubmitMessage(
        result?.message ?? "تم الاشتراك في النشرة البريدية بنجاح.",
      );
    } catch {
      setSubmitState("error");
      setSubmitMessage("حدث خطأ غير متوقع أثناء الاشتراك. حاول مرة أخرى.");
    }
  }

  const isFooter = variant === "footer";
  const messageClassName =
    submitState === "error"
      ? "text-sm font-medium text-accent md:col-span-2"
      : submitState === "success"
        ? "text-sm font-medium text-white/78 md:col-span-2"
        : "text-sm font-medium text-transparent md:col-span-2";

  if (isFooter) {
    return (
      <form
        ref={formRef}
        className="mt-8 grid gap-4 md:grid-cols-[1fr_auto] md:items-end"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-3">
          <input
            type="email"
            name="email"
            required
            placeholder="البريد الإلكتروني"
            className="w-full border-0 border-b border-white/20 bg-transparent px-0 pb-5 pt-2 text-base text-white outline-none transition placeholder:text-white/35 focus:border-white"
          />
        </div>

        <button
          type="submit"
          disabled={submitState === "submitting"}
          className="ui-radius-button inline-flex items-center justify-center bg-white px-6 py-4 text-base font-semibold text-foreground transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitState === "submitting" ? "جارٍ الاشتراك..." : "اشترك الآن"}
        </button>

        <p aria-live="polite" className={messageClassName}>
          {submitMessage || "."}
        </p>
      </form>
    );
  }

  return (
    <section className="px-6 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-content rounded bg-foreground px-5 py-8 text-white md:px-8 md:py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-12">
          <div>
            <p className="text-sm font-semibold text-white/55">النشرة البريدية</p>
            <SectionHeading tone="inverse" className="mt-3 max-w-md">
              أفكار قصيرة تصل إليك قبل أن تضيع في الزحام.
            </SectionHeading>
            <p className="mt-5 max-w-md text-base leading-8 text-white/68 md:text-lg">
              اشترك لتصلك ملاحظات مختصرة حول الهوية والمحتوى والتجربة الرقمية.
            </p>
          </div>

          <form
            ref={formRef}
            className="grid gap-4 md:grid-cols-[1fr_auto]"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              name="email"
              required
              placeholder="البريد الإلكتروني"
              className="ui-radius-control w-full border border-white/12 bg-white/8 px-4 py-4 text-base text-white outline-none transition placeholder:text-white/45 focus:border-white/30"
            />

            <button
              type="submit"
              disabled={submitState === "submitting"}
              className="ui-radius-button inline-flex items-center justify-center bg-white px-6 py-4 text-base font-semibold text-foreground transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitState === "submitting" ? "جارٍ الاشتراك..." : "اشترك الآن"}
            </button>

            <p aria-live="polite" className={messageClassName}>
              {submitMessage || "."}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
