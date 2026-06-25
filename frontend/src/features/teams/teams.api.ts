import { apiRequest, type Team } from "../../lib/api-client/client";

export function listTeams() {
  return apiRequest<Team[]>("/teams");
}

export function createTeam(name: string) {
  return apiRequest<Team>("/teams", { method: "POST", body: JSON.stringify({ name }) });
}

export function updateTeam(teamId: string, name: string) {
  return apiRequest<Team>(`/teams/${teamId}`, { method: "PATCH", body: JSON.stringify({ name }) });
}

export function deleteTeam(teamId: string) {
  return apiRequest<void>(`/teams/${teamId}`, { method: "DELETE" });
}
