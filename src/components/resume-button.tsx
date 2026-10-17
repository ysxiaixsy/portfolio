"use client";

import { DownloadIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { site } from "@/data/site";

type ResumeButtonProps = Pick<
  ComponentProps<typeof Button>,
  "variant" | "size" | "children"
>;

// Downloads site.resume, or explains it isn't up yet while that's empty.
export function ResumeButton({ children, ...props }: ResumeButtonProps) {
  const content = (
    <>
      <DownloadIcon data-icon="inline-start" />
      {children}
    </>
  );

  if (site.resume) {
    return (
      <Button
        {...props}
        nativeButton={false}
        render={<a href={site.resume} download />}
      >
        {content}
      </Button>
    );
  }

  return (
    <Button
      {...props}
      onClick={() =>
        toast.add({
          type: "info",
          title: "Résumé coming soon",
          description:
            "It isn't available yet. Check back soon, or get in touch in the meantime.",
        })
      }
    >
      {content}
    </Button>
  );
}
