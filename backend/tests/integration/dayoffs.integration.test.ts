import request from "supertest";
import { describe, it } from "vitest";
import { createApp } from "../../src/app.js";
import { createTestDb } from "../helpers/test-db.js";

describe("day-offs integration", () => {
  it("creates, updates and deletes individual day-offs", async () => {
    const db = await createTestDb();
    const app = createApp(db);
    const cookie = (await request(app).post("/auth/login").send({ email: "gestor@example.com", password: "senha123" })).headers["set-cookie"];
    const team = (await request(app).post("/teams").set("Cookie", cookie).send({ name: "Dados" })).body;
    const employee = (await request(app).post(`/teams/${team.id}/employees`).set("Cookie", cookie).send({ name: "Caio" })).body;
    const dayOff = (await request(app).post("/day-offs").set("Cookie", cookie).send({ employeeId: employee.id, startDate: "2026-08-01", endDate: "2026-08-01", reason: "Folga" }).expect(201)).body;
    await request(app).patch(`/day-offs/${dayOff.id}`).set("Cookie", cookie).send({ reason: "Banco de horas" }).expect(200);
    await request(app).delete(`/day-offs/${dayOff.id}`).set("Cookie", cookie).expect(204);
    db.close();
  });
});
