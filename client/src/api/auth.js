import { apiPost } from "./index";

export async function login(email, password) {
  return apiPost(`/auth/login`, { email, password });
}

export async function register(username, email, password) {
  return apiPost(`/auth/register`, { username, email, password });
}

export async function logout() {
  return apiPost(`/auth/logout`, {});
}
