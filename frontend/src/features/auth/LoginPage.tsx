import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useAuth } from "./AuthProvider";

export function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("gestor@example.com");
  const [password, setPassword] = useState("senha123");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await signIn(email, password);
      navigate("/app", { replace: true });
    } catch {
      setError("Email ou senha invalidos.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="login-screen">
      <section className="login-panel" aria-labelledby="login-title">
        <h1 id="login-title">Planejamento de Ferias</h1>
        <form onSubmit={onSubmit} className="stack">
          <label>
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
          </label>
          <label>
            Senha
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required />
          </label>
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={submitting}>
            <LogIn size={18} />
            Entrar
          </button>
        </form>
      </section>
    </main>
  );
}
