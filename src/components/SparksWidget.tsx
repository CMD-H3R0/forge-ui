import { useEffect, useState } from "react";
import { listSparks, type Spark } from "../lib/api";
import SparkForm from "./SparkForm";

export default function SparksWidget({
  user = "anon",
  title = "Quick Spark (Demo)",
}: {
  user?: string;
  title?: string;
}) {
  const [items, setItems] = useState<Spark[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setErr(null);
    try {
      const data = await listSparks(user);
      data.sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
      setItems(data);
    } catch (ex: any) {
      setErr(ex?.message ?? "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ maxWidth: 960, width: "100%" }}>
      <div
        style={{
          borderRadius: 16,
          padding: 16,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <h2 style={{ margin: "0 0 12px", textAlign: "center" }}>{title}</h2>
        <SparkForm user={user} onCreated={() => load()} />
      </div>

      <div style={{ marginTop: 16, overflowX: "auto" }}>
        {loading ? (
          <div style={{ opacity: 0.8 }}>Loading…</div>
        ) : err ? (
          <div style={{ color: "#ff9b9b" }}>{err}</div>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              tableLayout: "fixed", // keep columns aligned
            }}
          >
            <thead style={{ textAlign: "left", opacity: 0.9 }}>
              <tr>
                <th style={{ padding: "8px 10px", width: "26%" }}>Created</th>
                <th style={{ padding: "8px 10px", width: "22%" }}>Title</th>
                <th style={{ padding: "8px 10px", width: "36%" }}>Summary</th>
                <th style={{ padding: "8px 10px", width: "16%" }}>Vessel</th>
              </tr>
            </thead>
            <tbody style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              {items.map((s, idx) => (
                <tr
                  key={s.spark_id}
                  style={{
                    background:
                      idx % 2 === 0 ? "rgba(255,255,255,0.03)" : "transparent", // zebra
                  }}
                >
                  <td style={{ padding: "8px 10px", opacity: 0.85 }}>
                    {new Date(s.created_at).toLocaleString()}
                  </td>
                  <td style={{ padding: "8px 10px", fontWeight: 600 }}>
                    {s.title}
                  </td>
                  <td style={{ padding: "8px 10px" }}>{s.summary}</td>
                  <td style={{ padding: "8px 10px" }}>{s.vessel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
