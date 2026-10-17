"use client";

import { CircleAlertIcon, CircleCheckIcon } from "lucide-react";
import { useActionState } from "react";
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

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendMessage,
    initialState,
  );

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
    <form action={formAction} noValidate>
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
            rows={6}
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

        <Field orientation="horizontal">
          <Button type="submit" disabled={pending}>
            {pending && <Spinner data-icon="inline-start" />}
            {pending ? "Sending…" : "Send message"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
