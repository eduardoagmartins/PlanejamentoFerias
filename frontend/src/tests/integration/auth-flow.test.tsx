import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { AuthProvider, RequireAuth } from "../../features/auth/AuthProvider";
import { LoginPage } from "../../features/auth/LoginPage";

describe("auth flow", () => {
  it("redirects protected routes when /me is unauthenticated", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 401, json: async () => ({ message: "Not authenticated" }) }));

    render(
      <MemoryRouter initialEntries={["/app"]}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/app" element={<RequireAuth>Area protegida</RequireAuth>} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByRole("heading", { name: /planejamento de ferias/i })).toBeInTheDocument());
  });
});
