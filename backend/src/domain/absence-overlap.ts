import { intersection, type DateRange } from "./date-range.js";

export type Absence = DateRange & {
  id: string;
  type: "vacation" | "day_off";
  employeeId: string;
  label: string;
};

export type Overlap = DateRange & {
  teamId: string;
  employeeIds: string[];
  absenceIds: string[];
};

export function detectOverlaps(teamId: string, absences: Absence[]): Overlap[] {
  const overlaps: Overlap[] = [];

  for (let i = 0; i < absences.length; i += 1) {
    for (let j = i + 1; j < absences.length; j += 1) {
      const first = absences[i];
      const second = absences[j];
      if (first.employeeId === second.employeeId) continue;

      const shared = intersection(first, second);
      if (!shared) continue;

      overlaps.push({
        teamId,
        ...shared,
        employeeIds: Array.from(new Set([first.employeeId, second.employeeId])),
        absenceIds: Array.from(new Set([first.id, second.id]))
      });
    }
  }

  return overlaps;
}
