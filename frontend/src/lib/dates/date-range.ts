export function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export function addDaysIso(startDate: string, days: number) {
  const date = new Date(`${startDate}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function isValidDateRange(startDate: string, endDate: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(startDate) && /^\d{4}-\d{2}-\d{2}$/.test(endDate) && endDate >= startDate;
}
