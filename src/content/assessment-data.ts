// Single source of truth for the Cloud Platform Readiness Assessment.
// Copy is verbatim from the checklist. Use single hyphens only, never em dashes.

export type Score = 1 | 2 | 3 | 4;

export type AssessmentSection = {
  /** Stable id, also used for the MailerLite field key (cpr_s01 ... cpr_s11). */
  id: string;
  title: string;
  questions: readonly string[];
};

export type BandId = "foundation-gaps" | "inconsistent-coverage" | "maturing-platform" | "production-grade";

export type Band = {
  id: BandId;
  name: string;
  /** Inclusive lower bound on the overall average (1-4). */
  minAvg: number;
  description: string;
};

export const QUESTIONS_PER_SECTION = 5;

export const scoreLabels: Record<Score, string> = {
  1: "Missing or ad hoc",
  2: "Partial, inconsistently applied",
  3: "Defined and followed by most teams",
  4: "Automated, audited, and optimised",
};

export const scoreValues: readonly Score[] = [1, 2, 3, 4];

/**
 * Bands ordered from lowest to highest.
 * TODO(Oskar): confirm thresholds. Read from the old scorer's labels (1.0 / 2.0 / 3.0 / 3.5+ avg):
 * < 2.0 Foundation gaps, 2.0-2.99 Inconsistent coverage, 3.0-3.49 Maturing platform, >= 3.5 Production-grade.
 */
export const bands: readonly Band[] = [
  {
    id: "foundation-gaps",
    name: "Foundation gaps",
    minAvg: 0,
    description:
      "Core controls are missing. Cloud growth is outpacing governance. High risk of security incidents, cost overruns, and delivery failures.",
  },
  {
    id: "inconsistent-coverage",
    name: "Inconsistent coverage",
    minAvg: 2.0,
    description:
      "Some controls exist but are applied unevenly. The platform works for small teams but will struggle as the organisation scales past 10-15 teams.",
  },
  {
    id: "maturing-platform",
    name: "Maturing platform",
    minAvg: 3.0,
    description:
      "Most controls are in place and followed consistently. The gaps are known. The next phase is automation and reducing manual toil.",
  },
  {
    id: "production-grade",
    name: "Production-grade platform",
    minAvg: 3.5,
    description:
      "Enforced, audited, and improving. Suitable for regulated industries and scale. Focus shifts to developer experience and continuous optimisation.",
  },
];

export const sections: readonly AssessmentSection[] = [
  {
    id: "s01",
    title: "Management & Governance Strategy",
    questions: [
      "Is there a defined subscription or account hierarchy (management groups, OUs) with documented ownership?",
      "Is there a cloud governance framework with assigned owners and a review cadence?",
      "Are cloud resource requests processed through a formal approval workflow (not direct provisioning)?",
      "Are cloud policies documented, version-controlled, and enforced automatically (not just written down)?",
      "Is there a team or function responsible for platform standards across all product teams?",
    ],
  },
  {
    id: "s02",
    title: "Identity & Access Control",
    questions: [
      "Is least-privilege RBAC enforced - are teams given only the access they need, reviewed regularly?",
      "Is MFA enforced for all human users, including admins and break-glass accounts?",
      "Are privileged access sessions gated by PIM, JIT, or equivalent (no standing admin access)?",
      "Are service principals and managed identities used instead of shared credentials or user accounts for automation?",
      "Is there a quarterly or more frequent access review process with documented sign-off?",
    ],
  },
  {
    id: "s03",
    title: "Networking & Connectivity",
    questions: [
      "Is a hub-spoke, transit, or equivalent centralised network topology in use across all environments?",
      "Are NSGs or Security Groups applied consistently at the subnet or NIC level with documented rule sets?",
      "Is egress traffic filtered through a centralised firewall or NVA (not open to internet by default)?",
      "Are PaaS services accessed via private endpoints or private link (not public endpoints)?",
      "Is DNS centrally managed with split-horizon configuration for private workloads?",
    ],
  },
  {
    id: "s04",
    title: "Infrastructure as Code & Deployment",
    questions: [
      "Is all infrastructure provisioned through IaC (Terraform, Bicep, CDK) - no manual console changes in production?",
      "Are IaC modules version-controlled in Git with a clear module ownership model?",
      "Do CI/CD pipelines include automated policy, security, and compliance checks before any deployment?",
      "Are environment-specific configurations managed via variable sets or parameter files - not hardcoded?",
      "Is there a defined branching strategy and mandatory PR review process for all infrastructure changes?",
    ],
  },
  {
    id: "s05",
    title: "Observability & Monitoring",
    questions: [
      "Are logs from all infrastructure and application layers centralised in a single log analytics or SIEM platform?",
      "Are alerts defined with documented thresholds, routed to on-call teams, and backed by runbooks?",
      "Is cloud cost visible per team, workload, or cost centre - not just as a total account bill?",
      "Are infrastructure health metrics tracked with defined SLO thresholds that are actually monitored?",
      "Is distributed tracing or request-level visibility available for production services?",
    ],
  },
  {
    id: "s06",
    title: "Security Baseline",
    questions: [
      "Are security benchmarks (CIS, Azure Security Benchmark, AWS Foundational) applied and tracked for drift?",
      "Is vulnerability scanning run automatically on all VMs, containers, and deployed workloads?",
      "Is encryption at rest and in transit enforced across all data stores and communication channels?",
      "Is there a tested and documented incident response plan - not just a policy document?",
      "Are DLP controls or data classification policies applied to sensitive workloads?",
    ],
  },
  {
    id: "s07",
    title: "Cost Management & FinOps",
    questions: [
      "Is a tagging policy enforced that enables cost attribution by team, product, and environment?",
      "Are budget alerts configured at the subscription and resource group level with defined escalation paths?",
      "Is reserved instance or savings plan coverage reviewed and optimised at least quarterly?",
      "Is there a regular right-sizing review process with documented actions and savings tracked?",
      "Is there a defined chargeback or showback model so teams understand their cloud spend?",
    ],
  },
  {
    id: "s08",
    title: "Delivery & Release Cadence",
    questions: [
      "Is there a defined and consistently used promotion path from dev through test to production?",
      "Are deployment approvals automated where possible - human gates reserved for high-risk changes only?",
      "Is rollback capability tested regularly and documented with a clear procedure?",
      "Are DORA-style delivery metrics tracked - deployment frequency, lead time, change failure rate, MTTR?",
      "Is there a feature flag or progressive rollout strategy to reduce deployment risk?",
    ],
  },
  {
    id: "s09",
    title: "Operating Model & Ownership",
    questions: [
      "Is platform ownership unambiguously assigned - no grey zones between platform, security, and app teams?",
      "Are escalation paths, SLAs, and on-call responsibilities documented and known by all teams?",
      "Is there a formal onboarding process for new teams consuming the platform (not just a wiki link)?",
      "Are runbooks maintained for common operational tasks and reviewed at least twice a year?",
      "Is there a regular platform review process where standards, gaps, and roadmap are discussed?",
    ],
  },
  {
    id: "s10",
    title: "Standards & Hygiene",
    questions: [
      "Is a naming convention enforced consistently across all cloud resources?",
      "Are backup and disaster recovery procedures tested at least annually with documented results?",
      "Is patch management automated or on a defined schedule with tracked compliance?",
      "Is there a defined process for identifying and removing orphaned resources, old snapshots, and unused services?",
      "Are there documented sizing and configuration guidelines for common workload types?",
    ],
  },
  {
    id: "s11",
    title: "AI & ML Workload Readiness",
    questions: [
      "Are GPU or accelerated compute resources governed with cost quotas and approval gates?",
      "Is there a defined model serving infrastructure - not ad hoc VMs or developer laptops in production?",
      "Are training and inference environments separated with different cost, access, and performance profiles?",
      "Is data access governance for AI teams documented - who can access what training data and under what conditions?",
      "Is there an MLOps or model lifecycle process - including model versioning, monitoring, and retirement?",
    ],
  },
];

export const TOTAL_QUESTIONS = sections.length * QUESTIONS_PER_SECTION;

/** Bar colour by average, same cutoffs as the original scorer. */
export function barColor(avg: number): string {
  if (avg < 1.5) return "#ef4444";
  if (avg < 2.5) return "#f59e0b";
  if (avg < 3.5) return "#10b981";
  return "#2563eb";
}
