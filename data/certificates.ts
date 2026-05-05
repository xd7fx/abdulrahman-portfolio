/**
 * Single source of truth for portfolio certificates.
 *
 * Translation keys (`titleKey`, `issuerKey`, `descriptionKey`) resolve through
 * `useLanguage().t(...)` against the `translations` object in
 * `contexts/LanguageContext.tsx`. Every key referenced here MUST exist in
 * both `en` and `ar` sections.
 *
 * Issuer names are translation-keyed for consistency, but for proper nouns
 * (TVTC, INE, Le Wagon) the Arabic value typically mirrors the English.
 *
 * Certificates are display-only — no detail-page route. Add new certs via the
 * `/add-certificate` Claude skill.
 */
export type Certificate = {
  /** Stable id used as React key. Lowercase, hyphenated. */
  id: string;
  /** Translation key for the certificate's title. */
  titleKey: string;
  /** Translation key for the issuing institution name. */
  issuerKey: string;
  /** Translation key for the short description. */
  descriptionKey: string;
  /** Year obtained, free-form (e.g. "2024", "2025"). */
  year: string;
  /** Tailwind gradient suffix used for the hover overlay. */
  color: string;
  /** Optional public credential / verification URL. */
  link?: string;
};

export const certificates: Certificate[] = [
  {
    id: "tvtc-robotics",
    titleKey: "tvtcRoboticsCertTitle",
    issuerKey: "tvtcRoboticsCertIssuer",
    descriptionKey: "tvtcRoboticsCertDesc",
    year: "2024",
    color: "from-blue-500 to-cyan-500",
    link: "https://mnar.sa/certification/check/24092168315271812353319",
  },
  {
    id: "smart-methods-robotics",
    titleKey: "smartMethodsRoboticsCertTitle",
    issuerKey: "smartMethodsRoboticsCertIssuer",
    descriptionKey: "smartMethodsRoboticsCertDesc",
    year: "2024",
    color: "from-purple-500 to-pink-500",
    link: "https://s-m.com.sa/smtc/td/ac/acceptance/robotics.php?email=d7.fx99@gmail.com",
  },
  {
    id: "tvtc-data-science",
    titleKey: "tvtcDataScienceCertTitle",
    issuerKey: "tvtcDataScienceCertIssuer",
    descriptionKey: "tvtcDataScienceCertDesc",
    year: "2024",
    color: "from-green-500 to-teal-500",
    link: "https://mnar.sa/certification/check/9LAUNOPDN3LFUD5ITVKD",
  },
  {
    id: "mcit-jr-data-scientist",
    titleKey: "mcitJrDataScientistCertTitle",
    issuerKey: "mcitJrDataScientistCertIssuer",
    descriptionKey: "mcitJrDataScientistCertDesc",
    year: "2025",
    color: "from-orange-500 to-red-500",
    link: "https://certs.ine.com/37d1b643-875f-4a41-86a7-c4f77e249ac2#acc.pd3njPve",
  },
  {
    id: "lewagon-bootcamp",
    titleKey: "lewagonBootcampCertTitle",
    issuerKey: "lewagonBootcampCertIssuer",
    descriptionKey: "lewagonBootcampCertDesc",
    year: "2025",
    color: "from-indigo-500 to-purple-500",
    link: "https://kitt.lewagon.com/schoolings/46132/public_diploma?token=cfe2ed6498504843710745125105efc0c3bf9758b6301f006ba76a9cc59929d3",
  },
  {
    id: "sda-q1-data-science",
    titleKey: "sdaQ1DataScienceCertTitle",
    issuerKey: "sdaQ1DataScienceCertIssuer",
    descriptionKey: "sdaQ1DataScienceCertDesc",
    year: "2025",
    color: "from-yellow-500 to-orange-500",
    link: "https://eu.credential.net/e970b79d-c2b2-4e98-b3ff-4c87408b01c2#acc.17ZyzK3x",
  },
];

export function getCertificateById(id: string): Certificate | undefined {
  return certificates.find((c) => c.id === id);
}

export function getAllCertificateIds(): string[] {
  return certificates.map((c) => c.id);
}
