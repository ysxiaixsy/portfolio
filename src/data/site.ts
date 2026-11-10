import {
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/pixel-icons";

export const site = {
  name: "JP Salomeo",
  initials: "JPS",
  // Path to your photo in /public, e.g. "/me.jpg". Leave empty to show initials.
  photo: "/portrait.jpg" as string,
  // The hero, top to bottom: education, name, role, motto, tagline.
  education: "3rd-year BS Computer Science – UP Visayas",
  role: "Software Engineer",
  motto: "Engineered first, designed with care.",
  tagline:
    "I engineer software end to end, from web apps and games down to low-level systems, and design the interfaces people use to reach them.",
  description:
    "Portfolio of JP Salomeo — projects, experience, and ways to get in touch.",
  email: "jasalomeo@up.edu.ph",
  // The availability line in the Contact section.
  status: "Open to internships, jobs and freelance work",
  location: "Iloilo, Philippines",
  // Path to your résumé PDF in /public, e.g. "/resume.pdf". Leave empty and
  // the résumé buttons show a "coming soon" toast instead.
  resume: "/resume.pdf" as string,
  // The name the résumé saves under when downloaded.
  resumeFileName: "Joseph Patrick Salomeo_Resume.pdf",
  // Shown as icon + handle on the home page and as icons in the footer.
  // `resume` marks the ones the résumé lists; `hex` is the brand colour
  // (unused while icons follow the text colour).
  links: [
    {
      label: "Facebook",
      handle: "@jpas0809",
      href: "https://www.facebook.com/jpas0809",
      icon: FacebookIcon,
      hex: "0866FF",
      resume: false,
    },
    {
      label: "Instagram",
      handle: "@jp_gaultier_",
      href: "https://www.instagram.com/jp_gaultier_/",
      icon: InstagramIcon,
      hex: "FF0069",
      resume: false,
    },
    {
      label: "GitHub",
      handle: "@ysxiaixsy",
      href: "https://github.com/ysxiaixsy",
      icon: GitHubIcon,
      hex: "181717",
      resume: true,
    },
    {
      label: "LinkedIn",
      handle: "@jp-salomeo",
      href: "https://www.linkedin.com/in/jp-salomeo/",
      icon: LinkedInIcon,
      hex: "0A66C2",
      resume: true,
    },
  ],
} as const;
