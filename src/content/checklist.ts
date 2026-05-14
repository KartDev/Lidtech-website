export type ChecklistArea = {
  title: string;
  summary: string;
};

export type ChecklistAudienceGroup = {
  title: string;
  items: string[];
};

export const checklistConfig = {
  slug: "/cloud-platform-readiness-checklist",
  badge: "Free resource",
  title: "Is your cloud platform actually ready to scale?",
  description:
    "Use a practical 55-question checklist to surface governance gaps, security blind spots, delivery friction, and cloud cost issues before they become expensive problems.",
  heroStats: [
    { value: "11", label: "assessment areas" },
    { value: "55", label: "practical questions" },
    { value: "30 min", label: "typical completion time" },
  ],
  form: {
    resourceName: "Cloud Platform Readiness Checklist",
  },
  sectionHeading: {
    eyebrow: "What's inside",
    title: "11 areas. 55 questions. One clearer view of where your platform stands.",
    description:
      "The checklist is built to help technical leaders assess the core foundations behind cloud reliability, delivery pace, governance quality, and future scale.",
  },
  areas: [
    {
      title: "Management and governance strategy",
      summary: "Clarify standards, ownership, and decision-making before drift becomes normal.",
    },
    {
      title: "Identity and access control",
      summary: "Check whether access patterns are secure, reviewable, and aligned to least privilege.",
    },
    {
      title: "Networking and connectivity",
      summary: "Assess segmentation, exposure, and the operational resilience of your network design.",
    },
    {
      title: "Infrastructure as Code and deployment",
      summary: "Review whether changes are repeatable, auditable, and safe to roll out.",
    },
    {
      title: "Observability and monitoring",
      summary: "Understand whether the platform gives teams usable visibility before incidents escalate.",
    },
    {
      title: "Security baseline",
      summary: "Look for missing controls, inconsistent hygiene, and preventable security debt.",
    },
    {
      title: "Cost management and FinOps",
      summary: "Spot where cloud spend lacks ownership, visibility, or optimization discipline.",
    },
    {
      title: "Delivery and release cadence",
      summary: "Evaluate how much friction exists between code, approvals, and production change.",
    },
    {
      title: "Operating model and ownership",
      summary: "Check whether platform responsibilities are explicit enough to scale cleanly.",
    },
    {
      title: "Standards and technical hygiene",
      summary: "Surface inconsistencies that quietly slow down teams and compound maintenance cost.",
    },
    {
      title: "AI and ML workload readiness",
      summary: "Assess whether the platform can support newer workloads without unsafe shortcuts.",
    },
  ] satisfies ChecklistArea[],
  audience: [
    {
      title: "Use this if you are",
      items: [
        "A CTO or engineering leader questioning whether the cloud foundation is ready for the next phase of growth.",
        "A platform lead preparing for governance review, security scrutiny, or operational cleanup.",
        "A cloud architect deciding where platform investment will create the biggest reduction in delivery risk.",
        "A team that has scaled quickly and suspects the platform now carries expensive hidden debt.",
      ],
    },
    {
      title: "What you will find out",
      items: [
        "Which platform areas are strong and which are quietly accumulating risk.",
        "Where governance and security gaps are most likely to create incidents or rework.",
        "Where cloud cost is leaking because ownership and visibility are too weak.",
        "Whether the current platform foundation can support future AI-heavy or data-heavy workloads safely.",
      ],
    },
  ] satisfies ChecklistAudienceGroup[],
  author: {
    name: "Oskar Lidstrom",
    role: "Cloud Architect and Consultant, Lidtech",
    summary:
      "I use this same lens when assessing cloud and platform foundations for teams that need better structure, stronger delivery flow, and fewer operational surprises. The checklist focuses on the areas where gaps usually stay invisible until they show up as cost spikes, security incidents, or delivery bottlenecks.",
  },
  closingCta: {
    eyebrow: "Ready to review your platform?",
    title: "Get the checklist and pressure-test the foundations before they slow the team down.",
    description:
      "Use it as a self-assessment, bring it into an internal review, or use it as the starting point for a deeper advisory conversation.",
  },
} as const;
