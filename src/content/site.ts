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
  { value: "6+ years", label: "Cloud, platform, and DevOps delivery" },
  { value: "10 certifications", label: "AWS, Azure, and Google Cloud credentials" },
  { value: "50+ TB", label: "Migration program led for a global retailer" },
  { value: "AWS + Azure", label: "Hands-on architecture across both platforms" },
];

const services: ServiceItem[] = [
  {
    title: "Cloud Architecture and Platform Foundations",
    summary:
      "Design the cloud baseline, delivery standards, and technical guardrails your team needs before velocity turns into drift.",
    bullets: [
      "Landing zones, governance models, and subscription structure",
      "Platform architecture for AWS, Azure, or hybrid delivery",
      "Security, operability, and infrastructure-as-code standards from day one",
    ],
    bestFor: "Founders preparing to scale product, infrastructure, or teams.",
  },
  {
    title: "DevOps and Delivery Acceleration",
    summary:
      "Tighten the path from code to production with practical CI/CD, observability, and release automation that reduce drag on engineering.",
    bullets: [
      "CI/CD pipelines with GitHub Actions, GitLab CI/CD, or cloud-native tooling",
      "Observability and operational hygiene for stable releases",
      "Workflow cleanup, deployment hardening, and platform enablement",
    ],
    bestFor: "Teams that need shipping speed without introducing avoidable risk.",
  },
  {
    title: "Backend Automation and AI-Ready Integrations",
    summary:
      "Build the secure backend workflows and integration patterns that make automation, product operations, and AI features dependable in production.",
    bullets: [
      "Serverless backends, APIs, and event-driven workflows",
      "Operational automations for lifecycle actions, retries, and auditability",
      "Integration design that keeps product experiments shippable and maintainable",
    ],
    bestFor: "Startups turning product ideas into reliable, production-ready systems.",
  },
];

const valueProps: ValuePropItem[] = [
  {
    title: "Senior hands-on execution",
    description:
      "You work directly with a senior consultant who can design the architecture and implement the important parts, not just hand over slides.",
  },
  {
    title: "Enterprise-grade rigor without enterprise drag",
    description:
      "The delivery style is pragmatic and founder-friendly, but the underlying standards come from real work in government, automotive, manufacturing, and retail environments.",
  },
  {
    title: "Built for shipping, not just planning",
    description:
      "The focus is on practical improvements that unblock teams quickly: infrastructure, pipelines, integrations, observability, and the operational details that keep momentum intact.",
  },
];

const proof: ProofItem[] = [
  {
    title: "CAF-aligned Azure governance design",
    context: "Asurgent AB, 2026",
    detail:
      "Established Azure structure and standards across management groups, subscriptions, tagging, validation rules, and onboarding guidance for future implementations.",
  },
  {
    title: "Secure AWS serverless lifecycle platform",
    context: "Scania assignment, 2025-present",
    detail:
      "Built and improved a secure backend with API Gateway, Lambda, Step Functions, DynamoDB, SNS, and SES for lifecycle operations such as provision, modify, start, stop, and decommission.",
  },
  {
    title: "Cross-cloud platform delivery and modernization",
    context: "Asurgent AB and prior consulting work",
    detail:
      "Delivered infrastructure as code, CI/CD, Azure DDoS protection, baseline monitoring, migration support, and reusable platform automation across AWS and Azure client environments.",
  },
  {
    title: "Large-scale migration and change leadership",
    context: "Capgemini, 2022-2023",
    detail:
      "Led coordination for a sustainable data migration and decommission project moving more than 50 TB of data to cloud storage solutions for an international retailer.",
  },
];

const process: ProcessStep[] = [
  {
    step: "01",
    title: "Clarify the technical bottleneck",
    description:
      "Start with the business goal, delivery pain, and current platform reality so the work targets the real blocker instead of a generic architecture wish list.",
  },
  {
    step: "02",
    title: "Design the smallest durable solution",
    description:
      "Define the architecture, workflows, and standards that solve the immediate problem while leaving room for the next phase of growth.",
  },
  {
    step: "03",
    title: "Implement with the team",
    description:
      "Ship the core infrastructure, automation, or backend work hands-on, and strengthen the team around it through clean patterns, documentation, and review.",
  },
  {
    step: "04",
    title: "Stabilize and hand over cleanly",
    description:
      "Finish with visibility, operational hygiene, and a practical runway so your team can keep shipping without depending on a permanent external layer.",
  },
];

const faq: FaqItem[] = [
  {
    question: "What kinds of companies are the best fit?",
    answer:
      "The strongest fit is a startup or scale-up that already has product momentum but needs a senior operator to tighten architecture, delivery, and platform reliability before complexity compounds.",
  },
  {
    question: "Do you stay hands-on or work at advisory level only?",
    answer:
      "Hands-on delivery is core to the offer. Strategy matters, but the work is meant to ship through infrastructure changes, automation, integrations, delivery pipelines, and operational improvements.",
  },
  {
    question: "Can you work alongside an existing engineering team?",
    answer:
      "Yes. Engagements are designed to plug into an existing team, strengthen technical decision-making, and leave behind systems and patterns the internal team can own confidently.",
  },
  {
    question: "Can you help with cloud governance and security foundations?",
    answer:
      "Yes. Governance, platform structure, tagging, validation, delivery standards, and secure cloud baselines are a major part of the consulting work, especially in AWS and Azure environments.",
  },
  {
    question: "Do you support fixed projects as well as retained advisory work?",
    answer:
      "Both. The site is positioned for scoped architecture and delivery projects, short operational acceleration engagements, and ongoing senior technical advisory support where continuity matters.",
  },
];

const socials: SocialLink[] = [
  { label: "LinkedIn", shortLabel: "LI", href: "https://www.linkedin.com/in/oskarlidstrom" },
  { label: "GitHub", shortLabel: "GH", href: "https://github.com/KartDev" },
  { label: "Email", shortLabel: "@", href: "mailto:oskarlidstrom@gmail.com" },
];

export const siteConfig: SiteConfig = {
  companyName: "Oskar Lidstrom Consulting",
  personName: "Oskar Lidstrom",
  role: "Senior Cloud Architect, DevOps Engineer, and Platform Consultant",
  location: "Stockholm, Sweden",
  email: "oskarlidstrom@gmail.com",
  url: "https://kartdev.github.io/Lidtech-website",
  bookingUrl: "https://cal.com/replace-with-your-booking-link/discovery-call",
  meta: {
    title: "Senior Cloud Architecture and DevOps Consulting for Startup Founders",
    description:
      "Senior cloud architecture, DevOps, platform engineering, and AI-ready backend delivery for startups that need hands-on technical execution without the overhead of a larger consultancy.",
  },
  hero: {
    eyebrow: "Senior cloud architecture and platform delivery for fast-moving startups",
    title: "Build the cloud, delivery, and automation layer your product can actually grow on.",
    description:
      "I help startup founders move from technical friction to clean execution across AWS, Azure, CI/CD, backend workflows, and platform foundations, with senior hands-on involvement from the first conversation to the final handover.",
    primaryCta: {
      label: "Book a call",
      href: "https://cal.com/replace-with-your-booking-link/discovery-call",
    },
    secondaryCta: {
      label: "See selected proof",
      href: "#proof",
    },
    highlights: [
      "AWS and Azure architecture",
      "Infrastructure as code and CI/CD",
      "Serverless backends and integrations",
      "Cloud governance and operational automation",
    ],
  },
  navItems: [
    { label: "Services", href: "#services" },
    { label: "Why me", href: "#why" },
    { label: "Proof", href: "#proof" },
    { label: "About", href: "#about" },
    { label: "Process", href: "#process" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
  stats,
  services,
  valueProps,
  proof,
  about: [
    "I am a Stockholm-based cloud architect and DevOps engineer with more than six years of experience delivering cloud platforms, backend services, governance models, and operational automation across AWS and Azure.",
    "Recent work includes CAF-based Azure architecture for public-sector requirements, secure serverless lifecycle platforms for enterprise environments, and cloud modernization efforts spanning infrastructure as code, CI/CD, monitoring, and migration support.",
    "That mix matters for startups: you get practical execution speed, but the systems are designed with the reliability, observability, and governance discipline that prevent expensive cleanup later.",
  ],
  process,
  faq,
  socials,
};
