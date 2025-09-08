export type Spark = {
  user_sub: string;
  spark_id: string;
  title: string;
  summary: string;
  vessel: string;
  created_at: string;
};

const BASE = import.meta.env.VITE_API_URL!.replace(/\/$/, "");

export async function listSparks(user: string): Promise<Spark[]> {
  const r = await fetch(`${BASE}/sparks?user_sub=${encodeURIComponent(user)}`, { mode: "cors" });
  if (!r.ok) throw new Error(`GET /sparks ${r.status}`);
  return r.json();
}

export async function createSpark(input: {
  user_sub: string; title: string; summary: string; vessel: string;
}): Promise<Spark> {
  const r = await fetch(`${BASE}/sparks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
    mode: "cors",
  });
  if (!r.ok) throw new Error(`POST /sparks ${r.status}`);
  return r.json();
}
