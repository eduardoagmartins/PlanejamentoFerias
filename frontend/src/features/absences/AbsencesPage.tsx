import { FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Pencil } from "lucide-react";
import { Select } from "../../components/ui/Select";
import type { Absence, Employee, VacationStatus } from "../../lib/api-client/client";
import { addDaysIso, todayIso } from "../../lib/dates/date-range";
import { listEmployees } from "../employees/employees.api";
import { getTeamTimeline } from "../timeline/timeline.api";
import { updateDayOff, updateVacation } from "./absences.api";
import { VacationForm } from "./VacationForm";
import { DayOffForm } from "./DayOffForm";

const vacationStatuses: VacationStatus[] = ["Agendado", "Em andamento", "Encerradas"];

type ListedAbsence = Absence & {
  employeeName: string;
};

export function AbsencesPage() {
  const { teamId = "" } = useParams();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [absences, setAbsences] = useState<ListedAbsence[]>([]);
  const [editingKey, setEditingKey] = useState("");
  const [startDate, setStartDate] = useState(todayIso());
  const [endDate, setEndDate] = useState(addDaysIso(todayIso(), 90));
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    listEmployees(teamId).then(setEmployees).catch(() => setEmployees([]));
  }, [teamId]);

  useEffect(() => {
    loadAbsences().catch(() => undefined);
  }, [teamId]);

  async function loadAbsences(event?: FormEvent) {
    event?.preventDefault();
    setError("");
    try {
      const timeline = await getTeamTimeline(teamId, startDate, endDate);
      setAbsences(
        timeline.rows.flatMap((row) =>
          row.absences.map((absence) => ({
            ...absence,
            employeeName: row.employee.name
          }))
        )
      );
    } catch {
      setError("Nao foi possivel carregar as ausencias registradas.");
    }
  }

  async function saved() {
    setMessage("Ausencia salva.");
    await loadAbsences();
  }

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h1>Ausencias</h1>
          <p>Ferias e day-offs individuais.</p>
        </div>
        <Link to={`/app/teams/${teamId}/timeline`}>Ver timeline</Link>
      </header>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      <h2>Ferias</h2>
      <VacationForm employees={employees} onSaved={saved} />
      <h2>Day-off</h2>
      <DayOffForm employees={employees} onSaved={saved} />
      <section className="section-block">
        <header className="subheader">
          <div>
            <h2>Ausencias registradas</h2>
            <p>Filtre o periodo e edite um registro existente.</p>
          </div>
        </header>
        <form className="inline-form" onSubmit={loadAbsences}>
          <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} required />
          <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} required />
          <button type="submit">Buscar</button>
        </form>
        {absences.length === 0 && <p className="empty-state">Nenhuma ausencia encontrada no periodo.</p>}
        <div className="list">
          {absences.map((absence) => {
            const key = `${absence.type}-${absence.id}`;
            return editingKey === key ? (
              <AbsenceEditor
                key={key}
                absence={absence}
                employees={employees}
                onCancel={() => setEditingKey("")}
                onSaved={async () => {
                  setEditingKey("");
                  setMessage("Ausencia atualizada.");
                  await loadAbsences();
                }}
              />
            ) : (
              <article className="list-row" key={key}>
                <span>
                  <strong>{absence.employeeName}</strong>
                  <small>
                    {absence.type === "vacation" ? "Ferias" : "Day-off"}: {absence.label} - {absence.startDate} a {absence.endDate}
                  </small>
                </span>
                <button type="button" className="ghost" onClick={() => setEditingKey(key)}>
                  <Pencil size={18} />
                  Editar
                </button>
              </article>
            );
          })}
        </div>
      </section>
    </section>
  );
}

function AbsenceEditor({
  absence,
  employees,
  onCancel,
  onSaved
}: {
  absence: ListedAbsence;
  employees: Employee[];
  onCancel: () => void;
  onSaved: () => Promise<void>;
}) {
  const [employeeId, setEmployeeId] = useState(absence.employeeId);
  const [startDate, setStartDate] = useState(absence.startDate);
  const [endDate, setEndDate] = useState(absence.endDate);
  const [label, setLabel] = useState(absence.label);
  const [saving, setSaving] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      if (absence.type === "vacation") {
        await updateVacation(absence.id, {
          employeeId,
          startDate,
          endDate,
          status: label as VacationStatus
        });
      } else {
        await updateDayOff(absence.id, {
          employeeId,
          startDate,
          endDate,
          reason: label
        });
      }
      await onSaved();
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="edit-panel" onSubmit={submit}>
      <select value={employeeId} onChange={(event) => setEmployeeId(event.target.value)} required>
        {employees.map((employee) => (
          <option key={employee.id} value={employee.id}>
            {employee.name}
          </option>
        ))}
      </select>
      <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} required />
      <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} required />
      {absence.type === "vacation" ? (
        <Select label="Status" value={label} options={vacationStatuses} onValueChange={setLabel} />
      ) : (
        <input placeholder="Motivo" value={label} onChange={(event) => setLabel(event.target.value)} required />
      )}
      <div className="row-actions">
        <button type="submit" disabled={saving}>
          Salvar
        </button>
        <button type="button" className="ghost" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
