/**
 * Single source of truth for all portfolio projects.
 *
 * Translation keys (`titleKey`, `descriptionKey`, `achievementKeys`, optional
 * `longDescriptionKey`) resolve through `useLanguage().t(...)` against the
 * `translations` object in `contexts/LanguageContext.tsx`. Every key referenced
 * here MUST exist in both `en` and `ar` sections of that file.
 *
 * To add a new project, prefer the `/add-project` Claude skill — it wires up
 * this file, the translation keys, and the detail-page route in one step.
 */
export type Project = {
  /** URL slug used by /projects/[slug]. Lowercase, hyphenated, ASCII only. */
  slug: string;
  /** Translation key for the localized title (e.g. "sabaqTitle"). */
  titleKey: string;
  /** Canonical English title. Used for `alt`, OpenGraph, and accessibility — do not translate. */
  titleEn: string;
  /** Single emoji shown on the card and detail hero. */
  emoji: string;
  /** Translation key for the short description (1–3 sentences). Used on cards. */
  descriptionKey: string;
  /** Optional translation key for an extended write-up shown on the detail page. */
  longDescriptionKey?: string;
  /** Card image. Either a path under /public or a remote URL allow-listed in next.config.mjs. */
  image: string;
  /** Optional additional images shown as a gallery on the detail page. */
  gallery?: string[];
  /** Tech stack chips. English/proper-noun only — these are not translated. */
  tech: string[];
  /** Translation keys for bullet-point achievements. */
  achievementKeys: string[];
  /** GitHub repo URL. */
  github?: string;
  /** Live demo / Figma / deployment URL. */
  demo?: string;
  /** Optional video walkthrough URL (YouTube, etc.). Surfaced only on the detail page. */
  video?: string;
  /** Tailwind gradient suffix used by the card overlay (e.g. "from-indigo-500 to-purple-600"). */
  color: string;
  /** Optional partner/org logo path under /public. */
  logo?: string;
  logoAlt?: string;
  /** Tailwind sizing utilities for the logo box (e.g. "w-20 h-12"). */
  logoSize?: string;
  /** Free-form year/timeframe label (e.g. "2025"). Shown on detail page. */
  year?: string;
  /** Free-form role label (e.g. "Team Leader"). Shown on detail page. */
  role?: string;
};

export const projects: Project[] = [
  {
    slug: "sabaq",
    titleKey: "sabaqTitle",
    titleEn: "SABAQ: Proactive AI Customer Service Agent",
    emoji: "🤖",
    descriptionKey: "sabaqDesc",
    image: "/projects/sabaq.jpg",
    tech: ["Qwen", "AutoGluon", "LangGraph", "n8n", "Multi-Agent AI", "Flask"],
    achievementKeys: ["sabaqAch1", "sabaqAch2", "sabaqAch3", "sabaqAch4"],
    demo: "https://sabeq-system.netlify.app/",
    color: "from-indigo-500 to-purple-600",
    year: "2025",
    role: "Team Leader",
  },
  {
    slug: "yamamah",
    titleKey: "yamamahTitle",
    titleEn: "YAMAMAH Rescue Drone",
    emoji: "🚁",
    descriptionKey: "yamamahDesc",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=600&fit=crop",
    tech: ["GPT-4 Vision", "n8n", "Raspberry Pi", "mmWave", "Weather AI", "Autonomous Control"],
    achievementKeys: ["yamamahAch1", "yamamahAch2", "yamamahAch3", "yamamahAch4"],
    github: "https://github.com/Rakan2008/yamama-rescue-drone",
    color: "from-space-cyan to-space-blue",
    logo: "/logos/yamama-logo.png",
    logoAlt: "YAMAMAH",
    logoSize: "w-25 h-9",
    year: "2025",
    role: "Technical Supervisor",
  },
  {
    slug: "hekaya",
    titleKey: "heritageTitle",
    titleEn: "Hekaya — Heritage Intelligence",
    emoji: "🕌",
    descriptionKey: "heritageDesc",
    image: "/projects/hekaya-main.jpg",
    tech: ["YOLOv8", "Google Gemini", "LangChain", "Computer Vision", "Streamlit", "Cultural AI"],
    achievementKeys: ["heritageAch1", "heritageAch2", "heritageAch3", "heritageAch4"],
    github: "https://github.com/xd7fx/Hekaya",
    color: "from-purple-600 to-space-blue",
    logo: "/logos/sda-logo.png",
    logoAlt: "Saudi Digital Academy",
    logoSize: "w-20 h-12",
  },
  {
    slug: "v-tac",
    titleKey: "footballTitle",
    titleEn: "V-TAC — Tactical AI Coach",
    emoji: "⚽",
    descriptionKey: "footballDesc",
    image: "/projects/vtac-main.jpg",
    tech: ["AutoGluon", "Streamlit", "Whisper", "Python", "ML Prediction", "Data Analytics"],
    achievementKeys: ["footballAch1", "footballAch2", "footballAch3", "footballAch4"],
    github: "https://github.com/xd7fx/V-TAC",
    color: "from-space-lava to-orange-600",
    logo: "/logos/sda-logo.png",
    logoAlt: "Saudi Digital Academy",
    logoSize: "w-15 h-12",
  },
  {
    slug: "weather-iot",
    titleKey: "weatherIoTTitle",
    titleEn: "IoT Weather Monitoring & Analytics System",
    emoji: "🌤️",
    descriptionKey: "weatherIoTDesc",
    image: "/projects/weather-iot.jpg",
    tech: ["ESP32", "IoT", "ThingSpeak", "DHT Sensor", "AI Analytics", "Cloud Computing"],
    achievementKeys: ["weatherIoTAch1", "weatherIoTAch2", "weatherIoTAch3", "weatherIoTAch4"],
    demo: "https://lnkd.in/exKUhgUb",
    color: "from-sky-400 to-blue-600",
  },
  {
    slug: "mostadaam",
    titleKey: "mostadaamTitle",
    titleEn: "Mostadaam: Sustainable Waste-to-Rewards Platform",
    emoji: "♻️",
    descriptionKey: "mostadaamDesc",
    image: "/projects/mostadaam.jpg",
    tech: ["UI/UX Design", "Facial Recognition", "Barcode Scanning", "Nusuk Integration", "Figma", "Sustainability"],
    achievementKeys: ["mostadaamAch1", "mostadaamAch2", "mostadaamAch3", "mostadaamAch4"],
    demo: "https://www.figma.com/proto/AzwYCsQrkIerJjxhtHAAV4/مستدام?node-id=14-13&p=f&t=riyqkL2c9Cp1Jpt7-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
    color: "from-green-400 to-emerald-600",
  },
  {
    slug: "self-driving-car",
    titleKey: "selfDrivingTitle",
    titleEn: "Self-Driving Car Using CV, ROS, and Jetson Nano",
    emoji: "🚗",
    descriptionKey: "selfDrivingDesc",
    image: "/projects/self-driving.jpg",
    tech: ["OpenCV", "ROS", "Jetson Nano", "Computer Vision", "Arduino", "Python"],
    achievementKeys: ["selfDrivingAch1", "selfDrivingAch2", "selfDrivingAch3", "selfDrivingAch4"],
    github: "https://github.com/xd7fx/Self-Driving-Car-with-CV-and-Arduino",
    color: "from-green-500 to-teal-600",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
