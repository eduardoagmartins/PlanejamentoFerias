import { apiRequest, type Employee } from "../../lib/api-client/client";

export type EmployeeInput = {
  name: string;
  email?: string;
  corporateIdentifier?: string;
  role?: string;
  active?: boolean;
};

export function listEmployees(teamId: string) {
  return apiRequest<Employee[]>(`/teams/${teamId}/employees`);
}

export function createEmployee(teamId: string, input: EmployeeInput) {
  return apiRequest<Employee>(`/teams/${teamId}/employees`, { method: "POST", body: JSON.stringify(input) });
}

export function updateEmployee(employeeId: string, input: Partial<EmployeeInput>) {
  return apiRequest<Employee>(`/employees/${employeeId}`, { method: "PATCH", body: JSON.stringify(input) });
}

export function deleteEmployee(employeeId: string) {
  return apiRequest<void>(`/employees/${employeeId}`, { method: "DELETE" });
}
