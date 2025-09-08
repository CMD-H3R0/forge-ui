import { useState } from "react";
import SparkForm from "./components/SparkForm";
import SparkList from "./components/SparkList";
import type { Spark } from "./lib/api";

export default function App() {
  const [last, setLast] = useState<Spark | null>(null);
  return (
    <div className="max-w-2xl mx-auto space-y-6 py-8">
      <h1 className="text-2xl font-bold">Forge Sparks</h1>
      <SparkForm onCreated={setLast} user="anon" />
      <SparkList key={last?.spark_id || "initial"} user="anon" />
    </div>
  );
}
