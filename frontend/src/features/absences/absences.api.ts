import { apiRequest, type DayOff, type Vacation, type VacationStatus } from "../../lib/api-client/client";

export function createVacation(input: {
  employeeId: string;
  startDate: string;
  endDate: string;
  status: VacationStatus;
  notes?: string;
}) {
  return apiRequest<Vacation>("/vacations", { method: "POST", body: JSON.stringify(input) });
}

export function updateVacation(vacationId: string, input: Partial<Vacation>) {
  return apiRequest<Vacation>(`/vacations/${vacationId}`, { method: "PATCH", body: JSON.stringify(input) });
}

export function deleteVacation(vacationId: string) {
  return apiRequest<void>(`/vacations/${vacationId}`, { method: "DELETE" });
}

export function createDayOff(input: { employeeId: string; startDate: string; endDate: string; reason: string }) {
  return apiRequest<DayOff>("/day-offs", { method: "POST", body: JSON.stringify(input) });
}

export function updateDayOff(dayOffId: string, input: Partial<DayOff>) {
  return apiRequest<DayOff>(`/day-offs/${dayOffId}`, { method: "PATCH", body: JSON.stringify(input) });
}

export function deleteDayOff(dayOffId: string) {
  return apiRequest<void>(`/day-offs/${dayOffId}`, { method: "DELETE" });
}
