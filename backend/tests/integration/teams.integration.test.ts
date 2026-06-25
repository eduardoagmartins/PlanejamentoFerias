import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../../src/app.js";
import { createTestDb } from "../helpers/test-db.js";

async function login(app: ReturnType<typeof createApp>) {
  const response = await request(app).post("/auth/login").send({ email: "gestor@example.com", password: "senha123" });
  return response.headers["set-cookie"];
}

describe("teams integration", () => {
  it("creates, lists, updates and archives teams", async () => {
    const db = await createTestDb();
    const app = createApp(db);
    const cookie = await login(app);

    const created = await request(app).post("/teams").set("Cookie", cookie).send({ name: "Produto" }).expect(201);
    await request(app).get("/teams").set("Cookie", cookie).expect(200).expect(({ body }) => expect(body).toHaveLength(1));
    await request(app).patch(`/teams/${created.body.id}`).set("Cookie", cookie).send({ name: "Produto Core" }).expect(200);
    await request(app).delete(`/teams/${created.body.id}`).set("Cookie", cookie).expect(204);
    db.close();
  });
});
