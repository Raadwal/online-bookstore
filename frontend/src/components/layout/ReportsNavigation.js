import { Link } from "react-router-dom";

import classes from "./ReportsNavigation.module.css";

function FormsNavigation() {
  return (
    <nav className={classes.formNav}>
      <Link to="/reports/books">Książki</Link>
      <Link to="/reports/publishers">Wydawcy</Link>
      <Link to="/reports/authors">Autorzy</Link>
      <Link to="/reports/authors-books"> Autorzy i Książki </Link>
      <Link to="/reports/managers">Kierownicy</Link>
      <Link to="/reports/warehouses">Magazyny</Link>
      <Link to="/reports/warehouses-books">Magazyny i Książki</Link>
      <Link to="/reports/addresses">Adresy</Link>
      <Link to="/reports/clients">Klienci</Link>
      <Link to="/reports/orders">Zamówienia</Link>
      <Link to="/reports/orders-methods">Metody dostawy</Link>
      <Link to="/reports/scores">Oceny Książek</Link>
    </nav>
  );
}

export default FormsNavigation;
