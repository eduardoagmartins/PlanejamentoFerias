import { AlertTriangle, CalendarDays, LogOut, UserRound, Users } from "lucide-react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../features/auth/AuthProvider";
import type { ReactNode } from "react";
import brandLogo from "../../assets/sys-manager-logo.png";

export function AppShell({ children }: { children: ReactNode }) {
  const { manager, signOut } = useAuth();
  const navigate = useNavigate();
  const { teamId } = useParams();

  async function logout() {
    await signOut();
    navigate("/login", { replace: true });
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-mark">
            <img src={brandLogo} alt="" />
          </span>
          <div>
            <strong>Ferias do Time</strong>
            <span>Planejamento interno</span>
          </div>
        </div>
        <nav className="sidebar-nav" aria-label="Navegacao principal">
          <NavLink to="/app/teams" end>
            <Users size={18} />
            Times
          </NavLink>
          {teamId && (
            <>
              <NavLink to={`/app/teams/${teamId}/employees`}>
                <Users size={18} />
                Colaboradores
              </NavLink>
              <NavLink to={`/app/teams/${teamId}/absences`}>
                <CalendarDays size={18} />
                Ausencias
              </NavLink>
              <NavLink to={`/app/teams/${teamId}/timeline`}>
                <CalendarDays size={18} />
                Linha do tempo
              </NavLink>
              <NavLink to={`/app/teams/${teamId}/conflicts`}>
                <AlertTriangle size={18} />
                Conflitos
              </NavLink>
            </>
          )}
        </nav>
        <div className="sidebar-footer">
          <div className="manager-card">
            <span className="manager-avatar">
              <UserRound size={17} />
            </span>
            <div>
              <strong>{manager?.name || "Gestor"}</strong>
              <span>{manager?.email || "Sessao ativa"}</span>
            </div>
          </div>
          <button type="button" className="ghost logout-button" onClick={logout}>
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </aside>
      <main className="content">{children}</main>
    </div>
  );
}
