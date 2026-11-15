import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/content/site";

import "./privacy.css";

// Last reviewed by Oskar Lidstrom: TODO(Oskar) review this text before merging. It describes the
// data flows in this repo as of the date below. Update it when a service or form changes.
const lastUpdated = "15 November 2026";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Lidtech AB handles personal data collected through lidtech.se.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
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
        </div>
      </header>

      <article className="privacy-card">
        <p className="eyebrow">Privacy</p>
        <h1>Privacy policy</h1>
        <p className="privacy-updated">Last updated: {lastUpdated}</p>

        <section>
          <h2>Who is responsible for your data</h2>
          <p>
            Lidtech AB, Stockholm, Sweden, is the controller for the personal data described here. For any question
            about your data or to use your rights, email{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
          </p>
        </section>

        <section>
          <h2>What we collect and why</h2>
          <h3>Cloud Platform Readiness Assessment</h3>
          <p>
            While you answer the assessment, your answers are saved only in your own browser (local storage) so you can
            refresh or come back later. They are not sent anywhere until you ask for your results.
          </p>
          <p>When you submit the email form to see your results, we receive:</p>
          <ul>
            <li>your first name and email address</li>
            <li>
              your assessment scores: overall total and average, maturity band, the average for each of the 11 areas,
              and the names of your three lowest-scoring areas
            </li>
          </ul>
          <p>
            Your individual answers to the 55 questions are not sent, only the scores above. We use this data to show
            and send you your results, and to send you occasional emails from Lidtech AB that are relevant to your
            scores.
          </p>

          <h3>Earlier checklist sign-ups</h3>
          <p>
            If you requested the checklist through our earlier sign-up form, we hold your name and email address and
            use them to send you occasional emails from Lidtech AB.
          </p>

          <h3>Email contact and booked calls</h3>
          <p>
            If you email us or book a call, we use the details you give us to reply and to prepare for the
            conversation.
          </p>
        </section>

        <section>
          <h2>Legal basis</h2>
          <p>
            Emails to you and storing your scores with your email address are based on your consent (GDPR Article
            6(1)(a)), given when you submit a form. You can withdraw consent at any time by using the unsubscribe link
            in any email or by emailing us. Withdrawing does not affect processing that happened before. Replies to
            your own emails and booked calls are based on our legitimate interest in answering your request (Article
            6(1)(f)).
          </p>
        </section>

        <section>
          <h2>Services that process data for us</h2>
          <ul>
            <li>
              <strong>MailerLite</strong> stores our email list, including the names, email addresses and assessment
              scores described above, and sends our emails. See{" "}
              <a href="https://www.mailerlite.com/legal/privacy-policy" rel="noreferrer" target="_blank">
                MailerLite&apos;s privacy policy
              </a>
              .
            </li>
            <li>
              <strong>Calendly</strong> handles call bookings. When you book through a Calendly link, Calendly
              processes the details you enter under its own terms. See{" "}
              <a href="https://calendly.com/privacy" rel="noreferrer" target="_blank">
                Calendly&apos;s privacy notice
              </a>
              .
            </li>
            <li>
              <strong>GitHub Pages</strong> hosts this website. Like any web host, it processes technical data such as
              your IP address when your browser loads a page. See{" "}
              <a
                href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
                rel="noreferrer"
                target="_blank"
              >
                GitHub&apos;s privacy statement
              </a>
              .
            </li>
          </ul>
          <p>
            Some of these providers may process data outside the EU/EEA. Where they do, they rely on safeguards such as
            the EU Standard Contractual Clauses or the EU-US Data Privacy Framework, as set out in their own terms.
          </p>
          <p>We do not sell your personal data, and this site does not use advertising or analytics cookies.</p>
        </section>

        <section>
          <h2>How long we keep it</h2>
          <p>
            We keep your name, email address and scores for as long as you stay subscribed. If you unsubscribe, we stop
            sending emails. If you ask us to delete your data, we delete it from our email list, apart from what we
            need to keep to make sure you are not emailed again.
          </p>
          <p>
            Assessment answers saved in your browser stay there until you choose &quot;Start over&quot; or clear your
            browser data.
          </p>
        </section>

        <section>
          <h2>Your rights</h2>
          <p>
            You have the right to access your personal data, to have it corrected or deleted, to restrict or object to
            its processing, to receive it in a portable format, and to withdraw consent at any time. Email{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> to use any of these rights.
          </p>
          <p>
            You can also complain to the Swedish Authority for Privacy Protection (Integritetsskyddsmyndigheten, IMY) at{" "}
            <a href="https://www.imy.se" rel="noreferrer" target="_blank">
              imy.se
            </a>
            .
          </p>
        </section>

        <section>
          <h2>Automated decisions</h2>
          <p>
            Your maturity band is calculated automatically from your own answers. It is a self-assessment result only
            and is not used to make decisions that have legal or similarly significant effects on you.
          </p>
        </section>

        <section>
          <h2>Changes</h2>
          <p>If we change how we handle personal data, we will update this page and the date at the top.</p>
        </section>
      </article>

      <footer className="site-footer lead-page-footer">
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
