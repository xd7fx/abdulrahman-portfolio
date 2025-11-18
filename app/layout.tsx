import type { Metadata } from "next";
import { Orbitron, Exo_2 } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Abdulrahman Alnashri | Galactic AI Engineer",
  description: "AI & Robotics Engineer building futuristic systems that merge Machine Learning, Vision, and Autonomous Robotics into real-world applications.",
  keywords: ["AI Engineer", "Robotics", "Computer Vision", "Machine Learning", "Abdulrahman Alnashri"],
  authors: [{ name: "Abdulrahman Alnashri" }],
  openGraph: {
    title: "Abdulrahman Alnashri | Galactic AI Engineer",
    description: "Building autonomous systems and intelligent experiences",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-LFV0HR36W7"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LFV0HR36W7');
            `,
          }}
        />
      </head>
      <body
        className={`${orbitron.variable} ${exo2.variable} font-exo antialiased bg-space-dark text-white`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
