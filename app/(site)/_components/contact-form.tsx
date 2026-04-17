import { agencyInfoContent } from "@/lib/content";

const serviceOptions = [
  "استراتيجية العلامة",
  "صناعة المحتوى",
  "استراتيجية التسويق",
  "تطوير الويب",
] as const;

type ContactFormProps = {
  messagePlaceholder: string;
  rows?: number;
  submitLabel: string;
};

export function ContactForm({
  messagePlaceholder,
  rows = 6,
  submitLabel,
}: ContactFormProps) {
  const submissionTarget = Array.isArray(agencyInfoContent.submissionEmail)
    ? agencyInfoContent.submissionEmail.join(";")
    : agencyInfoContent.submissionEmail;

  return (
    <form
      className="grid gap-8 md:gap-10"
      action={`mailto:${submissionTarget}`}
      method="post"
      encType="text/plain"
    >
      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        <FormField
          name="firstName"
          label="الاسم الأول"
          placeholder="مثال: محمد"
        />
        <FormField
          name="lastName"
          label="الاسم الأخير"
          placeholder="مثال: الأحمد"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        <FormField
          name="email"
          type="email"
          label="البريد الإلكتروني"
          placeholder="name@company.com"
        />
        <FormField
          name="company"
          label="اسم الشركة"
          placeholder="اسم الجهة أو العلامة"
        />
      </div>

      <FormField
        name="subject"
        label="الموضوع"
        placeholder="مثال: طلب تطوير موقع"
      />

      <fieldset className="grid gap-4">
        <legend className="text-sm font-semibold text-muted">الخدمة المطلوبة</legend>
        <div className="flex flex-wrap gap-3">
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
        <span className="text-sm font-semibold text-muted">الرسالة</span>
        <textarea
          name="message"
          placeholder={messagePlaceholder}
          rows={rows}
          className="w-full border-0 border-b border-black/20 bg-transparent px-0 pb-5 pt-2 text-base text-foreground outline-none transition placeholder:text-muted/80 focus:border-foreground"
        />
      </label>

      <button
        type="submit"
        className="ui-radius-button inline-flex w-auto self-start items-center justify-center bg-foreground px-6 py-4 text-base font-semibold text-white transition hover:bg-primary-light"
      >
        {submitLabel}
      </button>
    </form>
  );
}

type FormFieldProps = {
  label: string;
  name: string;
  placeholder: string;
  type?: "email" | "text";
};

function FormField({
  label,
  name,
  placeholder,
  type = "text",
}: FormFieldProps) {
  return (
    <label className="grid gap-3">
      <span className="text-sm font-semibold text-muted">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full border-0 border-b border-black/20 bg-transparent px-0 pb-5 pt-2 text-base text-foreground outline-none transition placeholder:text-muted/80 focus:border-foreground"
      />
    </label>
  );
}
