import { apiRequest, type Overlap } from "../../lib/api-client/client";

export function getTeamConflicts(teamId: string, startDate: string, endDate: string) {
  return apiRequest<Overlap[]>(`/teams/${teamId}/conflicts?startDate=${startDate}&endDate=${endDate}`);
}
