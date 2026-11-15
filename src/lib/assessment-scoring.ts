import {
  bands,
  QUESTIONS_PER_SECTION,
  sections,
  TOTAL_QUESTIONS,
  type AssessmentSection,
  type Band,
  type Score,
} from "../content/assessment-data.ts";

/** answers[sectionIndex][questionIndex], null when unanswered. */
export type Answers = (Score | null)[][];

export type SectionResult = {
  section: AssessmentSection;
  /** 5-20 */
  total: number;
  /** total / 5, range 1-4 */
  avg: number;
};

export type AssessmentResult = {
  sections: SectionResult[];
  /** 55-220 */
  total: number;
  /** total / 55, range 1-4 */
  avg: number;
  band: Band;
  /** The 3 lowest section averages, ties broken by section order. */
  weakest: SectionResult[];
};

export class IncompleteAnswersError extends Error {
  readonly answered: number;

  constructor(answered: number) {
    super(`All ${TOTAL_QUESTIONS} questions must be answered before scoring (got ${answered}).`);
    this.name = "IncompleteAnswersError";
    this.answered = answered;
  }
}

export function emptyAnswers(): Answers {
  return sections.map(() => Array<Score | null>(QUESTIONS_PER_SECTION).fill(null));
}

function isScore(value: unknown): value is Score {
  return value === 1 || value === 2 || value === 3 || value === 4;
}

/** Coerce stored or untrusted data into a correctly shaped Answers grid. */
export function normalizeAnswers(raw: unknown): Answers {
  const grid = emptyAnswers();
  if (!Array.isArray(raw)) return grid;
  grid.forEach((row, s) => {
    const rawRow = raw[s];
    if (!Array.isArray(rawRow)) return;
    row.forEach((_, q) => {
      if (isScore(rawRow[q])) row[q] = rawRow[q];
    });
  });
  return grid;
}

export function countAnswered(answers: Answers): number {
  return answers.reduce((sum, row) => sum + row.filter(isScore).length, 0);
}

export function isSectionComplete(answers: Answers, sectionIndex: number): boolean {
  const row = answers[sectionIndex];
  return Array.isArray(row) && row.length === QUESTIONS_PER_SECTION && row.every(isScore);
}

export function isComplete(answers: Answers): boolean {
  return answers.length === sections.length && sections.every((_, i) => isSectionComplete(answers, i));
}

export function bandFor(avg: number): Band {
  let match = bands[0];
  for (const band of bands) {
    if (avg >= band.minAvg) match = band;
  }
  return match;
}

/**
 * Score a fully answered assessment. Throws IncompleteAnswersError if any
 * question is unanswered: unanswered questions are never counted as 0.
 */
export function scoreAssessment(answers: Answers): AssessmentResult {
  if (!isComplete(answers)) {
    throw new IncompleteAnswersError(countAnswered(answers));
  }

  const sectionResults: SectionResult[] = sections.map((section, i) => {
    const total = (answers[i] as Score[]).reduce<number>((sum, v) => sum + v, 0);
    return { section, total, avg: total / QUESTIONS_PER_SECTION };
  });

  const total = sectionResults.reduce((sum, s) => sum + s.total, 0);
  const avg = total / TOTAL_QUESTIONS;

  const weakest = sectionResults
    .map((result, index) => ({ result, index }))
    .sort((a, b) => a.result.avg - b.result.avg || a.index - b.index)
    .slice(0, 3)
    .map(({ result }) => result);

  return { sections: sectionResults, total, avg, band: bandFor(avg), weakest };
}

/**
 * MailerLite custom field values. Keys must match the fields Oskar creates:
 * cpr_total, cpr_avg, cpr_band, cpr_s01..cpr_s11, cpr_weakest.
 */
export function toMailerLiteFields(result: AssessmentResult): Record<string, string> {
  const fields: Record<string, string> = {
    cpr_total: String(result.total),
    cpr_avg: result.avg.toFixed(2),
    cpr_band: result.band.name,
    cpr_weakest: result.weakest.map((s) => s.section.title).join(", "),
  };
  for (const s of result.sections) {
    fields[`cpr_${s.section.id}`] = s.avg.toFixed(2);
  }
  return fields;
}
