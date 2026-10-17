import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";

export const site = {
  name: "JP Salomeo",
  initials: "JPS",
  // Path to your photo in /public, e.g. "/me.jpg". Leave empty to show initials.
  photo: "/portrait.jpg" as string,
  role: "Developer & Designer",
  tagline: "I build fast, accessible web apps with React and Next.js.\nI am also a UI/UX designer and a graphic artist.",
  description:
    "Portfolio of JP Salomeo — projects, experience, and ways to get in touch.",
  email: "jasalomeo@up.edu.ph",
  // Path to your résumé PDF in /public, e.g. "/resume.pdf". Leave empty and
  // the résumé buttons show a "coming soon" toast instead.
  resume: "" as string,
  links: [
    { label: "GitHub", href: "https://github.com/ysxiaixsy", icon: GitHubIcon },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/jp-salomeo",
      icon: LinkedInIcon,
    },
  ],
} as const;
