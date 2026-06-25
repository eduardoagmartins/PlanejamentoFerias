import { FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BriefcaseBusiness, Plus, Trash2, UserCheck } from "lucide-react";
import type { Employee } from "../../lib/api-client/client";
import * as employeesApi from "./employees.api";

export function EmployeesPage() {
  const { teamId = "" } = useParams();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [form, setForm] = useState({ name: "", email: "", role: "" });
  const [error, setError] = useState("");

  async function load() {
    try {
      setEmployees(await employeesApi.listEmployees(teamId));
    } catch {
      setError("Nao foi possivel carregar colaboradores.");
    }
  }

  useEffect(() => {
    load();
  }, [teamId]);

  async function create(event: FormEvent) {
    event.preventDefault();
    await employeesApi.createEmployee(teamId, form);
    setForm({ name: "", email: "", role: "" });
    await load();
  }

  async function remove(employeeId: string) {
    if (!confirm("Desativar este colaborador?")) return;
    await employeesApi.deleteEmployee(employeeId);
    await load();
  }

  const activeEmployees = employees.filter((employee) => employee.active).length;
  const roles = new Set(employees.map((employee) => employee.role).filter(Boolean)).size;

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h1>Colaboradores</h1>
          <p>Cadastro do time selecionado para planejamento.</p>
        </div>
        <Link className="header-action" to={`/app/teams/${teamId}/absences`}>Registrar ausencias</Link>
      </header>

      <div className="metric-grid">
        <article className="metric-card">
          <span className="metric-icon">
            <UserCheck size={18} />
          </span>
          <strong>{activeEmployees}</strong>
          <span>colaboradores ativos</span>
        </article>
        <article className="metric-card">
          <span className="metric-icon">
            <BriefcaseBusiness size={18} />
          </span>
          <strong>{roles}</strong>
          <span>cargos informados</span>
        </article>
      </div>

      <form className="grid-form surface-form" onSubmit={create}>
        <input placeholder="Nome" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
        <input placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        <input placeholder="Cargo" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} />
        <button type="submit">
          <Plus size={18} />
          Adicionar
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      <div className="list">
        {employees.map((employee) => (
          <article className="list-row" key={employee.id}>
            <span>
              <strong>{employee.name}</strong>
              <small>{employee.role || employee.email || "Sem detalhes"}</small>
            </span>
            <button type="button" className="icon-button" aria-label="Desativar colaborador" onClick={() => remove(employee.id)}>
              <Trash2 size={18} />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
