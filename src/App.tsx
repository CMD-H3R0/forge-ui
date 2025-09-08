import { useState } from "react";
import SparkForm from "./components/SparkForm";
import SparkList from "./components/SparkList";
import type { Spark } from "./lib/api";

export default function App() {
  const [last, setLast] = useState<Spark | null>(null);

  const page: React.CSSProperties = {
    maxWidth: 720,
    margin: "40px auto",
    padding: "16px",
    lineHeight: 1.4,
  };
  const title: React.CSSProperties = {
    fontSize: 28,
    fontWeight: 700,
    margin: "0 0 16px 0",
  };
  const card: React.CSSProperties = {
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    background: "rgba(0,0,0,0.25)",
  };

  return (
    <div style={page}>
      <h1 style={title}>Forge Sparks</h1>

      {/* Form */}
      <div style={card}>
        <SparkForm
          onCreated={setLast}
          user="anon"
        />
      </div>

      {/* List */}
      <div style={card}>
        <SparkList key={last?.spark_id || "initial"} user="anon" />
      </div>
    </div>
  );
}

<p style={{ marginTop: 12 }}>
  <a href="/sparks">Open Sparks UI →</a>
</p>

