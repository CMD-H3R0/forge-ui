import { useState } from "react";
import SparkForm from "../components/SparkForm";
import SparkList from "../components/SparkList";
import type { Spark } from "../lib/api";

export default function SparksPage() {
  const [last, setLast] = useState<Spark | null>(null);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>
        Forge Sparks
      </h1>

      {/* Spark creation form */}
      <div style={{ marginBottom: "2rem" }}>
        <SparkForm onCreated={setLast} user="anon" />
      </div>

      {/* Spark list */}
      <SparkList key={last?.spark_id || "initial"} user="anon" />
    </div>
  );
}
