import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

import { agencyInfoContent, siteContent } from "@/lib/content";

type ContactPayload = {
  company?: string;
  email?: string;
  formPage?: string;
  landingPage?: string;
  landingPageUrl?: string;
  message?: string;
  name?: string;
  referrer?: string;
  service?: string;
  source?: string;
  subject?: string;
  utmCampaign?: string;
  utmMedium?: string;
  utmSource?: string;
  whatsapp?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getRecipientList() {
  const configured = agencyInfoContent.submissionEmail;
  return Array.isArray(configured) ? configured : [configured];
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { message: "تعذّر قراءة بيانات النموذج." },
      { status: 400 },
    );
  }

  const name = normalize(payload.name);
  const email = normalize(payload.email);
  const whatsapp = normalize(payload.whatsapp);
  const company = normalize(payload.company);
  const subject = normalize(payload.subject);
  const service = normalize(payload.service);
  const message = normalize(payload.message);
  const landingPage = normalize(payload.landingPage);
  const landingPageUrl = normalize(payload.landingPageUrl);
  const formPage = normalize(payload.formPage);
  const source = normalize(payload.source);
  const referrer = normalize(payload.referrer);
  const utmSource = normalize(payload.utmSource);
  const utmMedium = normalize(payload.utmMedium);
  const utmCampaign = normalize(payload.utmCampaign);

  if (!name || !email || !whatsapp || !subject || !message) {
    return NextResponse.json(
      { message: "يرجى تعبئة الحقول المطلوبة قبل الإرسال." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "صيغة البريد الإلكتروني غير صحيحة." },
      { status: 400 },
    );
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT ?? "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpSecure = process.env.SMTP_SECURE === "true";
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? smtpUser;
  const fromName = process.env.CONTACT_FROM_NAME ?? siteContent.seo.siteName;

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !fromEmail) {
    return NextResponse.json(
      { message: "إعدادات البريد غير مكتملة على الخادم." },
      { status: 500 },
    );
  }

  const transport = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const recipients = getRecipientList();
  const serviceLine = service
    ? `الخدمة المطلوبة: ${service}`
    : "الخدمة المطلوبة: غير محددة";
  const companyLine = company ? `اسم الشركة: ${company}` : "اسم الشركة: غير مذكور";
  const sourceLine = source ? `مصدر الزيارة: ${source}` : "مصدر الزيارة: غير معروف";
  const landingPageLine = landingPage
    ? `صفحة الهبوط الأولى: ${landingPage}`
    : "صفحة الهبوط الأولى: غير متوفرة";
  const formPageLine = formPage
    ? `صفحة الإرسال الحالية: ${formPage}`
    : "صفحة الإرسال الحالية: غير متوفرة";
  const landingPageUrlLine = landingPageUrl
    ? `رابط صفحة الهبوط: ${landingPageUrl}`
    : "رابط صفحة الهبوط: غير متوفر";
  const referrerLine = referrer ? `المرجع: ${referrer}` : "المرجع: مباشر";
  const utmSourceLine = utmSource ? `utm_source: ${utmSource}` : "utm_source: غير متوفر";
  const utmMediumLine = utmMedium ? `utm_medium: ${utmMedium}` : "utm_medium: غير متوفر";
  const utmCampaignLine = utmCampaign
    ? `utm_campaign: ${utmCampaign}`
    : "utm_campaign: غير متوفر";

  const text = [
    `الاسم: ${name}`,
    `البريد الإلكتروني: ${email}`,
    `رقم الواتساب: ${whatsapp}`,
    companyLine,
    `الموضوع: ${subject}`,
    serviceLine,
    "",
    "بيانات الإسناد:",
    sourceLine,
    landingPageLine,
    formPageLine,
    landingPageUrlLine,
    referrerLine,
    utmSourceLine,
    utmMediumLine,
    utmCampaignLine,
    "",
    "الرسالة:",
    message,
  ].join("\n");

  try {
    await transport.sendMail({
      from: `${fromName} <${fromEmail}>`,
      to: recipients,
      replyTo: email,
      subject: `رسالة جديدة من الموقع: ${subject}`,
      text,
    });

    return NextResponse.json({
      message: "تم إرسال الرسالة بنجاح.",
    });
  } catch {
    return NextResponse.json(
      { message: "فشل إرسال الرسالة. تحقق من إعدادات البريد ثم أعد المحاولة." },
      { status: 500 },
    );
  }
}
