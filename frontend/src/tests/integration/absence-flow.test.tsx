import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { AbsencesPage } from "../../features/absences/AbsencesPage";
import { VacationForm } from "../../features/absences/VacationForm";
import { DayOffForm } from "../../features/absences/DayOffForm";

const employees = [{ id: "e1", teamId: "t1", name: "Ana", active: true }];

describe("absence flow", () => {
  it("renders vacation and day-off forms with employee selection", () => {
    vi.stubGlobal("fetch", vi.fn());
    render(
      <>
        <VacationForm employees={employees} onSaved={() => undefined} />
        <DayOffForm employees={employees} onSaved={() => undefined} />
      </>
    );

    expect(screen.getAllByText("Ana")).toHaveLength(2);
    expect(screen.getByRole("button", { name: /salvar ferias/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /salvar day-off/i })).toBeInTheDocument();
  });

  it("edits a registered vacation from the absences page", async () => {
    const fetchMock = vi.fn(async (url: string, options?: RequestInit) => {
      if (url.includes("/teams/t1/employees")) {
        return { ok: true, status: 200, json: async () => employees };
      }
      if (url.includes("/teams/t1/timeline")) {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            teamId: "t1",
            startDate: "2026-07-01",
            endDate: "2026-09-29",
            overlaps: [],
            rows: [
              {
                employee: employees[0],
                absences: [
                  {
                    id: "v1",
                    type: "vacation",
                    employeeId: "e1",
                    startDate: "2026-07-10",
                    endDate: "2026-07-20",
                    label: "Agendado"
                  }
                ]
              }
            ]
          })
        };
      }
      if (url.includes("/vacations/v1") && options?.method === "PATCH") {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            id: "v1",
            employeeId: "e1",
            startDate: "2026-07-10",
            endDate: "2026-07-20",
            status: "Agendado"
          })
        };
      }
      return { ok: true, status: 204, json: async () => ({}) };
    });
    vi.stubGlobal("fetch", fetchMock);

    render(
      <MemoryRouter initialEntries={["/app/teams/t1/absences"]}>
        <Routes>
          <Route path="/app/teams/:teamId/absences" element={<AbsencesPage />} />
        </Routes>
      </MemoryRouter>
    );

    await screen.findByText(/Ferias: Agendado/i);
    await userEvent.click(screen.getByRole("button", { name: /editar/i }));
    await userEvent.click(screen.getByRole("button", { name: /^salvar$/i }));

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/vacations/v1"),
      expect.objectContaining({ method: "PATCH" })
    );
  });
});
