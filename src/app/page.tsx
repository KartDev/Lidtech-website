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

        <ActionButton href={siteConfig.bookingUrl} label="Book a call" variant="ghost" />
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
          <p className="hero-panel-label">What founders bring me in for</p>
          <ul className="hero-panel-list">
            <li>Untangling slow delivery and fragile release flows</li>
            <li>Building clean AWS or Azure foundations before growth compounds complexity</li>
            <li>Designing serverless backends and integrations that stay operable in production</li>
            <li>Adding structure, governance, and observability without slowing the team down</li>
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
        title="Focused offers for startup teams that need senior technical leverage."
        description="The work is scoped to make meaningful technical progress quickly, whether that means cleaning up foundations, accelerating delivery, or building the backend layer behind ambitious product bets."
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
        eyebrow="Why Work With Me"
        title="The value is senior execution that balances speed, structure, and technical judgment."
        description="This is not a generic consulting layer. The work combines architecture, delivery, and real implementation experience from demanding environments, adapted for teams that need momentum."
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
        eyebrow="Selected Proof"
        title="Enterprise-grade delivery experience translated into practical outcomes."
        description="The background comes from real assignments across public sector, automotive, manufacturing, retail, and consulting environments. That experience shows up in the systems design, not just the resume."
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
        title="A solo consulting partner with cloud depth, delivery discipline, and a bias toward practical work."
        description="The consulting approach is shaped by platform engineering, DevOps, and architecture work that had to hold up under real operational pressure."
        tone="muted"
      >
        <div className="about-layout">
          <div className="about-copy reveal">
            {siteConfig.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <aside className="credentials-card reveal reveal-delay-1">
            <p className="credentials-label">Credentials snapshot</p>
            <h3>{siteConfig.role}</h3>
            <ul className="credentials-list">
              <li>AWS Certified DevOps Engineer - Professional</li>
              <li>AWS Certified Solutions Architect - Professional</li>
              <li>Microsoft Certified: DevOps Engineer Expert</li>
              <li>Azure Solutions Architect Expert (AZ-305)</li>
              <li>Google Cloud Engineer</li>
            </ul>
            <p className="credentials-note">
              Additional delivery background includes Terraform, Bicep, AWS CDK,
              GitHub Actions, GitLab CI/CD, OpenShift, Kubernetes, Python,
              PowerShell, and backend integration design.
            </p>
          </aside>
        </div>
      </Section>

      <Section
        id="process"
        eyebrow="Engagement Process"
        title="A compact working model designed for clarity and momentum."
        description="Every engagement should quickly create technical clarity, visible progress, and a clean handover path for the internal team."
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
        title="Straight answers for teams deciding whether a solo senior consultant is the right fit."
        description="The best engagements are the ones where scope, expectations, and working style are clear from the outset."
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
          <p className="eyebrow">Ready to move faster?</p>
          <h2>Bring in senior technical help before delivery friction becomes product drag.</h2>
          <p className="section-description">
            If you need sharper cloud foundations, a cleaner delivery system, or a
            reliable backend path for automation and AI-adjacent product work, we
            can start with a focused discovery call.
          </p>
        </div>

        <div className="cta-actions">
          <ActionButton href={siteConfig.bookingUrl} label="Book a discovery call" />
          <ActionButton
            href={`mailto:${siteConfig.email}`}
            label="Email directly"
            variant="secondary"
          />
        </div>
      </section>

      <Section
        id="contact"
        eyebrow="Contact"
        title="Direct, founder-friendly, and easy to reach."
        description="Use the booking link for a discovery conversation, or reach out directly if you already know the problem you want to solve."
        tone="muted"
      >
        <div className="contact-layout">
          <article className="contact-card reveal">
            <p className="contact-label">Primary contact</p>
            <a className="contact-email" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
            <p className="contact-text">
              Based in {siteConfig.location}. Available for remote-first consulting
              and targeted project engagements.
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
