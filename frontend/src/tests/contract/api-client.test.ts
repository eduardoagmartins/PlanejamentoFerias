import { describe, expect, it, vi } from "vitest";
import { apiRequest } from "../../lib/api-client/client";

describe("frontend API client contract", () => {
  it("parses success payloads and standardized errors", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({ id: "m1", name: "Gestor", email: "gestor@example.com" }) })
        .mockResolvedValueOnce({ ok: false, status: 400, json: async () => ({ message: "Invalid request", details: { field: "name" } }) })
    );

    await expect(apiRequest("/me")).resolves.toMatchObject({ email: "gestor@example.com" });
    await expect(apiRequest("/teams")).rejects.toThrow("Invalid request");
  });
});
