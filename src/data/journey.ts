export type Involvement = {
  org: string;
  role: string;
  // School years, e.g. "2024–2025". Leave empty if it spans the whole entry.
  years?: string;
  // Internal or external link, e.g. a project page.
  href?: string;
};

export type JourneyEntry = {
  start: string;
  // Leave empty for what you're doing now; it renders as "Present".
  end?: string;
  title: string;
  place: string;
  involvements: Involvement[];
};

// Newest first. Jobs, internships and freelance work go here too.
export const journey: JourneyEntry[] = [
  {
    start: "2024",
    title: "BS Computer Science",
    place: "University of the Philippines Visayas",
    involvements: [
      {
        org: "Hack Iloilo 2026",
        role: "SACKTO: UI/UX design, planning & development",
        href: "/projects/sackto",
      },
      {
        org: "Komsai.org",
        role: "Publications Committee",
        years: "2024–2025, 2026–2027",
      },
      {
        org: "UPV Elektrons",
        role: "Publications Committee",
        years: "2026–2027",
      },
      { org: "UPV Elektrons", role: "Arts Committee", years: "2024–2025" },
      {
        org: "PAGBUTLAK",
        role: "Website Development Committee",
        years: "2026–2027",
      },
    ],
  },
  {
    start: "2022",
    end: "2024",
    title: "Senior High School",
    place: "Philippine Science High School – Western Visayas Campus",
    involvements: [
      { org: "SineSci (Cinematograpisay)", role: "Branding Committee" },
      {
        org: "Project Aklatan: Second Story",
        role: "Publications Committee",
      },
      {
        org: "Batch 2024 Yearbook Committee",
        role: "Layout and photo editing",
      },
    ],
  },
];
