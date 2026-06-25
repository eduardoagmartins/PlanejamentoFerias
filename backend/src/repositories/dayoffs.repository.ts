import { nanoid } from "nanoid";
import type { Db } from "../db/connection.js";

export type DayOff = {
  id: string;
  employeeId: string;
  startDate: string;
  endDate: string;
  reason: string;
};

type DayOffRow = {
  id: string;
  employee_id: string;
  start_date: string;
  end_date: string;
  reason: string;
};

const mapDayOff = (row: DayOffRow): DayOff => ({
  id: row.id,
  employeeId: row.employee_id,
  startDate: row.start_date,
  endDate: row.end_date,
  reason: row.reason
});

export class DayOffsRepository {
  constructor(private readonly db: Db) {}

  create(input: Omit<DayOff, "id">): DayOff {
    const now = new Date().toISOString();
    const dayOff: DayOff = { id: nanoid(), ...input };
    this.db
      .prepare(
        `INSERT INTO day_offs (id, employee_id, start_date, end_date, reason, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .run(dayOff.id, dayOff.employeeId, dayOff.startDate, dayOff.endDate, dayOff.reason, now, now);
    return dayOff;
  }

  update(id: string, input: Partial<Omit<DayOff, "id">>): DayOff | null {
    const current = this.find(id);
    if (!current) return null;
    const next = { ...current, ...input };
    this.db
      .prepare(
        "UPDATE day_offs SET employee_id = ?, start_date = ?, end_date = ?, reason = ?, updated_at = ? WHERE id = ?"
      )
      .run(next.employeeId, next.startDate, next.endDate, next.reason, new Date().toISOString(), id);
    return this.find(id);
  }

  find(id: string): DayOff | null {
    const row = this.db.prepare("SELECT * FROM day_offs WHERE id = ?").get(id) as DayOffRow | undefined;
    return row ? mapDayOff(row) : null;
  }

  delete(id: string): boolean {
    return this.db.prepare("DELETE FROM day_offs WHERE id = ?").run(id).changes > 0;
  }

  listForTeam(teamId: string, startDate: string, endDate: string): DayOff[] {
    return this.db
      .prepare(
        `SELECT d.* FROM day_offs d
        JOIN employees e ON e.id = d.employee_id
        WHERE e.team_id = ? AND d.start_date <= ? AND ? <= d.end_date
        ORDER BY d.start_date`
      )
      .all(teamId, endDate, startDate)
      .map((row: unknown) => mapDayOff(row as DayOffRow));
  }
}
