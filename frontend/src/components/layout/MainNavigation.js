import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
    return (
        <header className={classes.header}>
            <nav>
                <Link to="/">Informacje</Link>
                <Link to="/forms">Formularze</Link> 
                <Link to="/reports">Raporty</Link>
                <Link to="/advanced-reports">Zaawansowane raporty</Link>
                <Link to="/advanced-forms">Zaawansowane Formularze</Link>
            </nav>
        </header>
    );
}

export default MainNavigation;