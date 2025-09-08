import { useState } from "react";
import { createSpark, type Spark } from "../lib/api";

export default function SparkForm({
  user,
  onCreated,
}: {
  user: string;
  onCreated: (s: Spark) => void;
}) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      const made = await createSpark({
        user_sub: user,
        title: title.trim(),
        summary: summary.trim(),
        vessel: "text.web",
      });
      onCreated(made);
      setTitle("");
      setSummary("");
    } catch (e: any) {
      setErr(e?.message ?? "Failed to create spark");
    } finally {
      setBusy(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    fontSize: 14,
    lineHeight: 1.25,
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "#e8e9ea",
    outline: "none",
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 8 }}
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        style={inputStyle}
      />
      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="Summary"
        style={{ ...inputStyle, minHeight: 80, resize: "vertical" as const }}
      />
      <button
        type="submit"
        disabled={busy}
        style={{
          marginTop: 8,
          padding: "10px 18px",
          borderRadius: 10,
          border: "none",
          fontWeight: 600,
          cursor: busy ? "not-allowed" : "pointer",
          color: "#fff",
          background: busy
            ? "linear-gradient(90deg,#94a3b8,#64748b)"
            : "linear-gradient(90deg,#6366f1,#3b82f6)",
          boxShadow: busy
            ? "0 0 6px rgba(100,116,139,0.4)"
            : "0 0 12px rgba(59,130,246,0.45)",
          transition: "all 0.2s ease",
        }}
      >
        {busy ? "Creating…" : "Create Spark"}
      </button>
      {err && (
        <div role="alert" style={{ color: "#ff9b9b", marginTop: 6 }}>
          {err}
        </div>
      )}
    </form>
  );
}
