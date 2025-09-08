// src/lib/api.ts
export type Spark = {
  user_sub: string;
  spark_id: string;
  title: string;
  summary: string;
  vessel: string;
  created_at: string;
};

const API = import.meta.env.VITE_API_URL as string;

export async function createSpark(input: {
  user_sub: string;
  title: string;
  summary: string;
  vessel?: string;
}): Promise<Spark> {
  const res = await fetch(`${API}/sparks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ vessel: "text.web", ...input }),
  });
  if (!res.ok) throw new Error(`POST /sparks failed: ${res.status}`);
  return res.json();
}

export async function listSparks(user_sub: string): Promise<Spark[]> {
  const res = await fetch(`${API}/sparks?user_sub=${encodeURIComponent(user_sub)}`);
  if (!res.ok) throw new Error(`GET /sparks failed: ${res.status}`);
  return res.json();
}
