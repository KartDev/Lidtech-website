export type NavItem = {
  label: string;
  href: `#${string}` | `/${string}`;
};

export type ActionLink = {
  label: string;
  href: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type ServiceItem = {
  title: string;
  summary: string;
  bullets: string[];
  bestFor: string;
};

export type ValuePropItem = {
  title: string;
  description: string;
};

export type ProofItem = {
  title: string;
  context: string;
  detail: string;
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type SocialLink = ActionLink & {
  shortLabel: string;
};

export type SiteConfig = {
  companyName: string;
  personName: string;
  role: string;
  location: string;
  email: string;
  url: string;
  bookingUrl: string;
  meta: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: ActionLink;
    secondaryCta: ActionLink;
    highlights: string[];
  };
  navItems: NavItem[];
  stats: StatItem[];
  services: ServiceItem[];
  valueProps: ValuePropItem[];
  proof: ProofItem[];
  about: string[];
  process: ProcessStep[];
  faq: FaqItem[];
  socials: SocialLink[];
};
