import { nanoid } from "nanoid";
import type { Db } from "../db/connection.js";

export type Team = {
  id: string;
  name: string;
};

type TeamRow = {
  id: string;
  name: string;
};

const mapTeam = (row: TeamRow): Team => ({ id: row.id, name: row.name });

export class TeamsRepository {
  constructor(private readonly db: Db) {}

  list(managerId: string): Team[] {
    return this.db
      .prepare("SELECT id, name FROM teams WHERE manager_id = ? AND archived_at IS NULL ORDER BY name")
      .all(managerId)
      .map((row: unknown) => mapTeam(row as TeamRow));
  }

  findForManager(managerId: string, teamId: string): Team | null {
    const row = this.db
      .prepare("SELECT id, name FROM teams WHERE id = ? AND manager_id = ? AND archived_at IS NULL")
      .get(teamId, managerId) as TeamRow | undefined;
    return row ? mapTeam(row) : null;
  }

  create(managerId: string, name: string): Team {
    const now = new Date().toISOString();
    const team = { id: nanoid(), name };
    this.db
      .prepare("INSERT INTO teams (id, manager_id, name, created_at, updated_at) VALUES (?, ?, ?, ?, ?)")
      .run(team.id, managerId, team.name, now, now);
    return team;
  }

  update(managerId: string, teamId: string, name: string): Team | null {
    const now = new Date().toISOString();
    this.db
      .prepare("UPDATE teams SET name = ?, updated_at = ? WHERE id = ? AND manager_id = ? AND archived_at IS NULL")
      .run(name, now, teamId, managerId);
    return this.findForManager(managerId, teamId);
  }

  archive(managerId: string, teamId: string): boolean {
    const result = this.db
      .prepare("UPDATE teams SET archived_at = ?, updated_at = ? WHERE id = ? AND manager_id = ? AND archived_at IS NULL")
      .run(new Date().toISOString(), new Date().toISOString(), teamId, managerId);
    return result.changes > 0;
  }
}
