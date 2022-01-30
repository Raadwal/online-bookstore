import { useEffect, useState } from "react";
import axios from "axios";
import ReportsNavigation from "../layout/ReportsNavigation";

import classes from "./Reports.module.css";

function AuthorsBooksReport() {
  const [authorsAndBooks, getAuthorsAndBooks] = useState([]);
  const url = "http://127.0.0.1:8000/author-book";

  const getAllAuthorsAndBooks = () => {
    axios.get(url).then((res) => {
      getAuthorsAndBooks(res.data);
    });
  };

  useEffect(() => getAllAuthorsAndBooks(), []);

  return (
    <div>
      <ReportsNavigation />
      <div>
        <div className={classes.title}>
          <span className={classes.w33}>Autor ID</span>
          <span className={classes.w33}>Książka ID</span>
          <span className={classes.w33}>Wydawca ID</span>
        </div>
        <div className={classes.dataWrapper}>
          {authorsAndBooks.map((authorAndBook) => (
            <div key={authorAndBook.bookId + ":" + authorAndBook.authorId} className={classes.element}>
              <span className={classes.w33}>{authorAndBook.authorId}</span>
              <span className={classes.w33}>{authorAndBook.bookId}</span>
              <span className={classes.w33}>{authorAndBook.publisherId}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AuthorsBooksReport;
