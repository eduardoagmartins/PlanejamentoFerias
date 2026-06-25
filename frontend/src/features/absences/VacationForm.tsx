import { FormEvent, useState } from "react";
import { Select } from "../../components/ui/Select";
import type { Employee, VacationStatus } from "../../lib/api-client/client";
import { createVacation } from "./absences.api";

const statuses: VacationStatus[] = ["Agendado", "Em andamento", "Encerradas"];

export function VacationForm({ employees, onSaved }: { employees: Employee[]; onSaved: () => void }) {
  const [employeeId, setEmployeeId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState<VacationStatus>("Agendado");

  async function submit(event: FormEvent) {
    event.preventDefault();
    await createVacation({ employeeId, startDate, endDate, status });
    setStartDate("");
    setEndDate("");
    onSaved();
  }

  return (
    <form className="grid-form" onSubmit={submit}>
      <select value={employeeId} onChange={(event) => setEmployeeId(event.target.value)} required>
        <option value="">Colaborador</option>
        {employees.map((employee) => (
          <option key={employee.id} value={employee.id}>
            {employee.name}
          </option>
        ))}
      </select>
      <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} required />
      <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} required />
      <Select label="Status" value={status} options={statuses} onValueChange={(value) => setStatus(value as VacationStatus)} />
      <button type="submit">Salvar ferias</button>
    </form>
  );
}
