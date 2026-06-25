import type { Db } from "../db/connection.js";
import { detectOverlaps, type Absence } from "../domain/absence-overlap.js";
import { isValidRange } from "../domain/date-range.js";
import { DayOffsRepository } from "../repositories/dayoffs.repository.js";
import { EmployeesRepository } from "../repositories/employees.repository.js";
import { VacationsRepository } from "../repositories/vacations.repository.js";
import { validationError } from "../api/error-handler.js";
import { TeamsService } from "./teams.service.js";

export class TimelineService {
  private readonly employees: EmployeesRepository;
  private readonly vacations: VacationsRepository;
  private readonly dayOffs: DayOffsRepository;
  private readonly teams: TeamsService;

  constructor(db: Db) {
    this.employees = new EmployeesRepository(db);
    this.vacations = new VacationsRepository(db);
    this.dayOffs = new DayOffsRepository(db);
    this.teams = new TeamsService(db);
  }

  getTimeline(managerId: string, teamId: string, startDate: string, endDate: string) {
    this.teams.ensure(managerId, teamId);
    try {
      if (!isValidRange({ startDate, endDate })) throw new Error("Invalid period");
    } catch {
      throw validationError("Invalid timeline period");
    }

    const employees = this.employees.list(teamId);
    const absences = this.getAbsences(teamId, startDate, endDate);
    return {
      teamId,
      startDate,
      endDate,
      rows: employees.map((employee) => ({
        employee,
        absences: absences.filter((absence) => absence.employeeId === employee.id)
      })),
      overlaps: detectOverlaps(teamId, absences)
    };
  }

  getAbsences(teamId: string, startDate: string, endDate: string): Absence[] {
    const vacations = this.vacations.listForTeam(teamId, startDate, endDate).map((vacation) => ({
      id: vacation.id,
      type: "vacation" as const,
      employeeId: vacation.employeeId,
      startDate: vacation.startDate,
      endDate: vacation.endDate,
      label: vacation.status
    }));
    const dayOffs = this.dayOffs.listForTeam(teamId, startDate, endDate).map((dayOff) => ({
      id: dayOff.id,
      type: "day_off" as const,
      employeeId: dayOff.employeeId,
      startDate: dayOff.startDate,
      endDate: dayOff.endDate,
      label: dayOff.reason
    }));

    return [...vacations, ...dayOffs].sort((a, b) => a.startDate.localeCompare(b.startDate));
  }
}
