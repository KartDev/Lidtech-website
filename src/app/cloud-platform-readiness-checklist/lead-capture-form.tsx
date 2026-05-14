import { checklistConfig } from "@/content/checklist";

type LeadCaptureFormProps = {
  className?: string;
  heading?: string;
  note?: string;
  submitLabel: string;
  variant?: "stacked" | "inline";
};

export default function LeadCaptureForm({
  className,
  heading,
  note = checklistConfig.form.note,
  submitLabel,
  variant = "stacked",
}: LeadCaptureFormProps) {
  return (
    <form
      action={checklistConfig.form.action}
      className={`lead-capture-form lead-capture-form-${variant}${className ? ` ${className}` : ""}`}
      method="post"
    >
      {heading ? <h3>{heading}</h3> : null}

      <div className="lead-capture-fields">
        <label className="lead-field">
          <span className="lead-field-label">First name</span>
          <input
            autoComplete="given-name"
            name="fields[name]"
            placeholder="First name"
            required
            type="text"
          />
        </label>

        <label className="lead-field">
          <span className="lead-field-label">Work email</span>
          <input autoComplete="email" inputMode="email" name="email" placeholder="Work email" required type="email" />
        </label>
      </div>

      <button className="button button-primary lead-submit-button" type="submit">
        <span>{submitLabel}</span>
      </button>

      <p className="lead-form-note">{note}</p>
    </form>
  );
}
