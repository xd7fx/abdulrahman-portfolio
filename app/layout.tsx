import type { Metadata, Viewport } from "next";
import { Orbitron, Exo_2 } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://abdulrahman-portfolio.vercel.app";
const siteName = "Abdulrahman Alnashri | AI & Robotics Engineer";
const description =
  "AI & Robotics Engineer building intelligent systems that merge Machine Learning, Computer Vision, and Autonomous Robotics. WRO Saudi Arabia 2025 winner & Best Engineer 2024.";

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
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abdulrahman Alnashri — AI & Robotics Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
    images: ["/og-image.png"],
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
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
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
  name: "Abdulrahman Alnashri",
  givenName: "Abdulrahman",
  familyName: "Alnashri",
  url: siteUrl,
  email: "abdulrahman.alnashri9@gmail.com",
  jobTitle: "AI & Robotics Engineer",
  description,
  image: `${siteUrl}/og-image.png`,
  sameAs: [
    "https://github.com/XD7FX",
    "https://linkedin.com/in/abdulrahman-alnashri",
  ],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "University of Jeddah" },
    { "@type": "EducationalOrganization", name: "Le Wagon × Saudi Digital Academy" },
  ],
  knowsAbout: [
    "Artificial Intelligence",
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
        className={`${orbitron.variable} ${exo2.variable} font-exo antialiased bg-space-dark text-white selection:bg-space-cyan/40 selection:text-white`}
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
