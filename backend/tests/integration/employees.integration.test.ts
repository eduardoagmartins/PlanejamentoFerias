import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../../src/app.js";
import { createTestDb } from "../helpers/test-db.js";

describe("employees integration", () => {
  it("creates, updates and deactivates employees", async () => {
    const db = await createTestDb();
    const app = createApp(db);
    const cookie = (await request(app).post("/auth/login").send({ email: "gestor@example.com", password: "senha123" })).headers["set-cookie"];
    const team = (await request(app).post("/teams").set("Cookie", cookie).send({ name: "CX" })).body;
    const employee = (await request(app).post(`/teams/${team.id}/employees`).set("Cookie", cookie).send({ name: "Ana" }).expect(201)).body;

    await request(app).patch(`/employees/${employee.id}`).set("Cookie", cookie).send({ role: "Designer" }).expect(200);
    await request(app).delete(`/employees/${employee.id}`).set("Cookie", cookie).expect(204);
    await request(app).get(`/teams/${team.id}/employees`).set("Cookie", cookie).expect(({ body }) => expect(body[0].active).toBe(false));
    db.close();
  });
});
