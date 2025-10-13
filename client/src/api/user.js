import { ApiClient } from "./client";

const apiClient = new ApiClient();

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";

export async function getUser() {
  return apiClient.get(`/users/me`);
}
