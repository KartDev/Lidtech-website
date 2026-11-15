import type { Metadata } from "next";
import Link from "next/link";

import { assessmentConfig } from "@/content/assessment-config";
import { checklistConfig } from "@/content/checklist";
import { siteConfig } from "@/content/site";

const checklistUrl = new URL(checklistConfig.slug, `${siteConfig.url}/`).toString();
const portraitUrl = new URL("oskar-lidstrom-portrait.png", `${siteConfig.url}/`).toString();

function isExternalLink(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:");
}

function ActionButton({
  href,
  label,
  variant = "primary",
}: {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "ghost";
}) {
  const external = isExternalLink(href);
  const content = (
    <>
      <span>{label}</span>
      <span aria-hidden="true" className="button-arrow">
        -&gt;
      </span>
    </>
  );

  // Internal routes go through next/link so the GitHub Pages base path is applied.
  if (href.startsWith("/")) {
    return (
      <Link className={`button button-${variant}`} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <a
      className={`button button-${variant}`}
      href={href}
      rel={external ? "noreferrer" : undefined}
      target={external ? "_blank" : undefined}
    >
      {content}
    </a>
  );
}

export const metadata: Metadata = {
  title: checklistConfig.form.resourceName,
  description: checklistConfig.description,
  alternates: {
    canonical: checklistConfig.slug,
  },
  openGraph: {
    title: checklistConfig.form.resourceName,
    description: checklistConfig.description,
    url: checklistUrl,
    siteName: siteConfig.companyName,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: checklistConfig.form.resourceName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: checklistConfig.form.resourceName,
    description: checklistConfig.description,
    images: ["/og-image.svg"],
  },
};

export default function CloudPlatformReadinessChecklistPage() {
  return (
    <>
      <main className="lead-page-shell" id="main-content">
        <header className="lead-page-header">
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
            <ActionButton href={siteConfig.bookingUrl} label="Book an Intro Call" variant="ghost" />
          </div>
        </header>

        <section className="lead-hero">
          <div className="lead-hero-copy reveal reveal-delay-1">
            <p className="eyebrow">{checklistConfig.badge}</p>
            <h1>{checklistConfig.title}</h1>
            <p className="lead-hero-description">{checklistConfig.description}</p>

            <div className="lead-hero-stats" aria-label="Checklist quick facts">
              {checklistConfig.heroStats.map((item) => (
                <article className="lead-hero-stat" key={item.label}>
                  <p className="lead-hero-stat-value">{item.value}</p>
                  <p className="lead-hero-stat-label">{item.label}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="lead-form-card reveal reveal-delay-2" id="checklist-signup">
            <p className="lead-form-card-eyebrow">Free self-assessment</p>
            <h2 className="lead-form-card-title">Score your platform online</h2>
            <ul className="lead-form-card-list">
              <li>55 questions across 11 areas, one section per screen</li>
              <li>Section scores, an overall maturity band and your three weakest areas</li>
              <li>Results on screen and in your inbox</li>
            </ul>
            <ActionButton href={`${assessmentConfig.slug}/`} label="Start the assessment" />
            <p className="lead-form-card-note">
              Your answers stay in your browser until you ask for your results.{" "}
              <Link href="/privacy/">Privacy policy</Link>
            </p>
          </aside>
        </section>

        <section className="lead-section">
          <div className="lead-section-heading reveal">
            <p className="eyebrow">{checklistConfig.sectionHeading.eyebrow}</p>
            <h2>{checklistConfig.sectionHeading.title}</h2>
            <p className="section-description">{checklistConfig.sectionHeading.description}</p>
          </div>

          <div className="lead-areas-grid">
            {checklistConfig.areas.map((area, index) => (
              <article className="lead-area-card reveal" key={area.title}>
                <span className="lead-area-number">{index + 1}</span>
                <div className="lead-area-copy">
                  <h3>{area.title}</h3>
                  <p>{area.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="lead-audience-grid">
          {checklistConfig.audience.map((group) => (
            <article className="lead-audience-card reveal" key={group.title}>
              <p className="lead-card-label">{group.title}</p>
              <ul className="lead-audience-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="lead-author-card reveal">
          <div className="lead-author-portrait">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={checklistConfig.author.name}
              className="lead-author-image"
              height={512}
              src={portraitUrl}
              width={517}
            />
          </div>

          <div className="lead-author-copy">
            <p className="lead-card-label">Built by Lidtech</p>
            <h2>{checklistConfig.author.name}</h2>
            <p className="lead-author-role">{checklistConfig.author.role}</p>
            <p>{checklistConfig.author.summary}</p>
          </div>
        </section>

        <section className="lead-bottom-cta reveal">
          <div className="lead-bottom-copy">
            <p className="eyebrow">{checklistConfig.closingCta.eyebrow}</p>
            <h2>{checklistConfig.closingCta.title}</h2>
            <p className="section-description">{checklistConfig.closingCta.description}</p>
          </div>

          <div className="lead-bottom-actions">
            <ActionButton href={`${assessmentConfig.slug}/`} label="Start the assessment" />
            <ActionButton href={siteConfig.bookingUrl} label="Book an Intro Call" variant="secondary" />
          </div>
        </section>

        <footer className="site-footer lead-page-footer">
          <p>&copy; 2026 {siteConfig.companyName}</p>
          <div className="footer-links">
            <Link href="/">Main site</Link>
          <Link href="/privacy/">Privacy policy</Link>
            {siteConfig.socials.map((link) => (
              <a href={link.href} key={link.label} rel="noreferrer" target="_blank">
                {link.label}
              </a>
            ))}
          </div>
        </footer>
      </main>
    </>
  );
}
