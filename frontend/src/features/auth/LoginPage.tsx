import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useAuth } from "./AuthProvider";
import brandLogo from "../../assets/sys-manager-logo.png";

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
        <span className="brand-mark login-mark">
          <img src={brandLogo} alt="SYS Manager" />
        </span>
        <h1 id="login-title">Planejamento de Ferias</h1>
        <p>Entre para organizar times, ausencias e conflitos em uma linha do tempo unica.</p>
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
