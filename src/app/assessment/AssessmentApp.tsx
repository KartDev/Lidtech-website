"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";

import { assessmentConfig } from "@/content/assessment-config";
import {
  barColor,
  scoreLabels,
  scoreValues,
  sections,
  TOTAL_QUESTIONS,
  type Score,
} from "@/content/assessment-data";
import {
  countAnswered,
  emptyAnswers,
  isComplete,
  isSectionComplete,
  normalizeAnswers,
  scoreAssessment,
  toMailerLiteFields,
  type Answers,
  type AssessmentResult,
} from "@/lib/assessment-scoring";

const GATE_STEP = sections.length;

type StoredState = {
  answers: Answers;
  step: number;
  submitted: boolean;
};

type SubmitStatus = "idle" | "sending" | "error";

function loadState(): StoredState | null {
  try {
    const raw = window.localStorage.getItem(assessmentConfig.storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredState>;
    const answers = normalizeAnswers(parsed.answers);
    const step = typeof parsed.step === "number" ? Math.min(Math.max(0, parsed.step), GATE_STEP) : 0;
    return { answers, step, submitted: parsed.submitted === true && isComplete(answers) };
  } catch {
    return null;
  }
}

function saveState(state: StoredState) {
  try {
    window.localStorage.setItem(assessmentConfig.storageKey, JSON.stringify(state));
  } catch {
    // Storage can be unavailable (private mode). The assessment still works without it.
  }
}

function clearState() {
  try {
    window.localStorage.removeItem(assessmentConfig.storageKey);
  } catch {
    // ignore
  }
}

function joinNames(names: string[]): string {
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

/** The gate can only submit once a privacy policy is linked. Dev builds allow local testing. */
const gateEnabled = Boolean(assessmentConfig.privacyPolicyUrl) || process.env.NODE_ENV === "development";

export default function AssessmentApp() {
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = loadState();
    if (stored) {
      setAnswers(stored.answers);
      setStep(stored.step);
      setSubmitted(stored.submitted);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveState({ answers, step, submitted });
  }, [answers, step, submitted, loaded]);

  const answered = countAnswered(answers);
  const complete = isComplete(answers);
  const result = useMemo<AssessmentResult | null>(() => (complete ? scoreAssessment(answers) : null), [answers, complete]);

  function goTo(next: number) {
    setStep(next);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function setAnswer(sectionIndex: number, questionIndex: number, value: Score) {
    setAnswers((prev) => {
      const next = prev.map((row) => [...row]);
      next[sectionIndex][questionIndex] = value;
      return next;
    });
  }

  function startOver() {
    clearState();
    setAnswers(emptyAnswers());
    setSubmitted(false);
    setStatus("idle");
    goTo(0);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!result || !gateEnabled) return;

    const form = event.currentTarget;
    // Fill the hidden fields[cpr_*] inputs from the scoring result just before submit.
    const fields = toMailerLiteFields(result);
    for (const [key, value] of Object.entries(fields)) {
      const input = form.elements.namedItem(`fields[${key}]`);
      if (input instanceof HTMLInputElement) input.value = value;
    }

    const body = new URLSearchParams();
    new FormData(form).forEach((value, key) => body.append(key, String(value)));
    body.append("ajax", "1");

    setStatus("sending");
    try {
      const response = await fetch(form.action, { method: "POST", body });
      const data = (await response.json().catch(() => null)) as { success?: boolean } | null;
      if (!response.ok || data?.success !== true) throw new Error("Subscribe failed");
      setSubmitted(true);
      setStatus("idle");
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setStatus("error");
    }
  }

  if (!loaded) {
    return <div className="assessment-card assessment-loading" ref={topRef} aria-busy="true" />;
  }

  if (submitted && result) {
    return (
      <div ref={topRef}>
        <AssessmentResults result={result} onStartOver={startOver} />
      </div>
    );
  }

  const progressPct = Math.round((answered / TOTAL_QUESTIONS) * 100);

  return (
    <div className="assessment-flow" ref={topRef}>
      <div className="assessment-progress" aria-live="polite">
        <div className="assessment-progress-text">
          <span>{step < GATE_STEP ? `Section ${step + 1} of ${sections.length}` : "Get your results"}</span>
          <span>
            {answered} / {TOTAL_QUESTIONS} answered
          </span>
        </div>
        <div
          className="assessment-progress-bar"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={TOTAL_QUESTIONS}
          aria-valuenow={answered}
          aria-label="Questions answered"
        >
          <div style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {step < GATE_STEP ? (
        <SectionStep
          sectionIndex={step}
          answers={answers}
          onAnswer={setAnswer}
          onBack={step > 0 ? () => goTo(step - 1) : undefined}
          onNext={() => goTo(step + 1)}
        />
      ) : (
        <section className="assessment-card">
          <p className="lead-card-label">Almost done</p>
          <h2 className="assessment-title">Where should we send your results?</h2>

          {!complete ? (
            <div className="assessment-notice">
              <p>
                All {TOTAL_QUESTIONS} questions need an answer before you can see your results. You have answered{" "}
                {answered}.
              </p>
              <button
                className="button button-secondary"
                type="button"
                onClick={() => goTo(Math.max(0, sections.findIndex((_, i) => !isSectionComplete(answers, i))))}
              >
                Go to the first unanswered section
              </button>
            </div>
          ) : (
            <form
              action={assessmentConfig.mailerLite.formAction}
              className="assessment-gate"
              method="post"
              onSubmit={handleSubmit}
            >
              <p className="assessment-gate-intro">
                Your section scores, overall maturity band and weakest areas appear on the next screen.
              </p>

              <label className="assessment-field">
                <span>First name</span>
                <input autoComplete="given-name" name="fields[name]" required type="text" />
              </label>
              <label className="assessment-field">
                <span>Email</span>
                <input autoComplete="email" name="fields[email]" required type="email" />
              </label>

              {result &&
                Object.keys(toMailerLiteFields(result)).map((key) => (
                  <input defaultValue="" key={key} name={`fields[${key}]`} type="hidden" />
                ))}
              <input name="ml-submit" type="hidden" value="1" />
              <input name="anticsrf" type="hidden" value="true" />

              <p className="assessment-consent">
                {assessmentConfig.consentText}{" "}
                {assessmentConfig.privacyPolicyUrl ? (
                  <a href={assessmentConfig.privacyPolicyUrl} rel="noreferrer" target="_blank">
                    Privacy policy
                  </a>
                ) : (
                  <strong>[TODO: privacy policy link]</strong>
                )}
              </p>

              {!gateEnabled && (
                <p className="assessment-error" role="alert">
                  Results are not available yet. Please check back soon.
                </p>
              )}
              {status === "error" && (
                <p className="assessment-error" role="alert">
                  Something went wrong sending your results. Check your email address and try again.
                </p>
              )}

              <div className="assessment-nav">
                <button className="button button-secondary" type="button" onClick={() => goTo(GATE_STEP - 1)}>
                  Back
                </button>
                <button
                  className="button button-primary"
                  disabled={!gateEnabled || status === "sending"}
                  type="submit"
                >
                  {status === "sending" ? "Sending..." : "Show my results"}
                </button>
              </div>
            </form>
          )}
        </section>
      )}
    </div>
  );
}

function SectionStep({
  sectionIndex,
  answers,
  onAnswer,
  onBack,
  onNext,
}: {
  sectionIndex: number;
  answers: Answers;
  onAnswer: (s: number, q: number, v: Score) => void;
  onBack?: () => void;
  onNext: () => void;
}) {
  const section = sections[sectionIndex];
  const sectionDone = isSectionComplete(answers, sectionIndex);
  const isLast = sectionIndex === sections.length - 1;

  return (
    <section className="assessment-card" aria-labelledby={`section-${section.id}`}>
      <p className="lead-card-label">
        Section {sectionIndex + 1} of {sections.length}
      </p>
      <h2 className="assessment-title" id={`section-${section.id}`}>
        {section.title}
      </h2>

      <ol className="assessment-questions">
        {section.questions.map((question, q) => {
          const name = `${section.id}-q${q + 1}`;
          const current = answers[sectionIndex][q];
          return (
            <li className="assessment-question" key={name}>
              <fieldset>
                <legend>{question}</legend>
                <div className="assessment-options">
                  {scoreValues.map((value) => (
                    <label className={`assessment-option assessment-option-${value}`} key={value}>
                      <input
                        checked={current === value}
                        name={name}
                        onChange={() => onAnswer(sectionIndex, q, value)}
                        type="radio"
                        value={value}
                      />
                      <span className="assessment-option-value">{value}</span>
                      <span className="assessment-option-label">{scoreLabels[value]}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </li>
          );
        })}
      </ol>

      <div className="assessment-nav">
        {onBack ? (
          <button className="button button-secondary" type="button" onClick={onBack}>
            Back
          </button>
        ) : (
          <span />
        )}
        <button className="button button-primary" disabled={!sectionDone} type="button" onClick={onNext}>
          {isLast ? "Continue to results" : "Next section"}
        </button>
      </div>
      {!sectionDone && <p className="assessment-hint">Answer all 5 questions to continue.</p>}
    </section>
  );
}

function AssessmentResults({ result, onStartOver }: { result: AssessmentResult; onStartOver: () => void }) {
  const weakestNames = result.weakest.map((s) => s.section.title);

  return (
    <div className="assessment-results">
      <section className="assessment-card assessment-summary">
        <p className="lead-card-label">Your results</p>
        <div className="assessment-score-row">
          <div>
            <p className="assessment-score-value">
              {result.total} <span>/ 220</span>
            </p>
            <p className="assessment-score-caption">Overall score</p>
          </div>
          <div>
            <p className="assessment-score-value">
              {result.avg.toFixed(2)} <span>/ 4</span>
            </p>
            <p className="assessment-score-caption">Average</p>
          </div>
        </div>
        <h2 className="assessment-title">{result.band.name}</h2>
        <p className="assessment-band-description">{result.band.description}</p>
      </section>

      <section className="assessment-card">
        <p className="lead-card-label">Section scores</p>
        <ul className="assessment-bars">
          {result.sections.map((s, i) => (
            <li key={s.section.id}>
              <div className="assessment-bar-head">
                <span>
                  {i + 1}. {s.section.title}
                </span>
                <span>
                  {s.total} / 20 · {s.avg.toFixed(2)}
                </span>
              </div>
              <div className="assessment-bar-track">
                <div style={{ width: `${(s.total / 20) * 100}%`, background: barColor(s.avg) }} />
              </div>
            </li>
          ))}
        </ul>

        <p className="lead-card-label assessment-weakest-label">Your three weakest areas</p>
        <ol className="assessment-weakest">
          {result.weakest.map((s) => (
            <li key={s.section.id}>
              {s.section.title} <span>({s.avg.toFixed(2)})</span>
            </li>
          ))}
        </ol>

        <div className="assessment-nav assessment-no-print">
          <button className="button button-secondary" type="button" onClick={onStartOver}>
            Start over
          </button>
          <button className="button button-primary" type="button" onClick={() => window.print()}>
            Print / Save PDF
          </button>
        </div>
      </section>

      <section className="assessment-cta-grid assessment-no-print">
        <article className="assessment-card assessment-cta">
          <p className="lead-card-label">Checklist Pro</p>
          <p>Want the radar view, benchmarks and recommendations for each area? Checklist Pro, EUR 39.99.</p>
          {assessmentConfig.proUrl && (
            <a className="button button-secondary" href={assessmentConfig.proUrl} rel="noreferrer" target="_blank">
              Get Checklist Pro
            </a>
          )}
        </article>

        <article className="assessment-card assessment-cta assessment-cta-dark">
          <p className="lead-card-label">Second opinion</p>
          <p>
            Your weakest areas were {joinNames(weakestNames)}. If you want a second opinion on where to start, book a
            30-minute call.
          </p>
          <a className="button button-primary" href={assessmentConfig.discoveryCallUrl} rel="noreferrer" target="_blank">
            Book a 30-minute call
          </a>
        </article>
      </section>
    </div>
  );
}
