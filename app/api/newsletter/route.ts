import { NextResponse } from "next/server";

type NewsletterPayload = {
  email?: string;
};

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isDuplicateResponse(status: number, bodyText: string) {
  if (status === 409) {
    return true;
  }

  const normalized = bodyText.toLowerCase();

  return (
    normalized.includes("already exists") ||
    normalized.includes("already subscribed") ||
    normalized.includes("duplicate")
  );
}

export async function POST(request: Request) {
  let payload: NewsletterPayload;

  try {
    payload = (await request.json()) as NewsletterPayload;
  } catch {
    return NextResponse.json(
      { message: "تعذر قراءة بيانات الاشتراك." },
      { status: 400 },
    );
  }

  const email = normalize(payload.email);

  if (!email) {
    return NextResponse.json(
      { message: "يرجى إدخال البريد الإلكتروني." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "صيغة البريد الإلكتروني غير صحيحة." },
      { status: 400 },
    );
  }

  const token = process.env.Authorization?.trim();

  if (!token) {
    return NextResponse.json(
      { message: "إعدادات Hostinger Reach غير مكتملة على الخادم." },
      { status: 500 },
    );
  }

  let response: Response;

  try {
    response = await fetch("https://developers.hostinger.com/api/reach/v1/contacts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email,
      }),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { message: "تعذر الاتصال بخدمة النشرة البريدية حاليًا." },
      { status: 502 },
    );
  }

  if (response.ok) {
    return NextResponse.json({
      message: "تم الاشتراك في النشرة البريدية بنجاح.",
    });
  }

  const bodyText = await response.text();

  if (isDuplicateResponse(response.status, bodyText)) {
    return NextResponse.json({
      message: "هذا البريد مسجل بالفعل في النشرة البريدية.",
    });
  }

  return NextResponse.json(
    { message: "تعذر إتمام الاشتراك حاليًا. حاول مرة أخرى لاحقًا." },
    { status: 500 },
  );
}
