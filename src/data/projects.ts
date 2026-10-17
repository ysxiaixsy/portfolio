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
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
