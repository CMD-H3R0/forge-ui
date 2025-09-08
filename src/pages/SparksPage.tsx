import { useState } from "react";
import SparkForm from "../components/SparkForm";
import SparkList from "../components/SparkList";
import type { Spark } from "../lib/api";

export default function SparksPage() {
  const [last, setLast] = useState<Spark | null>(null);

  // Page-level styles: full-bleed dark background, readable text
  const page: React.CSSProperties = {
    minHeight: "100vh",
    margin: 0,
    padding: "48px 16px",
    background: "#0e0f12",      // <- dark background for this route
    color: "#e8e9ea",
  };

  // Centered content container
  const wrap: React.CSSProperties = {
    maxWidth: 960,
    margin: "0 auto",
  };

  // Simple card shells (subtle, not white)
  const card: React.CSSProperties = {
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    background: "rgba(255,255,255,0.03)",
    backdropFilter: "blur(2px)",
  };

  const title: React.CSSProperties = {
    fontSize: 32,
    fontWeight: 800,
    letterSpacing: 0.2,
    margin: "0 0 16px 0",
  };

  return (
    <div style={page}>
      <div style={wrap}>
        <h1 style={title}>Forge Sparks</h1>

        <div style={card}>
          <SparkForm onCreated={setLast} user="anon" />
        </div>

        <div style={card}>
          <SparkList key={last?.spark_id || "initial"} user="anon" />
        </div>
      </div>
    </div>
  );
}
