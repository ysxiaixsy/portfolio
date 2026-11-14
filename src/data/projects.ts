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
  // The case study on the project's page, read top to bottom.
  story: {
    // What it is and the problem it answers.
    overview: string[];
    // What I did on it.
    role: string[];
    // The calls that shaped it, each with a short title.
    decisions?: { title: string; body: string }[];
    // Where it stands now.
    status: string;
  };
  // Files live in /public/projects/<slug>/.
  screenshot?: { src: string; alt: string; width: number; height: number };
  tech: string[];
  year: number;
  // Projects without one show their name as text.
  logo?: ProjectLogo;
  // Still being built: the card and page say so.
  inProgress?: boolean;
  // Shown up front on the home page; the rest sit behind "See all".
  featured?: boolean;
  liveUrl?: string;
  repoUrl?: string;
};

// Featured projects first, then the rest. Ship the logo or wordmark whenever
// the project has one.
export const projects: Project[] = [
  {
    slug: "sackto",
    featured: true,
    title: "SACKTO",
    summary:
      "Post-harvest capacity planning for the Iloilo Rice Processing Complex, with an SMS channel for farmers and buyers.",
    role: "Brand, UI/UX design & development",
    event: "Hack Iloilo 2026",
    story: {
      overview: [
        "The Iloilo Rice Processing Complex can't see palay coming until it reaches the gate. At peak, dryers overflow and farmers turn to private mills; off-season, machines sit idle while power costs keep running. SACKTO shows the plant what's coming weeks ahead and suggests what to do about it.",
        "Farmers and buyers report what's coming by SMS or on the web: booking drying or milling, offering palay for sale, getting price quotes, or requesting rice. Staff run the day from one gate queue and one batch record, from receiving to dispatch.",
      ],
      role: [
        "I designed SACKTO's brand, including its wordmark, and its UI, every screen of it, and worked on planning and development from start to finish, on a four-person team.",
      ],
      decisions: [
        {
          title: "Reachable from a basic phone",
          body: "Basic phones reach it through an Android SMS gateway and a webhook relay, so booking and selling don't need a smartphone or an app.",
        },
        {
          title: "The LLM reads, it never counts",
          body: "An LLM parses free-text messages, but it never computes figures.",
        },
        {
          title: "Plan from a forecast, not the gate",
          body: "Bookings, sell offers and a harvest forecast trained offline in Python feed a capacity view for the dryers, storage and mill, which suggests moving flexible bookings off busy days or texting farmers ahead of idle stretches.",
        },
      ],
      status:
        "Built for Hack Iloilo 2026 as a single Next.js app on Supabase, and live on the web.",
    },
    screenshot: {
      src: "/projects/sackto/screenshot.webp",
      alt: "SACKTO's home page, with options to book drying or milling, sell palay and buy rice, above today's prices.",
      width: 1600,
      height: 1000,
    },
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Vercel AI SDK",
      "Python",
      "Vercel",
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
    slug: "rateupv",
    featured: true,
    title: "RateUPV",
    summary:
      "Student-driven reviews of UP Visayas campus facilities and services, like Rate My Professors for the places around campus.",
    role: "Lead, UI/UX design & full-stack development",
    event: "CMSC 126 final project",
    story: {
      overview: [
        "RateUPV is an independent, student-built guide to UP Visayas facilities and services, starting with the Miagao campus. It helps students find the right place, arrive prepared, and pass on what they learned to the next person.",
        "Each place page brings together what to prepare, location, contacts and hours, with the source and the date each detail was checked, plus a campus map that loads on demand and walking directions. Students sign in with their UP email to write reviews, join discussions, suggest missing places and send corrections, and moderators work from an inbox and a catalog editor.",
      ],
      role: [
        "I led a four-person team, designed the UI, and worked across the full stack, including leading the rebuild into the current Next.js version.",
      ],
      decisions: [
        {
          title: "Rebuilt without losing anyone",
          body: "I led the rebuild from a Vite app into Next.js, with server-rendered public pages, while keeping every existing account, place and review and redirecting the old URLs.",
        },
        {
          title: "The database is the API",
          body: "Postgres row-level security guards every write, so there's no separate API server to keep in step.",
        },
        {
          title: "Security as part of the design",
          body: "UP-email accounts, row-level security on every table, locked-down database functions, security headers, and a moderator inbox to hide, restore and archive content.",
        },
        {
          title: "Tested end to end",
          body: "Unit, database and end-to-end Playwright tests cover it.",
        },
      ],
      status:
        "Started as a CMSC 126 final project and kept going after the course. It's live, starting with the Miagao campus.",
    },
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
      "Vitest",
      "Playwright",
      "Vercel",
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
    slug: "tavern-card-game",
    title: "Tavern Card Game",
    summary:
      "A mobile recreation of Gwent, the card game from The Witcher 3, with AI opponents and online play.",
    role: "Solo developer",
    story: {
      overview: [
        "Tavern Card Game is a mobile version of Gwent, the card game from The Witcher 3: Wild Hunt. It has three AI difficulties, all four base-game factions, leader variants, a deck builder that saves your decks, and online matches from a room code.",
      ],
      role: ["I built it alone, all 94 commits, from June to July 2026."],
      decisions: [
        {
          title: "A deterministic engine",
          body: "The game engine is pure TypeScript with seeded randomness, so any seed replays the same match. More than 170 engine and AI tests cover it, along with a terminal simulator that plays bot-vs-bot games.",
        },
        {
          title: "The server checks every move",
          body: "Online matches run through a Supabase Edge Function that checks every move with the same engine the app runs.",
        },
        {
          title: "Each player sees only their own view",
          body: "Row-level security hides the full game state, so each player only receives their own view, and Realtime updates handle reconnecting and resuming.",
        },
      ],
      status:
        "Playable as a standalone Android build. It's a non-commercial fan project: the card names belong to CD PROJEKT RED, and all the art is placeholder art drawn in code.",
    },
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
    slug: "solnexus",
    title: "SolNexus",
    summary:
      "A lead and client communication pipeline for SolTech EMR that gathers lead conversations into one searchable system and shows which leads need a follow-up today.",
    role: "Full-stack development, lead UI/UX design & Scrum Master",
    event: "CMSC 128/129, for a real client",
    inProgress: true,
    story: {
      overview: [
        "SolTech EMR tracked its leads in a spreadsheet by hand. SolNexus, built by a five-person team with SolTech as a real client, replaces it with a daily follow-up list and a searchable history for each clinic.",
      ],
      role: [
        "I'm the team's Scrum Master and lead UI/UX designer. I drew the wireframes, built the React frontend foundation (routing, the API client and a mock mode), and built staff sign-in end to end.",
      ],
      decisions: [
        {
          title: "A medallion-architecture pipeline",
          body: "Gmail is ingested into PostgreSQL bronze tables, dbt builds silver models for leads and interactions, and Apache Airflow orchestrates it with retries.",
        },
        {
          title: "Sign-in that signs you out",
          body: "Staff sign-in runs on FastAPI sessions and protected routes with an 8-hour idle timeout, from the login page to its tests.",
        },
      ],
      status:
        "In progress for CMSC 128/129. Messenger and Viber ingestion are planned next.",
    },
    screenshot: {
      src: "/projects/solnexus/screenshot.webp",
      alt: "A SolNexus wireframe of the dashboard: the clinics to call today, each with its contact, status and last contact, above the full list of clinics.",
      width: 1440,
      height: 900,
    },
    tech: [
      "React",
      "Vite",
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
    slug: "trapscript",
    title: "TrapScript",
    summary:
      "A dynamically typed scripting language and its tree-walking interpreter, written from scratch in Rust.",
    role: "Co-creator",
    event: "CMSC 124",
    inProgress: true,
    story: {
      overview: [
        "TrapScript is a dynamically typed scripting language, with keywords styled on internet slang, and a tree-walking interpreter for it written from scratch in Rust.",
      ],
      role: ["I'm building it with one partner, for CMSC 124."],
      decisions: [
        {
          title: "A front end built by hand",
          body: "A scanner that reports every lexical error, a recursive-descent parser that prints expression trees, and an evaluator with defined truthiness and comparison rules.",
        },
        {
          title: "Every stage on its own",
          body: "Each stage has its own REPL, and scan, syntax and runtime errors exit with distinct codes.",
        },
        {
          title: "Tested at every milestone",
          body: "A CI test suite covers each language milestone.",
        },
      ],
      status: "In progress: variables and control flow are next.",
    },
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
    story: {
      overview: [
        "Nadumduman is a visual novel set in Leganes, Iloilo, made as a team school project in Ren'Py. The title is Hiligaynon for “remembered.”",
      ],
      role: ["I worked on its development."],
      status: "Its web build plays right in the browser.",
    },
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

// Where a project stands, from what its entry says: still being built, up
// at a public address, or finished without one.
export function projectStatus(project: Project) {
  if (project.inProgress) return "In progress";
  return project.liveUrl ? "Live" : "Complete";
}

// A project's place in the list, as a two-digit quest number: "01", "02", …
export function projectNumber(project: Project) {
  return String(projects.indexOf(project) + 1).padStart(2, "0");
}

// The project after this one, wrapping from the last back to the first.
export function nextProject(project: Project) {
  return projects[(projects.indexOf(project) + 1) % projects.length];
}
