import { useState } from "react";
import { createSpark } from "../lib/api";
import type { Spark } from "../lib/api";

export default function SparkForm({ user="anon", onCreated }:{
  user?: string; onCreated?: (s: Spark)=>void
}){
  const [title,setTitle]=useState(""); const [summary,setSummary]=useState("");
  const [busy,setBusy]=useState(false); const [err,setErr]=useState<string|null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault(); if(!title.trim()||busy) return;
    setBusy(true); setErr(null);
    try{
      const created = await createSpark({ user_sub:user, title:title.trim(), summary:summary.trim(), vessel:"text.web" });
      setTitle(""); setSummary(""); onCreated?.(created);
    }catch(ex:any){ setErr(ex?.message??"Failed to create spark"); }
    finally{ setBusy(false); }
  }

  return (
    <form onSubmit={onSubmit} aria-live="polite">
      <div style={{marginBottom:12}}>
        <input id="spark-title" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
      </div>
      <div style={{marginBottom:12}}>
        <textarea placeholder="Summary" value={summary} onChange={e=>setSummary(e.target.value)} rows={4}/>
      </div>
      <button type="submit" className="button create" disabled={busy}>{busy?"Creating…":"Create Spark"}</button>
      {err && <span style={{marginLeft:12,opacity:.85}}>{err}</span>}
    </form>
  );
}
