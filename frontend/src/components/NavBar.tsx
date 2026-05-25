import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header>
      <nav>
        <Link to="/">Hem</Link>

        {isLoggedIn && (
          <>
            <Link to="/feed">Swipe</Link>
            <Link to="/recipes">Matchningar</Link>
            <Link to="/recipes/create">Skapa recept</Link>
            <Link to="/my-recipes">Skapade recept</Link>

            <button onClick={handleLogout}>Logga ut</button>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/register">Registrering</Link>
            <Link to="/login">Logga in</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default NavBar;