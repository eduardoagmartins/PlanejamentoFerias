import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../../src/app.js";
import { createTestDb } from "../helpers/test-db.js";

async function seedEmployee() {
  const db = await createTestDb();
  const app = createApp(db);
  const cookie = (await request(app).post("/auth/login").send({ email: "gestor@example.com", password: "senha123" })).headers["set-cookie"];
  const team = (await request(app).post("/teams").set("Cookie", cookie).send({ name: "Engenharia" })).body;
  const employee = (await request(app).post(`/teams/${team.id}/employees`).set("Cookie", cookie).send({ name: "Bia" })).body;
  return { db, app, cookie, team, employee };
}

describe("vacations integration", () => {
  it("accepts valid status and rejects invalid periods", async () => {
    const { db, app, cookie, employee } = await seedEmployee();
    await request(app)
      .post("/vacations")
      .set("Cookie", cookie)
      .send({ employeeId: employee.id, startDate: "2026-07-01", endDate: "2026-07-10", status: "Agendado" })
      .expect(201);
    await request(app)
      .post("/vacations")
      .set("Cookie", cookie)
      .send({ employeeId: employee.id, startDate: "2026-07-10", endDate: "2026-07-01", status: "Agendado" })
      .expect(400);
    db.close();
  });
});
