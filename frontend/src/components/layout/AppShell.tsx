import { LogOut, Users, CalendarDays, AlertTriangle } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../features/auth/AuthProvider";
import type { ReactNode } from "react";

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
        <div>
          <strong>Ferias do Time</strong>
          <span>{manager?.name}</span>
        </div>
        <nav>
          <Link to="/app/teams">
            <Users size={18} />
            Times
          </Link>
          {teamId && (
            <>
              <Link to={`/app/teams/${teamId}/employees`}>
                <Users size={18} />
                Colaboradores
              </Link>
              <Link to={`/app/teams/${teamId}/absences`}>
                <CalendarDays size={18} />
                Ausencias
              </Link>
              <Link to={`/app/teams/${teamId}/timeline`}>
                <CalendarDays size={18} />
                Linha do tempo
              </Link>
              <Link to={`/app/teams/${teamId}/conflicts`}>
                <AlertTriangle size={18} />
                Conflitos
              </Link>
            </>
          )}
        </nav>
        <button type="button" className="ghost" onClick={logout}>
          <LogOut size={18} />
          Sair
        </button>
      </aside>
      <main className="content">{children}</main>
    </div>
  );
}
