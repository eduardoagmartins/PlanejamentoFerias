import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import type { Manager } from "../../lib/api-client/client";
import * as authApi from "./auth.api";

type AuthContextValue = {
  manager: Manager | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [manager, setManager] = useState<Manager | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authApi
      .getCurrentManager()
      .then(setManager)
      .catch(() => setManager(null))
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      manager,
      loading,
      signIn: async (email, password) => {
        const session = await authApi.login(email, password);
        setManager(session.manager);
      },
      signOut: async () => {
        await authApi.logout().catch(() => undefined);
        setManager(null);
      }
    }),
    [manager, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}

export function RequireAuth({ children }: { children: ReactNode }) {
  const { manager, loading } = useAuth();
  if (loading) return <main className="screen-center">Carregando...</main>;
  if (!manager) return <Navigate to="/login" replace />;
  return children;
}
