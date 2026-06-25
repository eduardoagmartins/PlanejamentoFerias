import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { ConflictsPage } from "../../features/conflicts/ConflictsPage";

describe("conflicts flow", () => {
  it("loads conflict summary states", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => [{ teamId: "t1", startDate: "2026-07-05", endDate: "2026-07-06", employeeIds: ["e1", "e2"], absenceIds: ["a1", "a2"] }]
      })
    );

    render(
      <MemoryRouter initialEntries={["/app/teams/t1/conflicts"]}>
        <Routes>
          <Route path="/app/teams/:teamId/conflicts" element={<ConflictsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await userEvent.click(screen.getByRole("button", { name: /revisar/i }));
    await waitFor(() => expect(screen.getByText("2 colaboradores")).toBeInTheDocument());
  });
});
