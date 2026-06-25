import type { CSSProperties } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { AlertTriangle, CalendarOff, Umbrella } from "lucide-react";
import type { Absence, Employee, Timeline } from "../../lib/api-client/client";

type TimelineGridProps = {
  timeline: Timeline;
  search?: string;
  typeFilter?: "all" | "vacation" | "day_off";
};

type TimelineCell = {
  employee: Employee;
  date: string;
  absences: Absence[];
  hasOverlap: boolean;
};

export function TimelineGrid({ timeline, search = "", typeFilter = "all" }: TimelineGridProps) {
  const days = enumerateDays(timeline.startDate, timeline.endDate);
  const normalizedSearch = search.trim().toLowerCase();
  const rows = timeline.rows
    .map((row) => ({
      employee: row.employee,
      absences: row.absences.filter((absence) => typeFilter === "all" || absence.type === typeFilter)
    }))
    .filter((row) => !normalizedSearch || row.employee.name.toLowerCase().includes(normalizedSearch));

  return (
    <section className="timeline-board" aria-label="Linha do tempo do time">
      <div className="timeline-summary">
        <div>
          <strong>{rows.length}</strong>
          <span>colaboradores</span>
        </div>
        <div>
          <strong>{countAbsences(rows)}</strong>
          <span>ausencias</span>
        </div>
        <div className={timeline.overlaps.length > 0 ? "summary-warning" : "summary-ok"}>
          <strong>{timeline.overlaps.length}</strong>
          <span>sobreposicoes</span>
        </div>
      </div>

      <div
        className="timeline-calendar"
        style={{ "--timeline-days": days.length } as CSSProperties}
      >
        <div className="timeline-calendar-header timeline-calendar-grid">
          <div className="employee-header">Colaborador</div>
          {days.map((date) => (
            <div className={`day-header ${isWeekend(date) ? "is-weekend" : ""} ${isToday(date) ? "is-today" : ""}`} key={date}>
              <span>{dayNumber(date)}</span>
              <small>{weekdayShort(date)}</small>
            </div>
          ))}
        </div>

        {rows.map((row) => (
          <div className="timeline-calendar-row timeline-calendar-grid" key={row.employee.id}>
            <div className="employee-cell">
              <span className="employee-avatar">{initials(row.employee.name)}</span>
              <span>
                <strong>{row.employee.name}</strong>
                <small>{row.employee.role || row.employee.email || "Time selecionado"}</small>
              </span>
            </div>
            {days.map((date) => (
              <CalendarCell
                key={`${row.employee.id}-${date}`}
                employee={row.employee}
                date={date}
                absences={row.absences.filter((absence) => coversDate(absence, date))}
                hasOverlap={timeline.overlaps.some(
                  (overlap) => overlap.employeeIds.includes(row.employee.id) && date >= overlap.startDate && date <= overlap.endDate
                )}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function CalendarCell({ date, absences, hasOverlap }: TimelineCell) {
  const cellClass = ["calendar-cell", isWeekend(date) ? "is-weekend" : "", isToday(date) ? "is-today" : "", hasOverlap ? "has-overlap" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cellClass} aria-label={hasOverlap ? `Sobreposicao em ${date}` : undefined}>
      {absences.map((absence) => (
        <Tooltip.Provider key={`${absence.type}-${absence.id}`}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <span className={`calendar-marker ${absence.type}`} aria-label={`${absence.label} em ${date}`}>
                {absence.type === "vacation" ? <Umbrella size={15} /> : <CalendarOff size={15} />}
                {hasOverlap && <AlertTriangle size={13} className="marker-alert" />}
              </span>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content className="tooltip">
                {absence.type === "vacation" ? "Ferias" : "Day-off"}: {absence.label}
                <br />
                {absence.startDate} a {absence.endDate}
                {hasOverlap && (
                  <>
                    <br />
                    Sobreposicao no periodo
                  </>
                )}
                <Tooltip.Arrow />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      ))}
    </div>
  );
}

function enumerateDays(startDate: string, endDate: string) {
  const dates: string[] = [];
  const cursor = new Date(`${startDate}T00:00:00Z`);
  const end = new Date(`${endDate}T00:00:00Z`);

  while (cursor <= end && dates.length < 62) {
    dates.push(cursor.toISOString().slice(0, 10));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return dates;
}

function coversDate(absence: Absence, date: string) {
  return date >= absence.startDate && date <= absence.endDate;
}

function dayNumber(date: string) {
  return String(new Date(`${date}T00:00:00Z`).getUTCDate());
}

function weekdayShort(date: string) {
  return new Intl.DateTimeFormat("pt-BR", { weekday: "short", timeZone: "UTC" })
    .format(new Date(`${date}T00:00:00Z`))
    .replace(".", "");
}

function isWeekend(date: string) {
  const day = new Date(`${date}T00:00:00Z`).getUTCDay();
  return day === 0 || day === 6;
}

function isToday(date: string) {
  return date === new Date().toISOString().slice(0, 10);
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function countAbsences(rows: { absences: Absence[] }[]) {
  return new Set(rows.flatMap((row) => row.absences.map((absence) => `${absence.type}-${absence.id}`))).size;
}
