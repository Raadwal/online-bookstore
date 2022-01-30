import { Link } from "react-router-dom";

import classes from "./AdvancedFormsNavigation.module.css";

function AdvancedFormsNavigation() {
  return (
      <nav className={classes.formNav}>
        <Link to="/advanced-forms/add-book">Dodaj książkę</Link>
        <Link to="/advanced-forms/add-warehouse">Dodaj magazyn</Link>
        <Link to="/advanced-forms/add-books-warehouse">Dodaj książki do magazynu</Link>
      </nav>
  );
}

export default AdvancedFormsNavigation;
