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
  // The photo as 128×128 pixel art on a transparent background, drawn by
  // `npm run pixel-portrait`.
  pixelPortrait: { src: "/pixel-portrait.png", size: 128 },
  // The hero's character sheet: the name, the motto, then role (Class),
  // education (Guild), location (Base) and status as rows, and the tagline.
  education: "3rd-year BS Computer Science – UP Visayas",
  role: "Software Engineer",
  motto: "Engineered first, designed with care.",
  tagline:
    "I engineer software end to end, from web apps and games down to low-level systems, and design the interfaces people use to reach them.",
  // What search results and link previews say under the title.
  description:
    "JP Salomeo is a software engineer and third-year BS Computer Science student at UP Visayas who builds web apps, games and low-level systems, and designs their interfaces.",
  email: "jasalomeo@up.edu.ph",
  // The "Current quest" window beside About: what I'm building at the moment
  // (a project slug) and my part in it. Then the hero's stats: a few hard
  // numbers, each from a project.
  now: {
    project: "solnexus",
    role: "Full-stack developer, lead UI/UX designer and Scrum Master on a five-person team, for SolTech EMR, a real client.",
  },
  numbers: [
    { value: "170+", label: "engine and AI tests", project: "tavern-card-game" },
    { value: "94/94", label: "commits, built solo", project: "tavern-card-game" },
    { value: "4", label: "people on the team I led", project: "rateupv" },
  ],
  // The plate under the hero portrait: my year, as a level.
  level: "LV 3 · BS CS",
  // The availability line in the hero and the Contact section, and its
  // short form in the header.
  status: "Open to internships, jobs and freelance work",
  statusShort: "Open to work",
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
