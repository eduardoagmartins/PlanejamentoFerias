export type DateRange = {
  startDate: string;
  endDate: string;
};

export function assertIsoDate(value: string): void {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(`${value}T00:00:00Z`))) {
    throw new Error("Date must use YYYY-MM-DD");
  }
}

export function isValidRange(range: DateRange): boolean {
  assertIsoDate(range.startDate);
  assertIsoDate(range.endDate);
  return range.endDate >= range.startDate;
}

export function overlaps(a: DateRange, b: DateRange): boolean {
  return a.startDate <= b.endDate && b.startDate <= a.endDate;
}

export function intersection(a: DateRange, b: DateRange): DateRange | null {
  if (!overlaps(a, b)) return null;
  return {
    startDate: a.startDate > b.startDate ? a.startDate : b.startDate,
    endDate: a.endDate < b.endDate ? a.endDate : b.endDate
  };
}
