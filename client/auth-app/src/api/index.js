export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`, { credentials: "include" });
  if (!res.ok)
    throw new Error(
      (await res.json().catch(() => ({}))).message || "Request failed"
    );
  return res.json();
}

export async function apiPost(path, data) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok)
    throw new Error(
      (await res.json().catch(() => ({}))).message || "Request failed"
    );
  return res.json();
}
