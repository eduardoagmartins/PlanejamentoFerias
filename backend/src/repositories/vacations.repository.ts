import { nanoid } from "nanoid";
import type { Db } from "../db/connection.js";
import type { VacationStatus } from "../domain/vacation-status.js";

export type Vacation = {
  id: string;
  employeeId: string;
  startDate: string;
  endDate: string;
  status: VacationStatus;
  notes?: string;
};

type VacationRow = {
  id: string;
  employee_id: string;
  start_date: string;
  end_date: string;
  status: VacationStatus;
  notes: string | null;
};

const mapVacation = (row: VacationRow): Vacation => ({
  id: row.id,
  employeeId: row.employee_id,
  startDate: row.start_date,
  endDate: row.end_date,
  status: row.status,
  notes: row.notes ?? undefined
});

export class VacationsRepository {
  constructor(private readonly db: Db) {}

  create(input: Omit<Vacation, "id">): Vacation {
    const now = new Date().toISOString();
    const vacation: Vacation = { id: nanoid(), ...input };
    this.db
      .prepare(
        `INSERT INTO vacations (id, employee_id, start_date, end_date, status, notes, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .run(vacation.id, vacation.employeeId, vacation.startDate, vacation.endDate, vacation.status, vacation.notes ?? null, now, now);
    return vacation;
  }

  update(id: string, input: Partial<Omit<Vacation, "id">>): Vacation | null {
    const current = this.find(id);
    if (!current) return null;
    const next = { ...current, ...input };
    this.db
      .prepare(
        `UPDATE vacations SET employee_id = ?, start_date = ?, end_date = ?, status = ?, notes = ?, updated_at = ?
        WHERE id = ?`
      )
      .run(next.employeeId, next.startDate, next.endDate, next.status, next.notes ?? null, new Date().toISOString(), id);
    return this.find(id);
  }

  find(id: string): Vacation | null {
    const row = this.db.prepare("SELECT * FROM vacations WHERE id = ?").get(id) as VacationRow | undefined;
    return row ? mapVacation(row) : null;
  }

  delete(id: string): boolean {
    return this.db.prepare("DELETE FROM vacations WHERE id = ?").run(id).changes > 0;
  }

  listForTeam(teamId: string, startDate: string, endDate: string): Vacation[] {
    return this.db
      .prepare(
        `SELECT v.* FROM vacations v
        JOIN employees e ON e.id = v.employee_id
        WHERE e.team_id = ? AND v.start_date <= ? AND ? <= v.end_date
        ORDER BY v.start_date`
      )
      .all(teamId, endDate, startDate)
      .map((row: unknown) => mapVacation(row as VacationRow));
  }
}
