import { apiRequest, type Manager } from "../../lib/api-client/client";

export function login(email: string, password: string) {
  return apiRequest<{ manager: Manager }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
}

export function logout() {
  return apiRequest<void>("/auth/logout", { method: "POST" });
}

export function getCurrentManager() {
  return apiRequest<Manager>("/me");
}
