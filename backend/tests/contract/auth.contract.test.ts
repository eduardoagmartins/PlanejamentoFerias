import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../../src/app.js";
import { createTestDb } from "../helpers/test-db.js";
import { expectContractPath, expectErrorShape } from "./openapi-matchers.js";

describe("auth contract", () => {
  it("matches OpenAPI paths and error shape", async () => {
    expectContractPath("/auth/login", "post", "200");
    expectContractPath("/auth/logout", "post", "204");
    expectContractPath("/me", "get", "200");

    const db = await createTestDb();
    const response = await request(createApp(db)).get("/me").expect(401);
    expectErrorShape(response.body);
    expect(response.body.message).toBe("Not authenticated");
    db.close();
  });
});
