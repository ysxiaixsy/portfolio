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
  // Files live in /public/projects/<slug>/.
  screenshot?: { src: string; alt: string; width: number; height: number };
  tech: string[];
  year: number;
  // Projects without one show their name as text.
  logo?: ProjectLogo;
  // Still being built: the card and page say so.
  inProgress?: boolean;
  liveUrl?: string;
  repoUrl?: string;
};

// Featured first. Ship the logo or wordmark whenever the project has one.
export const projects: Project[] = [
  {
    slug: "tavern-card-game",
    title: "Tavern Card Game",
    summary:
      "A mobile recreation of Gwent, the card game from The Witcher 3, with AI opponents and online play.",
    role: "Solo developer",
    description: [
      "Tavern Card Game is a mobile version of Gwent, the card game from The Witcher 3: Wild Hunt. It has three AI difficulties, all four base-game factions, leader variants, a deck builder that saves your decks, and a standalone Android build.",
      "The game engine is pure TypeScript with seeded randomness, so any seed replays the same match. More than 170 engine and AI tests cover it, along with a terminal simulator that plays bot-vs-bot games.",
      "Online matches start from a room code and run through a Supabase Edge Function that checks every move with the same engine the app runs. Row-level security hides the full game state, so each player only receives their own view, and Realtime updates handle reconnecting and resuming.",
      "I built it alone, all 94 commits. It's a non-commercial fan project: the card names belong to CD PROJEKT RED, and all the art is placeholder art drawn in code.",
    ],
    tech: [
      "Expo",
      "React Native",
      "TypeScript",
      "Zustand",
      "Supabase",
      "PostgreSQL",
      "Vitest",
    ],
    year: 2026,
    logo: {
      src: "/projects/tavern-card-game/logo.png",
      width: 256,
      height: 256,
    },
    repoUrl: "https://github.com/ysxiaixsy/Tavern-Card-Game",
  },
  {
    slug: "rateupv",
    title: "RateUPV",
    summary:
      "Student-driven reviews of UP Visayas campus facilities and services, like Rate My Professors for the places around campus.",
    role: "Lead, UI/UX design & full-stack development",
    event: "CMSC 126 final project",
    description: [
      "RateUPV is an independent, student-built guide to UP Visayas facilities and services, starting with the Miagao campus. It helps students find the right place, arrive prepared, and pass on what they learned to the next person.",
      "Each place page brings together what to prepare, location, contacts and hours, with the source and the date each detail was checked, plus a campus map that loads on demand and walking directions. Students sign in with their UP email to write reviews, join discussions, suggest missing places and send corrections, and moderators work from an inbox and a catalog editor.",
      "It's a Next.js app on Supabase, where Postgres row-level security guards every write, so there's no separate API server. Unit, database and end-to-end Playwright tests cover it.",
      "I led a four-person team, designed the UI, and worked across the full stack. I led the rebuild from a Vite app into this Next.js version, with server-rendered public pages, while keeping every existing account, place and review and redirecting the old URLs.",
      "Security was part of the design: UP-email accounts, row-level security on every table, locked-down database functions, security headers, and a moderator inbox to hide, restore and archive content.",
    ],
    screenshot: {
      src: "/projects/rateupv/screenshot.webp",
      alt: 'RateUPV\'s home page, with the headline "Know your campus. Make it yours." beside shortcuts to study spaces, payments and everyday essentials.',
      width: 1600,
      height: 1000,
    },
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
      darkSrc: "/projects/rateupv/logo-pink.svg",
      width: 1473,
      height: 1473,
    },
    liveUrl: "https://rateupv.vercel.app",
    repoUrl: "https://github.com/ysxiaixsy/RateUPV",
  },
  {
    slug: "sackto",
    title: "SACKTO",
    summary:
      "Post-harvest capacity planning for the Iloilo Rice Processing Complex, with an SMS channel for farmers and buyers.",
    role: "Brand, UI/UX design & development",
    event: "Hack Iloilo 2026",
    description: [
      "The Iloilo Rice Processing Complex can't see palay coming until it reaches the gate. At peak, dryers overflow and farmers turn to private mills; off-season, machines sit idle while power costs keep running. SACKTO shows the plant what's coming weeks ahead and suggests what to do about it.",
      "Farmers and buyers report what's coming by SMS or on the web: booking drying or milling, offering palay for sale, getting price quotes, or requesting rice. Bookings, sell offers and a harvest forecast feed a capacity view for the dryers, storage and mill, which suggests moving flexible bookings off busy days or texting farmers ahead of idle stretches. Staff run the day from one gate queue and one batch record, from receiving to dispatch.",
      "It's a single Next.js app on Supabase. Basic phones reach it through an Android SMS gateway and a webhook relay. An LLM parses free-text messages but never computes figures, and the harvest forecast is trained offline in Python. Built for Hack Iloilo 2026.",
      "I designed SACKTO's brand, including its wordmark, and its UI, every screen of it, and worked on planning and development from start to finish.",
    ],
    screenshot: {
      src: "/projects/sackto/screenshot.webp",
      alt: "SACKTO's home page, with options to book drying or milling, sell palay and buy rice, above today's prices.",
      width: 1600,
      height: 1000,
    },
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
    liveUrl: "https://sackto.vercel.app",
    repoUrl: "https://github.com/popcorn-prophets/sackto",
  },
  {
    slug: "solnexus",
    title: "SolNexus",
    summary:
      "A lead and client communication pipeline for SolTech EMR that gathers lead conversations into one searchable system and shows which leads need a follow-up today.",
    role: "Full-stack development: wireframes, frontend foundation & staff sign-in",
    event: "CMSC 128/129, for a real client",
    inProgress: true,
    description: [
      "SolTech EMR tracked its leads in a spreadsheet by hand. SolNexus, built by a five-person team with SolTech as a real client, replaces it with a daily follow-up list and a searchable history for each clinic.",
      "Conversations flow through a medallion-architecture pipeline: Gmail is ingested into PostgreSQL bronze tables, dbt builds silver models for leads and interactions, and Apache Airflow orchestrates it with retries. Messenger and Viber ingestion are planned.",
      "I drew the wireframes, built the React frontend foundation (routing, the API client and a mock mode), and built staff sign-in end to end, from FastAPI sessions and protected routes with an 8-hour idle timeout to the login page and its tests.",
    ],
    screenshot: {
      src: "/projects/solnexus/screenshot.webp",
      alt: "A SolNexus wireframe of the dashboard: the clinics to call today, each with its contact, status and last contact, above the full list of clinics.",
      width: 1440,
      height: 900,
    },
    tech: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "FastAPI",
      "PostgreSQL",
      "dbt",
      "Apache Airflow",
      "Docker",
    ],
    year: 2026,
    repoUrl: "https://github.com/CMSC128-NexusWorks/SolNexus",
  },
  {
    slug: "online",
    title: "OnLine",
    summary:
      "A queue management system for UP Visayas service offices: students join and track queues, staff call the next person, and admins manage services.",
    role: "UI design",
    event: "CMSC 127 final project",
    description: [
      "On a three-person team, I redesigned OnLine's interface: a new color palette, an elevation system, the sign-in page, and the logo and wordmark.",
      "OnLine replaces the lines at UP Visayas service offices with queues students can join and track. Students join, cancel or swap places; staff call, skip and re-add people; admins manage services, staff, users and locations.",
      "The queue logic lives in the database layer, including swapping two waiting students and putting a skipped student back at the front of the line. It's PHP with PDO on MySQL, with plain HTML, CSS and JavaScript in the browser.",
    ],
    tech: ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
    year: 2026,
    logo: {
      src: "/projects/online/logo.svg",
      width: 300,
      height: 300,
    },
    repoUrl: "https://github.com/ed-cambel/cmsc127-final-project/tree/jp",
  },
  {
    slug: "trapscript",
    title: "TrapScript",
    summary:
      "A dynamically typed scripting language and its tree-walking interpreter, written from scratch in Rust.",
    role: "Co-creator",
    event: "CMSC 124",
    inProgress: true,
    description: [
      "TrapScript is a dynamically typed scripting language, with keywords styled on internet slang, and a tree-walking interpreter for it written from scratch in Rust.",
      "The whole front end is built by hand: a scanner that reports every lexical error, a recursive-descent parser that prints expression trees, and an evaluator with defined truthiness and comparison rules. Each stage has its own REPL, and scan, syntax and runtime errors exit with distinct codes.",
      "I'm building it with one partner. A CI test suite covers each language milestone; variables and control flow are next.",
    ],
    tech: ["Rust"],
    year: 2026,
    repoUrl: "https://github.com/ysxiaixsy/cmsc-124-rust",
  },
  {
    slug: "nadumduman",
    title: "Nadumduman",
    summary:
      "A visual novel set in Leganes, Iloilo. The title is Hiligaynon for “remembered.”",
    role: "Development",
    event: "School project",
    description: [
      "Nadumduman is a visual novel set in Leganes, Iloilo, made as a team school project. The title is Hiligaynon for “remembered.”",
      "It's built in Ren'Py, and its web build plays right in the browser. I worked on its development.",
    ],
    screenshot: {
      src: "/projects/nadumduman/screenshot.webp",
      alt: "Nadumduman's title screen: the paper-cut head logo and the title in gold script over photos of Leganes.",
      width: 1600,
      height: 900,
    },
    tech: ["Ren'Py", "Python"],
    year: 2026,
    logo: {
      src: "/projects/nadumduman/logo.png",
      darkSrc: "/projects/nadumduman/logo-white.png",
      width: 252,
      height: 256,
    },
    liveUrl: "https://ysxiaixsy.github.io/Nadumduman-1.0-web/",
    repoUrl: "https://github.com/ysxiaixsy/Nadumduman-1.0-web",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
