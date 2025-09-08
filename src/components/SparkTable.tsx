import { useEffect, useState } from "react";
import { listSparks } from "../lib/api";
import type { Spark } from "../lib/api";

export default function SparkTable({
  user = "anon",
  refreshKey,
}: {
  user?: string;
  refreshKey?: string | null;
}) {
  const [rows, setRows] = useState<Spark[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const data = await listSparks(user);
        if (alive) setRows(Array.isArray(data) ? data : [data]);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [user, refreshKey]);

  const wrap: React.CSSProperties = { overflowX: "auto" };
  const table: React.CSSProperties = {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: 0,
    fontSize: 14,
  };
  const thtd: React.CSSProperties = {
    padding: "10px 12px",
    borderBottom: "1px solid rgba(255,255,255,0.10)",
    verticalAlign: "top",
  };
  const th: React.CSSProperties = { ...thtd, opacity: 0.8, textAlign: "left", whiteSpace: "nowrap" };
  const trHover: React.CSSProperties = { background: "rgba(255,255,255,0.03)" };

  return (
    <div style={wrap} aria-live="polite">
      <table style={table}>
        <thead>
          <tr>
            <th style={th}>Created</th>
            <th style={th}>Title</th>
            <th style={th}>Summary</th>
            <th style={th}>Vessel</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr style={trHover}>
              <td style={thtd} colSpan={4}>Loading…</td>
            </tr>
          )}
          {!loading && rows.length === 0 && (
            <tr style={trHover}>
              <td style={thtd} colSpan={4}>No sparks yet.</td>
            </tr>
          )}
          {rows.map((s) => (
            <tr key={s.spark_id} style={trHover}>
              <td style={thtd}>
                {new Date(s.created_at ?? Date.now()).toLocaleString()}
              </td>
              <td style={thtd}><strong>{s.title}</strong></td>
              <td style={thtd}>{s.summary}</td>
              <td style={thtd}>{s.vessel ?? "text.web"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
