import { Link } from "react-router-dom";

import classes from "./FormsNavigation.module.css";

function FormsNavigation() {
  return (
      <nav className={classes.formNav}>
        <Link to="/forms/add-book">Dodaj książkę</Link>
        <Link to="/forms/add-publisher">Dodaj wydawcę</Link>
        <Link to="/forms/add-author">Dodaj autora</Link>
        <Link to="/forms/add-author-publisher">Dodaj relację autor-książka</Link>
        <Link to="/forms/add-manager">Dodaj kierownika</Link>
        <Link to="/forms/add-warehouse">Dodaj magazyn</Link>
        <Link to="/forms/add-warehouse-book">Dodaj relację magazyn-książka</Link>
        <Link to="/forms/add-address">Dodaj adres</Link>
        <Link to="/forms/add-client">Dodaj klienta</Link>
        <Link to="/forms/add-order">Dodaj zamówienie</Link>
        <Link to="/forms/add-delivery-method">Dodaj metodę dostawy</Link>
        <Link to="/forms/add-score">Dodaj ocenę książki</Link>
        <Link to="/forms/add-example-data">Wprwodadź przykładowe dane</Link>
      </nav>
  );
}

export default FormsNavigation;
