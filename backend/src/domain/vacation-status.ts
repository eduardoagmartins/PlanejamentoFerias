export const vacationStatuses = ["Agendado", "Em andamento", "Encerradas"] as const;

export type VacationStatus = (typeof vacationStatuses)[number];

export function isVacationStatus(value: unknown): value is VacationStatus {
  return typeof value === "string" && vacationStatuses.includes(value as VacationStatus);
}
