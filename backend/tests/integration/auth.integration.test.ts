import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../../src/app.js";
import { createTestDb } from "../helpers/test-db.js";

describe("auth integration", () => {
  it("logs in, reads /me, logs out, and blocks unauthenticated access", async () => {
    const db = await createTestDb();
    const app = createApp(db);

    await request(app).get("/me").expect(401);
    await request(app).post("/auth/login").send({ email: "gestor@example.com", password: "errada" }).expect(401);

    const login = await request(app).post("/auth/login").send({ email: "gestor@example.com", password: "senha123" }).expect(200);
    const cookie = login.headers["set-cookie"];

    await request(app).get("/me").set("Cookie", cookie).expect(200).expect(({ body }) => {
      expect(body.email).toBe("gestor@example.com");
    });
    await request(app).post("/auth/logout").set("Cookie", cookie).expect(204);
    db.close();
  });
});
