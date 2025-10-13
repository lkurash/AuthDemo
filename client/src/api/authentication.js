import { ApiClient } from "./client";

const apiClient = new ApiClient();

export async function login(email, password) {
  return apiClient.post(`/auth/login`, { email, password });
}

export async function register(username, email, password) {
  return apiClient.post(`/auth/register`, { username, email, password });
}

export async function logout() {
  return apiClient.post(`/auth/logout`, {});
}
