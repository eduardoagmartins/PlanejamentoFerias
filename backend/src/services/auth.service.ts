import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { ApiError } from "../api/error-handler.js";
import type { Db } from "../db/connection.js";
import { ManagersRepository, type Manager } from "../repositories/managers.repository.js";

export type PublicManager = {
  id: string;
  name: string;
  email: string;
};

const sessions = new Map<string, string>();

export function toPublicManager(manager: Manager): PublicManager {
  return { id: manager.id, name: manager.name, email: manager.email };
}

export class AuthService {
  private readonly managers: ManagersRepository;

  constructor(db: Db) {
    this.managers = new ManagersRepository(db);
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async login(email: string, password: string): Promise<{ token: string; manager: PublicManager }> {
    const manager = this.managers.findByEmail(email);
    if (!manager || !(await bcrypt.compare(password, manager.passwordHash))) {
      throw new ApiError(401, "Invalid email or password");
    }

    const token = nanoid(32);
    sessions.set(token, manager.id);
    return { token, manager: toPublicManager(manager) };
  }

  logout(token: string | undefined): void {
    if (token) sessions.delete(token);
  }

  currentManager(token: string | undefined): PublicManager | null {
    if (!token) return null;
    const managerId = sessions.get(token);
    if (!managerId) return null;
    const manager = this.managers.findById(managerId);
    return manager ? toPublicManager(manager) : null;
  }
}
