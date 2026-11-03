import {
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/brand-icons";

export const site = {
  name: "JP Salomeo",
  initials: "JPS",
  // Path to your photo in /public, e.g. "/me.jpg". Leave empty to show initials.
  photo: "/portrait.jpg" as string,
  role: "Developer & Designer",
  tagline:
    "I build fast, accessible web apps with React and Next.js.\nI am also a UI/UX designer and a graphic artist.",
  description:
    "Portfolio of JP Salomeo — projects, experience, and ways to get in touch.",
  email: "jasalomeo@up.edu.ph",
  // The availability line in the Contact section.
  status: "Open to internships, jobs and freelance work",
  location: "Iloilo, Philippines",
  // Path to your résumé PDF in /public, e.g. "/resume.pdf". Leave empty and
  // the résumé buttons show a "coming soon" toast instead.
  resume: "" as string,
  // Shown as icon + handle on the home page and as icons in the footer.
  // `resume` marks the ones the résumé lists.
  links: [
    {
      label: "Facebook",
      handle: "@jpas0809",
      href: "https://www.facebook.com/jpas0809",
      icon: FacebookIcon,
      resume: false,
    },
    {
      label: "Instagram",
      handle: "@jp_gaultier_",
      href: "https://www.instagram.com/jp_gaultier_/",
      icon: InstagramIcon,
      resume: false,
    },
    {
      label: "GitHub",
      handle: "@ysxiaixsy",
      href: "https://github.com/ysxiaixsy",
      icon: GitHubIcon,
      resume: true,
    },
    {
      label: "LinkedIn",
      handle: "@jp-salomeo",
      href: "https://www.linkedin.com/in/jp-salomeo/",
      icon: LinkedInIcon,
      resume: true,
    },
  ],
} as const;
