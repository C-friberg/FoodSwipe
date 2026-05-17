import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";

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
    <main>
      <h1>Skapa konto</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Användarnamn</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Lösenord</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Skapar konto..." : "Skapa konto"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </main>
  );
}