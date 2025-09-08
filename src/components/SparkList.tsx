import { useEffect, useState } from "react";
import { listSparks, Spark } from "../lib/api";

export default function SparkList({ user = "anon" }: { user?: string }) {
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    listSparks(user).then(setSparks).catch(console.error);
  }, [user]);

  const item: React.CSSProperties = {
    padding: "10px 0",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  };
  const meta: React.CSSProperties = { opacity: 0.7, fontSize: 12 };

  if (!sparks.length) return <div style={{ opacity: 0.7 }}>No sparks yet.</div>;

  return (
    <div>
      {sparks.map((s) => (
        <div key={s.spark_id} style={item}>
          <div style={meta}>{new Date(s.created_at).toLocaleString()}</div>
          <div style={{ fontWeight: 600 }}>{s.title}</div>
          <div>{s.summary}</div>
        </div>
      ))}
    </div>
  );
}
