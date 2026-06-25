import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Plus, Trash2, Users } from "lucide-react";
import type { Team } from "../../lib/api-client/client";
import { EmptyState } from "../../components/feedback/EmptyState";
import * as teamsApi from "./teams.api";

export function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    try {
      setTeams(await teamsApi.listTeams());
    } catch {
      setError("Nao foi possivel carregar os times.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function create(event: FormEvent) {
    event.preventDefault();
    if (!name.trim()) return;
    await teamsApi.createTeam(name);
    setName("");
    await load();
  }

  async function remove(teamId: string) {
    if (!confirm("Remover este time?")) return;
    await teamsApi.deleteTeam(teamId);
    await load();
  }

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h1>Times</h1>
          <p>Estrutura minima para planejar ausencias por equipe.</p>
        </div>
      </header>

      <div className="metric-grid">
        <article className="metric-card">
          <span className="metric-icon">
            <Users size={18} />
          </span>
          <strong>{teams.length}</strong>
          <span>times cadastrados</span>
        </article>
        <article className="metric-card">
          <span className="metric-icon">
            <CalendarDays size={18} />
          </span>
          <strong>MVP</strong>
          <span>piloto interno</span>
        </article>
      </div>

      <form className="inline-form surface-form" onSubmit={create}>
        <input placeholder="Nome do time" value={name} onChange={(event) => setName(event.target.value)} required />
        <button type="submit">
          <Plus size={18} />
          Criar
        </button>
      </form>

      {loading && <p>Carregando...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && teams.length === 0 && <EmptyState title="Nenhum time cadastrado." />}
      <div className="list">
        {teams.map((team) => (
          <article className="list-row" key={team.id}>
            <span>
              <strong>{team.name}</strong>
              <small>Unidade de planejamento</small>
            </span>
            <div className="row-actions">
              <Link to={`/app/teams/${team.id}/employees`}>Colaboradores</Link>
              <Link to={`/app/teams/${team.id}/timeline`}>Timeline</Link>
              <button type="button" className="icon-button" aria-label="Remover time" onClick={() => remove(team.id)}>
                <Trash2 size={18} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
