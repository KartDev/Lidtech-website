// Run with: npm test (Node's built-in test runner, no extra dependencies).
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { bands, sections, type Score } from "../content/assessment-data.ts";
import {
  bandFor,
  countAnswered,
  emptyAnswers,
  IncompleteAnswersError,
  isComplete,
  normalizeAnswers,
  scoreAssessment,
  toMailerLiteFields,
  type Answers,
} from "./assessment-scoring.ts";

function filled(value: Score): Answers {
  return sections.map(() => [value, value, value, value, value]);
}

/** Build answers from per-section totals (5-20), spreading points across the 5 questions. */
function fromSectionTotals(totals: number[]): Answers {
  return totals.map((total) => {
    const row: Score[] = [1, 1, 1, 1, 1];
    let remaining = total - 5;
    for (let q = 0; q < 5 && remaining > 0; q++) {
      const add = Math.min(3, remaining);
      row[q] = (1 + add) as Score;
      remaining -= add;
    }
    return row;
  });
}

/** Answers whose overall total is exactly `total` (55-220). */
function withOverallTotal(total: number): Answers {
  const per = Array(11).fill(5);
  let extra = total - 55;
  for (let i = 0; i < 11 && extra > 0; i++) {
    const add = Math.min(15, extra);
    per[i] += add;
    extra -= add;
  }
  return fromSectionTotals(per);
}

const close = (actual: number, expected: number) => assert.ok(Math.abs(actual - expected) < 1e-9, `${actual} != ${expected}`);

describe("data", () => {
  it("has 11 sections of 5 questions and 4 bands", () => {
    assert.equal(sections.length, 11);
    sections.forEach((s) => assert.equal(s.questions.length, 5));
    assert.equal(bands.length, 4);
  });

  it("contains no em or en dashes", () => {
    assert.doesNotMatch(JSON.stringify({ sections, bands }), /[\u2013\u2014]/);
  });
});

describe("scoreAssessment", () => {
  it("scores the minimum: all 1s", () => {
    const r = scoreAssessment(filled(1));
    assert.equal(r.total, 55);
    assert.equal(r.avg, 1);
    assert.ok(r.sections.every((s) => s.total === 5 && s.avg === 1));
    assert.equal(r.band.name, "Foundation gaps");
  });

  it("scores the maximum: all 4s", () => {
    const r = scoreAssessment(filled(4));
    assert.equal(r.total, 220);
    assert.equal(r.avg, 4);
    assert.equal(r.band.name, "Production-grade platform");
  });

  it("computes section total and avg, and overall total and avg", () => {
    const answers = filled(2);
    answers[0] = [1, 2, 3, 4, 4];
    const r = scoreAssessment(answers);
    assert.equal(r.sections[0].total, 14);
    close(r.sections[0].avg, 2.8);
    assert.equal(r.total, 14 + 10 * 10);
    close(r.avg, 114 / 55);
  });

  it("refuses to score incomplete answers instead of counting blanks as 0", () => {
    const answers = filled(3);
    answers[10][4] = null;
    assert.throws(() => scoreAssessment(answers), IncompleteAnswersError);
    assert.throws(() => scoreAssessment(emptyAnswers()), /55 questions/);
  });

  it("picks the 3 weakest sections, ties broken by section order", () => {
    // sections 3, 6, 9 and 10 tie at the lowest avg; the first three in order win
    const r = scoreAssessment(fromSectionTotals([15, 15, 8, 15, 15, 8, 15, 15, 8, 8, 15]));
    assert.deepEqual(
      r.weakest.map((s) => s.section.id),
      ["s03", "s06", "s09"],
    );
  });

  it("orders weakest by avg before section order", () => {
    const r = scoreAssessment(fromSectionTotals([20, 20, 20, 20, 20, 20, 20, 20, 12, 6, 9]));
    assert.deepEqual(
      r.weakest.map((s) => s.section.id),
      ["s10", "s11", "s09"],
    );
  });
});

describe("band thresholds", () => {
  const cases: [number, string][] = [
    [1.0, "Foundation gaps"],
    [1.99, "Foundation gaps"],
    [2.0, "Inconsistent coverage"],
    [2.99, "Inconsistent coverage"],
    [3.0, "Maturing platform"],
    [3.49, "Maturing platform"],
    [3.5, "Production-grade platform"],
    [4.0, "Production-grade platform"],
  ];
  for (const [avg, name] of cases) {
    it(`avg ${avg} -> ${name}`, () => assert.equal(bandFor(avg).name, name));
  }

  it("puts the boundary totals in the right band", () => {
    const band = (total: number) => scoreAssessment(withOverallTotal(total)).band.name;
    assert.equal(band(109), "Foundation gaps"); // 1.98
    assert.equal(band(110), "Inconsistent coverage"); // 2.00
    assert.equal(band(164), "Inconsistent coverage"); // 2.98
    assert.equal(band(165), "Maturing platform"); // 3.00
    assert.equal(band(192), "Maturing platform"); // 3.49
    assert.equal(band(193), "Production-grade platform"); // 3.51
  });
});

describe("helpers", () => {
  it("counts answers and detects completeness", () => {
    const a = emptyAnswers();
    assert.equal(countAnswered(a), 0);
    assert.equal(isComplete(a), false);
    assert.equal(countAnswered(filled(2)), 55);
    assert.equal(isComplete(filled(2)), true);
  });

  it("normalizes stored data and drops invalid values", () => {
    const a = normalizeAnswers([[1, 2, 9, "3", null], "x"]);
    assert.equal(a.length, 11);
    assert.deepEqual(a[0], [1, 2, null, null, null]);
    assert.deepEqual(a[1], [null, null, null, null, null]);
    assert.deepEqual(normalizeAnswers(undefined), emptyAnswers());
  });
});

describe("toMailerLiteFields", () => {
  it("produces every cpr_* key with formatted values", () => {
    const answers = filled(3);
    answers[1] = [1, 1, 1, 1, 2];
    const fields = toMailerLiteFields(scoreAssessment(answers));
    const keys = [
      "cpr_total",
      "cpr_avg",
      "cpr_band",
      "cpr_weakest",
      ...Array.from({ length: 11 }, (_, i) => `cpr_s${String(i + 1).padStart(2, "0")}`),
    ];
    assert.deepEqual(Object.keys(fields).sort(), keys.sort());
    assert.equal(fields.cpr_total, "156");
    assert.equal(fields.cpr_avg, "2.84");
    assert.equal(fields.cpr_band, "Inconsistent coverage");
    assert.equal(fields.cpr_s02, "1.20");
    assert.equal(fields.cpr_s01, "3.00");
    assert.equal(
      fields.cpr_weakest,
      "Identity & Access Control, Management & Governance Strategy, Networking & Connectivity",
    );
  });
});
