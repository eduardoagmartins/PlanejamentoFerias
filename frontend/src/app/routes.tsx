import { Navigate, Outlet, type RouteObject } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { LoginPage } from "../features/auth/LoginPage";
import { RequireAuth } from "../features/auth/AuthProvider";
import { TeamsPage } from "../features/teams/TeamsPage";
import { EmployeesPage } from "../features/employees/EmployeesPage";
import { AbsencesPage } from "../features/absences/AbsencesPage";
import { TimelinePage } from "../features/timeline/TimelinePage";
import { ConflictsPage } from "../features/conflicts/ConflictsPage";

function ProtectedShell() {
  return (
    <RequireAuth>
      <AppShell>
        <Outlet />
      </AppShell>
    </RequireAuth>
  );
}

export const appRoutes: RouteObject[] = [
  { path: "/", element: <Navigate to="/app" replace /> },
  { path: "/login", element: <LoginPage /> },
  {
    path: "/app",
    element: <ProtectedShell />,
    children: [
      { index: true, element: <TeamsPage /> },
      { path: "teams", element: <TeamsPage /> },
      { path: "teams/:teamId/employees", element: <EmployeesPage /> },
      { path: "teams/:teamId/absences", element: <AbsencesPage /> },
      { path: "teams/:teamId/timeline", element: <TimelinePage /> },
      { path: "teams/:teamId/conflicts", element: <ConflictsPage /> }
    ]
  }
];
