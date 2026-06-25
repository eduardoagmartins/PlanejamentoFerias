import { openDatabase, type Db } from "../../src/db/connection.js";
import { migrate } from "../../src/db/migrate.js";
import { ManagersRepository } from "../../src/repositories/managers.repository.js";
import { AuthService } from "../../src/services/auth.service.js";

export async function createTestDb(): Promise<Db> {
  const db = openDatabase(":memory:");
  migrate(db);
  const auth = new AuthService(db);
  new ManagersRepository(db).create({
    name: "Gestor Teste",
    email: "gestor@example.com",
    passwordHash: await auth.hashPassword("senha123")
  });
  return db;
}
