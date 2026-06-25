import { ManagersRepository } from "../repositories/managers.repository.js";
import { AuthService } from "../services/auth.service.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { openDatabase } from "./connection.js";
import { migrate } from "./migrate.js";

export async function seedManager() {
  const db = openDatabase();
  migrate(db);
  const managers = new ManagersRepository(db);
  const email = process.env.SEED_MANAGER_EMAIL ?? "gestor@example.com";
  const existing = managers.findByEmail(email);
  if (existing) {
    db.close();
    return existing;
  }

  const auth = new AuthService(db);
  const manager = managers.create({
    name: process.env.SEED_MANAGER_NAME ?? "Gestor Teste",
    email,
    passwordHash: await auth.hashPassword(process.env.SEED_MANAGER_PASSWORD ?? "senha123")
  });
  db.close();
  return manager;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  seedManager().then((manager) => console.log(`Seeded manager ${manager.email}`));
}
