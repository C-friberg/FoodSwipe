import { Link } from "react-router-dom";

type NavBarProps = {
    savedCount: number
}

const NavBar = ({savedCount}: NavBarProps) => {
    return (
        <header>
            <nav>
                <Link to="/">Hem</Link>
                <Link to="/about">Beskrivning</Link>
                <Link to="/contact">Kontakt</Link>
                <Link to="/swipe">Swipe</Link> 
                <Link to="/recipes">Mina recept ({savedCount})</Link> 
            </nav>
        </header>
    )
}

export default NavBar; 