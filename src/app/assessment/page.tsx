import type { Metadata } from "next";
import Link from "next/link";

import { assessmentConfig } from "@/content/assessment-config";
import { scoreLabels, scoreValues } from "@/content/assessment-data";
import { siteConfig } from "@/content/site";

import AssessmentApp from "./AssessmentApp";
import "./assessment.css";

const title = "Cloud Platform Readiness Assessment";
const description =
  "Score your cloud platform across 11 areas and 55 questions. Get section scores, an overall maturity band and your three weakest areas.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${assessmentConfig.slug}/` },
  openGraph: {
    title,
    description,
    url: new URL(`${assessmentConfig.slug}/`, `${siteConfig.url}/`).toString(),
    siteName: siteConfig.companyName,
    type: "website",
    locale: "en_US",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: title }],
  },
};

export default function AssessmentPage() {
  return (
    <main className="lead-page-shell" id="main-content">
      <header className="lead-page-header assessment-no-print">
        <Link className="brand-mark" href="/">
          <span className="brand-mark-monogram">OL</span>
          <span className="brand-mark-copy">
            <strong>{siteConfig.companyName}</strong>
            <span>{siteConfig.role}</span>
          </span>
        </Link>
        <div className="lead-page-header-actions">
          <Link className="lead-page-home-link" href="/">
            Back to main site
          </Link>
        </div>
      </header>

      <section className="assessment-intro">
        <p className="eyebrow">Free self-assessment</p>
        <h1>{title}</h1>
        <p className="section-description">
          Score each question from 1 to 4. One section per screen, 11 sections in total. Your answers are saved in this
          browser, so you can refresh or come back later.
        </p>
        <ul className="assessment-legend" aria-label="Scoring guide">
          {scoreValues.map((value) => (
            <li key={value}>
              <span className={`assessment-legend-badge assessment-option-${value}`}>{value}</span>
              {scoreLabels[value]}
            </li>
          ))}
        </ul>
      </section>

      <AssessmentApp />

      <footer className="site-footer lead-page-footer assessment-no-print">
        <p>&copy; 2026 {siteConfig.companyName}</p>
        <div className="footer-links">
          <Link href="/">Main site</Link>
          {siteConfig.socials.map((link) => (
            <a href={link.href} key={link.label} rel="noreferrer" target="_blank">
              {link.label}
            </a>
          ))}
        </div>
      </footer>
    </main>
  );
}
