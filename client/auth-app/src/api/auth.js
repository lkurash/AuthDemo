const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok)
    throw new Error(
      (await res.json().catch(() => ({}))).message || "Request failed"
    );
  return res.json();
}

export async function register(username, email, password) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, email, password }),
  });
  if (!res.ok)
    throw new Error(
      (await res.json().catch(() => ({}))).message || "Request failed"
    );
  return res.json();
}

export async function logout() {
  const res = await fetch(`${API_BASE}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok)
    throw new Error(
      (await res.json().catch(() => ({}))).message || "Request failed"
    );
  return res.json();
}
