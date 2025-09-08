export type Spark = {
  user_sub: string; spark_id: string; title: string;
  summary?: string; vessel?: string; created_at: string;
  kind?: string; score?: number; horizon?: string; tags?: string[];
};

const BASE = (import.meta as any).env?.VITE_API_URL?.replace(/\/+$/,'');
console.log("VITE_API_URL at build:", import.meta.env.VITE_API_URL);
if (!BASE) console.error("VITE_API_URL is missing");

async function jsonOrThrow(res: Response){
  const txt = await res.text(); let data=null; try{data=txt?JSON.parse(txt):null;}catch{}
  if(!res.ok){throw new Error((data&&(data.message||data.error))||`HTTP ${res.status} ${res.statusText}`);}
  return data;
}

export async function createSpark(input: {
  user_sub: string; title: string; summary?: string; vessel?: string;
  kind?: string; impact?: number; effort?: number; priority?: number;
  horizon?: string; tags?: string[]; links?: string;
}): Promise<Spark>{
  const res = await fetch(`${BASE}/sparks`, {
    method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(input)
  });
  return jsonOrThrow(res);
}

export async function listSparks(user_sub: string): Promise<Spark[]>{
  const res = await fetch(`${BASE}/sparks?user_sub=${encodeURIComponent(user_sub)}`);
  const data = await jsonOrThrow(res);
  return Array.isArray(data)? data : [data];
}
