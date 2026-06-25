import { nanoid } from "nanoid";
import type { Db } from "../db/connection.js";

export type Manager = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
};

type ManagerRow = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
};

function mapManager(row: ManagerRow): Manager {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    passwordHash: row.password_hash
  };
}

export class ManagersRepository {
  constructor(private readonly db: Db) {}

  findByEmail(email: string): Manager | null {
    const row = this.db.prepare("SELECT * FROM managers WHERE email = ?").get(email) as ManagerRow | undefined;
    return row ? mapManager(row) : null;
  }

  findById(id: string): Manager | null {
    const row = this.db.prepare("SELECT * FROM managers WHERE id = ?").get(id) as ManagerRow | undefined;
    return row ? mapManager(row) : null;
  }

  create(input: { name: string; email: string; passwordHash: string }): Manager {
    const now = new Date().toISOString();
    const manager: Manager = { id: nanoid(), ...input };
    this.db
      .prepare(
        "INSERT INTO managers (id, name, email, password_hash, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)"
      )
      .run(manager.id, manager.name, manager.email, manager.passwordHash, now, now);
    return manager;
  }
}
