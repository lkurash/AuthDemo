export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";

export class ApiClient {
  constructor(parameters) {
    this.parameters = parameters;
  }
  async get(path) {
    const csrf = getCookie("XSRF-TOKEN");
    const res = await fetch(`${API_BASE}${path}`, {
      method: "GET",
      credentials: "include",
      headers: {
        ...(csrf ? { "X-XSRF-TOKEN": csrf } : {}),
        Accept: "application/json",
      },
    });
    if (!res.ok)
      throw new Error(
        (await res.json().catch(() => ({}))).message || "Request failed"
      );
    return res.json();
  }
  async post(path, body) {
    const csrf = getCookie("XSRF-TOKEN");

    const res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(csrf ? { "X-XSRF-TOKEN": csrf } : {}),
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!res.ok)
      throw new Error(
        (await res.json().catch(() => ({}))).message || "Request failed"
      );
    return res.json();
  }
}

export function getCookie(name) {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}
