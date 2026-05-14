import type {
  FaqItem,
  ProcessStep,
  ProofItem,
  ServiceItem,
  SiteConfig,
  SocialLink,
  StatItem,
  ValuePropItem,
} from "@/lib/types";

const stats: StatItem[] = [
  { value: "Cloud Architecture", label: "Scalable, secure cloud foundations" },
  { value: "Platform Engineering", label: "Reusable internal platforms and workflows" },
  { value: "DevOps & CI/CD", label: "Reliable delivery pipelines and release practices" },
  { value: "Infrastructure as Code", label: "Repeatable, version-controlled infrastructure" },
];

const services: ServiceItem[] = [
  {
    title: "Cloud Architecture",
    summary:
      "Design cloud foundations that are scalable, secure, and aligned with how teams actually work.",
    bullets: [
      "Cloud foundation and architecture baseline design",
      "Security and reliability considerations built in early",
      "Practical architecture aligned to delivery reality",
    ],
    bestFor: "Best for organizations modernizing cloud usage and structure.",
  },
  {
    title: "Platform Engineering",
    summary:
      "Improve internal platforms, developer workflows, and reusable technical foundations.",
    bullets: [
      "Developer experience and platform capability improvements",
      "Reusable patterns and standards for engineering teams",
      "Technical foundations that reduce friction over time",
    ],
    bestFor: "Best for teams improving platform maturity and engineering flow.",
  },
  {
    title: "DevOps & CI/CD",
    summary:
      "Build more reliable delivery pipelines and stronger deployment workflows.",
    bullets: [
      "Pipeline design and implementation for safer releases",
      "Deployment workflow improvements and operational reliability",
      "Delivery practices that support team velocity",
    ],
    bestFor: "Best for teams that need better delivery capability.",
  },
  {
    title: "Infrastructure as Code",
    summary:
      "Create repeatable, version-controlled infrastructure using tools like Terraform and Bicep.",
    bullets: [
      "Infrastructure patterns defined as reusable code",
      "Version control and reviewable infrastructure changes",
      "Consistency across environments and teams",
    ],
    bestFor: "Best for organizations that need maintainable cloud operations.",
  },
  {
    title: "Cloud Governance",
    summary:
      "Improve structure, standards, and cloud operating models without blocking delivery.",
    bullets: [
      "Cloud standards and policy alignment",
      "Governance models that support team autonomy",
      "Structure that scales with organizational growth",
    ],
    bestFor: "Best for organizations needing better cloud governance and clarity.",
  },
  {
    title: "Technical Advisory",
    summary:
      "Get senior technical guidance without needing a full-time hire.",
    bullets: [
      "Focused architecture and platform reviews",
      "Decision support for technical direction and trade-offs",
      "Scoped advisory support for high-value initiatives",
    ],
    bestFor: "Best for teams that want specialist support without unnecessary overhead.",
  },
];

const valueProps: ValuePropItem[] = [
  {
    title: "Practical, engineering-first consulting",
    description:
      "Lidtech focuses on solutions that work in the real world, not just slide decks and abstract recommendations.",
  },
  {
    title: "Senior specialist support",
    description:
      "Get high-value support in cloud, platform, DevOps, and architecture without needing a large consulting setup.",
  },
  {
    title: "Built for clarity and long-term value",
    description:
      "The goal is not to add complexity. The goal is to create systems that are easier to understand, easier to operate, and easier to scale.",
  },
];

const proof: ProofItem[] = [
  {
    title: "Advisory workshops",
    context: "Engagement format",
    detail:
      "Run focused workshops to clarify architecture choices, delivery constraints, and practical next steps for cloud and platform initiatives.",
  },
  {
    title: "Fixed-scope technical projects",
    context: "Engagement format",
    detail:
      "Deliver targeted implementations for cloud foundations, platform improvements, DevOps pipelines, and Infrastructure as Code.",
  },
  {
    title: "Architecture and platform reviews",
    context: "Engagement format",
    detail:
      "Assess current-state cloud and platform setup, identify risks and bottlenecks, and provide prioritized recommendations with clear implementation paths.",
  },
  {
    title: "Retained advisory support",
    context: "Engagement format",
    detail:
      "Provide ongoing senior technical guidance where continuity and long-term technical quality matter.",
  },
];

const process: ProcessStep[] = [
  {
    step: "01",
    title: "Stronger cloud structure",
    description:
      "Build clear, repeatable cloud and platform structures that teams can confidently operate and evolve.",
  },
  {
    step: "02",
    title: "Better engineering foundations",
    description:
      "Improve technical foundations so delivery work is more predictable, maintainable, and scalable.",
  },
  {
    step: "03",
    title: "Improved delivery capability",
    description:
      "Strengthen DevOps practices and platform maturity so teams can ship faster with less friction.",
  },
  {
    step: "04",
    title: "Practical technical guidance",
    description:
      "Provide senior support through focused reviews, scoped implementation, or ongoing advisory engagement.",
  },
];

const faq: FaqItem[] = [
  {
    question: "Who is Lidtech best suited for?",
    answer:
      "Lidtech is best suited for companies modernizing cloud usage, teams improving delivery and platform maturity, and organizations needing stronger cloud governance and senior technical support.",
  },
  {
    question: "What kind of support can I start with?",
    answer:
      "You can start with a focused review or advisory workshop, then expand into fixed-scope implementation or retained advisory support only where it creates real value.",
  },
  {
    question: "What areas do you cover?",
    answer:
      "Core areas include cloud architecture, platform engineering, DevOps and CI/CD, Infrastructure as Code, cloud governance, and technical advisory.",
  },
  {
    question: "How does Lidtech work with teams?",
    answer:
      "Engagements are designed to be practical and engineering-first, supporting internal teams with clear, maintainable solutions rather than adding unnecessary consulting overhead.",
  },
  {
    question: "What is the overall goal of an engagement?",
    answer:
      "The goal is always to create better systems that help teams move faster with less friction.",
  },
];

const socials: SocialLink[] = [
  { label: "LinkedIn", shortLabel: "LI", href: "https://www.linkedin.com/in/oskarlidstrom" },
  { label: "GitHub", shortLabel: "GH", href: "https://github.com/KartDev" },
  { label: "Email", shortLabel: "@", href: "mailto:contact@lidtech.se" },
];

export const siteConfig: SiteConfig = {
  companyName: "Lidtech",
  personName: "Lidtech",
  role: "Senior specialist consulting in cloud and platform engineering",
  location: "Stockholm, Sweden",
  email: "contact@lidtech.se",
  url: "https://lidtech.se",
  bookingUrl: "mailto:contact@lidtech.se",
  meta: {
    title: "Lidtech | Cloud Architecture, Platform Engineering, DevOps, and IaC",
    description:
      "Lidtech helps organizations build better cloud and platform foundations through senior specialist consulting in cloud architecture, platform engineering, DevOps, Infrastructure as Code, and technical advisory.",
  },
  hero: {
    eyebrow: "Lidtech",
    title: "Build better cloud and platform foundations.",
    description:
      "Senior specialist consulting in cloud architecture, platform engineering, DevOps, Infrastructure as Code, and technical advisory. Practical support for teams that want scalable systems, better delivery, and stronger technical foundations.",
    primaryCta: {
      label: "Book an Intro Call",
      href: "mailto:contact@lidtech.se",
    },
    secondaryCta: {
      label: "Explore Services",
      href: "#services",
    },
    highlights: [
      "Clear cloud and platform architecture",
      "Repeatable and maintainable delivery foundations",
      "Secure and scalable technical systems",
      "Practical technical advisory and implementation support",
    ],
  },
  navItems: [
    { label: "Services", href: "#services" },
    { label: "Why Lidtech", href: "#why" },
    { label: "Engagements", href: "#proof" },
    { label: "About", href: "#about" },
    { label: "How We Help", href: "#process" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
  stats,
  services,
  valueProps,
  proof,
  about: [
    "Lidtech helps organizations design, improve, and operate modern cloud and platform capabilities.",
    "The focus is on building systems that are clear, repeatable, secure, scalable, and maintainable across cloud architecture, platform engineering, DevOps and CI/CD, Infrastructure as Code, cloud governance, and technical advisory.",
    "Lidtech helps teams build stronger technical foundations so they can deliver faster, operate more reliably, and scale with less friction.",
  ],
  process,
  faq,
  socials,
};
