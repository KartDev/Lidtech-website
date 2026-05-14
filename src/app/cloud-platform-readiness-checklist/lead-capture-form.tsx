"use client";

import type { FormEvent } from "react";
import { useState } from "react";

import { checklistConfig } from "@/content/checklist";
import { siteConfig } from "@/content/site";

type LeadCaptureFormProps = {
  buttonLabel: string;
  className?: string;
  heading?: string;
  note?: string;
  showName?: boolean;
  sourceLabel: string;
  variant?: "stacked" | "inline";
};

export default function LeadCaptureForm({
  buttonLabel,
  className,
  heading,
  note = checklistConfig.form.note,
  showName = true,
  sourceLabel,
  variant = "stacked",
}: LeadCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const lines = [
      `Hi ${siteConfig.companyName},`,
      "",
      `I'd like the ${checklistConfig.form.resourceName}.`,
      showName ? `First name: ${firstName}` : undefined,
      `Work email: ${email}`,
      `Source: ${sourceLabel}`,
    ].filter(Boolean);

    const query = new URLSearchParams({
      subject: `${checklistConfig.form.resourceName} request`,
      body: lines.join("\n"),
    });

    setHasSubmitted(true);
    window.location.href = `mailto:${siteConfig.email}?${query.toString()}`;
  }

  return (
    <form
      className={`lead-capture-form lead-capture-form-${variant}${className ? ` ${className}` : ""}`}
      onSubmit={handleSubmit}
    >
      {heading ? <h3>{heading}</h3> : null}

      <div className="lead-capture-fields">
        {showName ? (
          <label className="lead-field">
            <span className="lead-field-label">First name</span>
            <input
              autoComplete="given-name"
              name="first_name"
              onChange={(event) => setFirstName(event.target.value)}
              placeholder="First name"
              required
              type="text"
              value={firstName}
            />
          </label>
        ) : null}

        <label className="lead-field">
          <span className="lead-field-label">Work email</span>
          <input
            autoComplete="email"
            inputMode="email"
            name="email_address"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Work email"
            required
            type="email"
            value={email}
          />
        </label>
      </div>

      <button className="button button-primary lead-submit-button" type="submit">
        <span>{buttonLabel}</span>
      </button>

      <p className="lead-form-note">{note}</p>

      {hasSubmitted ? (
        <p className="lead-form-status" role="status">
          {checklistConfig.form.submittedMessage}
        </p>
      ) : null}
    </form>
  );
}
