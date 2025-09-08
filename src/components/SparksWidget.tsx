import { useState } from "react";
import SparkForm from "./SparkForm";
import SparkTable from "./SparkTable";
import type { Spark } from "../lib/api";

export default function SparksWidget({ user = "anon", title = "Quick Spark" }:{
  user?: string;
  title?: string;
}) {
  const [last, setLast] = useState<Spark | null>(null);

  const shell: React.CSSProperties = {
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 14,
    padding: 16,
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(2px)",
  };
  const h: React.CSSProperties = { margin: 0, fontSize: 20, fontWeight: 700, opacity: 0.95 };
  const section: React.CSSProperties = { marginTop: 12 };

  return (
    <section style={shell} aria-labelledby="sparks-widget-title">
      <h2 id="sparks-widget-title" style={h}>{title}</h2>

      <div style={section}>
        <SparkForm onCreated={setLast} user={user} />
      </div>

      <div style={section}>
        <SparkTable user={user} refreshKey={last?.spark_id ?? null} />
      </div>
    </section>
  );
}
