import { useEffect, useState } from "react";
import { listSparks, Spark } from "../lib/api";

export default function SparkList({ user = "anon" }: { user?: string }) {
  const [sparks, setSparks] = useState<Spark[]>([]);
  useEffect(() => { listSparks(user).then(setSparks); }, [user]);

  return (
    <div className="p-4 grid gap-3">
      {sparks.map(s => (
        <div key={s.spark_id} className="border rounded p-3">
          <div className="text-sm opacity-60">{new Date(s.created_at).toLocaleString()}</div>
          <div className="font-semibold">{s.title}</div>
          <div className="opacity-80">{s.summary}</div>
        </div>
      ))}
      {sparks.length === 0 && <div className="p-3 opacity-60">No sparks yet.</div>}
    </div>
  );
}
