import { useEffect, useState } from "react";
import axios from "axios";
import ReportsNavigation from "../layout/ReportsNavigation";

import classes from "./Reports.module.css";

function AuthorsReport() {
  const [authors, getAuthors] = useState([]);
  const url = "http://127.0.0.1:8000/author";

  const getAllAuthors = () => {
    axios.get(url).then((res) => {
      getAuthors(res.data);
    });
  };

  useEffect(() => getAllAuthors(), []);

  return (
    <div>
      <ReportsNavigation />
      <div>
        <div className={classes.title}>
          <span className={classes.w15}>Autor ID</span>
          <span className={classes.w15}>Imię</span>
          <span className={classes.w15}>Nazwisko</span>
          <span className={classes.w15}>Data urodzenia</span>
          <span className={classes.w15}>Miejsce urodzenia</span>
          <span className={classes.w25}>Opis</span>
        </div>
        <div className={classes.dataWrapper}>
          {authors.map((author) => (
            <div key={author.authorId} className={classes.element}>
              <span className={classes.w15}>{author.authorId}</span>
              <span className={classes.w15}>{author.name}</span>
              <span className={classes.w15}>{author.surname}</span>
              <span className={classes.w15}>{author.birthDate}</span>
              <span className={classes.w15}>{author.birthPlace}</span>
              <span className={classes.w25}>{author.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AuthorsReport;
