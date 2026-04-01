import type { ReactNode } from "react";

import { siteConfig } from "@/content/site";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  tone?: "default" | "muted" | "accent";
};

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

  return (
    <a
      className={`button button-${variant}`}
      href={href}
      rel={external ? "noreferrer" : undefined}
      target={external ? "_blank" : undefined}
    >
      <span>{label}</span>
      <span aria-hidden="true" className="button-arrow">
        -&gt;
      </span>
    </a>
  );
}

function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  tone = "default",
}: SectionProps) {
  return (
    <section className={`section section-${tone}`} id={id}>
      <div className="section-heading reveal">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="section-description">{description}</p>
      </div>
      {children}
    </section>
  );
}

export default function HomePage() {
  const portraitUrl = new URL("oskar-lidstrom-portrait.png", `${siteConfig.url}/`).toString();

  return (
    <main className="page-shell" id="main-content">
      <header className="site-header">
        <div className="brand-block">
          <a className="brand-mark" href="#top">
            <span className="brand-mark-monogram">OL</span>
            <span className="brand-mark-copy">
              <strong>{siteConfig.personName}</strong>
              <span>{siteConfig.role}</span>
            </span>
          </a>
        </div>

        <nav aria-label="Primary" className="nav-strip">
          {siteConfig.navItems.map((item) => (
            <a className="nav-link" href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <ActionButton href={siteConfig.bookingUrl} label="Book an Intro Call" variant="ghost" />
      </header>

      <section className="hero-section" id="top">
        <div className="hero-copy reveal reveal-delay-1">
          <p className="eyebrow">{siteConfig.hero.eyebrow}</p>
          <h1>{siteConfig.hero.title}</h1>
          <p className="hero-description">{siteConfig.hero.description}</p>

          <div className="hero-actions">
            <ActionButton
              href={siteConfig.hero.primaryCta.href}
              label={siteConfig.hero.primaryCta.label}
            />
            <ActionButton
              href={siteConfig.hero.secondaryCta.href}
              label={siteConfig.hero.secondaryCta.label}
              variant="secondary"
            />
          </div>

          <div className="hero-highlights" aria-label="Core focus areas">
            {siteConfig.hero.highlights.map((highlight) => (
              <span className="hero-highlight" key={highlight}>
                {highlight}
              </span>
            ))}
          </div>
        </div>

        <aside className="hero-panel reveal reveal-delay-2">
          <div className="hero-panel-intro">
            <div className="hero-portrait-frame">
              {/* next/image emitted a root-relative path in the static export, so use a plain img here. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={siteConfig.personName}
                className="hero-portrait-image"
                height={512}
                fetchPriority="high"
                src={portraitUrl}
                width={517}
              />
            </div>
            <p className="hero-panel-label">What Lidtech AB helps with</p>
          </div>
          <ul className="hero-panel-list">
            <li>Creating stronger cloud structure and governance</li>
            <li>Improving platform foundations and engineering workflows</li>
            <li>Strengthening DevOps and CI/CD delivery capability</li>
            <li>Implementing Infrastructure as Code for repeatable operations</li>
          </ul>

          <div className="hero-panel-foot">
            <span>Based in {siteConfig.location}</span>
            <span>Available for project and advisory work</span>
          </div>
        </aside>
      </section>

      <section aria-label="Selected facts" className="stats-grid reveal reveal-delay-2">
        {siteConfig.stats.map((item) => (
          <article className="stat-card" key={item.label}>
            <p className="stat-value">{item.value}</p>
            <p className="stat-label">{item.label}</p>
          </article>
        ))}
      </section>

      <Section
        id="services"
        eyebrow="Services"
        title="Services overview for modern cloud and platform capabilities."
        description="Lidtech AB helps organizations design, improve, and operate cloud and platform systems that are clear, repeatable, secure, scalable, and maintainable."
      >
        <div className="card-grid card-grid-services">
          {siteConfig.services.map((service, index) => (
            <article
              className="service-card reveal"
              key={service.title}
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              <div className="service-topline">
                <span className="service-index">0{index + 1}</span>
                <p>{service.bestFor}</p>
              </div>
              <h3>{service.title}</h3>
              <p className="service-summary">{service.summary}</p>
              <ul className="service-list">
                {service.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="why"
        eyebrow="Why Lidtech AB"
        title="Practical specialist support built for long-term technical value."
        description="Lidtech AB focuses on engineering-first outcomes that improve delivery capability, cloud structure, and technical quality without unnecessary complexity."
        tone="muted"
      >
        <div className="card-grid card-grid-value">
          {siteConfig.valueProps.map((item, index) => (
            <article
              className="value-card reveal"
              key={item.title}
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="proof"
        eyebrow="Engagement Formats"
        title="Start focused and expand only where it creates real value."
        description="Lidtech AB typically works through advisory workshops, fixed-scope projects, architecture and platform reviews, and retained advisory support."
      >
        <div className="card-grid card-grid-proof">
          {siteConfig.proof.map((item, index) => (
            <article
              className="proof-card reveal"
              key={item.title}
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              <p className="proof-context">{item.context}</p>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="about"
        eyebrow="About"
        title="What Lidtech AB does."
        description="Lidtech AB helps teams build stronger technical foundations so they can deliver faster, operate more reliably, and scale with less friction."
        tone="muted"
      >
        <div className="about-layout">
          <div className="about-copy reveal">
            {siteConfig.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <aside className="credentials-card reveal reveal-delay-1">
            <p className="credentials-label">Ideal clients</p>
            <h3>Organizations that value practical technical progress</h3>
            <ul className="credentials-list">
              <li>Companies modernizing cloud usage</li>
              <li>Teams improving delivery and platform maturity</li>
              <li>Organizations needing better cloud governance</li>
              <li>Businesses wanting senior support without heavy overhead</li>
              <li>Engineering teams that prefer practical solutions over consulting theatre</li>
            </ul>
            <p className="credentials-note">
              Whether you need a focused review, scoped implementation, or ongoing advisory support, the goal is the same: create better systems that help teams move faster with less friction.
            </p>
          </aside>
        </div>
      </Section>

      <Section
        id="process"
        eyebrow="How Lidtech AB Helps"
        title="Support designed for stronger structure, delivery, and platform maturity."
        description="Lidtech AB is designed for organizations that need practical technical guidance with measurable engineering outcomes."
        tone="accent"
      >
        <div className="process-grid">
          {siteConfig.process.map((item, index) => (
            <article
              className="process-card reveal"
              key={item.step}
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              <span className="process-step">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="faq"
        eyebrow="FAQ"
        title="Common questions before starting an engagement."
        description="Clear scope and practical collaboration are central to every engagement format."
      >
        <div className="faq-list">
          {siteConfig.faq.map((item) => (
            <details className="faq-item reveal" key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </Section>

      <section className="cta-panel reveal">
        <div>
          <p className="eyebrow">Final CTA</p>
          <h2>Need support with cloud architecture, platform engineering, DevOps, or Infrastructure as Code?</h2>
          <p className="section-description">
            Let’s discuss what would be most useful for your team.
          </p>
        </div>

        <div className="cta-actions">
          <ActionButton href={siteConfig.bookingUrl} label="Book an Intro Call" />
          <ActionButton
            href={`mailto:${siteConfig.email}`}
            label="Get in Touch"
            variant="secondary"
          />
        </div>
      </section>

      <Section
        id="contact"
        eyebrow="Contact"
        title="Direct, practical, and easy to reach."
        description="Start with an intro conversation or reach out directly for a focused technical review request."
        tone="muted"
      >
        <div className="contact-layout">
          <article className="contact-card reveal">
            <p className="contact-label">Primary contact</p>
            <a className="contact-email" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
            <p className="contact-text">
              Based in {siteConfig.location}. Available for advisory workshops,
              fixed-scope projects, architecture reviews, and retained advisory support.
            </p>
          </article>

          <div className="social-list reveal reveal-delay-1">
            {siteConfig.socials.map((link) => (
              <a
                className="social-link"
                href={link.href}
                key={link.label}
                rel="noreferrer"
                target="_blank"
              >
                <span className="social-short">{link.shortLabel}</span>
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </Section>

      <footer className="site-footer">
        <p>&copy; 2026 Lidtech AB</p>
        <div className="footer-links">
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
