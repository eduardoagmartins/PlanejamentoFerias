import { validationError, notFound } from "../api/error-handler.js";
import type { Db } from "../db/connection.js";
import { isValidRange } from "../domain/date-range.js";
import { isVacationStatus } from "../domain/vacation-status.js";
import { DayOffsRepository, type DayOff } from "../repositories/dayoffs.repository.js";
import { VacationsRepository, type Vacation } from "../repositories/vacations.repository.js";
import { EmployeesService } from "./employees.service.js";

export class AbsencesService {
  private readonly vacations: VacationsRepository;
  private readonly dayOffs: DayOffsRepository;
  private readonly employees: EmployeesService;

  constructor(db: Db) {
    this.vacations = new VacationsRepository(db);
    this.dayOffs = new DayOffsRepository(db);
    this.employees = new EmployeesService(db);
  }

  createVacation(input: Omit<Vacation, "id">) {
    this.validateVacation(input);
    this.employees.ensure(input.employeeId);
    return this.vacations.create(input);
  }

  updateVacation(id: string, input: Partial<Omit<Vacation, "id">>) {
    const current = this.vacations.find(id);
    if (!current) throw notFound("Vacation not found");
    const next = { ...current, ...input };
    this.validateVacation(next);
    this.employees.ensure(next.employeeId);
    return this.vacations.update(id, input);
  }

  deleteVacation(id: string) {
    if (!this.vacations.delete(id)) throw notFound("Vacation not found");
  }

  createDayOff(input: Omit<DayOff, "id">) {
    this.validateRange(input.startDate, input.endDate);
    this.employees.ensure(input.employeeId);
    return this.dayOffs.create(input);
  }

  updateDayOff(id: string, input: Partial<Omit<DayOff, "id">>) {
    const current = this.dayOffs.find(id);
    if (!current) throw notFound("Day-off not found");
    const next = { ...current, ...input };
    this.validateRange(next.startDate, next.endDate);
    this.employees.ensure(next.employeeId);
    return this.dayOffs.update(id, input);
  }

  deleteDayOff(id: string) {
    if (!this.dayOffs.delete(id)) throw notFound("Day-off not found");
  }

  private validateVacation(input: Omit<Vacation, "id">) {
    this.validateRange(input.startDate, input.endDate);
    if (!isVacationStatus(input.status)) {
      throw validationError("Invalid vacation status");
    }
  }

  private validateRange(startDate: string, endDate: string) {
    try {
      if (!isValidRange({ startDate, endDate })) throw new Error("Invalid period");
    } catch {
      throw validationError("End date must be equal to or after start date");
    }
  }
}
