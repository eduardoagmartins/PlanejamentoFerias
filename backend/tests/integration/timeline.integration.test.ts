import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../../src/app.js";
import { createTestDb } from "../helpers/test-db.js";

describe("timeline integration", () => {
  it("returns rows and overlapping absences", async () => {
    const db = await createTestDb();
    const app = createApp(db);
    const cookie = (await request(app).post("/auth/login").send({ email: "gestor@example.com", password: "senha123" })).headers["set-cookie"];
    const team = (await request(app).post("/teams").set("Cookie", cookie).send({ name: "Ops" })).body;
    const ana = (await request(app).post(`/teams/${team.id}/employees`).set("Cookie", cookie).send({ name: "Ana" })).body;
    const bia = (await request(app).post(`/teams/${team.id}/employees`).set("Cookie", cookie).send({ name: "Bia" })).body;
    await request(app).post("/vacations").set("Cookie", cookie).send({ employeeId: ana.id, startDate: "2026-09-01", endDate: "2026-09-10", status: "Agendado" });
    await request(app).post("/day-offs").set("Cookie", cookie).send({ employeeId: bia.id, startDate: "2026-09-05", endDate: "2026-09-05", reason: "Folga" });

    await request(app)
      .get(`/teams/${team.id}/timeline?startDate=2026-09-01&endDate=2026-09-30`)
      .set("Cookie", cookie)
      .expect(200)
      .expect(({ body }) => {
        expect(body.rows).toHaveLength(2);
        expect(body.overlaps).toHaveLength(1);
      });
    db.close();
  });
});
