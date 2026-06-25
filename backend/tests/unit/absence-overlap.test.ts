import { describe, expect, it } from "vitest";
import { detectOverlaps } from "../../src/domain/absence-overlap.js";

describe("absence overlap", () => {
  it("detects overlapping absences for different employees only", () => {
    const overlaps = detectOverlaps("team-1", [
      { id: "a", type: "vacation", employeeId: "e1", startDate: "2026-07-01", endDate: "2026-07-10", label: "Agendado" },
      { id: "b", type: "day_off", employeeId: "e2", startDate: "2026-07-05", endDate: "2026-07-06", label: "Folga" },
      { id: "c", type: "vacation", employeeId: "e1", startDate: "2026-07-03", endDate: "2026-07-04", label: "Agendado" }
    ]);

    expect(overlaps).toHaveLength(1);
    expect(overlaps[0]).toMatchObject({ startDate: "2026-07-05", endDate: "2026-07-06" });
  });
});
