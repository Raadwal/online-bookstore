import { useEffect, useState } from "react";
import axios from "axios";
import AdvancedReportsNavigation from "../layout/AdvancedReportsNavigation";

import classes from "./Reports.module.css";

function PopularAuthorsReport() {
  const [authors, getAuthors] = useState([]);
  const url = "http://127.0.0.1:8000/views/popular-authors";

  const getAllAuthors = () => {
    axios.get(url).then((res) => {
      getAuthors(res.data);
    });
  };

  useEffect(() => getAllAuthors(), []);

  return (
    <div>
      <AdvancedReportsNavigation />
      <div>
        <div className={classes.title}>
          <span className={classes.w33}>Imię</span>
          <span className={classes.w33}>Nazwisko</span>
          <span className={classes.w33}>Ilość sprzedanych książek</span>
        </div>
        <div className={classes.dataWrapper}>
          {authors.map((author) => (
            <div key={author.name + ":" + author.surname} className={classes.element}>
              <span className={classes.w33}>{author.name}</span>
              <span className={classes.w33}>{author.surname}</span>
              <span className={classes.w33}>{author.soldBooks}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopularAuthorsReport;
