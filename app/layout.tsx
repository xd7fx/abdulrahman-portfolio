import { site } from "@/data/site";
import type { Metadata, Viewport } from "next";
import { Orbitron, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = site.url;
const siteName = "Abdulrahman Alnashri | AI Engineer at Zid";
const description =
  "AI Engineer at Zid building AI products for e-commerce, KawnGraph for coding agents, and applied robotics projects. Explore projects, mentoring, awards, and verified credentials.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: "%s | Abdulrahman Alnashri",
  },
  description,
  keywords: [
    "Abdulrahman Alnashri",
    "AI Engineer",
    "Robotics Engineer",
    "Computer Vision",
    "Machine Learning",
    "Deep Learning",
    "ROS",
    "Saudi Arabia",
    "WRO 2025",
    "Drone Engineering",
    "Autonomous Systems",
  ],
  authors: [{ name: "Abdulrahman Alnashri", url: siteUrl }],
  creator: "Abdulrahman Alnashri",
  publisher: "Abdulrahman Alnashri",
  alternates: {
    canonical: siteUrl,
    languages: {
      en: `${siteUrl}/?lang=en`,
      ar: `${siteUrl}/?lang=ar`,
    },
  },
  openGraph: {
    type: "website",
    siteName,
    title: siteName,
    description,
    url: siteUrl,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Abdulrahman Alnashri — AI Engineer at Zid",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
    images: ["/opengraph-image"],
    creator: "@xd7fx",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  manifest: "/manifest.webmanifest",
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#0A0F2D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: "Abdulrahman Alnashri",
  givenName: "Abdulrahman",
  familyName: "Alnashri",
  url: siteUrl,
  email: "abdulrahman.alnashri9@gmail.com",
  jobTitle: "AI Engineer",
  worksFor: { "@type": "Organization", name: "Zid" },
  description,
  image: `${siteUrl}/opengraph-image`,
  sameAs: [
    site.github,
    site.linkedin,
  ],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "University of Jeddah" },
    { "@type": "EducationalOrganization", name: "Le Wagon × Saudi Digital Academy" },
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Generative AI",
    "Agentic AI",
    "Model Context Protocol",
    "Robotics",
    "Computer Vision",
    "Machine Learning",
    "ROS",
    "Embedded Systems",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "SA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${orbitron.variable} ${spaceGrotesk.variable} font-sans antialiased bg-space-dark text-white selection:bg-space-cyan/40 selection:text-white`}
      >
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[10000] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-space-cyan focus:text-space-dark focus:font-semibold"
        >
          Skip to content
        </a>
        <LanguageProvider>{children}</LanguageProvider>

        <Script
          id="person-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LFV0HR36W7"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LFV0HR36W7', { anonymize_ip: true });
          `}
        </Script>
      </body>
    </html>
  );
}
