// Settings for /assessment. Values left as null are TODOs for Oskar: never invent them.

export const assessmentConfig = {
  slug: "/assessment",
  storageKey: "lidtech-cpr-assessment-v1",

  /** Privacy policy page. The email gate stays disabled in production builds if this is null. */
  privacyPolicyUrl: "/privacy/" as string | null,

  /** TODO(Oskar): Lemon Squeezy checkout URL for Cloud Platform Readiness Checklist Pro. */
  proUrl: null as string | null,

  discoveryCallUrl: "https://calendly.com/oskar-lidtech/introduction",

  mailerLite: {
    /**
     * Action URL from the "HTML code" embed of the "CPR Assessment (site)" form (account 2348072).
     * This form carries the cpr_* fields and adds subscribers to the "CPR Assessment" group, which
     * triggers the results email. It is never rendered; this page posts to it directly.
     * Do not use the landing-page form 7XJPTU here: it has only name and email.
     */
    formAction: "https://assets.mailerlite.com/jsonp/2348072/forms/204218347895654215/subscribe",
  },

  consentText:
    "By submitting, you get your results and occasional emails from Lidtech AB. Your answers are stored with your email so follow-up is relevant to you. Unsubscribe any time.",
} as const;
