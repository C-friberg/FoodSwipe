import { Link } from "react-router-dom";


const NavBar = () => {

    const token = localStorage.getItem("token");
    const isLoggedIn = !!token;

    function handleLogout() {
        localStorage.removeItem("token");
        window.location.reload();
    }
    return (
        <header>
            <nav>
                <Link to="/">Hem</Link>
                <Link to="/about">Beskrivning</Link>
                <Link to="/contact">Kontakt</Link>

                {isLoggedIn && (
                    <>
                        <Link to="/feed">Swipe</Link>
                        <Link to="/recipes">Sparade recept </Link>
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
    )
}

export default NavBar; 