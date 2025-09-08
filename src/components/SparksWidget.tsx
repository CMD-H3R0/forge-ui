// src/components/SparksWidget.tsx
import { useEffect, useMemo, useState } from "react";
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
      // newest first by created_at if possible
      const sorted = [...data].sort(
        (a, b) => +new Date(b.created_at) - +new Date(a.created_at)
      );
      setItems(sorted);
    } catch (ex: any) {
      setErr(ex?.message ?? "Failed to load sparks");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); /* initial */ }, []);

  const rows = useMemo(
    () =>
      items.map((s) => (
        <tr key={s.spark_id}>
          <td>{new Date(s.created_at).toLocaleString()}</td>
          <td style={{ fontWeight: 600 }}>{s.title}</td>
          <td>{s.summary}</td>
          <td>{s.vessel}</td>
        </tr>
      )),
    [items]
  );

  return (
    <div style={{ margin: "0 auto", maxWidth: 960 }}>
      <div style={{
        borderRadius: 16,
        padding: 16,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 6px 20px rgba(0,0,0,0.35)"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: 12 }}>{title}</h2>
        <SparkForm
          user={user}
          onCreated={() => {
            // re-fetch after create
            load();
          }}
        />
      </div>

      <div style={{ marginTop: 24, overflowX: "auto" }}>
        {loading ? (
          <div style={{ opacity: 0.8 }}>Loading…</div>
        ) : err ? (
          <div style={{ color: "#ff9b9b" }}>{err}</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ textAlign: "left", opacity: 0.8 }}>
              <tr>
                <th>Created</th>
                <th>Title</th>
                <th>Summary</th>
                <th>Vessel</th>
              </tr>
            </thead>
            <tbody style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              {rows}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
