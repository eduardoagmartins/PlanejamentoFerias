import { FormEvent, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Overlap } from "../../lib/api-client/client";
import { addDaysIso, todayIso } from "../../lib/dates/date-range";
import { getTeamConflicts } from "./conflicts.api";

export function ConflictsPage() {
  const { teamId = "" } = useParams();
  const [startDate, setStartDate] = useState(todayIso());
  const [endDate, setEndDate] = useState(addDaysIso(todayIso(), 60));
  const [conflicts, setConflicts] = useState<Overlap[]>([]);
  const [loaded, setLoaded] = useState(false);

  async function load(event?: FormEvent) {
    event?.preventDefault();
    setConflicts(await getTeamConflicts(teamId, startDate, endDate));
    setLoaded(true);
  }

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h1>Conflitos</h1>
          <p>Periodos com ausencias simultaneas no time.</p>
        </div>
        <Link to={`/app/teams/${teamId}/timeline`}>Voltar para timeline</Link>
      </header>
      <form className="inline-form" onSubmit={load}>
        <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} required />
        <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} required />
        <button type="submit">Revisar</button>
      </form>
      {loaded && conflicts.length === 0 && <p className="ok">Nenhum conflito encontrado.</p>}
      <div className="list">
        {conflicts.map((conflict) => (
          <article className="list-row" key={`${conflict.startDate}-${conflict.endDate}-${conflict.absenceIds.join("-")}`}>
            <strong>
              {conflict.startDate} - {conflict.endDate}
            </strong>
            <span>{conflict.employeeIds.length} colaboradores</span>
          </article>
        ))}
      </div>
    </section>
  );
}
