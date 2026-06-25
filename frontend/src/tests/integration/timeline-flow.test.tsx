import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TimelineGrid } from "../../features/timeline/TimelineGrid";

describe("timeline flow", () => {
  it("renders absences and overlap marker", () => {
    render(
      <TimelineGrid
        timeline={{
          teamId: "t1",
          startDate: "2026-07-01",
          endDate: "2026-07-31",
          rows: [
            {
              employee: { id: "e1", teamId: "t1", name: "Ana", active: true },
              absences: [{ id: "a1", type: "vacation", employeeId: "e1", startDate: "2026-07-01", endDate: "2026-07-10", label: "Agendado" }]
            }
          ],
          overlaps: [{ teamId: "t1", startDate: "2026-07-05", endDate: "2026-07-06", employeeIds: ["e1", "e2"], absenceIds: ["a1", "a2"] }]
        }}
      />
    );

    expect(screen.getByText("Ana")).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Sobreposicao/).length).toBeGreaterThan(0);
  });
});
