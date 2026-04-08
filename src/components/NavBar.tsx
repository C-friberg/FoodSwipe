import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <header>
            <nav>
                <Link to="/">Hem</Link>
                <Link to="/about">Beskrivning</Link>
                <Link to="/contact">Kontakt</Link>
                <Link to="/swipe">Swipe</Link> 
            </nav>
        </header>
    )
}

export default NavBar; 