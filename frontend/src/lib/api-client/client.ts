export type Manager = { id: string; name: string; email: string };
export type Team = { id: string; name: string };
export type Employee = {
  id: string;
  teamId: string;
  name: string;
  email?: string;
  corporateIdentifier?: string;
  role?: string;
  active: boolean;
};
export type VacationStatus = "Agendado" | "Em andamento" | "Encerradas";
export type Vacation = { id: string; employeeId: string; startDate: string; endDate: string; status: VacationStatus; notes?: string };
export type DayOff = { id: string; employeeId: string; startDate: string; endDate: string; reason: string };
export type Absence = { id: string; type: "vacation" | "day_off"; employeeId: string; startDate: string; endDate: string; label: string };
export type Overlap = { teamId: string; startDate: string; endDate: string; employeeIds: string[]; absenceIds: string[] };
export type Timeline = {
  teamId: string;
  startDate: string;
  endDate: string;
  rows: { employee: Employee; absences: Absence[] }[];
  overlaps: Overlap[];
};

export class ApiClientError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: unknown
  ) {
    super(message);
  }
}

const baseUrl = import.meta.env.VITE_API_BASE_URL ?? "";

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers ?? {}) },
    ...options
  });

  if (response.status === 204) return undefined as T;

  const payload = await response.json();
  if (!response.ok) {
    throw new ApiClientError(response.status, payload.message ?? "Request failed", payload.details);
  }
  return payload as T;
}
