import { useState } from "react";
import { createSpark, Spark } from "../lib/api";

export default function SparkForm({
  onCreated,
  user = "anon",
}: {
  onCreated: (s: Spark) => void;
  user?: string;
}) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");

  const row: React.CSSProperties = { display: "grid", gap: 8, marginBottom: 8 };
  const input: React.CSSProperties = {
    width: "100%",
    padding: "8px 10px",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.06)",
    color: "inherit",
  };
  const btn: React.CSSProperties = {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.1)",
    cursor: "pointer",
    fontWeight: 600,
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const s = await createSpark({
      user_sub: user,
      title,
      summary,
      vessel: "text.web",
    });
    onCreated(s);
    setTitle("");
    setSummary("");
  }

  return (
    <form onSubmit={submit}>
      <div style={row}>
        <input
          style={input}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          style={{ ...input, minHeight: 80, resize: "vertical" }}
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />
      </div>
      <button type="submit" style={btn}>
        Create Spark
      </button>
    </form>
  );
}
