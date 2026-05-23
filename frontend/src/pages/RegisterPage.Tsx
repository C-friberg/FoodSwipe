import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";
import "./LoginPage.css";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      await registerUser({
        username,
        email,
        password,
      });

      setMessage("Kontot skapades!");
      navigate("/login");
    } catch (error) {
      setMessage("Kunde inte skapa konto.");
    } finally {
      setLoading(false);
    }
  }

  return (
  <main className="auth-page">

    <section className="auth-card">

      <h1>Skapa konto</h1>

      <p className="auth-subtitle">
        Skapa ett konto för att börja swipea recept
      </p>

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <div className="form-group">

          <label>Användarnamn</label>

          <input
            type="text"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            required
          />

        </div>

        <div className="form-group">

          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

        </div>

        <div className="form-group">

          <label>Lösenord</label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

        </div>

        <button
          className="auth-button"
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Skapar konto..."
            : "Skapa konto"}
        </button>

      </form>

      {message && (
        <p className="auth-message">
          {message}
        </p>
      )}

    </section>

  </main>
);
}