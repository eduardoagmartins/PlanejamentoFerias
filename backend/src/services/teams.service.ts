import { ApiError, notFound } from "../api/error-handler.js";
import type { Db } from "../db/connection.js";
import { TeamsRepository } from "../repositories/teams.repository.js";

export class TeamsService {
  private readonly teams: TeamsRepository;

  constructor(db: Db) {
    this.teams = new TeamsRepository(db);
  }

  list(managerId: string) {
    return this.teams.list(managerId);
  }

  create(managerId: string, name: string) {
    try {
      return this.teams.create(managerId, name.trim());
    } catch {
      throw new ApiError(400, "Team name must be unique for this manager");
    }
  }

  update(managerId: string, teamId: string, name: string) {
    const team = this.teams.update(managerId, teamId, name.trim());
    if (!team) throw notFound("Team not found");
    return team;
  }

  remove(managerId: string, teamId: string) {
    if (!this.teams.archive(managerId, teamId)) throw notFound("Team not found");
  }

  ensure(managerId: string, teamId: string) {
    const team = this.teams.findForManager(managerId, teamId);
    if (!team) throw notFound("Team not found");
    return team;
  }
}
