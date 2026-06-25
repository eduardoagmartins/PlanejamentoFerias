import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AlertTriangle, CalendarDays, ChevronLeft, ChevronRight, Search } from "lucide-react";
import type { Timeline } from "../../lib/api-client/client";
import { addDaysIso, todayIso } from "../../lib/dates/date-range";
import { getTeamTimeline } from "./timeline.api";
import { TimelineGrid } from "./TimelineGrid";

export function TimelinePage() {
  const { teamId = "" } = useParams();
  const [startDate, setStartDate] = useState(todayIso());
  const [endDate, setEndDate] = useState(addDaysIso(todayIso(), 16));
  const [timeline, setTimeline] = useState<Timeline | null>(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "vacation" | "day_off">("all");
  const [error, setError] = useState("");

  const periodLength = useMemo(() => Math.max(daysBetween(startDate, endDate), 1), [startDate, endDate]);

  useEffect(() => {
    if (teamId) {
      load().catch(() => undefined);
    }
  }, [teamId]);

  async function load(event?: FormEvent) {
    event?.preventDefault();
    setError("");
    try {
      setTimeline(await getTeamTimeline(teamId, startDate, endDate));
    } catch {
      setError("Nao foi possivel carregar a linha do tempo.");
    }
  }

  function shiftPeriod(direction: -1 | 1) {
    const offset = direction * periodLength;
    const nextStart = addDaysIso(startDate, offset);
    const nextEnd = addDaysIso(endDate, offset);
    setStartDate(nextStart);
    setEndDate(nextEnd);
    getTeamTimeline(teamId, nextStart, nextEnd).then(setTimeline).catch(() => setError("Nao foi possivel carregar a linha do tempo."));
  }

  return (
    <section className="page timeline-page">
      <header className="timeline-page-header">
        <div>
          <h1>Linha do tempo</h1>
          <p>Ferias, day-offs e sobreposicoes por colaborador.</p>
        </div>
        <Link className="header-action" to={`/app/teams/${teamId}/conflicts`}>
          <AlertTriangle size={18} />
          Resumo de conflitos
        </Link>
      </header>

      <section className="timeline-toolbar">
        <div className="period-controls">
          <button type="button" className="icon-button" aria-label="Periodo anterior" onClick={() => shiftPeriod(-1)}>
            <ChevronLeft size={18} />
          </button>
          <form className="period-form" onSubmit={load}>
            <CalendarDays size={18} />
            <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} required />
            <span>ate</span>
            <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} required />
            <button type="submit">Atualizar</button>
          </form>
          <button type="button" className="icon-button" aria-label="Proximo periodo" onClick={() => shiftPeriod(1)}>
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="timeline-filters">
          <label className="search-field">
            <Search size={17} />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar colaborador..." />
          </label>
          <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value as "all" | "vacation" | "day_off")}>
            <option value="all">Todos</option>
            <option value="vacation">Ferias</option>
            <option value="day_off">Day-off</option>
          </select>
        </div>
      </section>

      {error && <p className="error">{error}</p>}
      {timeline ? (
        <TimelineGrid timeline={timeline} search={search} typeFilter={typeFilter} />
      ) : (
        <p className="empty-state">Carregando linha do tempo...</p>
      )}
    </section>
  );
}

function daysBetween(startDate: string, endDate: string) {
  const start = new Date(`${startDate}T00:00:00Z`).getTime();
  const end = new Date(`${endDate}T00:00:00Z`).getTime();
  return Math.round((end - start) / 86_400_000) + 1;
}
