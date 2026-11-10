"use client";

import { CircleAlertIcon, CircleCheckIcon } from "lucide-react";
import { useActionState, useEffect, useRef } from "react";
import { type ContactState, sendMessage } from "@/app/contact/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/data/site";

const initialState: ContactState = { status: "idle" };

// The form, titled so it reads as its own way to get in touch.
export function ContactForm() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h3 className="text-2xl font-semibold tracking-tight">
          Send a message
        </h3>
        <p className="text-muted-foreground">
          It lands in my inbox, and I&apos;ll reply to the email you give.
        </p>
      </div>
      <ContactFormBody />
    </div>
  );
}

function ContactFormBody() {
  const [state, formAction, pending] = useActionState(
    sendMessage,
    initialState,
  );
  const shownAt = useRef<number | null>(null);
  useEffect(() => {
    shownAt.current = Date.now();
  }, []);

  // Sends how long the form has been open, timed on this device so clock
  // differences with the server don't matter. See MIN_FILL_MS in actions.ts.
  function submit(formData: FormData) {
    if (shownAt.current !== null) {
      formData.set("elapsed", String(Date.now() - shownAt.current));
    }
    formAction(formData);
  }

  if (state.status === "success") {
    return (
      <Alert>
        <CircleCheckIcon />
        <AlertTitle>Message sent</AlertTitle>
        <AlertDescription>
          Thanks for reaching out — I&apos;ll get back to you soon.
        </AlertDescription>
      </Alert>
    );
  }

  const { errors, values } = state;

  return (
    <form action={submit} noValidate>
      <FieldGroup>
        {state.message && (
          <Alert variant="destructive">
            <CircleAlertIcon />
            <AlertTitle>{state.message}</AlertTitle>
            <AlertDescription>
              You can also email me directly at{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </AlertDescription>
          </Alert>
        )}

        <Field data-invalid={!!errors?.name || undefined}>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            required
            defaultValue={values?.name}
            aria-invalid={!!errors?.name || undefined}
          />
          <FieldError>{errors?.name}</FieldError>
        </Field>

        <Field data-invalid={!!errors?.email || undefined}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={values?.email}
            aria-invalid={!!errors?.email || undefined}
          />
          <FieldError>{errors?.email}</FieldError>
        </Field>

        <Field data-invalid={!!errors?.message || undefined}>
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <Textarea
            id="message"
            name="message"
            rows={5}
            required
            defaultValue={values?.message}
            aria-invalid={!!errors?.message || undefined}
          />
          <FieldError>{errors?.message}</FieldError>
        </Field>

        {/* Honeypot — hidden from people and assistive tech. */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <Button type="submit" size="lg" disabled={pending} className="w-full">
          {pending && <Spinner data-icon="inline-start" />}
          {pending ? "Sending…" : "Send message"}
        </Button>
      </FieldGroup>
    </form>
  );
}
