import { useState } from "react";
import { createSpark } from "../lib/api";
import type { Spark } from "../lib/api";


export default function SparkForm({ onCreated, user = "anon" }: {
  onCreated: (s: Spark) => void; user?: string;
}) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const s = await createSpark({ user_sub: user, title, summary, vessel: "text.web" });
    onCreated(s);
    setTitle(""); setSummary("");
  }

  return (
    <form onSubmit={submit} className="grid gap-2 p-4 rounded-2xl shadow">
      <input className="border p-2 rounded" placeholder="Title"
             value={title} onChange={(e)=>setTitle(e.target.value)} required />
      <textarea className="border p-2 rounded" placeholder="Summary"
                value={summary} onChange={(e)=>setSummary(e.target.value)} required />
      <button className="bg-black text-white px-4 py-2 rounded">Create Spark</button>
    </form>
  );
}
