import { apiRequest, type Timeline } from "../../lib/api-client/client";

export function getTeamTimeline(teamId: string, startDate: string, endDate: string) {
  return apiRequest<Timeline>(`/teams/${teamId}/timeline?startDate=${startDate}&endDate=${endDate}`);
}
