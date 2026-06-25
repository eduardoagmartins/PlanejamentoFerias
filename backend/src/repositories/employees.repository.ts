import { nanoid } from "nanoid";
import type { Db } from "../db/connection.js";

export type Employee = {
  id: string;
  teamId: string;
  name: string;
  email?: string;
  corporateIdentifier?: string;
  role?: string;
  active: boolean;
};

export type EmployeeInput = {
  name: string;
  email?: string;
  corporateIdentifier?: string;
  role?: string;
  active?: boolean;
};

type EmployeeRow = {
  id: string;
  team_id: string;
  name: string;
  email: string | null;
  corporate_identifier: string | null;
  role: string | null;
  active: number;
};

function mapEmployee(row: EmployeeRow): Employee {
  return {
    id: row.id,
    teamId: row.team_id,
    name: row.name,
    email: row.email ?? undefined,
    corporateIdentifier: row.corporate_identifier ?? undefined,
    role: row.role ?? undefined,
    active: row.active === 1
  };
}

export class EmployeesRepository {
  constructor(private readonly db: Db) {}

  list(teamId: string): Employee[] {
    return this.db
      .prepare("SELECT * FROM employees WHERE team_id = ? ORDER BY active DESC, name")
      .all(teamId)
      .map((row: unknown) => mapEmployee(row as EmployeeRow));
  }

  find(employeeId: string): Employee | null {
    const row = this.db.prepare("SELECT * FROM employees WHERE id = ?").get(employeeId) as EmployeeRow | undefined;
    return row ? mapEmployee(row) : null;
  }

  create(teamId: string, input: EmployeeInput): Employee {
    const now = new Date().toISOString();
    const employee: Employee = {
      id: nanoid(),
      teamId,
      name: input.name,
      email: input.email,
      corporateIdentifier: input.corporateIdentifier,
      role: input.role,
      active: input.active ?? true
    };
    this.db
      .prepare(
        `INSERT INTO employees
        (id, team_id, name, email, corporate_identifier, role, active, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        employee.id,
        teamId,
        employee.name,
        employee.email ?? null,
        employee.corporateIdentifier ?? null,
        employee.role ?? null,
        employee.active ? 1 : 0,
        now,
        now
      );
    return employee;
  }

  update(employeeId: string, input: Partial<EmployeeInput>): Employee | null {
    const current = this.find(employeeId);
    if (!current) return null;

    const next = { ...current, ...input };
    this.db
      .prepare(
        `UPDATE employees
        SET name = ?, email = ?, corporate_identifier = ?, role = ?, active = ?, updated_at = ?
        WHERE id = ?`
      )
      .run(
        next.name,
        next.email ?? null,
        next.corporateIdentifier ?? null,
        next.role ?? null,
        next.active ? 1 : 0,
        new Date().toISOString(),
        employeeId
      );
    return this.find(employeeId);
  }

  deactivate(employeeId: string): boolean {
    const result = this.db
      .prepare("UPDATE employees SET active = 0, updated_at = ? WHERE id = ?")
      .run(new Date().toISOString(), employeeId);
    return result.changes > 0;
  }
}
