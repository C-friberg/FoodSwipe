import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <header>
            <Link to="/">Hem</Link>
            <Link to="/about">Beskrivning</Link>
            <Link to="/contact">Kontakt</Link>
        </header>
    )
}

export default NavBar; 