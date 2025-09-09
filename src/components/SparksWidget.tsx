import React, { useMemo, useState } from "react";

/** What your backend already accepts today (keep it unchanged) */
type PersistedPayload = {
  title: string;
  content: string;          // match your current API’s field name (e.g., content/rawInput)
  created_at: string;       // ISO
};

/** Demo-only extras for Loom (not sent to backend yet) */
type DemoExtras = {
  category: string;
  tags: string[];
  confidence: number;       // 0–100
  notes?: string;
};

/** Full row for the on-screen preview table (not persisted) */
type PreviewRow = PersistedPayload & DemoExtras;

type Props = {
  user?: string;             // you pass "anon" now; unused here but kept for future
  title?: string;
};

const CATEGORIES = [
  "Idea",
  "Bug",
  "Research",
  "Feature",
  "Objection",
  "Narrative",
  "Other",
];

export default function SparksWidget({ title = "Quick Spark (Demo)" }: Props) {
  // Form state
  const [form, setForm] = useState({
    title: "",
    content: "",           // keep name aligned with your current API
    category: "Idea",
    tagsText: "",
    confidence: 70,
    notes: "",
  });

  // “UI DB” for this page only – preview rows (not persisted)
  const [rows, setRows] = useState<PreviewRow[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState<PreviewRow | null>(null);

  const isValid = useMemo(
    () => form.title.trim().length > 0 && form.content.trim().length > 0,
    [form.title, form.content]
  );

  const tagList = useMemo(
    () => form.tagsText.split(",").map(t => t.trim()).filter(Boolean),
    [form.tagsText]
  );

  const update = <
    K extends keyof typeof form
  >(key: K, value: (typeof form)[K]) => setForm(p => ({ ...p, [key]: value }));

  function resetForm() {
    setForm({
      title: "",
      content: "",
      category: "Idea",
      tagsText: "",
      confidence: 70,
      notes: "",
    });
    setPreview(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    setSubmitting(true);

    // 1) Keep your current payload exactly as the backend expects (no schema change)
    const persistedPayload: PersistedPayload = {
      title: form.title.trim(),
      content: form.content.trim(),
      created_at: new Date().toISOString(),
    };

    // 2) Demo-only extras (for Loom + UI preview)
    const demoExtras: DemoExtras = {
      category: form.category,
      tags: tagList,
      confidence: form.confidence,
      notes: form.notes.trim() || undefined,
    };

    // 3) Merge for UI preview/table (still not persisted)
    const uiRow: PreviewRow = { ...persistedPayload, ...demoExtras };

    // 👉 In the future, you’ll send ONLY `persistedPayload` to your API here.
    // await fetch(API_BASE + "/sparks", { method:"POST", body: JSON.stringify(persistedPayload) });

    // Update on-screen preview + table
    setPreview(uiRow);
    setRows(prev => [uiRow, ...prev]);

    setSubmitting(false);
    // Do not clear the form so you can screenshot / demo; if you prefer, call resetForm();
  }

  return (
    <div className="spark-card">
      <header className="spark-header">
        <h3>{title}</h3>
        <small className="muted">Fields only — persistence unchanged (demo)</small>
      </header>

      <form onSubmit={handleSubmit} className="spark-form" autoComplete="off">
        {/* Title */}
        <label className="field">
          <span>Title <span className="req">*</span></span>
          <input
            type="text"
            placeholder="Short, descriptive title…"
            value={form.title}
            onChange={e => update("title", e.target.value)}
            required
          />
        </label>

        {/* Content (maps to your existing backend field) */}
        <label className="field">
          <span>Content <span className="req">*</span></span>
          <textarea
            placeholder="Describe the spark…"
            value={form.content}
            onChange={e => update("content", e.target.value)}
            rows={5}
            required
          />
        </label>

        {/* Category + Tags */}
        <div className="grid-2">
          <label className="field">
            <span>Category</span>
            <select
              value={form.category}
              onChange={e => update("category", e.target.value)}
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Tags <small className="muted">(comma-separated)</small></span>
            <input
              type="text"
              placeholder="memory, routing, infra"
              value={form.tagsText}
              onChange={e => update("tagsText", e.target.value)}
            />
          </label>
        </div>

        {/* Confidence slider */}
        <label className="field">
          <span>Confidence: <strong>{form.confidence}%</strong></span>
          <input
            type="range"
            min={0}
            max={100}
            value={form.confidence}
            onChange={e => update("confidence", Number(e.target.value))}
          />
        </label>

        {/* Notes */}
        <label className="field">
          <span>Notes <small className="muted">(optional)</small></span>
          <textarea
            placeholder="Context, references, reminders…"
            value={form.notes}
            onChange={e => update("notes", e.target.value)}
            rows={3}
          />
        </label>

        {/* Actions */}
        <div className="actions">
          <button disabled={!isValid || submitting} className="button create" type="submit">
            {submitting ? "Creating…" : "Create Spark"}
          </button>
          <button type="button" className="button ghost" onClick={resetForm}>
            Reset
          </button>
        </div>
      </form>

      {/* Preview card */}
      {preview && (
        <section className="preview">
          <div className="preview-head">
            <strong>Preview</strong>
            <small className="muted">{new Date(preview.created_at).toLocaleString()}</small>
          </div>
          <div className="preview-body">
            <div className="row"><span className="label">Title</span><span>{preview.title}</span></div>
            <div className="row"><span className="label">Content</span><span>{preview.content}</span></div>
            <div className="row"><span className="label">Category</span><span>{preview.category}</span></div>
            <div className="row"><span className="label">Tags</span><span>{preview.tags.join(", ") || "—"}</span></div>
            <div className="row"><span className="label">Confidence</span><span>{preview.confidence}%</span></div>
            {preview.notes && <div className="row"><span className="label">Notes</span><span>{preview.notes}</span></div>}
          </div>
        </section>
      )}

      {/* Preview table (for Loom) */}
      <section style={{ marginTop: 16 }}>
        <div className="table-wrap">
          <table className="spark-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Tags</th>
                <th>Conf.</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr><td colSpan={5} className="muted">No sparks yet — create one above.</td></tr>
              ) : rows.map((s, idx) => (
                <tr key={`${s.created_at}-${idx}`}>
                  <td>{s.title}</td>
                  <td>{s.category}</td>
                  <td>{s.tags.join(", ")}</td>
                  <td>{s.confidence}%</td>
                  <td>{new Date(s.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
