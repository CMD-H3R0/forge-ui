import { useEffect, useState } from "react";
import { listSparks } from "../lib/api";
import type { Spark } from "../lib/api";

export default function SparkList({ user = "anon" }: { user?: string }) {
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    listSparks(user).then(setSparks).catch(console.error);
  }, [user]);

  if (!sparks.length) {
    return <div style={{ opacity: 0.7 }}>No sparks yet.</div>;
  }

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        tableLayout: "fixed",
        marginTop: "12px",
      }}
    >
      <thead>
        <tr>
          <th style={{ textAlign: "left", padding: "6px 8px", width: "25%" }}>Created</th>
          <th style={{ textAlign: "left", padding: "6px 8px", width: "25%" }}>Title</th>
          <th style={{ textAlign: "left", padding: "6px 8px", width: "25%" }}>Summary</th>
          <th style={{ textAlign: "left", padding: "6px 8px", width: "25%" }}>Vessel</th>
        </tr>
      </thead>
      <tbody>
        {sparks.map((s, idx) => (
          <tr
            key={s.spark_id}
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              background: idx % 2 === 0 ? "rgba(255,255,255,0.03)" : "transparent",
            }}
          >
            <td style={{ padding: "6px 8px", opacity: 0.85 }}>
              {new Date(s.created_at).toLocaleString()}
            </td>
            <td style={{ padding: "6px 8px", fontWeight: 600 }}>{s.title}</td>
            <td style={{ padding: "6px 8px" }}>{s.summary}</td>
            <td style={{ padding: "6px 8px" }}>{s.vessel}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
