export type ProjectLogo = {
  // Files live in /public/projects/<slug>/.
  src: string;
  // Variant for dark backgrounds, if the light one doesn't read on them.
  darkSrc?: string;
  // Intrinsic size of the artwork, for its aspect ratio.
  width: number;
  height: number;
  // A wordmark spells out the name, so it stands in for the title text.
  wordmark?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  // What you did — needed for team projects, e.g. "Design & development".
  role: string;
  // Where it was made, if it was for a hackathon, class or competition.
  event?: string;
  description: string[];
  tech: string[];
  year: number;
  logo: ProjectLogo;
  featured?: boolean;
  liveUrl?: string;
  repoUrl?: string;
};

// Newest first. Every project needs its logo or wordmark.
export const projects: Project[] = [
  {
    slug: "sackto",
    title: "SACKTO",
    summary:
      "Post-harvest capacity planning for the Iloilo Rice Processing Complex, with an SMS channel for farmers and buyers.",
    role: "UI/UX design, planning & development",
    event: "Hack Iloilo 2026",
    description: [
      "The Iloilo Rice Processing Complex can't see palay coming until it reaches the gate. At peak, dryers overflow and farmers turn to private mills; off-season, machines sit idle while power costs keep running. SACKTO shows the plant what's coming weeks ahead and suggests what to do about it.",
      "Farmers and buyers report what's coming by SMS or on the web: booking drying or milling, offering palay for sale, getting price quotes, or requesting rice. Bookings, sell offers and a harvest forecast feed a capacity view for the dryers, storage and mill, which suggests moving flexible bookings off busy days or texting farmers ahead of idle stretches. Staff run the day from one gate queue and one batch record, from receiving to dispatch.",
      "It's a single Next.js app on Supabase. Basic phones reach it through an Android SMS gateway and a webhook relay. An LLM parses free-text messages but never computes figures, and the harvest forecast is trained offline in Python. Built for Hack Iloilo 2026.",
      "I designed the UI, every screen of it, and worked on SACKTO's planning and development from start to finish.",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Vercel AI SDK",
      "Python",
    ],
    year: 2026,
    logo: {
      src: "/projects/sackto/wordmark.svg",
      darkSrc: "/projects/sackto/wordmark-white.svg",
      width: 453,
      height: 103,
      wordmark: true,
    },
    featured: true,
    liveUrl: "https://sackto.vercel.app",
    repoUrl: "https://github.com/popcorn-prophets/sackto",
  },
  {
    slug: "rateupv",
    title: "RateUPV",
    summary:
      "Student-driven reviews of UP Visayas campus facilities and services, like Rate My Professors for the places around campus.",
    role: "Lead, UI/UX design & full-stack development",
    description: [
      "RateUPV is an independent, student-built guide to UP Visayas facilities and services, starting with the Miagao campus. It helps students find the right place, arrive prepared, and pass on what they learned to the next person.",
      "Each place page brings together what to prepare, location, contacts and hours, with the source and the date each detail was checked, plus a campus map that loads on demand and walking directions. Students sign in with their UP email to write reviews, join discussions, suggest missing places and send corrections, and moderators work from an inbox and a catalog editor.",
      "It's a Next.js app on Supabase, where Postgres row-level security guards every write, so there's no separate API server. Unit, database and end-to-end Playwright tests cover it.",
      "I led the project, designed the UI, and worked across the full stack.",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Supabase",
      "PostgreSQL",
      "Playwright",
    ],
    year: 2026,
    logo: {
      src: "/projects/rateupv/logo.svg",
      darkSrc: "/projects/rateupv/logo-cream.svg",
      width: 1473,
      height: 1473,
    },
    featured: true,
    liveUrl: "https://rateupv.vercel.app",
    repoUrl: "https://github.com/ysxiaixsy/RateUPV",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
