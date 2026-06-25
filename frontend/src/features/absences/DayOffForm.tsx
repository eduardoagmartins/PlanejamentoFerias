import { FormEvent, useState } from "react";
import type { Employee } from "../../lib/api-client/client";
import { createDayOff } from "./absences.api";

export function DayOffForm({ employees, onSaved }: { employees: Employee[]; onSaved: () => void }) {
  const [employeeId, setEmployeeId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    await createDayOff({ employeeId, startDate, endDate, reason });
    setReason("");
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
      <input placeholder="Motivo" value={reason} onChange={(event) => setReason(event.target.value)} required />
      <button type="submit">Salvar day-off</button>
    </form>
  );
}
