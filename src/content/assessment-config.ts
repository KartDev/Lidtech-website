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
     * Form action from the "HTML code" embed of form 7XJPTU (account 2348072).
     * If a new form is created for the assessment, replace this with that form's action URL.
     */
    formAction: "https://assets.mailerlite.com/jsonp/2348072/forms/187449423478916726/subscribe",
  },

  consentText:
    "By submitting, you get your results and occasional emails from Lidtech AB. Your answers are stored with your email so follow-up is relevant to you. Unsubscribe any time.",
} as const;
