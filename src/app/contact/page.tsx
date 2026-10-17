import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageTransition } from "@/components/page-transition";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <PageTransition>
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
        <p className="mt-3 text-muted-foreground">
          Have a role, project, or question in mind? Send me a message, or
          email{" "}
          <a
            href={`mailto:${site.email}`}
            className="underline underline-offset-4 hover:text-foreground"
          >
            {site.email}
          </a>
          .
        </p>
        <div className="mt-10 max-w-xl">
          <ContactForm />
        </div>
      </div>
    </PageTransition>
  );
}
