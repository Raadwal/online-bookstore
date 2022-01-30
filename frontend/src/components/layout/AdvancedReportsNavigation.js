import { Link } from "react-router-dom";

import classes from "./AdvancedReportsNavigation.module.css";

function AdvancedReportsNavigation() {
  return (
    <nav className={classes.formNav}>
      <Link to="/advanced-reports/best-books">Najlepsze książki</Link>
      <Link to="/advanced-reports/best-authors">Najlepsi autorzy</Link>
      <Link to="/advanced-reports/most-popular-books">Najpopularniejsze książki</Link>
      <Link to="/advanced-reports/most-popular-authors">Najpopularniesji autorzy</Link>
      <Link to="/advanced-reports/publisher-earnings">Zarobki wydawców</Link>
      <Link to="/advanced-reports/low-stock">Małe stany magazynowe</Link>
    </nav>
  );
}

export default AdvancedReportsNavigation;
