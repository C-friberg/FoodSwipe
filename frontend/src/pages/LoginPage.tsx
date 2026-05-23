import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import "./LoginPage.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const data = await loginUser({
        username,
        password,
      });

      localStorage.setItem("token", data.token);

      window.location.href = "/";

      setMessage("Du är inloggad!");
      navigate("/");
    } catch (error) {
      setMessage("Fel användarnamn eller lösenord.");
    } finally {
      setLoading(false);
    }
  }

  return (
  <main className="auth-page">

    <section className="auth-card">

      <h1>Logga in</h1>

      <p className="auth-subtitle">
        Välkommen tillbaka till FoodSwipe
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
            ? "Loggar in..."
            : "Logga in"}
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