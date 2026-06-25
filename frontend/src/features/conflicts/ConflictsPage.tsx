import { FormEvent, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AlertTriangle, ShieldCheck } from "lucide-react";
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
        <Link className="header-action" to={`/app/teams/${teamId}/timeline`}>Voltar para timeline</Link>
      </header>

      <div className="metric-grid">
        <article className={conflicts.length > 0 ? "metric-card warning" : "metric-card ok-card"}>
          <span className="metric-icon">
            {conflicts.length > 0 ? <AlertTriangle size={18} /> : <ShieldCheck size={18} />}
          </span>
          <strong>{loaded ? conflicts.length : "-"}</strong>
          <span>conflitos no periodo</span>
        </article>
      </div>

      <form className="inline-form surface-form" onSubmit={load}>
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
