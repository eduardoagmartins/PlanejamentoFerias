import { notFound } from "../api/error-handler.js";
import type { Db } from "../db/connection.js";
import { EmployeesRepository, type EmployeeInput } from "../repositories/employees.repository.js";
import { TeamsService } from "./teams.service.js";

export class EmployeesService {
  private readonly employees: EmployeesRepository;
  private readonly teams: TeamsService;

  constructor(private readonly db: Db) {
    this.employees = new EmployeesRepository(db);
    this.teams = new TeamsService(db);
  }

  list(managerId: string, teamId: string) {
    this.teams.ensure(managerId, teamId);
    return this.employees.list(teamId);
  }

  create(managerId: string, teamId: string, input: EmployeeInput) {
    this.teams.ensure(managerId, teamId);
    return this.employees.create(teamId, input);
  }

  update(_managerId: string, employeeId: string, input: Partial<EmployeeInput>) {
    const employee = this.employees.update(employeeId, input);
    if (!employee) throw notFound("Employee not found");
    return employee;
  }

  remove(_managerId: string, employeeId: string) {
    if (!this.employees.deactivate(employeeId)) throw notFound("Employee not found");
  }

  ensure(employeeId: string) {
    const employee = this.employees.find(employeeId);
    if (!employee) throw notFound("Employee not found");
    return employee;
  }
}
