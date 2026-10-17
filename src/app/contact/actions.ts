"use server";

import { site } from "@/data/site";

type Fields = { name: string; email: string; message: string };

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<keyof Fields, string>>;
  // Echoed back so the form keeps what was typed when sending fails.
  values?: Fields;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// People take longer than this to fill the form in; bots submit instantly.
const MIN_FILL_MS = 3000;

function validate({ name, email, message }: Fields) {
  const errors: ContactState["errors"] = {};
  if (!name) errors.name = "Please enter your name.";
  else if (name.length > 100) errors.name = "Keep your name under 100 characters.";
  if (!EMAIL_PATTERN.test(email)) errors.email = "Please enter a valid email.";
  if (message.length < 10) errors.message = "Please write at least 10 characters.";
  else if (message.length > 5000)
    errors.message = "Keep your message under 5,000 characters.";
  return errors;
}

export async function sendMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  // Honeypot: real visitors never see this field, bots fill it in.
  if (formData.get("company")) return { status: "success" };

  // The page adds how long the form was open; a post without it didn't come
  // from the page. Both bot checks fake success so bots don't adapt.
  if (!formData.has("elapsed")) return { status: "success" };

  const errors = validate(values);
  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  // Too fast is usually a bot, but could be a quick person, so ask again.
  const elapsed = Number(formData.get("elapsed"));
  if (!(elapsed >= MIN_FILL_MS)) {
    return {
      status: "error",
      message: "That was quick! Please wait a moment, then send it again.",
      values,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not set.");
    return {
      status: "error",
      message: "The contact form isn't set up yet.",
      values,
    };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL ?? site.email,
      reply_to: values.email,
      subject: `Portfolio message from ${values.name}`,
      text: `${values.message}\n\n— ${values.name} <${values.email}>`,
    }),
  });

  // Resend's free plan allows 100 emails a day and 3,000 a month.
  if (response.status === 429) {
    console.error("Contact form: Resend limit hit", await response.text());
    return {
      status: "error",
      message: "I'm getting a lot of messages right now.",
      values,
    };
  }

  if (!response.ok) {
    console.error("Contact form: Resend error", await response.text());
    return {
      status: "error",
      message: "Something went wrong sending your message.",
      values,
    };
  }

  return { status: "success" };
}
