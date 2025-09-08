// src/lib/api.ts
export type Spark = {
  user_sub: string;
  spark_id: string;
  title: string;
  summary?: string;
  vessel?: string;
  created_at: string;
};

const BASE = (import.meta as any).env?.VITE_API_URL?.replace(/\/+$/, "");
if (!BASE) {
  // This makes failure obvious in dev and shows in console on prod
  console.error("VITE_API_URL is missing");
}

async function jsonOrThrow(res: Response) {
  const text = await res.text();
  let payload: any = null;
  try { payload = text ? JSON.parse(text) : null; } catch { /* keep text */ }
  if (!res.ok) {
    const msg =
      (payload && (payload.message || payload.error)) ||
      `HTTP ${res.status} ${res.statusText}`;
    throw new Error(msg);
  }
  return payload;
}

export async function createSpark(input: {
  user_sub: string;
  title: string;
  summary?: string;
  vessel?: string;
}): Promise<Spark> {
  const res = await fetch(`${BASE}/sparks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return jsonOrThrow(res);
}

export async function listSparks(user_sub: string): Promise<Spark[]> {
  const res = await fetch(`${BASE}/sparks?user_sub=${encodeURIComponent(user_sub)}`);
  const data = await jsonOrThrow(res);
  // API may return array or object; normalize to array
  return Array.isArray(data) ? data : [data];
}
