import { useEffect, useState } from "react";
import axios from "axios";
import AdvancedReportsNavigation from "../layout/AdvancedReportsNavigation";

import classes from "./Reports.module.css";

function BestBooksReport() {
  const [books, getBooks] = useState([]);
  const url = "http://127.0.0.1:8000/views/best-books";

  const getAllBooks = () => {
    axios.get(url).then((res) => {
      getBooks(res.data);
    });
  };

  useEffect(() => getAllBooks(), []);

  return (
    <div>
      <AdvancedReportsNavigation />
      <div>
        <div className={classes.title}>
          <span className={classes.w33}>Tytuł</span>
          <span className={classes.w33}>ISBN</span>
          <span className={classes.w33}>Średnia ocena</span>
        </div>
        <div className={classes.dataWrapper}>
          {books.map((book) => (
            <div key={book.isbn} className={classes.element}>
              <span className={classes.w33}>{book.title}</span>
              <span className={classes.w33}>{book.isbn}</span>
              <span className={classes.w33}>{book.avgScore}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BestBooksReport;
