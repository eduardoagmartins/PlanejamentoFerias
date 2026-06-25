import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { TeamsPage } from "../../features/teams/TeamsPage";
import { EmployeesPage } from "../../features/employees/EmployeesPage";

describe("team and employee flow", () => {
  it("renders team form and list", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => [{ id: "t1", name: "Produto" }] })
    );

    render(
      <MemoryRouter>
        <TeamsPage />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Nome do time")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText("Produto")).toBeInTheDocument());
  });

  it("submits employee form", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, status: 200, json: async () => [] })
      .mockResolvedValueOnce({ ok: true, status: 201, json: async () => ({ id: "e1", teamId: "t1", name: "Ana", active: true }) })
      .mockResolvedValueOnce({ ok: true, status: 200, json: async () => [{ id: "e1", teamId: "t1", name: "Ana", active: true }] });
    vi.stubGlobal("fetch", fetchMock);

    render(
      <MemoryRouter initialEntries={["/app/teams/t1/employees"]}>
        <Routes>
          <Route path="/app/teams/:teamId/employees" element={<EmployeesPage />} />
        </Routes>
      </MemoryRouter>
    );

    await userEvent.type(screen.getByPlaceholderText("Nome"), "Ana");
    await userEvent.click(screen.getByRole("button", { name: /adicionar/i }));
    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining("/teams/t1/employees"), expect.objectContaining({ method: "POST" })));
  });
});
