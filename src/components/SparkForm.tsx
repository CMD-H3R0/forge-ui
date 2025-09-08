import { useState } from "react";
import { createSpark, type Spark } from "../lib/api";

export default function SparkForm({
  user, onCreated,
}: { user: string; onCreated: (s: Spark) => void; }) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null); setBusy(true);
    try {
      const made = await createSpark({
        user_sub: user,
        title: title.trim(),
        summary: summary.trim(),
        vessel: "text.web",
      });
      onCreated(made);
      setTitle(""); setSummary("");
    } catch (e: any) {
      setErr(e?.message ?? "Failed to create spark");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" />
      <textarea value={summary} onChange={(e)=>setSummary(e.target.value)} placeholder="Summary" />
      <button type="submit" disabled={busy}>
        {busy ? "Creating…" : "Create Spark"}
      </button>
      {err && <div role="alert">{err}</div>}
    </form>
  );
}
