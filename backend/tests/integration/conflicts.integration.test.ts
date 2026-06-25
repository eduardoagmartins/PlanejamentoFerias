import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../../src/app.js";
import { createTestDb } from "../helpers/test-db.js";

describe("conflicts integration", () => {
  it("updates conflict summary from current absences", async () => {
    const db = await createTestDb();
    const app = createApp(db);
    const cookie = (await request(app).post("/auth/login").send({ email: "gestor@example.com", password: "senha123" })).headers["set-cookie"];
    const team = (await request(app).post("/teams").set("Cookie", cookie).send({ name: "Produto" })).body;
    const first = (await request(app).post(`/teams/${team.id}/employees`).set("Cookie", cookie).send({ name: "Lia" })).body;
    const second = (await request(app).post(`/teams/${team.id}/employees`).set("Cookie", cookie).send({ name: "Leo" })).body;
    await request(app).post("/vacations").set("Cookie", cookie).send({ employeeId: first.id, startDate: "2026-10-01", endDate: "2026-10-10", status: "Agendado" });
    await request(app).post("/day-offs").set("Cookie", cookie).send({ employeeId: second.id, startDate: "2026-10-02", endDate: "2026-10-03", reason: "Folga" });

    await request(app)
      .get(`/teams/${team.id}/conflicts?startDate=2026-10-01&endDate=2026-10-30`)
      .set("Cookie", cookie)
      .expect(({ body }) => expect(body).toHaveLength(1));
    db.close();
  });
});
